import {
	getCurrentEnvironment,
	readJsonFileWithoutTransform,
	RequestArgs,
	sendAsyncErr,
	spawnCmd,
} from '@taqueria/node-sdk';
import { InMemorySigner } from '@taquito/signer';
import { join } from 'path';

const getDockerImage = () => 'ghcr.io/pinnacle-labs/tzgo/tzcompose:latest';

export interface RunArgs extends RequestArgs.t {
	task: 'run';
	v?: string;
	scriptPath: string;
}

const getRPCUrl = (parsedArgs: RunArgs) => {
	const currentEnv = parsedArgs.config.environment[getCurrentEnvironment(parsedArgs)];
	if (typeof (currentEnv) === 'object') {
		if (currentEnv.sandboxes.length > 0) {
			const sandboxName = currentEnv.sandboxes[0];
			const sandboxConfig = parsedArgs.config.sandbox ?? {};
			const rpcUrl = sandboxConfig[sandboxName]?.rpcUrl?.replace('localhost', 'host.docker.internal');
			return rpcUrl;
		} else {
			const networkName = currentEnv.networks[0];
			const networkConfig = parsedArgs.config.network ?? {};
			const rpcUrl = networkConfig[networkName]?.rpcUrl;
			return rpcUrl;
		}
	}
};

type PartialAccountConfig = {
	secretKey?: string;
	privateKey?: string;
	mnemonic?: string;
};

type PartialEnvConfig = {
	accounts?: Record<string, PartialAccountConfig>;
};

const getEnvConf = (parsedArgs: RunArgs) => {
	const projectDir = parsedArgs.projectDir;
	const env = getCurrentEnvironment(parsedArgs);
	const filePath = join(projectDir, '.taq', `config.local.${env}.json`);
	return readJsonFileWithoutTransform<PartialEnvConfig>(filePath)
		.catch(() => ({}))
		.then(maybeDecryptAccountKeys)
		.then(JSON.stringify);
};

const maybeDecodeAccountKey = (account: PartialAccountConfig) => {
	if (account.mnemonic) {
		const signer = InMemorySigner.fromMnemonic({ mnemonic: account.mnemonic });
		const openedSigner = signer as unknown as { _key: { key: string; _key: Uint8Array } };
		return { ...account, privateKey: openedSigner._key.key };
	}

	return account;
};

const maybeDecryptAccountKeys = (envConfig: PartialEnvConfig) => {
	const accounts = envConfig.accounts || {};
	const accountsWithDecryptedKeys = Object.entries(accounts).reduce<{ [key: string]: PartialAccountConfig }>(
		(acc, [key, value]) => {
			acc[key] = { ...value, secretKey: maybeDecodeAccountKey(value).privateKey };
			return acc;
		},
		{},
	);
	return {
		...envConfig,
		accounts: accountsWithDecryptedKeys,
	};
};

const getConf = (parsedArgs: RunArgs) => {
	const projectDir = parsedArgs.projectDir;
	const env = getCurrentEnvironment(parsedArgs);
	const filePath = join(projectDir, '.taq', `config.json`);
	return readJsonFileWithoutTransform(filePath).catch(() => ({})).then(JSON.stringify);
};

const getDockerCommand = async (parsedArgs: RunArgs) => {
	const config = await getConf(parsedArgs);
	const envConfig = await getEnvConf(parsedArgs);
	const rpcUrl = getRPCUrl(parsedArgs);
	const dockerImage = getDockerImage();

	// Escape single quotes
	const sanitizedConfig = config.replace(/'/g, "\\'");
	const sanitizedEnvConfig = envConfig.replace(/'/g, "\\'");
	const verbosityLevel = parsedArgs.v ? parseInt(parsedArgs.v) : 0;
	const verbosityFlag = verbosityLevel > 0 ? `-v${new Array(verbosityLevel).fill('v').join('')}` : '';

	if (!rpcUrl) return Promise.reject('No RPC URL found in the config');

	return Promise.resolve(
		`docker run --add-host=host.docker.internal:host-gateway -it -v ${parsedArgs.projectDir}:/project ${dockerImage} run ${verbosityFlag} -rpc ${rpcUrl} -taqconfig '${sanitizedConfig}' -taqconfigenv '${sanitizedEnvConfig}'`,
	);
};

export default function run(parsedArgs: RunArgs) {
	if (!parsedArgs.scriptPath) return sendAsyncErr('scriptPath is required.');

	return getDockerCommand(parsedArgs)
		.then(spawnCmd)
		.catch(sendAsyncErr)
		.then(() => {});
}
