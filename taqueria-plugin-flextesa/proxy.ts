import {
	execCmd,
	getArch,
	readJsonFile,
	sendAsyncErr,
	sendAsyncRes,
	sendErr,
	sendJsonRes,
	sendRes,
	stringToSHA256,
	writeJsonFile,
} from '@taqueria/node-sdk';
import {
	LikeAPromise,
	Protocol,
	RequestArgs,
	SandboxAccountConfig,
	SandboxConfig,
	StdIO,
} from '@taqueria/node-sdk/types';
import { Config, SanitizedArgs, TaqError } from '@taqueria/protocol/taqueria-protocol-types';
import retry from 'async-retry';
import type { ExecException } from 'child_process';
import { getPortPromise } from 'portfinder';

const { Url } = Protocol;

interface Opts extends RequestArgs.ProxyRequestArgs {
	sandboxName?: string;
}

const getDockerImage = (opts: Opts) => `ghcr.io/ecadlabs/taqueria-flextesa:${opts.setVersion}-${opts.setBuild}`;

const getUniqueSandboxname = async (sandboxName: string, projectDir: string) => {
	const hash = await stringToSHA256(projectDir);
	return `${sandboxName}-${hash}`;
};

const getContainerName = async (sandboxName: string, parsedArgs: Opts) => {
	const uniqueSandboxName = await getUniqueSandboxname(sandboxName, parsedArgs.projectDir);
	return `taqueria-${parsedArgs.env}-${uniqueSandboxName}`;
};

const getNewPortIfPortInUse = async (port: string): Promise<string> => {
	const newPort = await getPortPromise({ port: parseInt(port) });
	return newPort.toString();
};

const replaceRpcUrlInConfig = async (newPort: string, oldUrl: string, sandboxName: string, opts: Opts) => {
	const newUrl = oldUrl.replace(/:\d+/, ':' + newPort);
	const config = await readJsonFile<Config.t>(opts.config.configFile);
	const sandbox = config.sandbox;
	const sandboxConfig = sandbox ? sandbox[sandboxName] : undefined;
	if (sandboxConfig === undefined) return;
	const updatedConfig = {
		...config,
		sandbox: {
			...sandbox,
			[sandboxName]: {
				...(sandboxConfig as object),
				rpcUrl: newUrl,
			},
		},
	};
	await writeJsonFile(opts.config.configFile)(updatedConfig);
};

const getStartCommand = async (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts) => {
	const port = Url.toComponents(sandbox.rpcUrl).port;
	const newPort = await getNewPortIfPortInUse(port);
	if (newPort !== port) {
		console.log(
			`${port} is already in use, ${newPort} will be used for ${sandboxName} instead and .taq/config.json will be updated to reflect this.`,
		);
		await replaceRpcUrlInConfig(newPort, sandbox.rpcUrl.toString(), sandboxName, opts);
	}
	const ports = `-p ${newPort}:20000`;

	const containerName = await getContainerName(sandboxName, opts);
	const arch = await getArch();
	const image = getDockerImage(opts);
	const projectDir = process.env.PROJECT_DIR ?? opts.config.projectDir;

	return `docker run --name ${containerName} --rm --detach --platform ${arch} ${ports} -v ${projectDir}:/project -w /app ${image} node index.js --sandbox ${sandboxName}`;
};

const getConfigureCommand = async (sandboxName: string, opts: Opts): Promise<string> => {
	const containerName = await getContainerName(sandboxName, opts);
	return `docker exec ${containerName} node index.js --sandbox ${sandboxName} --configure`;
};

const getImportAccountsCommand = async (sandboxName: string, opts: Opts): Promise<string> => {
	const containerName = await getContainerName(sandboxName, opts);
	return `docker exec ${containerName} node index.js --sandbox ${sandboxName} --importAccounts`;
};

const doesUseFlextesa = (sandbox: SandboxConfig.t) => !sandbox.plugin || sandbox.plugin === 'flextesa';

const doesNotUseFlextesa = (sandbox: SandboxConfig.t) => !doesUseFlextesa(sandbox);

const startInstance = (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts): Promise<void> => {
	if (doesNotUseFlextesa(sandbox)) {
		return sendAsyncErr(`Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`);
	}

	return isSandboxRunning(sandboxName, opts)
		.then(
			running =>
				running
					? sendAsyncRes('Already running.')
					: getStartCommand(sandboxName, sandbox, opts)
						.then(cmd => {
							console.log('Booting sandbox...');
							return execCmd(cmd);
						})
						.then(() => {
							console.log('Configuring sandbox...');
							return configureTezosClient(sandboxName, opts);
						})
						.then(({ stderr }) => {
							if (stderr.length) sendErr(stderr);
							console.log('Adding accounts...');
							return importAccounts(sandboxName, opts);
						})
						.then(({ stderr }) => {
							if (stderr.length) sendErr(stderr);
							sendAsyncRes(`Started ${sandboxName}.`);
						}),
		);
};

const configureTezosClient = (sandboxName: string, opts: Opts): Promise<StdIO> =>
	retry(
		() =>
			getConfigureCommand(sandboxName, opts)
				.then(execCmd)
				.then(({ stderr, stdout }) => {
					if (stderr.length) return Promise.reject(stderr);
					return ({ stderr, stdout });
				}),
	);

const importAccounts = (sandboxName: string, opts: Opts): Promise<StdIO> =>
	retry(
		() =>
			getImportAccountsCommand(sandboxName, opts)
				.then(execCmd)
				.then(({ stderr, stdout }) => {
					if (stderr.length) {
						return Promise.reject(stderr);
					}
					return ({ stderr, stdout });
				})
				.catch(stderr => {
					return Promise.reject(
						`There was a problem trying to import accounts into tezos-client for the sandbox: ${stderr}`,
					);
				}),
	);

const startAll = (opts: Opts): Promise<void> => {
	if (opts.config.sandbox === undefined) return sendAsyncErr('No sandboxes configured to start');

	const processes = Object.entries(opts.config.sandbox).reduce(
		(retval, [sandboxName, sandboxDetails]) => {
			if (sandboxName === 'default') return retval;
			return [...retval, startInstance(sandboxName, sandboxDetails as SandboxConfig.t, opts)];
		},
		[] as Promise<void>[],
	);

	return Promise.all(processes).then(_ => sendAsyncRes('Done.'));
};

const getSandbox = ({ sandboxName, config }: Opts) => {
	if (sandboxName && config.sandbox && config.sandbox[sandboxName]) {
		const sandboxConfig = config.sandbox![sandboxName] as SandboxConfig.t;
		return sandboxConfig;
	}
	return undefined;
};

const startSandboxTask = (parsedArgs: Opts): LikeAPromise<void, TaqError.t> => {
	if (parsedArgs.sandboxName) {
		const sandbox = getSandbox(parsedArgs);
		return sandbox
			? startInstance(parsedArgs.sandboxName, sandbox, parsedArgs)
			: sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`);
	}
	return startAll(parsedArgs);
};

const isSandboxRunning = (sandboxName: string, opts: Opts) => {
	return getContainerName(sandboxName, opts)
		.then(containerName => execCmd(`docker ps --filter name=${containerName} | grep -w ${containerName}`))
		.then(_ => true)
		.catch(_ => false);
};

type AccountBalance = { account: string; balance: string; address: string | undefined };
const getAccountBalances = (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts): Promise<AccountBalance[]> => {
	const processes = Object.entries(sandbox.accounts ?? {}).reduce(
		(retval: Promise<AccountBalance>[], [accountName, accountDetails]) => {
			if (accountName === 'default') return retval;

			const getBalanceProcess = getArch()
				.then(_ => getContainerName(sandboxName, opts))
				.then(containerName => `docker exec ${containerName} tezos-client get balance for ${accountName.trim()}`)
				.then(execCmd)
				.then(({ stdout, stderr }) => {
					if (stderr.length > 0) sendErr(stderr);
					return {
						account: accountName,
						balance: stdout.trim(),
						address: (accountDetails as SandboxAccountConfig.t).publicKeyHash,
					};
				})
				.catch((err: ExecException) => {
					sendErr(err.message);
					return {
						account: accountName,
						balance: 'Error',
						address: (accountDetails as SandboxAccountConfig.t).publicKeyHash,
					};
				});
			return [...retval, getBalanceProcess];
		},
		[],
	);

	return Promise.all(processes);
};

const listAccountsTask = async <T>(parsedArgs: Opts): Promise<void> => {
	if (parsedArgs.sandboxName) {
		const sandbox = getSandbox(parsedArgs);
		if (sandbox) {
			if (doesUseFlextesa(sandbox)) {
				return await isSandboxRunning(parsedArgs.sandboxName, parsedArgs)
					? getAccountBalances(parsedArgs.sandboxName, sandbox, parsedArgs)
						.then(sendJsonRes)
					: sendAsyncErr(`The ${parsedArgs.sandboxName} sandbox is not running.`);
			}
			return sendAsyncErr(
				`Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`,
			);
		}
		return sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`);
	}
	return sendAsyncErr(`Please specify a sandbox. E.g. taq list accounts local`);
};

const stopSandboxTask = async (parsedArgs: Opts): Promise<void> => {
	if (parsedArgs.sandboxName) {
		const sandbox = getSandbox(parsedArgs);
		if (sandbox) {
			if (doesUseFlextesa(sandbox)) {
				return await isSandboxRunning(parsedArgs.sandboxName, parsedArgs)
					? execCmd(`docker kill ${await getContainerName(parsedArgs.sandboxName, parsedArgs)}`)
						.then(_ => sendAsyncRes(`Stopped ${parsedArgs.sandboxName}.`))
					: sendAsyncRes(`The ${parsedArgs.sandboxName} sandbox was not running.`);
			}
			return sendAsyncErr(`Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`);
		}
		return sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`);
	}
	return sendAsyncErr(`No sandbox specified`);
};

export const proxy = <T>(parsedArgs: Opts): LikeAPromise<void, TaqError.t> => {
	switch (parsedArgs.task) {
		case 'list accounts':
			return listAccountsTask(parsedArgs);
		case 'start sandbox':
			return startSandboxTask(parsedArgs);
		case 'stop sandbox':
			return stopSandboxTask(parsedArgs);
		default:
			return sendAsyncErr(`${parsedArgs.task} is not an understood task by the Flextesa plugin`);
	}
};

export default proxy;
