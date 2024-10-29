export * from '@taqueria/protocol/types';
import * as Protocol from '@taqueria/protocol';
import { quote as shellEscape } from 'shell-quote';
export {
	Config,
	EconomicalProtocolHash,
	Environment,
	Faucet,
	LoadedConfig,
	NetworkConfig,
	NonEmptyString,
	Option,
	PositionalArg,
	ProxyTaskArgs,
	ProxyTemplateArgs,
	RequestArgs,
	Task,
} from '@taqueria/protocol';
export * as Template from '@taqueria/protocol/Template';
import { Contract } from '@taqueria/protocol/types';
export { Protocol };
import type { i18n } from '@taqueria/protocol/i18n';
import load from '@taqueria/protocol/i18n';
import * as SHA256 from '@taqueria/protocol/SHA256';
import { E_TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import type { TaqError } from '@taqueria/protocol/TaqError';
import * as NonStrict from '@taqueria/protocol/types';
import { readJsonFileInterceptConfig, writeJsonFileInterceptConfig } from '@taqueria/protocol/types-config-files';
import { exec, ExecException, spawn } from 'child_process';
import { FutureInstance as Future, mapRej, promise } from 'fluture';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join, resolve as resolvePath } from 'path';
import { get, getSync } from 'stacktrace-js';
import { ZodError } from 'zod';
import { LikeAPromise, pluginDefiner, PluginSchema, StdIO } from './types';

import { importKey, InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { b58cencode, Prefix, prefix } from '@taquito/utils';
import * as Bip39 from 'bip39';
import crypto from 'crypto';

// To use esbuild with yargs, we can't use ESM: https://github.com/yargs/yargs/issues/1929
import YArgs from 'yargs';
const yargs: typeof YArgs = require('yargs');
export const TAQ_OPERATOR_ACCOUNT = 'taqOperatorAccount';

export const eager = <T>(f: Future<TaqError, T>) =>
	promise(
		mapRej((err: TaqError) => new E_TaqError(err))(f),
	);

const writeJsonFileInner = <T>(filename: string) => (data: T): Promise<string> =>
	writeFile(filename, JSON.stringify(data, undefined, 4), { encoding: 'utf8' })
		.then(_ => filename);
export const writeJsonFile = writeJsonFileInterceptConfig(writeJsonFileInner);

const readJsonFileInner = <T>(filename: string): Promise<T> =>
	readFile(filename, { encoding: 'utf-8' })
		.then(JSON.parse)
		.then(result => (result as T));

export const readJsonFile = readJsonFileInterceptConfig(readJsonFileInner);

export const readJsonFileWithoutTransform = readJsonFileInner;

export type FilteredStdErr = {
	skip: boolean;
	output: string[];
};

const filterDockerImageMessages = (stderr: string) => {
	/**
	stderr could look like the following:
	Unable to find image 'ligolang/ligo:0.71.0' locally
	0.71.0: Pulling from ligolang/ligo
	31e352740f53: Pulling fs layer
	4f4fb700ef54: Pulling fs layer
	d66873d3e354: Pulling fs layer
	01000b0059ad: Pulling fs layer
	69adc53ad7bd: Pulling fs layer
	574acbf36bfc: Pulling fs layer
	01000b0059ad: Waiting
	69adc53ad7bd: Waiting
	574acbf36bfc: Waiting
	d66873d3e354: Verifying Checksum
	d66873d3e354: Download complete
	4f4fb700ef54: Verifying Checksum
	4f4fb700ef54: Download complete
	31e352740f53: Verifying Checksum
	31e352740f53: Download complete
	69adc53ad7bd: Verifying Checksum
	69adc53ad7bd: Download complete
	31e352740f53: Pull complete
	574acbf36bfc: Verifying Checksum
	574acbf36bfc: Download complete
	4f4fb700ef54: Pull complete
	d66873d3e354: Pull complete
	01000b0059ad: Verifying Checksum
	01000b0059ad: Download complete
	01000b0059ad: Pull complete
	69adc53ad7bd: Pull complete
	574acbf36bfc: Pull complete
	Digest: sha256:f70a1fb1dafa8e74237d3412e84c85eabbf8a1d539eb9c557b70e971a3adf997
	Status: Downloaded newer image for ligolang/ligo:0.71.0

	In that case, we need to remove the line that starts with "Unable to find image .* locally" and that lines that follow it till (but including) the line that starts with "Downloaded newer image"
	 */
	let skip = false;
	const filteredStderr = stderr.split('\n')
		.filter(line => {
			if (line.startsWith('Unable to find image')) {
				skip = true;
			}
			if (skip && line.startsWith('Downloaded newer image')) {
				skip = false;
				return false; // Also skip the line that starts with "Downloaded newer image"
			}
			return !skip;
		})
		.join('\n');

	return filteredStderr;
};

export const execCmd = (cmd: string): LikeAPromise<StdIO, ExecException & { stdout: string; stderr: string }> =>
	new Promise((resolve, reject) => {
		// Escape quotes in the command, given that we're wrapping in quotes
		const escapedCmd = cmd.replaceAll(/"/gm, '\\"');
		exec(`sh -c "${escapedCmd}"`, (err, stdout, stderr) => {
			const filteredStderr = filterShellCmdStderr(stderr); // Filter the stderr

			if (err) {
				reject(toExecErr(err, { stderr: filteredStderr, stdout })); // Use the filtered stderr
			} else {
				resolve({
					stdout,
					stderr: filteredStderr, // Use the filtered stderr
				});
			}
		});
	});

const filterNPMWarnings = (stderr: string): string =>
	stderr
		.split('\n')
		.filter(line => !/npm\s+warn/i.test(line))
		.join('\n');

const filterShellCmdStderr = (stderr: string) => {
	let retval = filterDockerImageMessages(stderr);
	retval = filterNPMWarnings(retval);
	retval = filterOctezWarningMessages(retval);
	return retval;
};

const filterOctezWarningMessages = (stderr: string) => {
	// Filter out warning messages from Octez
	return stderr
		.split('\n')
		.filter(line => !line.trim().startsWith('Warning:'))
		.filter(line => !line.includes('This is NOT the Tezos Mainnet.'))
		.filter(line => !line.includes('Do NOT use your fundraiser keys on this network.'))
		.join('\n')
		.trim();
};

type ExecErrProps = {
	stderr: string;
	stdout: string;
};

export const toExecErr = (message: string | Error, props: ExecErrProps): Error & ExecErrProps => {
	const err = message instanceof Error ? message : new Error(message);
	const retval = err as unknown as Error & ExecErrProps;
	retval.stderr = props.stderr;
	retval.stdout = props.stdout;
	return retval;
};

export const execCommandWithoutWrapping = (cmd: string): LikeAPromise<StdIO, ExecException> =>
	new Promise((resolve, reject) => {
		exec(cmd, (err, stdout, stderr) => {
			if (err) reject(err);
			else {
				resolve({
					stdout,
					stderr,
				});
			}
		});
	});

export const spawnCmd = (cmd: string, envVars: Record<string, string> = {}): Promise<number | null> =>
	new Promise((resolve, reject) => {
		const child = spawn(cmd, { env: { ...process.env, ...envVars }, stdio: 'inherit', shell: true });
		child.on('close', resolve);
		child.on('error', reject);
	});

export const getArchSync = (): 'linux/arm64/v8' | 'linux/amd64' => {
	switch (process.arch) {
		case 'arm64':
			return 'linux/arm64/v8';
		// @ts-ignore: x32 is valid for some versions of NodeJS
		case 'x32':
		case 'x64':
			return 'linux/amd64';
		default:
			const err: TaqError = {
				kind: 'E_INVALID_ARCH',
				msg: `The ${process.arch} architecture is not supported at this time.`,
				context: process.arch,
			};
			throw err;
	}
};

export const getArch = (): LikeAPromise<'linux/arm64/v8' | 'linux/amd64', TaqError> =>
	new Promise((resolve, reject) => {
		try {
			const arch = getArchSync();
			resolve(arch);
		} catch (e) {
			reject(e);
		}
	});

export const parseJSON = <T>(input: string): LikeAPromise<T, TaqError> =>
	new Promise((resolve, reject) => {
		try {
			const json = JSON.parse(input);
			resolve(json);
		} catch (previous) {
			const taqErr: TaqError = {
				kind: 'E_INVALID_JSON',
				msg: `Invalid JSON: ${input}`,
				previous,
				context: input,
			};
			return reject(taqErr);
		}
	});

export const sendRes = (msg: string, newline = true) => {
	if (!msg || msg.length === 0) return;
	const output = newline ? msg + '\n' : msg;
	return process.stdout.write(output) as unknown as void;
};

export const sendAsyncRes = (msg: string, newline = true): Promise<void> => Promise.resolve(sendRes(msg, newline));

export const sendErr = (msg: string, newline = true) => {
	if (!msg || msg.length === 0) return;
	const output = newline ? msg + '\n' : msg;
	process.stderr.write(output);
	return output;
};

export const sendWarn = (msg: string, newline = true) => {
	if (!msg || msg.length === 0) return;
	const output = newline ? msg + '\n' : msg;
	process.stderr.write(output);
	return output;
};

export const sendAsyncErr = (msg: string, newline = true) => Promise.reject(sendErr(msg, newline)); // should this be Promise.reject?

export const sendJson = (msg: unknown, newline = true) => sendRes(JSON.stringify(msg), newline);

export const sendJsonErr = (msg: unknown, newline = true) => sendErr(JSON.stringify(msg), newline);

export const sendAsyncJson = (msg: unknown, newline = true) => sendAsyncRes(JSON.stringify(msg), newline);

export const sendAsyncJsonErr = (msg: unknown, newline = true) => sendAsyncErr(JSON.stringify(msg), newline);

export const sendJsonRes = <T>(data: T, messages?: { header?: string; footer?: string }) =>
	typeof data === 'object'
		? sendJson({
			data,
			render: 'table',
			messages,
		})
		: sendJson({
			data,
			render: 'string',
			messages,
		});

export const sendAsyncJsonRes = <T>(data: T) => Promise.resolve(sendJsonRes(data)).then(() => {});

export const noop = () => {};

const parseArgs = <T extends Protocol.RequestArgs.t>(unparsedArgs: string[]): LikeAPromise<T, TaqError> => {
	if (unparsedArgs && Array.isArray(unparsedArgs) && unparsedArgs.length >= 2) {
		try {
			const preprocessedArgs = preprocessArgs(unparsedArgs);
			const argv = yargs(preprocessedArgs.slice(2)).argv;
			const postprocessedArgs = postprocessArgs(argv);
			const formattedArgs = formatArgs(postprocessedArgs);
			const requestArgs = Protocol.RequestArgs.from(formattedArgs);
			return Promise.resolve(requestArgs as T);
		} catch (previous) {
			if (previous instanceof ZodError) {
				return eager(
					toFutureParseErr<T>(previous, 'The plugin request arguments are invalid', unparsedArgs),
				);
			}
			return eager(
				toFutureParseUnknownErr<T>(
					previous,
					'There was a problem trying to parse the plugin request arguments',
					unparsedArgs,
				),
			);
		}
	}
	return Promise.reject('Invalid usage. If you were testing your plugin, did you remember to specify --taqRun?');
};

// A workaround to protect all hex from being messed by yargs
const preprocessArgs = (args: string[]): string[] => {
	return args.map(arg => /^0x[0-9a-fA-F]+$/.test(arg) ? '___' + arg + '___' : arg);
};

export const getSelectedEnvironment = (
	args: { env: string | undefined; config: { environment: Record<string, unknown> } },
) =>
	args.env
		? args.env
		: (
			args.config.environment['default'] ?? 'development'
		);

const formatArgs = (args: Record<string, string>) => {
	const entries = Object.entries(args).map(
		([key, value]) => {
			if (key === 'config') return [key, JSON.parse(value)];
			else if (value === 'false') return [key, false];
			else if (value === 'true') return [key, true];
			return [key, value];
		},
	);

	const formatted = Object.fromEntries(entries);

	return {
		...formatted,
		env: getSelectedEnvironment(formatted),
	} as Record<string, unknown>;
};

// A workaround to protect all hex from being messed by yargs
const postprocessArgs = (args: typeof YArgs.argv): Record<string, string> => {
	const postprocessedArgs = Object.entries(args).map((
		[key, val],
	) => [
		key,
		typeof val === 'string' && /^___0x[0-9a-fA-F]+___$/.test(val)
			? val.slice(3, -3)
			: val,
	]);

	const groupedArgs = postprocessedArgs.reduce(
		(acc, arg) => {
			const key = arg[0];
			const val = arg[1];
			return { ...acc, [key]: val };
		},
		{},
	);

	return groupedArgs;
};

const parseSchema = <T extends Protocol.RequestArgs.t>(
	i18n: i18n,
	definer: pluginDefiner,
	defaultPluginName: string,
	requestArgs: T,
): PluginSchema.t => {
	const inputSchema: PluginSchema.RawPluginSchema = definer(requestArgs, i18n);

	const { proxy } = inputSchema;

	const pluginInfo = PluginSchema.create({
		...inputSchema,
		name: inputSchema.name ?? defaultPluginName,
	});

	return {
		...pluginInfo,
		proxy,
	};
};

const toProxableArgs = <T>(requestArgs: Protocol.RequestArgs.t, from: (input: unknown) => T): T => {
	const retval = Object.entries(requestArgs).reduce(
		(retval, [key, value]) => {
			if (key === 'projectDir') value = resolvePath(String(value).toString()) as Protocol.NonEmptyString.t;
			else if (typeof value === 'string') {
				if (value === 'true') value = true;
				else if (value === 'false') value = false;
				else if (key === 'config') value = JSON.parse(value);
			}

			const proxyArgs = {
				...retval,
				...Object.fromEntries([[key, value]]),
			};

			return proxyArgs;
		},
		{},
	);

	return from(retval);
};

const getResponse =
	<T extends Protocol.RequestArgs.t>(definer: pluginDefiner, defaultPluginName: string) => async (requestArgs: T) => {
		const { taqRun } = requestArgs;
		const i18n = await load();
		const schema = parseSchema(i18n, definer, defaultPluginName, requestArgs);
		try {
			switch (taqRun) {
				case 'pluginInfo': {
					const output = {
						...schema,
						templates: schema.templates
							? schema.templates.map(
								(template: Protocol.Template.t) => {
									const handler = typeof template.handler === 'function' ? 'function' : template.handler;
									return {
										...template,
										handler,
									};
								},
							)
							: [],
						tasks: schema.tasks
							? schema.tasks.map(
								(task: Protocol.Task.t) => {
									const handler = typeof task.handler === 'function' ? 'function' : task.handler;
									return {
										...task,
										handler,
									};
								},
							)
							: [],
						proxy: true,
						checkRuntimeDependencies: schema.checkRuntimeDependencies ? true : false,
						installRuntimeDependencies: schema.installRuntimeDependencies ? true : false,
					};
					return sendAsyncJson(output);
				}
				case 'proxy':
					if (schema.proxy) {
						return schema.proxy(toProxableArgs(requestArgs, Protocol.ProxyTaskArgs.from.bind(Protocol.ProxyTaskArgs)));
					}
					return Promise.reject({
						errCode: 'E_NOT_SUPPORTED',
						message: i18n.__('proxyNotSupported'),
						context: requestArgs,
					});
				case 'proxyTemplate': {
					const proxyArgs = toProxableArgs(
						requestArgs,
						Protocol.ProxyTemplateArgs.from.bind(Protocol.ProxyTemplateArgs),
					) as Protocol.ProxyTemplateArgs.t;
					const template = schema.templates?.find((tmpl: Protocol.Template.t) => tmpl.template === proxyArgs.template);
					if (template) {
						if (typeof template.handler === 'function') {
							return template.handler(proxyArgs);
						}
						return Promise.reject({
							errCode: 'E_NOT_SUPPORTED',
							message: i18n.__('proxyNotSupported'),
							context: requestArgs,
						});
					}
					return Promise.reject({
						errCode: 'E_INVALID_TEMPLATE',
						message: i18n.__('invalidTemplate'),
						context: requestArgs,
					});
				}
				case 'runPostInstall':
					if (schema.postInstall) {
						const schemaArg = shellEscape([JSON.stringify({
							name: schema.name ?? 'unknown',
							alias: schema.alias,
							version: schema.version,
							schema: schema.schema,
						})]);
						const result = await execCmd(`${schema.postInstall} ${schemaArg}`);
						if (result.stderr) {
							return sendAsyncErr('\n' + result.stderr);
						}
						return sendAsyncRes('\n' + result.stdout);
					}
					return Promise.resolve({});
					break;

				// case 'checkRuntimeDependencies':
				// 	return sendAsyncJson(
				// 		schema.checkRuntimeDependencies
				// 			? schema.checkRuntimeDependencies(requestArgs)
				// 			: Promise.resolve({ report: [] }),
				// 	);
				// case 'installRuntimeDependencies':
				// 	return sendAsyncJson(
				// 		schema.installRuntimeDependencies
				// 			? schema.installRuntimeDependencies(requestArgs)
				// 			: Promise.resolve({ report: [] }),
				// 	);
				default:
					return Promise.reject({
						errCode: 'E_NOT_SUPPORTED',
						message: i18n.__('actionNotSupported'),
						context: requestArgs,
					});
			}
		} catch (previous) {
			return Promise.reject({
				errCode: 'E_UNEXPECTED',
				message: 'The plugin encountered a fatal error',
				previous,
			});
		}
	};

const getNameFromPluginManifest = (packageJsonAbspath: string): string => {
	try {
		return `${require(packageJsonAbspath).name}`;
	} catch (_) {
		return getGeneratedPackageName(packageJsonAbspath);
	}
};

const getGeneratedPackageName = (packageJsonAbsPath: string) => {
	// Split the path into chunks. Pop off the chunk for the package.json file. Use the directory name as the plugin name.
	const chunks = packageJsonAbsPath.split('/');
	chunks.pop();
	return chunks.pop() ?? 'unknown-plugin';
};

/**
 * Gets the name of the current environment
 */
export const getCurrentEnvironment = (parsedArgs: Protocol.RequestArgs.t): string => {
	return parsedArgs.env
		? (parsedArgs.env as string)
		: (
			parsedArgs.config.environment
				? parsedArgs.config.environment.default as string
				: 'development'
		);
};

/**
 * Gets the name of the current environment
 */
/**
 * Gets the configuration for the current environment, if one is configured
 */
export const getCurrentEnvironmentConfig = (parsedArgs: Protocol.RequestArgs.t) => {
	const currentEnv = getCurrentEnvironment(parsedArgs);

	return parsedArgs.config.environment && parsedArgs.config.environment[currentEnv]
		? parsedArgs.config.environment[currentEnv] as Protocol.Environment.t | undefined
		: undefined;
};

/**
 * Gets the configuration for the project metadata
 */
export const getMetadataConfig = (parsedArgs: Protocol.RequestArgs.t) => () =>
	(parsedArgs.config.metadata ?? undefined) as Protocol.MetadataConfig.t | undefined;

/**
 * Gets the configuration for the named network
 */
export const getNetworkConfig = (parsedArgs: Protocol.RequestArgs.t) => (networkName: string) =>
	(parsedArgs.config.network![networkName] ?? undefined) as Protocol.NetworkConfig.t | undefined;

/**
 * Gets the configuration for the named sandbox
 */
export const getSandboxConfig =
	(parsedArgs: Protocol.RequestArgs.t) => (sandboxName: string): Protocol.SandboxConfig.t | undefined =>
		(parsedArgs.config.sandbox![sandboxName] ?? undefined) as Protocol.SandboxConfig.t | undefined;

/**
 * Gets the name of accounts for the given sandbox
 */
export const getSandboxAccountNames = (parsedArgs: Protocol.RequestArgs.t) => (sandboxName: string) => {
	const sandbox = getSandboxConfig(parsedArgs)(sandboxName);

	return sandbox
		? Object.keys(sandbox.accounts ?? []).filter(accountName => accountName !== 'default')
		: [];
};

/**
 * Gets the account config for the named account of the given sandbox
 */
export const getSandboxAccountConfig = (sandbox: Protocol.SandboxConfig.t, accountName: string) => {
	if (sandbox.accounts) {
		const accounts = sandbox.accounts as Record<string, Protocol.SandboxAccountConfig.t>;
		return accounts[accountName];
	}
	return undefined;
};

export const addTzExtensionIfMissing = (contractFilename: string) =>
	/\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`;

export const getArtifactsDir = (parsedArgs: Protocol.RequestArgs.t) => parsedArgs.config.artifactsDir ?? 'artifacts';

export const getContractsDir = (parsedArgs: Protocol.RequestArgs.t) => parsedArgs.config.contractsDir ?? 'contracts';

export const getContractContent = async (
	parsedArgs: Protocol.RequestArgs.t,
	contractFilename: string,
): Promise<string | undefined> => {
	const contractWithTzExtension = addTzExtensionIfMissing(contractFilename);
	const contractPath = join(parsedArgs.config.projectDir, getArtifactsDir(parsedArgs), contractWithTzExtension);
	try {
		const content = await readFile(contractPath, { encoding: 'utf-8' });
		return content;
	} catch (err) {
		sendErr(`Could not read ${contractPath}. Maybe it doesn't exist.\n`);
		return undefined;
	}
};

/**
 * Gets the parameter for the contract associated with the given parameter file
 */
export const getParameter = async (parsedArgs: Protocol.RequestArgs.t, paramFilename: string): Promise<string> => {
	const paramPath = join(parsedArgs.config.projectDir, parsedArgs.config.artifactsDir ?? 'artifacts', paramFilename);
	try {
		const content = await readFile(paramPath, { encoding: 'utf-8' });
		return content;
	} catch (err) {
		return sendAsyncErr(`Could not read ${paramPath}. Maybe it doesn't exist.`);
	}
};

/**
 * Update the alias of an address for the current environment
 */
/**
 * Update the alias of an address for the current environment
 */
export const updateAddressAlias = async (
	parsedArgs: Protocol.RequestArgs.t,
	alias: string,
	address: Protocol.NonEmptyString.t,
): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return;
	if (!env.aliases) {
		env.aliases = { [alias]: { address } };
	} else if (!env.aliases[alias]) {
		env.aliases[alias] = { address };
	} else {
		env.aliases[alias].address = address;
	}
	try {
		await writeJsonFile(parsedArgs.config.configFile)(parsedArgs.config);
	} catch (err) {
		sendErr(`Could not write to ${parsedArgs.config.configFile}\n`);
	}
};

export const getAddressOfAlias = async (
	env: Protocol.Environment.t,
	alias: string,
): Promise<string> => {
	const address = env.aliases?.[alias]?.address;
	if (!address) {
		return sendAsyncErr(
			`Address for alias "${alias}" is not present in the config.json. Make sure to deploy a contract with such alias.`,
		);
	}
	return address;
};

const createAddress = async (network: Protocol.NetworkConfig.t): Promise<TezosToolkit> => {
	const tezos = new TezosToolkit(network.rpcUrl as string);
	const keyBytes = Buffer.alloc(32);
	crypto.randomFillSync(keyBytes);
	const key = b58cencode(new Uint8Array(keyBytes), prefix[Prefix.P2SK]);
	await importKey(tezos, key);
	return tezos;
};

// TODO: This is a temporary solution before the environment refactor. Might be removed after this refactor
// Temporary solution before the environment refactor
export const getAccountPrivateKey = async (
	parsedArgs: Protocol.RequestArgs.t,
	network: Protocol.NetworkConfig.t | NonStrict.NetworkConfig,
	account: string,
): Promise<string> => {
	if (!network.accounts) network.accounts = {};

	if (!network.accounts[account] || !network.accounts[account].privateKey) {
		const mnemonic = network?.accounts?.[account]?.mnemonic ?? Bip39.generateMnemonic();
		const signer = InMemorySigner.fromMnemonic({ mnemonic });
		const tezos = new TezosToolkit(network.rpcUrl as string);
		tezos.setSignerProvider(signer);

		const publicKey = Protocol.NonEmptyString.create(await tezos.signer.publicKey());
		const publicKeyHash = Protocol.PublicKeyHash.create(await tezos.signer.publicKeyHash());
		const privateKey = Protocol.NonEmptyString.create(await tezos.signer.secretKey() ?? '');
		if (!privateKey) return sendAsyncErr('The private key must exist after creating it');
		network.accounts[account] = Protocol.NetworkAccountConfig.create({
			publicKey,
			publicKeyHash,
			privateKey,
			mnemonic,
		});

		try {
			await writeJsonFile('./.taq/config.json')(parsedArgs.config);
		} catch (err) {
			return sendAsyncErr(`Could not write to ./.taq/config.json\n`);
		}

		if (account === TAQ_OPERATOR_ACCOUNT) {
			return sendAsyncErr(
				`A keypair with public key hash ${
					network.accounts[account].publicKeyHash
				} was generated for you.\nTo fund this account:\n1. Go to https://teztnets.xyz and click "Faucet" of the target testnet\n2. Copy and paste the above key into the wallet address field\n3. Request some Tez (Note that you might need to wait for a few seconds for the network to register the funds)`,
			);
		}
	}

	const privateKey = network.accounts[account].privateKey;
	if (!privateKey) return sendAsyncErr('The private key must exist after creating it');
	return privateKey;
};

export const getDockerImage = (defaultImageName: string, envVarName: string): string =>
	process.env[envVarName] ?? defaultImageName;

/**
 * Gets the default account associated with a sandbox
 * TODO: Replace with Taq Operator Account
 */
export const getDefaultSandboxAccount = (sandbox: Protocol.SandboxConfig.t) => {
	const accounts = sandbox.accounts ?? {};
	const defaultAccount = accounts['default'] as string | undefined;
	if (defaultAccount) return getSandboxAccountConfig(sandbox, defaultAccount);
	return undefined;
};

export const getContracts = (regex: RegExp, config: Protocol.LoadedConfig.t) => {
	if (!config.contracts) return [];
	return Object.entries(config.contracts).reduce<string[]>(
		(retval, [_, contract]) => {
			if (
				contract && typeof contract === 'object' && 'sourceFile' in contract && typeof contract.sourceFile === 'string'
			) {
				return regex.test(contract.sourceFile)
					? [...retval, contract.sourceFile]
					: retval;
			}
			return retval;
		},
		[],
	);
};

export const joinPaths = (...paths: string[]): string => paths.join('/');
export const stringToSHA256 = (s: string) => SHA256.toSHA256(s);

const getPackageName = () => {
	const stack = getSync({
		filter: (stackFrame => {
			const filename = stackFrame.getFileName();
			return !filename.includes('taqueria-sdk') && !filename.includes('@taqueria/node-sdk')
				&& !filename.includes('stacktrace-js');
		}),
	});
	const frame = stack.shift();
	if (frame) {
		const filename = frame.getFileName().replace(/^file:\/\//, '').replace(/^file:/, '');
		const pluginManifest = join(dirname(filename), 'package.json');
		return getNameFromPluginManifest(pluginManifest);
	}
	return getGeneratedPackageName('');
};

export const isTaqError = (err: unknown): err is TaqError => {
	return (err as TaqError).kind !== undefined;
};

// Creates a writable stream that sanitizes the data being written to the stream
// We then create a new console that uses this stream for stderr
const sanitizedStderrWriter = () => {
	const stream = require('stream');
	const { Console } = require('console');
	const writable = stream.Writable({
		write(chunk: Buffer, _encoding: string, next: () => void) {
			console.error(chunk.toString('utf8').replaceAll(/("[^"]+key\"):("[^"]+\")/gi, `$1:"[hidden]"`));
			next();
		},
	});
	return new Console(process.stdout, writable);
};

// Outputs the error using console.error (so that the error is formatted) but
// uses a custom writable stream that sanitizes the data first
const outputSanitizedErr = (err: unknown) => {
	const console = sanitizedStderrWriter();
	console.error(err);
};

export const Plugin = {
	create: <Args extends Protocol.RequestArgs.t>(definer: pluginDefiner, unparsedArgs: string[]) => {
		const packageName = getPackageName();
		return parseArgs<Args>(unparsedArgs)
			.then(getResponse(definer, packageName))
			.catch((err: unknown) => {
				if (err) {
					const debug = unparsedArgs.join(',').includes(['--debug', true].join(','));

					// Handle Zod parsing errors
					if (isTaqError(err) && err.kind === 'E_PARSE' && err.previous && err.previous instanceof ZodError) {
						const msgs: string[] = err.previous.errors.reduce(
							(retval, issue) => {
								const path = issue.path.join(' → ');
								const msg = `  ${path}: ${issue.message}`;
								return [...retval, msg];
							},
							[`Taqueria tried to send data to ${packageName} that it couldn't parse or understand. This is most likely due to the version of the plugin being out-of-date and incompatible with the CLI or vice versa. More details:`],
						);
						console.error(msgs.join('\n') + '\n');
					} // Handle simple string errors
					else if (typeof err === 'string') console.error(err);
					// Handle edge cases
					else if (!debug && typeof (err) !== 'boolean') {
						console.error(`${packageName} encountered an unexpected problem. Use --debug to learn more.`);
					}

					// Show the entire err if the debug flag is provided
					if (debug) {
						outputSanitizedErr(err);
					}
				}
				process.exit(1);
			});
	},
};

export const isContractFile = (filename: string): boolean => {
	return !filename.includes('.default_storage.')
		&& !filename.includes('.storage.')
		&& !filename.includes('.parameter.')
		&& !filename.includes('.expression.');
};
