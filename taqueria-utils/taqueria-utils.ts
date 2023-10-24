import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath';
import * as TaqError from '@taqueria/protocol/TaqError';
import { readJsonFileInterceptConfig, writeJsonFileInterceptConfig } from '@taqueria/protocol/types-config-files';
import * as Url from '@taqueria/protocol/Url';
import { render } from 'eta';
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
import { pipe } from 'fun';
import * as jsonc from 'jsonc';
import { dirname, join as _joinPaths } from 'path';
import { memoize as memoizeIt } from 'rambdax';
import { copy } from 'streams';
import { UtilsDependencies } from './taqueria-utils-types.ts';

export const decodeJson = <T>(encoded: string): Future<TaqError.t, T> => {
	try {
		const parseErrors: jsonc.ParseError[] = [];
		const data = jsonc.parse(encoded, parseErrors, {
			disallowComments: false,
			allowTrailingComma: false,
			allowEmptyContent: true,
		});
		if (parseErrors.length !== 0) {
			throw new Error(`Syntax error at the ${parseErrors[0].offset}th character.`);
		}
		return taqResolve(data as T);
	} catch (err) {
		return reject({
			kind: 'E_INVALID_JSON',
			msg: 'The provided JSON could not be decoded.',
			previous: err,
			context: encoded,
		});
	}
};

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

const readJsonFileInner = <T>(path: string): Future<TaqError.TaqError, T> =>
	pipe(
		readTextFile(path),
		chain(x => decodeJson<T>(x)),
	);

export const readJsonFile = <T>(path: string): Future<TaqError.TaqError, T> =>
	attemptP(() => {
		return readJsonFileInterceptConfig(async x => {
			return await toPromise(readJsonFileInner(x));
		})(path);
	});

export const appendTextFile = (path: string) => (data: string): Future<TaqError.t, string> =>
	attemptP(() =>
		Deno.writeTextFile(path, data, {
			append: true,
		}).then(() => path)
	);

export const writeTextFile = (path: string) => (data: string): Future<TaqError.t, string> =>
	attemptP(() => Deno.writeTextFile(path, data).then(() => path));

const writeJsonFileInner = (path: string) => (data: unknown): Future<TaqError.t, string> =>
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
export const writeJsonFile = <T>(path: string) => (data: T): Future<TaqError.t, string> =>
	attemptP(() => {
		return writeJsonFileInterceptConfig(p => d => {
			return toPromise(writeJsonFileInner(p)(d));
		})(path)(data);
	});

export const isTaqError = (err: unknown): err is TaqError.t => {
	return (err as TaqError.t).kind !== undefined;
};

export const joinPaths = _joinPaths;

export const dirOf = dirname;

export const renderTemplate = (template: string, values: Record<string, unknown>): string =>
	render(template, values) as string;

export const toPromise = <T>(f: Future<TaqError.t, T>): Promise<T> =>
	pipe(
		f,
		mapRej(taqErr => new TaqError.E_TaqError(taqErr)),
		promise,
	);

export const eager = toPromise;

export const taqResolve = <T>(data?: T): Future<TaqError.t, T> => resolve(data) as Future<TaqError.t, T>;

// Exports a function to inject dependencies needed by this
// utilities package
export const inject = (deps: UtilsDependencies) => {
	const { stdout, stderr } = deps;

	const log = (message: unknown) => {
		const encoder = new TextEncoder();
		stdout.write(encoder.encode(`${message}\n`));
	};

	const logInput = <T>(message: string) => (input: T): T => {
		const encoder = new TextEncoder();
		const data = typeof (input) === 'object' ? JSON.stringify(input, null, 4) : input;
		stdout.write(encoder.encode(`${message}\n`));
		stdout.write(encoder.encode(`${data}\n`));
		return input as T;
	};

	const gitClone =
		(url: Url.t) => (destinationPath: SanitizedAbsPath.t) => (branch: string): Future<TaqError.t, SanitizedAbsPath.t> =>
			pipe(
				execText('git clone <%= it.url %> <%= it.outputDir %> -b <%= it.branch %>', {
					url: url.toString(),
					outputDir: destinationPath,
					branch: branch,
				}),
				mapRej<TaqError.t, TaqError.t>(previous => ({
					kind: 'E_GIT_CLONE_FAILED',
					msg:
						`Could not clone ${url.toString()}. Please check the Git url and ensure that Git is installed. Also check the branch name if you've specified it via --branch.`,
					context: { url, destinationPath },
					previous,
				})),
				chain(([status]) =>
					status === 0
						? resolve(destinationPath)
						: reject<TaqError.t>({
							kind: 'E_GIT_CLONE_FAILED',
							msg:
								`Could not clone ${url.toString()}. Please check the Git url and ensure that Git is installed. Also check the branch name if you've specified it via --branch.`,
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
						const output = await process.stderrOutput();
						const decoder = new TextDecoder();
						return decoder.decode(output);
					} else {
						await copy(process.stderr, stderr);
						process.stderr.close();
					}
				})();

				// Get output. Buffer if desired
				const output = await (async () => {
					if (bufferOutput) {
						const output = await process.output();
						const decoder = new TextDecoder();
						return decoder.decode(output);
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
		memoize: memoizeIt,
		joinPaths,
		dirOf,
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
