export * from '@taqueria/protocol/types/types';
import { RequestArgs } from '@taqueria/node-sdk';
import * as Strict from '@taqueria/protocol/types/out/types-strict';
import * as NonStrict from '@taqueria/protocol/types/types';
export { NonEmptyString, Option, PositionalArg, Task, Template } from '@taqueria/protocol/types';
export * as Protocol from '@taqueria/protocol/types/out/types-strict';
import * as Config from '@taqueria/protocol/Config';
import * as ConfigArtifactsDir from '@taqueria/protocol/ConfigArtifactsDir';
import * as ConfigContractsDir from '@taqueria/protocol/ConfigContractsDir';
import * as Contract from '@taqueria/protocol/Contract';
import * as Environment from '@taqueria/protocol/Environment';
import type { i18n } from '@taqueria/protocol/i18n';
import load from '@taqueria/protocol/i18n';
import * as LoadedConfig from '@taqueria/protocol/LoadedConfig';
import * as MetadataConfig from '@taqueria/protocol/MetadataConfig';
import * as NetworkConfig from '@taqueria/protocol/NetworkConfig';
import * as Operation from '@taqueria/protocol/Operation';
import * as Option from '@taqueria/protocol/Option';
import * as PersistentState from '@taqueria/protocol/PersistentState';
import * as PositionalArg from '@taqueria/protocol/PositionalArg';
import * as ProxyTaskArgs from '@taqueria/protocol/ProxyTaskArgs';
import * as ProxyTemplateArgs from '@taqueria/protocol/ProxyTemplateArgs';
import * as SandboxAccountConfig from '@taqueria/protocol/SandboxAccountConfig';
import * as SandboxConfig from '@taqueria/protocol/SandboxConfig';
import * as SHA256 from '@taqueria/protocol/SHA256';
import { E_TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import type { TaqError } from '@taqueria/protocol/TaqError';
import * as Task from '@taqueria/protocol/Task';
import * as Template from '@taqueria/protocol/Template';
import { exec, ExecException } from 'child_process';
import { FutureInstance as Future, mapRej, promise } from 'fluture';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join, resolve as resolvePath } from 'path';
import { getSync } from 'stacktrace-js';
import { ZodError } from 'zod';
import { PluginSchema } from './types';
import { LikeAPromise, pluginDefiner, StdIO } from './types';

import { importKey } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { b58cencode, Prefix, prefix } from '@taquito/utils';
import crypto from 'crypto';

// @ts-ignore interop issue. Maybe find a different library later
import * as NonEmptyString from '@taqueria/protocol/NonEmptyString';
import { templateRawSchema } from '@taqueria/protocol/SanitizedArgs';
import fetch from 'node-fetch';
import generateName from 'project-name-generator';
import { parsed } from 'yargs';

// To use esbuild with yargs, we can't use ESM: https://github.com/yargs/yargs/issues/1929
const yargs = require('yargs');

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
		exec(`sh -c "${cmd}"`, (err, stdout, stderr) => {
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

export const getArch = (): LikeAPromise<'linux/arm64/v8' | 'linux/amd64', TaqError> => {
	switch (process.arch) {
		case 'arm64':
			return Promise.resolve('linux/arm64/v8');
		// @ts-ignore: x32 is valid for some versions of NodeJS
		case 'x32':
		case 'x64':
			return Promise.resolve('linux/amd64');
		default:
			return Promise.reject({
				errCode: 'E_INVALID_ARCH',
				errMsg: `We do not know how to handle the ${process.arch} architecture`,
				context: process.arch,
			});
	}
};

export const getFlextesaImage = (arch: 'linux/arm64/v8' | 'linux/amd64'): string =>
	arch === 'linux/arm64/v8' ? 'oxheadalpha/flextesa:rc-20220915-arm64' : 'oxheadalpha/flextesa:20220715';

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

const parseArgs = <T extends RequestArgs>(unparsedArgs: string[]): LikeAPromise<T, TaqError> => {
	if (unparsedArgs && Array.isArray(unparsedArgs) && unparsedArgs.length >= 2) {
		try {
			const preprocessedArgs = preprocessArgs(unparsedArgs);
			const argv = yargs(preprocessedArgs.slice(2)).argv;
			const postprocessedArgs = postprocessArgs(argv);
			const requestArgs = postprocessedArgs;
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

// A hack to protect all hex from being messed by yargs
const postprocessArgs = (args: string[]): Record<string, unknown> => {
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

const parseSchema = <T extends RequestArgs>(
	i18n: i18n,
	definer: pluginDefiner,
	defaultPluginName: string,
	requestArgs: T,
): PluginSchema.t => {
	const inputSchema: PluginSchema.RawPluginSchema = definer(requestArgs, i18n);

	const { proxy } = inputSchema;

	return PluginSchema.create({
		...inputSchema,
		name: inputSchema.name ? inputSchema.name : defaultPluginName,
		proxy,
	}) as PluginSchema.t;
};

const toProxableArgs = <T>(requestArgs: RequestArgs, from: (input: unknown) => T) => {
	const retval = Object.entries(requestArgs).reduce(
		(retval, [key, value]) => {
			if (key === 'projectDir') value = resolvePath(value.toString());
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

const getResponse = <T extends RequestArgs>(definer: pluginDefiner, defaultPluginName: string) =>
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
								(template: Template.t) => {
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
								(task: Task.t) => {
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
						return schema.proxy(toProxableArgs(requestArgs, ProxyTaskArgs.from.bind(ProxyTaskArgs)));
					}
					return Promise.reject({
						errCode: 'E_NOT_SUPPORTED',
						message: i18n.__('proxyNotSupported'),
						context: requestArgs,
					});
				case 'proxyTemplate': {
					const proxyArgs = toProxableArgs(requestArgs, ProxyTemplateArgs.from.bind(ProxyTemplateArgs));
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
export const getCurrentEnvironment = (parsedArgs: RequestArgs): string => {
	return parsedArgs.env
		? (parsedArgs.env as string)
		: (
			parsedArgs.config.environment
				? parsedArgs.config.environment.default as string
				: 'development'
		);
};

/**
 * Gets the configuration for the current environment, if one is configured
 */
export const getCurrentEnvironmentConfig = (parsedArgs: RequestArgs) => {
	const currentEnv = getCurrentEnvironment(parsedArgs);

	return parsedArgs.config.environment && parsedArgs.config.environment[currentEnv]
		? parsedArgs.config.environment[currentEnv] as Environment.t | undefined
		: undefined;
};

/**
 * Gets the configuration for the project metadata
 */
export const getMetadataConfig = (parsedArgs: RequestArgs) =>
	() => (parsedArgs.config.metadata ?? undefined) as MetadataConfig.t | undefined;

/**
 * Gets the configuration for the named network
 */
export const getNetworkConfig = (parsedArgs: RequestArgs) =>
	(networkName: string) => (parsedArgs.config.network![networkName] ?? undefined) as NetworkConfig.t | undefined;

/**
 * Gets the configuration for the named sandbox
 */
export const getSandboxConfig = (parsedArgs: RequestArgs) =>
	(sandboxName: string): SandboxConfig.t | undefined =>
		(parsedArgs.config.sandbox![sandboxName] ?? undefined) as SandboxConfig.t | undefined;

/**
 * Gets the name of accounts for the given sandbox
 */
export const getSandboxAccountNames = (parsedArgs: RequestArgs) =>
	(sandboxName: string) => {
		const sandbox = getSandboxConfig(parsedArgs)(sandboxName);

		return sandbox
			? Object.keys(sandbox.accounts ?? []).filter(accountName => accountName !== 'default')
			: [];
	};

/**
 * Gets the account config for the named account of the given sandbox
 */
export const getSandboxAccountConfig = (parsedArgs: RequestArgs) =>
	(sandboxName: string) =>
		(accountName: string) => {
			const sandbox = getSandboxConfig(parsedArgs)(sandboxName);

			if (sandbox && sandbox.accounts) {
				const accounts = sandbox.accounts as Record<string, SandboxAccountConfig.t>;
				return accounts[accountName];
			}
			return undefined;
		};

/**
 * Gets the initial storage for the contract. TODO: replace all calls to this function with newGetInitialStorage
 */
export const getInitialStorage = async (parsedArgs: RequestArgs, contractFilename: string) => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (env && env.storage && env.storage[contractFilename]) {
		const storagePath: string = env.storage[contractFilename];
		try {
			const content = await readFile(storagePath, { encoding: 'utf-8' });
			return content;
		} catch (err) {
			sendErr(`Could not read ${storagePath}. Maybe it doesn't exist.\n`);
			return undefined;
		}
	}
	return undefined;
};

/**
 * Gets the initial storage for the contract. TODO: replace all calls to this function with newGetInitialStorage
 */
export const newGetInitialStorage = async (
	parsedArgs: RequestArgs,
	storageFilename: string | undefined,
): Promise<string | undefined> => {
	const storagePath = join(
		parsedArgs.config.projectDir,
		parsedArgs.config.artifactsDir ?? 'artifacts',
		storageFilename ?? '',
	);
	try {
		const content = await readFile(storagePath, { encoding: 'utf-8' });
		return content;
	} catch (err) {
		sendErr(`Could not read ${storagePath}. Maybe it doesn't exist.\n`);
		return undefined;
	}
};

export const getParameter = async (parsedArgs: RequestArgs, paramFilename: string): Promise<string> => {
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
export const updateAddressAlias = async (
	parsedArgs: RequestArgs,
	alias: string,
	address: NonEmptyString.t,
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
	env: Environment.t,
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

const createAddress = async (network: NetworkConfig.t): Promise<TezosToolkit> => {
	const tezos = new TezosToolkit(network.rpcUrl as string);
	const keyBytes = Buffer.alloc(32);
	crypto.randomFillSync(keyBytes);
	const key = b58cencode(new Uint8Array(keyBytes), prefix[Prefix.P2SK]);
	await importKey(tezos, key);
	return tezos;
};

// Temporary solution before the environment refactor
export const getAccountPrivateKey = async (
	parsedArgs: RequestArgs,
	network: NetworkConfig.t,
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

/**
 * Gets the default account associated with a sandbox
 */
export const getDefaultAccount = (parsedArgs: RequestArgs) =>
	(sandboxName: string) => {
		const sandboxConfig = getSandboxConfig(parsedArgs)(sandboxName);
		if (sandboxConfig) {
			const accounts = sandboxConfig.accounts ?? {};
			const defaultAccount = accounts['default'] as string | undefined;
			if (defaultAccount) {
				return getSandboxAccountConfig(parsedArgs)(sandboxName)(defaultAccount);
			}
		}

		return undefined;
	};

export const getContracts = (regex: RegExp, config: NonStrict.LoadedConfig) => {
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

const newContract = async (sourceFile: string, parsedArgs: RequestArgs) => {
	const contractPath = joinPaths(parsedArgs.projectDir, parsedArgs.config.contractsDir ?? 'contracts', sourceFile);
	try {
		const contents = await readFile(contractPath, { encoding: 'utf-8' });
		const hash = await SHA256.toSHA256(contents);
		return await eager(Contract.of({
			sourceFile,
			hash,
		}));
	} catch (err) {
		await Promise.reject(`Could not read ${contractPath}`);
	}
};

const registerContract = async (parsedArgs: RequestArgs, sourceFile: string): Promise<void> => {
	try {
		const config = await readJsonFile<Config.t>(parsedArgs.config.configFile);
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
	create: async <Args extends RequestArgs>(definer: pluginDefiner, unparsedArgs: string[]) => {
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
