import {
	execCmd,
	execCommandWithoutWrapping,
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
import { getTzKtContainerNames, getTzKtStartCommands } from './tzkt-manager';

const { Url } = Protocol;

export interface Opts extends RequestArgs.ProxyRequestArgs {
	sandboxName?: string;
}

const getDockerImage = (opts: Opts) => `ghcr.io/ecadlabs/taqueria-flextesa:${opts.setVersion}-${opts.setBuild}`;

export const getUniqueSandboxName = async (sandboxName: string, projectDir: string) => {
	const hash = await stringToSHA256(projectDir);
	return `${sandboxName.substring(0, 10)}-${hash.substring(0, 5)}`;
};

export const getContainerName = async (sandboxName: string, parsedArgs: Opts) => {
	const uniqueSandboxName = await getUniqueSandboxName(sandboxName, parsedArgs.projectDir);
	return `taq-flextesa-${uniqueSandboxName}`;
};

export const getNewPortIfPortInUse = async (port: number): Promise<number> => {
	const newPort = await getPortPromise({ port });
	return newPort;
};

const replaceRpcUrlInConfig = async (newPort: string, oldUrl: string, sandboxName: string, opts: Opts) => {
	await updateConfig(opts, (config: Config.t) => {
		const newUrl = oldUrl.replace(/:\d+/, ':' + newPort) as Protocol.Url.t;
		const sandbox = config.sandbox;
		const sandboxConfig = sandbox ? sandbox[sandboxName] : undefined;
		if (typeof sandboxConfig === 'string' || sandboxConfig === undefined) {
			return;
		}
		const updatedConfig: Config.t = {
			...config,
			sandbox: {
				...sandbox,
				[sandboxName]: {
					...sandboxConfig,
					rpcUrl: newUrl,
				},
			},
		};
		return updatedConfig;
	});
};

export const updateConfig = async (opts: Opts, update: (config: Config.t) => Config.t | undefined) => {
	const config = await readJsonFile<Config.t>(opts.config.configFile);
	const updatedConfig = update(config);
	if (!updatedConfig) {
		return;
	}
	await writeJsonFile(opts.config.configFile)(updatedConfig);
};

const getStartCommand = async (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts) => {
	const port = Url.toComponents(sandbox.rpcUrl).port;
	const newPort = (await getNewPortIfPortInUse(parseInt(port))).toString();
	if (newPort !== port) {
		console.log(
			`${port} is already in use, ${newPort} will be used for sandbox ${sandboxName} instead and .taq/config.json will be updated to reflect this.`,
		);
		await replaceRpcUrlInConfig(newPort, sandbox.rpcUrl.toString(), sandboxName, opts);
	}
	const ports = `-p ${newPort}:20000`;

	const containerName = await getContainerName(sandboxName, opts);
	const arch = await getArch();
	const image = getDockerImage(opts);
	const projectDir = process.env.PROJECT_DIR ?? opts.config.projectDir;

	return `docker run --network sandbox_${sandboxName}_net --name ${containerName} --rm --detach --platform ${arch} ${ports} -v ${projectDir}:/project -w /app ${image} node index.js --sandbox ${sandboxName}`;
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

const startSandbox = (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts): Promise<void> => {
	if (doesNotUseFlextesa(sandbox)) {
		return sendAsyncErr(`Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`);
	}

	return getStartCommand(sandboxName, sandbox, opts)
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
		});
};

const startContainer = async (container: { name: string; command: string }): Promise<void> => {
	console.log(`Staring ${container.name}`);
	try {
		const result = await execCommandWithoutWrapping(container.command);
		if (result.stderr) {
			console.error(result.stderr);
		}
		console.log(result.stdout);
	} catch (e: unknown) {
		throw e;
	}
};

const startInstance = async (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts): Promise<void> => {
	await execCommandWithoutWrapping(
		`docker network ls | grep 'sandbox_${sandboxName}_net' > /dev/null || docker network create --driver bridge sandbox_${sandboxName}_net`,
	);

	const isRunning = await isSandboxRunning(sandboxName, opts);
	if (isRunning) {
		await sendAsyncRes('Already running.');
		return;
	}

	await startSandbox(sandboxName, sandbox, opts);

	if (sandbox.tzkt?.disableAutostartWithSandbox === true) {
		return;
	}
	const { postgres, sync, api } = await getTzKtStartCommands(sandboxName, sandbox, opts);
	const tzKtContainers = [
		{ name: 'postgresql', command: postgres },
		{ name: 'TzKt.Sync', command: sync },
		{ name: 'TzKt.Api', command: api },
	];
	for (const container of tzKtContainers) {
		await startContainer(container);
	}
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
				await isSandboxRunning(parsedArgs.sandboxName, parsedArgs)
					? execCmd(`docker kill ${await getContainerName(parsedArgs.sandboxName, parsedArgs)}`)
						.then(_ => sendAsyncRes(`Stopped ${parsedArgs.sandboxName}.`))
					: sendAsyncRes(`The ${parsedArgs.sandboxName} sandbox was not running.`);
				await stopTzKtContainers(parsedArgs.sandboxName, sandbox, parsedArgs);
				return;
			}
			return sendAsyncErr(`Cannot stop ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`);
		}
		return sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`);
	}
	return sendAsyncErr(`No sandbox specified`);
};

const stopTzKtContainers = async (sandboxName: string, sandbox: SandboxConfig.t, parsedArgs: Opts): Promise<void> => {
	const containerNames = await getTzKtContainerNames(sandboxName, parsedArgs);
	const containersToStop = [containerNames.api, containerNames.sync, containerNames.postgres];
	for (const container of containersToStop) {
		try {
			const result = await execCommandWithoutWrapping(`docker stop ${container}`);
			if (result.stderr) {
				console.error(result.stderr);
			}
			console.log(result.stdout);
		} catch (e: unknown) {
			// ignore
		}
	}
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
