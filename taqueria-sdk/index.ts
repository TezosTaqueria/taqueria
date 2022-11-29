export * from '@taqueria/protocol/types';
import * as Protocol from '@taqueria/protocol';
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
export { Protocol };
import type { i18n } from '@taqueria/protocol/i18n';
import load from '@taqueria/protocol/i18n';
import * as SHA256 from '@taqueria/protocol/SHA256';
import { E_TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import type { TaqError } from '@taqueria/protocol/TaqError';
import * as NonStrict from '@taqueria/protocol/types';
import { exec, ExecException, spawn } from 'child_process';
import { FutureInstance as Future, mapRej, promise } from 'fluture';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join, resolve as resolvePath } from 'path';
import { getSync } from 'stacktrace-js';
import { ZodError } from 'zod';
import { LikeAPromise, pluginDefiner, PluginSchema, StdIO } from './types';

import { importKey } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { b58cencode, Prefix, prefix } from '@taquito/utils';
import crypto from 'crypto';
import generateName from 'project-name-generator';

// To use esbuild with yargs, we can't use ESM: https://github.com/yargs/yargs/issues/1929
const yargs = require('yargs');
export const TAQ_OPERATOR_ACCOUNT = 'taqOperatorAccount';

export type CmdArgEnv = [string, string[], { [key: string]: string }];

export const eager = <T>(f: Future<TaqError, T>) =>
	promise(
		mapRej((err: TaqError) => new E_TaqError(err))(f),
	);

export const writeJsonFile = <T>(filename: string) =>
	(data: T): Promise<string> =>
		writeFile(filename, JSON.stringify(data, undefined, 4), { encoding: 'utf8' })
			.then(_ => filename);

export const readJsonFile = <T>(filename: string): Promise<T> =>
	readFile(filename, { encoding: 'utf-8' })
		.then(JSON.parse)
		.then(result => (result as T));

export const execCmd = (cmd: string): LikeAPromise<StdIO, ExecException> =>
	new Promise((resolve, reject) => {
		// Escape quotes in the command, given that we're wrapping in quotes
		const escapedCmd = cmd.replaceAll(/"/gm, '\\"');
		exec(`sh -c "${escapedCmd}"`, (err, stdout, stderr) => {
			if (err) reject(err);
			else {
				resolve({
					stdout,
					stderr,
				});
			}
		});
	});

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

export const spawnCmd = (fullCmd: CmdArgEnv): Promise<number | null> =>
	new Promise((resolve, reject) => {
		const cmd = fullCmd[0];
		const args = fullCmd[1];
		const envVars = fullCmd[2];
		const child = spawn(cmd, args, { env: { ...process.env, ...envVars }, stdio: 'inherit' });
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
			const err: TaqError = ({
				kind: 'E_INVALID_ARCH',
				msg: `The ${process.arch} architecture is not supported at this time.`,
				context: process.arch,
			});
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
	return newline
		? console.log(msg)
		: process.stdout.write(msg) as unknown as void;
};

export const sendAsyncRes = (msg: string, newline = true): Promise<void> => Promise.resolve(sendRes(msg, newline));

export const sendErr = (msg: string, newline = true) => {
	if (!msg || msg.length === 0) return;
	return newline
		? console.error(msg)
		: process.stderr.write(msg) as unknown as void;
};

export const sendWarn = (msg: string, newline = true) => {
	if (!msg || msg.length === 0) return;
	return newline
		? console.warn(msg)
		: process.stderr.write(msg) as unknown as void;
};

export const sendAsyncErr = (msg: string, newline = true) => Promise.reject(sendErr(msg, newline)); // should this be Promise.reject?

export const sendJson = (msg: unknown, newline = true) => sendRes(JSON.stringify(msg), newline);

export const sendJsonErr = (msg: unknown, newline = true) => sendErr(JSON.stringify(msg), newline);

export const sendAsyncJson = (msg: unknown, newline = true) => sendAsyncRes(JSON.stringify(msg), newline);

export const sendAsyncJsonErr = (msg: unknown, newline = true) => sendAsyncErr(JSON.stringify(msg), newline);

export const sendJsonRes = <T>(data: T) =>
	typeof data === 'object'
		? sendJson({
			data,
			render: 'table',
		})
		: sendJson({
			data,
			render: 'string',
		});

export const sendAsyncJsonRes = <T>(data: T) => Promise.resolve(sendJsonRes(data));

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

// A hack to protect all hex from being messed by yargs
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
			if (value === 'false' || value === 'true') return [key, Boolean(value)];
			return [key, value];
		},
	);

	const formatted = Object.fromEntries(entries);

	return {
		...formatted,
		env: getSelectedEnvironment(formatted),
	} as Record<string, unknown>;
};

// A hack to protect all hex from being messed by yargs
const postprocessArgs = (args: string[]): Record<string, string> => {
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

const toProxableArgs = <T>(requestArgs: Protocol.RequestArgs.t, from: (input: unknown) => T) => {
	const retval = Object.entries(requestArgs).reduce(
		(retval, [key, value]) => {
			if (key === 'projectDir') value = resolvePath(value.toString()) as Protocol.NonEmptyString.t;
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

const getResponse = <T extends Protocol.RequestArgs.t>(definer: pluginDefiner, defaultPluginName: string) =>
	async (requestArgs: T) => {
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
					);
					const template = schema.templates?.find(tmpl => tmpl.template === proxyArgs.template);
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
		return generateName().dashed;
	}
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
export const getMetadataConfig = (parsedArgs: Protocol.RequestArgs.t) =>
	() => (parsedArgs.config.metadata ?? undefined) as Protocol.MetadataConfig.t | undefined;

/**
 * Gets the configuration for the named network
 */
export const getNetworkConfig = (parsedArgs: Protocol.RequestArgs.t) =>
	(networkName: string) =>
		(parsedArgs.config.network![networkName] ?? undefined) as Protocol.NetworkConfig.t | undefined;

/**
 * Gets the configuration for the named sandbox
 */
export const getSandboxConfig = (parsedArgs: Protocol.RequestArgs.t) =>
	(sandboxName: string): Protocol.SandboxConfig.t | undefined =>
		(parsedArgs.config.sandbox![sandboxName] ?? undefined) as Protocol.SandboxConfig.t | undefined;

/**
 * Gets the name of accounts for the given sandbox
 */
export const getSandboxAccountNames = (parsedArgs: Protocol.RequestArgs.t) =>
	(sandboxName: string) => {
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
		await writeJsonFile('./.taq/config.json')(parsedArgs.config);
	} catch (err) {
		sendErr(`Could not write to ./.taq/config.json\n`);
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
	network: Protocol.NetworkConfig.t,
	account: string,
): Promise<string> => {
	if (!network.accounts) network.accounts = {};
	if (!network.accounts[account]) {
		const tezos = await createAddress(network);
		const publicKey = await tezos.signer.publicKey();
		const publicKeyHash = await tezos.signer.publicKeyHash();
		const privateKey = await tezos.signer.secretKey();
		if (!privateKey) return sendAsyncErr('The private key must exist after creating it');
		network.accounts[account] = { publicKey, publicKeyHash, privateKey };
		try {
			await writeJsonFile('./.taq/config.json')(parsedArgs.config);
		} catch (err) {
			return sendAsyncErr(`Could not write to ./.taq/config.json\n`);
		}
		return sendAsyncErr(
			`A keypair with public key hash ${
				network.accounts[account].publicKeyHash
			} was generated for you.\nTo fund this account:\n1. Go to https://teztnets.xyz and click "Faucet" of the target testnet\n2. Copy and paste the above key into the 'wallet address field\n3. Request some Tez (Note that you might need to wait for a few seconds for the network to register the funds)`,
		);
	}
	return network.accounts[account].privateKey as string;
};

export const getDockerImage = (defaultImageName: string, envVarName: string): string =>
	process.env[envVarName] ?? defaultImageName;

/**
 * Gets the default account associated with a sandbox
 */
export const getDefaultSandboxAccount = (sandbox: Protocol.SandboxConfig.t) => {
	const accounts = sandbox.accounts ?? {};
	const defaultAccount = accounts['default'] as string | undefined;
	if (defaultAccount) return getSandboxAccountConfig(sandbox, defaultAccount);
	return undefined;
};

export const getContracts = (regex: RegExp, config: Protocol.LoadedConfig.t) => {
	if (!config.contracts) return [];
	return Object.values(config.contracts).reduce(
		(retval: string[], contract) =>
			regex.test(contract.sourceFile)
				? [...retval, contract.sourceFile]
				: retval,
		[],
	);
};

const joinPaths = (...paths: string[]): string => paths.join('/');

const newContract = async (sourceFile: string, parsedArgs: Protocol.RequestArgs.t) => {
	const contractPath = joinPaths(parsedArgs.projectDir, getContractsDir(parsedArgs), sourceFile);
	try {
		const contents = await readFile(contractPath, { encoding: 'utf-8' });
		const hash = await SHA256.toSHA256(contents);
		return await eager(Protocol.Contract.of({
			sourceFile,
			hash,
		}));
	} catch (err) {
		await Promise.reject(`Could not read ${contractPath}`);
	}
};

const registerContract = async (parsedArgs: Protocol.RequestArgs.t, sourceFile: string): Promise<void> => {
	try {
		const config = await readJsonFile<Protocol.Config.t>(parsedArgs.config.configFile);
		if (config.contracts && config.contracts[sourceFile]) {
			await sendAsyncErr(`${sourceFile} has already been registered`);
		} else {
			const contract = await newContract(sourceFile, parsedArgs);
			const contracts = config.contracts || {};
			const updatedConfig = {
				...config,
				contracts: {
					...contracts,
					...Object.fromEntries([[sourceFile, contract]]),
				},
			};
			await writeJsonFile(parsedArgs.config.configFile)(updatedConfig);
		}
	} catch (err) {
		if (err) console.error('Error registering contract:', err);
	}
};

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
	return generateName().dashed;
};

export const Plugin = {
	create: async <Args extends Protocol.RequestArgs.t>(definer: pluginDefiner, unparsedArgs: string[]) => {
		const packageName = getPackageName();
		return parseArgs<Args>(unparsedArgs)
			.then(getResponse(definer, packageName))
			.catch((err: unknown) => {
				if (err) console.error(err);
				process.exit(1);
			});
	},
};

export const experimental = {
	registerContract,
};
