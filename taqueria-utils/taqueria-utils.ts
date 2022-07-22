import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath';
import * as TaqError from '@taqueria/protocol/TaqError';
import * as Url from '@taqueria/protocol/Url';
import {
	alt,
	attemptP,
	chain,
	chainRej,
	FutureInstance as Future,
	map,
	mapRej,
	promise,
	reject,
	resolve,
	swap,
} from 'fluture';
import { join as _joinPaths } from 'https://deno.land/std@0.115.1/path/mod.ts';
import { copy } from 'https://deno.land/std@0.128.0/streams/conversion.ts';
import { iterateReader } from 'https://deno.land/std@0.149.0/streams/conversion.ts';
import { render } from 'https://deno.land/x/eta@v1.12.3/mod.ts';
import { pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import * as jsonc from 'https://deno.land/x/jsonc@1/main.ts';
import memoizy from 'https://deno.land/x/memoizy@1.0.0/fp.ts';
import { UtilsDependencies } from './taqueria-utils-types.ts';

export const decodeJson = <T>(encoded: string): Future<TaqError.t, T> =>
	attemptP(() => {
		try {
			const data = jsonc.parse(encoded);
			return Promise.resolve(data as T);
		} catch (err) {
			throw ({
				kind: 'E_INVALID_JSON',
				msg: 'The provided JSON could not be decoded.',
				previous: err,
				context: encoded,
			});
		}
	});

export const debug = <T>(input: T) => {
	// deno-lint-ignore no-debugger
	debugger;
	return input;
};

export const mkdir = (path: string): Future<TaqError.t, string> =>
	attemptP(async () => {
		try {
			await Deno.mkdir(path, { recursive: true });
			return path;
		} catch (_e) {
			// TODO i18n message
			return Promise.reject({ kind: 'E_MKDIR_FAILED', msg: 'Failed to make directory', context: path, previous: _e });
		}
	});

export const ensureDirExists = (path: string) =>
	SanitizedAbsPath
		.make(path)
		.pipe(chain(abspath => attemptP(() => Deno.stat(abspath))))
		.pipe(chainRej(() => attemptP(() => Deno.mkdir(path, { recursive: true }))))
		.pipe(chain(() => SanitizedAbsPath.make(path)))
		.pipe(mapRej(previous => {
			const taqErr: TaqError.t = {
				kind: 'E_INVALID_PATH_DOES_NOT_EXIST',
				msg: 'Path does not exist',
				context: path,
				previous,
			};
			return taqErr;
		}));

export const doesPathExist = (path: string) =>
	SanitizedAbsPath
		.make(path)
		.pipe(chain(abspath => attemptP(() => Deno.stat(abspath))))
		.pipe(chain(() => SanitizedAbsPath.make(path)))
		.pipe(mapRej((previous: unknown) =>
			TaqError.create({
				kind: 'E_INVALID_PATH_DOES_NOT_EXIST',
				msg: 'Path does not exist',
				context: path,
				previous,
			})
		));

export const isPathEmptyDirectory = (path: string) =>
	attemptP(async () => {
		const dirInfo = Deno.readDir(path);
		for await (const _item of dirInfo) {
			throw TaqError.create({
				kind: 'E_INTERNAL_LOGICAL_VALIDATION_FAILURE',
				msg: 'The path is not an empty directory',
			});
		}
	})
		.pipe(chain(() => SanitizedAbsPath.make(path)))
		.pipe(mapRej(() =>
			TaqError.create({
				kind: 'E_INTERNAL_LOGICAL_VALIDATION_FAILURE',
				msg: 'The path is not an empty directory',
			})
		));

export const doesPathNotExist = (path: string) =>
	doesPathExist(path)
		.pipe(swap)
		.pipe(chain(() => SanitizedAbsPath.make(path)))
		.pipe(mapRej((previous: unknown) =>
			TaqError.create({
				kind: 'E_INVALID_PATH_ALREADY_EXISTS',
				msg: 'Path already exists',
				context: path,
				previous,
			})
		));

export const doesPathNotExistOrIsEmptyDir = (path: string) =>
	alt(doesPathNotExist(path))(isPathEmptyDirectory(path))
		.pipe(mapRej((previous: unknown) =>
			TaqError.create({
				kind: 'E_INVALID_PATH_EXISTS_AND_NOT_AN_EMPTY_DIR',
				msg: 'Path exists and is not an empty dir',
				context: path,
				previous,
			})
		));

export const rm = (path: SanitizedAbsPath.t): Future<TaqError.t, SanitizedAbsPath.t> =>
	attemptP(async () => {
		try {
			await Deno.remove(path, { recursive: true });
		} catch (previous) {
			const err: TaqError.t = {
				kind: 'E_INVALID_PATH_DOES_NOT_EXIST',
				msg: `Failed to remove ${path}`,
				context: path,
				previous,
			};
			return Promise.reject(err);
		}

		return path;
	});

export const readTextFile = (path: string): Future<TaqError.t, string> =>
	attemptP(() => {
		const decoder = new TextDecoder('utf-8');
		return Deno.readFile(path)
			.then(data => {
				const decoded = decoder.decode(data);
				return decoded;
			})
			.catch((previous: Error) =>
				Promise.reject({
					kind: 'E_READFILE',
					msg: `Could not read ${path}`,
					previous,
				})
			);
	});

export const readJsonFile = <T>(path: string) =>
	pipe(
		readTextFile(path),
		chain(x => decodeJson<T>(x)),
	);

export const appendTextFile = (path: string) =>
	(data: string): Future<TaqError.t, string> =>
		attemptP(() =>
			Deno.writeTextFile(path, data, {
				append: true,
			}).then(() => path)
		);

export const writeTextFile = (path: string) =>
	(data: string): Future<TaqError.t, string> => attemptP(() => Deno.writeTextFile(path, data).then(() => path));

export const writeJsonFile = <T>(path: string) =>
	(data: T) =>
		pipe(
			JSON.stringify(data),
			jsonStr =>
				pipe(
					jsonc.format(jsonStr, undefined, {
						insertSpaces: true,
					}),
					edits => jsonc.applyEdits(jsonStr, edits),
				),
			writeTextFile(path),
		);

export const isTaqError = (err: unknown): err is TaqError.t => {
	return (err as TaqError.t).kind !== undefined;
};

export const memoize = memoizy({});

export const joinPaths = _joinPaths;

export const renderTemplate = (template: string, values: Record<string, unknown>): string =>
	render(template, values) as string;

export const toPromise = <T>(f: Future<TaqError.t, T>) =>
	pipe(
		f,
		mapRej(taqErr => new TaqError.E_TaqError(taqErr)),
		promise,
	);

export const eager = toPromise;

export const taqResolve = <T>(data: T): Future<TaqError.t, T> => resolve(data) as Future<TaqError.t, T>;

export async function readTextWithOutputModes(
	reader: Deno.Reader,
	writer: Deno.Writer,
) {
	// console.log('readTextWithOutputModes START');

	const encoder = new TextEncoder();
	let outputText = '';

	const appendText = (text: string, mode: 'direct' | 'normal') => {
		// console.log('appendText', { text, mode });

		if (mode === 'direct') {
			writer.write(encoder.encode(text));
			return;
		}

		outputText += text;
	};

	const decoder = new TextDecoder();
	let buffer = '';
	let mode = 'normal' as 'direct' | 'normal';

	for await (const chunk of iterateReader(reader)) {
		buffer += decoder.decode(chunk);

		// console.log('buffer read', { buffer });

		// The whole command should be available in a single iteration
		// So the entire buffer can be consumed each iteration
		while (buffer.length) {
			// Handle text before a command
			if (!buffer.startsWith('<')) {
				const iPotentialCommand = buffer.indexOf('<');

				if (iPotentialCommand < 0) {
					// No potential command => append all buffer
					appendText(buffer, mode);
					buffer = '';
					continue;
				}

				// Handle text before potential command
				appendText(buffer.substring(0, iPotentialCommand), mode);
				buffer = buffer.substring(iPotentialCommand);
			}

			// Handle commands
			const COMMAND_MODE_DIRECT = '<MODE=DIRECT>';
			const COMMAND_MODE_NORMAL = '<MODE=NORMAL>';

			if (buffer.startsWith(COMMAND_MODE_DIRECT)) {
				// console.log('readTextWithOutputModes - COMMAND_MODE_DIRECT');

				mode = 'direct';
				buffer = buffer.substring(COMMAND_MODE_DIRECT.length);
				continue;
			}
			if (buffer.startsWith(COMMAND_MODE_NORMAL)) {
				// console.log('readTextWithOutputModes - COMMAND_MODE_NORMAL');

				mode = 'normal';
				buffer = buffer.substring(COMMAND_MODE_NORMAL.length);
				continue;
			}

			// If no command was found, then forward the buffer 1 character (to get past <)
			// Since commands should always be available in a single read
			appendText(buffer.substring(0, 1), mode);
			buffer = buffer.substring(1);
		}
	}

	return outputText;
}

// Exports a function to inject dependencies needed by this
// utilities package
export const inject = (deps: UtilsDependencies) => {
	const { stdout, stderr } = deps;

	const log = (message: unknown) => {
		const encoder = new TextEncoder();
		stdout.write(encoder.encode(`${message}\n`));
	};

	const logInput = <T>(message: string) =>
		(input: T): T => {
			const encoder = new TextEncoder();
			const data = typeof (input) === 'object' ? JSON.stringify(input, null, 4) : input;
			stdout.write(encoder.encode(`${message}\n`));
			stdout.write(encoder.encode(`${data}\n`));
			return input as T;
		};

	const gitClone = (url: Url.t) =>
		(destinationPath: SanitizedAbsPath.t): Future<TaqError.t, SanitizedAbsPath.t> =>
			pipe(
				execText('git clone <%= it.url %> <%= it.outputDir %>', { url: url.toString(), outputDir: destinationPath }),
				mapRej<TaqError.t, TaqError.t>(previous => ({
					kind: 'E_GIT_CLONE_FAILED',
					msg: `Could not clone ${url.toString()}. Please check the Git url and ensure that Git is installed.`,
					context: { url, destinationPath },
					previous,
				})),
				chain(([status]) =>
					status === 0
						? resolve(destinationPath)
						: reject<TaqError.t>({
							kind: 'E_GIT_CLONE_FAILED',
							msg: `Could not clone ${url.toString()}. Please check the Git url and ensure that Git is installed.`,
							context: { url, destinationPath },
						})
				),
				map(() => destinationPath),
			);

	const execText = (
		cmdTemplate: string,
		inputArgs: Record<string, unknown>,
		bufferOutput = false,
		cwd?: SanitizedAbsPath.t,
	): Future<TaqError.t, [number, string, string]> =>
		attemptP(async () => {
			let command = cmdTemplate;
			try {
				// NOTE, uses eta templates under the hood. Very performant! https://ghcdn.rawgit.org/eta-dev/eta/master/browser-tests/benchmark.html
				/**
				 * Template Variables:
				 * - configDir
				 * - projectDir
				 * - maxConcurrency
				 * - plugin
				 * - config.language
				 * - config.plugins
				 * - config.contractsDir
				 * - config.artifactsDir
				 * - config.testsDir
				 * - config.configFile
				 * - config.configDir
				 * - config.projectDir
				 * - env.get()
				 * - i18n.__()
				 */
				const cmdArgs = {
					join: joinPaths,
					joinPaths,
					...inputArgs,
				};
				const cmd = renderTemplate(cmdTemplate, cmdArgs);
				command = cmd;
			} catch (previous) {
				throw {
					kind: 'E_FORK',
					msg: `There was a problem trying to evaluate this template: ${cmdTemplate}\n${previous}`,
					previous,
				} as TaqError.t;
			}
			try {
				const process = Deno.run({
					cmd: ['sh', '-c', `${command}`],
					cwd,
					stdout: 'piped',
					stderr: 'piped',
				});

				// Output for the subprocess' stderr should be copied to the parent stderr
				const errOutput = await (async () => {
					if (bufferOutput) {
						const result = await readTextWithOutputModes(process.stderr, stderr);
						process.stderr.close();
						return result;
					} else {
						await copy(process.stderr, stderr);
						process.stderr.close();
					}
				})();

				// Get output. Buffer if desired
				const output = await (async () => {
					if (bufferOutput) {
						const result = await readTextWithOutputModes(process.stdout, stdout);
						process.stdout.close();
						return result;
					} else {
						await copy(process.stdout, stdout);
						process.stdout.close();
					}
				})();

				// Wait for subprocess to exit
				const status = await process.status();
				Deno.close(process.rid);
				return [status.code, output ?? '', errOutput ?? ''];
			} catch (previous) {
				throw {
					kind: 'E_FORK',
					msg: `There was a problem trying to run: ${command}`,
					previous,
				} as TaqError.t;
			}
		});

	return {
		decodeJson,
		log,
		logInput,
		debug,
		mkdir,
		doesPathExist,
		doesPathNotExistOrIsEmptyDir,
		ensureDirExists,
		rm,
		gitClone,
		readTextFile,
		readJsonFile,
		writeTextFile,
		writeJsonFile,
		isTaqError,
		memoize,
		joinPaths,
		renderTemplate,
		execText,
		toPromise,
		stdout,
		stderr,
		eager,
		taqResolve,
		appendTextFile,
	};
};
