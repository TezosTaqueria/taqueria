import * as Config from '@taqueria/protocol/Config';
import { i18n } from '@taqueria/protocol/i18n';
import { exec, ExecException } from 'child_process';
import { parse } from 'comment-json';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import { OutputFunction, OutputLevels } from './helpers';
import { TaqVsxError } from './TaqVsxError';

/***********************************************************************/
// This module provides pure helper functions that do not use the VS Code API
// All helper functions should utilize dependency injection
/***********************************************************************/
export interface LikeAPromise<Success, TaqError> extends Promise<Success> {
}

export type PathToTaq = string & { __kind__: 'PathToTaq' };

export type PathToDir = string & { __kind__: 'PathToDir' };

export type PathToFile = string & { __kind__: 'PathToFile' };

export type Json<T> = T;
export class TaqifiedDir {
	readonly dir: PathToDir;
	readonly config: Config.t;

	protected constructor(dir: PathToDir, config: Config.t) {
		this.dir = dir;
		this.config = config;
	}

	/**
	 * Makes a TaqifiedDir from an existing directory
	 * @param {PathToDir} dir
	 * @param {I18N} i18n
	 * @returns {LikeAPromise<TaqifiedDir, E_NOT_TAQIFIED|E_STATE_MISSING>}
	 */
	static create(dir: PathToDir, i18n: i18n): LikeAPromise<TaqifiedDir, TaqVsxError> {
		return makeDir(join(dir, '.taq'), i18n)
			.then(dotTaqDir =>
				makeFile(join(dotTaqDir, 'config.json'), i18n)
					// TODO - validate config!
					.then(pathToConfig => readJsonFile<Config.t>(i18n, data => (data as unknown as Config.t))(pathToConfig))
					.catch(previous =>
						Promise.reject({
							code: 'E_NOT_TAQIFIED',
							pathProvided: dir,
							msg: "The given directory is not taqified as it's missing a .taq/config.json file.",
							previous,
						})
					)
					.then(config => new TaqifiedDir(dir, config))
			)
			.catch(previous =>
				Promise.reject({
					code: 'E_NOT_TAQIFIED',
					pathProvided: dir,
					msg: "The given directory is not taqified as it's missing a .taq directory.",
					previous,
				})
			);
	}
}

/**
 * Makes a PathToFile
 * Assures that the path provided resolves to an existing file
 * @todo Use i18n
 * @param {string} pathToFile
 * @param {I18N} _i18n
 * @returns {LikeAPromise<PathToFile, E_INVALID_FILE>}
 */
export const makeFile = (pathToFile: string, _i18n: i18n): LikeAPromise<PathToFile, TaqVsxError> =>
	stat(pathToFile)
		.then(
			stat =>
				stat.isFile()
					? Promise.resolve(pathToFile as PathToFile)
					: Promise.reject({
						code: 'E_INVALID_FILE',
						pathProvided: pathToFile,
						msg: 'This path does not resolve to an existing file',
					}),
		)
		.catch(previous =>
			Promise.reject({
				code: 'E_INVALID_FILE',
				pathProvided: pathToFile,
				msg: 'This path does not resolve to an existing file',
				previous,
			})
		);

/**
 * Makes a PathToDir
 * Assures that the given dirPath is actually a directory
 * @todo Use i18n
 * @param {string} dirPath
 * @param {I18N} _i18n
 * @returns {LikeAPromise<PathToDir, E_INVALID_DIR>}
 */
export const makeDir = (dirPath: string, _i18n: i18n): LikeAPromise<PathToDir, TaqVsxError> =>
	stat(dirPath)
		.then(
			result =>
				result.isDirectory()
					? Promise.resolve(dirPath as PathToDir)
					: Promise.reject({ code: 'E_INVALID_DIR', pathProvided: dirPath, msg: 'The given path is not a directory' }),
		)
		.catch(previous =>
			Promise.reject({
				code: 'E_INVALID_DIR',
				pathProvided: dirPath,
				previous,
				msg: 'The given path is not a directory',
			})
		);

export const getRunningContainerNames = (): LikeAPromise<string[], TaqVsxError> =>
	new Promise((resolve, reject) =>
		exec(`docker ps --format '{{.Names}}'`, (_error, stdout, _stderr) => {
			const containers = stdout.split('\n');
			resolve(containers);
		})
	);

export class TaqExecutionResult {
	constructor(
		public executionError: ExecException | null,
		public standardOutput: string,
		public standardError: string,
	) {
	}
}

/**
 * Executes a shell command
 * @param {string} cmd
 * @returns {LikeAPromise<string, E_EXEC>}
 */
export const execCmd = (
	cmd: string,
	showLog: OutputFunction,
	projectDir?: PathToDir,
): LikeAPromise<TaqExecutionResult, TaqVsxError> =>
	new Promise((resolve, reject) => {
		showLog(OutputLevels.info, `Running command:\n${cmd}`);
		if (isWindows()) reject({ code: 'E_WINDOWS', msg: 'Running in Windows without WSLv2 is currently not supported.' });
		else {
			const shellCommand = `sh -c "${projectDir ? 'cd ' + projectDir + ' && ' : ''}${cmd}"`;
			showLog(OutputLevels.debug, shellCommand);
			exec(shellCommand, (executionError, standardOutput, standardError) => {
				resolve(new TaqExecutionResult(executionError, standardOutput, standardError));
			});
		}
	});

export const checkTaqBinary = async (inputPath: PathToTaq, i18n: i18n, showOutput: OutputFunction) => {
	const result = await execCmd(`${inputPath} testFromVsCode`, showOutput);
	return result.standardOutput;
};

export const readJsonFile = <T>(_i18n: i18n, make: (data: Record<string, unknown>) => T) =>
	(pathToFile: PathToFile) =>
		readFile(pathToFile, { encoding: 'utf-8' })
			.then(data => {
				try {
					const json = parse(data);
					if (json) {
						const obj = json as Record<string, unknown>;
						return make(obj) as Json<T>;
					} else throw new Error('Could not parse JSON');
				} catch (previous) {
					return Promise.reject({
						code: 'E_INVALID_JSON',
						data,
						msg: 'The provided data is invalid JSON',
						previous,
						context: pathToFile,
					});
				}
			});

export const isWindows = () => process.platform.includes('win') && !process.platform.includes('darwin');

export const findTaqBinary = (i18n: i18n, showOutput: OutputFunction): LikeAPromise<string, TaqVsxError> =>
	execCmd('which taq', showOutput)
		.then(result => {
			if (result.executionError) {
				return Promise.reject({
					code: 'E_TAQ_NOT_FOUND',
					msg: 'Could not find taq in your path.',
					previous: result.executionError,
				});
			} else {
				return result.standardOutput.trim();
			}
		})
		.catch(previous => Promise.reject({ code: 'E_TAQ_NOT_FOUND', msg: 'Could not find taq in your path.', previous }));

export const log = <T>(heading: string) =>
	(input: T): T => {
		console.log('**' + heading + '**');
		console.log(input);
		return input;
	};
