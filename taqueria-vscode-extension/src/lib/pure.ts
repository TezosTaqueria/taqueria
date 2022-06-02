import * as Config from '@taqueria/protocol/Config';
import { EphemeralState } from '@taqueria/protocol/EphemeralState';
import { i18n } from '@taqueria/protocol/i18n';
import { exec } from 'child_process';
import { parse } from 'comment-json';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';
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
	readonly state: EphemeralState;

	protected constructor(dir: PathToDir, config: Config.t, state: EphemeralState) {
		this.dir = dir;
		this.config = config;
		this.state = state;
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
					.then(config =>
						makeFile(join(dotTaqDir, 'state.json'), i18n)
							// TODO - validate state!
							.then(pathToState => readJsonFile<EphemeralState>(i18n, data => (data as EphemeralState))(pathToState))
							.then(state => new TaqifiedDir(dir, config, state))
							.catch(previous =>
								Promise.reject({
									code: 'E_STATE_MISSING',
									msg: 'The provided directory is taqified but missing a state file in .taq',
									taqifiedDir: dir,
									previous,
								})
							)
					)
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

	/**
	 * Makes a TaqifiedDir from a path to a directory
	 * @param {string} inputDir
	 * @param {I18N} i18n
	 * @returns {LikeAPromise<TaqifiedDir, E_NOT_TAQIFIED|E_STATE_MISSING>}
	 */
	static createFromString(inputDir: string, i18n: i18n): LikeAPromise<TaqifiedDir, TaqVsxError> {
		return makeDir(inputDir, i18n)
			.then(dir => this.create(dir, i18n))
			.catch(previous =>
				Promise.reject({
					code: 'E_NOT_TAQIFIED',
					pathProvided: inputDir,
					msg: 'The given path is not taqified, as its not an existing directory',
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

/**
 * Makes a PathToTaq
 * Assures that the provided inputPath points to the taq binary
 * @param {string} inputPath
 * @param {I18N} _i18n
 * @returns {(inputPath:string) => LikeAPromise<PathToTaq, E_TAQ_NOT_FOUND>}
 */
export const makePathToTaq = (i18n: i18n) =>
	(inputPath: string): LikeAPromise<PathToTaq, TaqVsxError> =>
		stat(inputPath)
			.then(_ => proxyToTaq(inputPath as PathToTaq, i18n)('testFromVsCode'))
			.then(
				output =>
					output.includes('OK')
						? Promise.resolve(inputPath as PathToTaq)
						: Promise.reject({ code: 'E_TAQ_NOT_FOUND', pathProvided: inputPath, msg: 'The path to taq is invalid' }),
			)
			.catch(previous =>
				Promise.reject({
					code: 'E_TAQ_NOT_FOUND',
					pathProvided: inputPath,
					msg: 'The path to taq is invalid',
					previous,
				})
			);

/**
 * Executes a shell command
 * @param {string} cmd
 * @returns {LikeAPromise<string, E_EXEC>}
 */
export const execCmd = (cmd: string): LikeAPromise<string, TaqVsxError> =>
	new Promise((resolve, reject) => {
		if (isWindows()) reject({ code: 'E_WINDOWS', msg: 'Running in Windows without WSLv2 is currently not supported.' });
		else {
			exec(`sh -c "${cmd}"`, (previous, stdout, msg) => {
				log('Executing command:')(cmd);
				if (previous) {
					reject({
						code: 'E_EXEC',
						msg: `An unexpected error occurred when trying to execute the command`,
						previous,
						cmd,
					});
				} else if (msg.length) reject({ code: 'E_EXEC', msg, cmd });
				else resolve(stdout);
			});
		}
	});

/**
 * Proxies a command to the taq CLI
 * @todo Use i18n
 * @param {string} cmd
 * @param {I18N} _i18n
 * @returns {(taskWithArgs: string) => LikeAPromise<string, ProxyErr>}
 */
export const proxyToTaq = (pathToTaq: PathToTaq, i18n: i18n, projectDir?: PathToDir) =>
	(taskWithArgs: string): LikeAPromise<string, TaqVsxError> =>
		(
			projectDir
				? execCmd(`${pathToTaq} -p ${projectDir} --fromVsCode ${taskWithArgs}`)
				: execCmd(`${pathToTaq} --fromVsCode ${taskWithArgs}`)
		)
			.catch(previous => {
				if ('code' in previous) {
					if (previous.code === 'E_EXEC') {
						const { cmd, msg } = previous;

						// The error message from the CLI might be JSON
						// Try to parse it and if so, return its error information
						return decodeJson(msg)
							.catch(_ =>
								msg.includes('EBADENGINE')
									? 'Please install NodeJS v16.'
									: msg
							)
							.then(err => {
								if (typeof err === 'object') {
									return Promise.reject(err);
								} else return Promise.reject({ code: 'E_PROXY', msg: err, previous, cmd });
							});
					}
				}
				return Promise.reject({ code: 'E_PROXY', msg: 'There was a problem running taq.', previous });
			});

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

export const decodeJson = <T>(data: string): LikeAPromise<Json<T>, TaqVsxError> => {
	try {
		const json = parse(data);
		if (json) {
			const obj = json as unknown as Json<T>;
			return Promise.resolve(obj);
		} else throw new Error('Could not parse JSON');
	} catch (previous) {
		return Promise.reject({ code: 'E_INVALID_JSON', data, msg: 'The provided data is invalid JSON', previous });
	}
};

export const isWindows = () => process.platform.includes('win') && !process.platform.includes('darwin');

export const findTaqBinary = (i18n: i18n): LikeAPromise<string, TaqVsxError> =>
	execCmd('which taq')
		.then(path => path.trim())
		.catch(previous => Promise.reject({ code: 'E_TAQ_NOT_FOUND', msg: 'Could not find taq in your path.', previous }))
		.then(makePathToTaq(i18n));

export const makeState = (_i18n: i18n) =>
	(input: Record<string, unknown>) => {
		// TODO: Validate input
		return input as unknown as EphemeralState;
	};

export const log = <T>(heading: string) =>
	(input: T): T => {
		console.log('**' + heading + '**');
		console.log(input);
		return input;
	};
