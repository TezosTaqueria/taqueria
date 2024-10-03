import { execCmd, getArch, getDockerImage, sendAsyncErr, sendAsyncJsonRes, sendAsyncRes } from '@taqueria/node-sdk';
import BigNumber from 'bignumber.js';
import { createHash } from 'crypto';
import * as fs from 'fs';
import * as hjson from 'hjson';
import * as path from 'path';
import { getDefaultDockerImage } from './docker';
import { Opts } from './types';

type ConfigV1Environment = {
	sandboxes?: string[];
};

type Mutez = string | number; // Represents balance in mutez

type InstantiatedAccount = {
	encryptedKey: string;
	publicKeyHash: string;
	secretKey: string;
};

type SandboxConfig = {
	rpcUrl: string;
	blockTime: number;
	baking: 'enabled' | 'disabled';
};
async function instantiateDeclaredAccount(
	declaredAccountName: string,
	balanceInMutez: BigNumber,
): Promise<InstantiatedAccount> {
	// TODO: Implement logic to instantiate the declared account
	// For now, return a dummy instantiated account
	return {
		encryptedKey: 'dummy_encrypted_key',
		publicKeyHash: `tz1_dummy_public_key_hash_${declaredAccountName}`,
		secretKey: 'dummy_secret_key',
	};
}

async function getInstantiatedAccounts(taskArgs: Opts): Promise<{ accounts: Record<string, InstantiatedAccount> }> {
	// TODO: Implement logic to retrieve instantiated accounts
	// For now, throw an error to indicate that no instantiated accounts are available
	throw new Error('No instantiated accounts available.');
}

function getSandboxConfig(taskArgs: Opts) {
	if (!isTezBoxEnvironment(taskArgs)) {
		throw new Error(
			`This configuration doesn't appear to be configured to use TezBox environments. Check the ${taskArgs.env} environment in your .taq/config.json.`,
		);
	}

	const environment = taskArgs.config.environment[taskArgs.env] as ConfigV1Environment;
	const sandboxName = (environment as unknown as ConfigV1Environment).sandboxes![0];
	const sandboxConfig = taskArgs.config.sandbox![sandboxName];
	return {
		blockTime: 1,
		baking: 'enabled',
		...sandboxConfig,
		...sandboxConfig.annotations,
	} as unknown as SandboxConfig;
}

async function getOrCreateInstantiatedAccounts(
	taskArgs: Opts,
): Promise<{ accounts: Record<string, InstantiatedAccount> }> {
	let instantiatedAccounts: { accounts: Record<string, InstantiatedAccount> };

	try {
		// Attempt to get instantiated accounts
		instantiatedAccounts = await getInstantiatedAccounts(taskArgs);
	} catch (error) {
		// No instantiated accounts available, so we need to instantiate them
		instantiatedAccounts = { accounts: {} };
		const declaredAccounts = taskArgs.config.accounts as Record<string, Mutez>;

		for (const [accountName, balanceInMutez] of Object.entries(declaredAccounts)) {
			// Convert balance to BigNumber
			const balanceInMutezBN = new BigNumber(balanceInMutez.toString().replace(/_/g, ''));

			// Instantiate the declared account
			const instantiatedAccount = await instantiateDeclaredAccount(accountName, balanceInMutezBN);

			// Store the instantiated account
			instantiatedAccounts.accounts[accountName] = instantiatedAccount;
		}

		// TODO: Optionally, save the instantiated accounts to persist them for future runs
	}

	return instantiatedAccounts;
}

function prepareTezBoxAccounts(
	instantiatedAccounts: Record<string, InstantiatedAccount>,
	declaredAccounts: Record<string, Mutez>,
): Record<string, any> {
	const tezboxAccounts: Record<string, any> = {};

	for (const [accountName, instantiatedAccountData] of Object.entries(instantiatedAccounts)) {
		const declaredBalanceInMutez = declaredAccounts[accountName];

		tezboxAccounts[accountName] = {
			pkh: instantiatedAccountData.publicKeyHash,
			pk: instantiatedAccountData.encryptedKey,
			sk: instantiatedAccountData.secretKey,
			balance: parseInt(declaredBalanceInMutez.toString().replace(/_/g, ''), 10),
		};
	}

	return tezboxAccounts;
}

async function writeAccountsHjson(tezboxAccounts: Record<string, any>, tezBoxConfigDir: string): Promise<void> {
	// Convert the accounts object to HJSON format
	const hjsonContent = hjson.stringify(tezboxAccounts, {
		quotes: 'all',
		bracesSameLine: true,
		separator: true,
	});

	// Write the accounts.hjson file
	const accountsHjsonPath = path.join(tezBoxConfigDir, 'accounts.hjson');
	await fs.promises.writeFile(accountsHjsonPath, hjsonContent, 'utf8');
}

async function prepareAccountsHjson(taskArgs: Opts, tezBoxConfigDir: string): Promise<void> {
	try {
		// Get or create instantiated accounts
		const instantiatedAccounts = await getOrCreateInstantiatedAccounts(taskArgs);

		// Retrieve declared accounts
		const declaredAccounts = taskArgs.config.accounts as Record<string, Mutez>;

		// Prepare tezbox accounts
		const tezboxAccounts = prepareTezBoxAccounts(instantiatedAccounts.accounts, declaredAccounts);

		// Write the accounts.hjson file
		await writeAccountsHjson(tezboxAccounts, tezBoxConfigDir);
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new Error(`Failed to prepare accounts: ${errorMessage}`);
	}
}

function getProjectId(taskArgs: Opts): string {
	return createHash('sha256').update(taskArgs.projectDir).digest('hex');
}

function getDockerContainerName(taskArgs: Opts): string {
	return `taq-${taskArgs.env}-${getProjectId(taskArgs)}`;
}

function getTezBoxConfigDir(taskArgs: Opts): string {
	return path.join(taskArgs.projectDir, `taq/.${getDockerContainerName(taskArgs)}`);
}

function getTezBoxDataDir(taskArgs: Opts): string {
	return path.join(taskArgs.projectDir, `taq/.${getDockerContainerName(taskArgs)}/data`);
}

function getImage(taskArgs: Opts): string {
	return getDockerImage(getDefaultDockerImage(taskArgs), 'TAQ_TEZBOX_IMAGE');
}

function isTezBoxEnvironment(taskArgs: Opts): boolean {
	const environment = taskArgs.config.environment[taskArgs.env];
	if (!environment) return false;

	const sandboxName = (environment as unknown as ConfigV1Environment).sandboxes?.[0];
	if (!sandboxName) return false;

	// TODO: Right now we don't have a way to tell if a sandbox is TezBox-provided
	return true;
}

async function isSandboxRunning(taskArgs: Opts): Promise<boolean> {
	const containerName = getDockerContainerName(taskArgs);
	const cmd = `docker ps --filter "name=${containerName}" --format "{{.ID}}"`;
	const { stdout } = await execCmd(cmd);
	return stdout.trim() !== '';
}

async function checkSandboxRunning(taskArgs: Opts): Promise<boolean> {
	const running = await isSandboxRunning(taskArgs);
	if (running) {
		await sendAsyncRes('Sandbox is already running.');
	}
	return running;
}

async function getDockerRunParams(taskArgs: Opts): Promise<{
	platform: string;
	image: string;
	containerName: string;
	configDir: string;
	dataDir: string;
}> {
	const image = getImage(taskArgs);
	const containerName = getDockerContainerName(taskArgs);
	const arch = await getArch();
	const platform = `linux/${arch}`;
	const configDir = getTezBoxConfigDir(taskArgs);
	const dataDir = getTezBoxDataDir(taskArgs);

	return { platform, image, containerName, configDir, dataDir };
}

async function ensureDirectoriesExist(directories: string[]): Promise<void> {
	for (const dir of directories) {
		await fs.promises.mkdir(dir, { recursive: true });
	}
}

function constructDockerRunCommand(params: {
	platform: string;
	image: string;
	containerName: string;
	configDir: string;
	dataDir: string;
}): string {
	const { platform, image, containerName, configDir, dataDir } = params;

	return (
		`docker run -d --rm`
		+ ` --platform ${platform}`
		+ ` -p 0.0.0.0:8732:8732`
		+ ` -v "${configDir}:/tezbox/overrides"`
		+ ` -v "${dataDir}:/tezbox/data"`
		+ ` --name ${containerName} ${image}`
	);
}

async function executeDockerCommand(cmd: string): Promise<void> {
	const { stderr } = await execCmd(cmd);
	if (stderr.trim() !== '') {
		throw new Error(stderr.trim());
	}
}

async function prepareTezBoxOverrides(taskArgs: Opts): Promise<void> {
	const tezBoxConfigDir = getTezBoxConfigDir(taskArgs);

	try {
		// Get sandbox configuration
		const sandboxConfig = getSandboxConfig(taskArgs);

		// Ensure the configuration directory exists
		await fs.promises.mkdir(tezBoxConfigDir, { recursive: true });

		// Prepare accounts.hjson
		if (taskArgs.config.accounts) {
			await prepareAccountsHjson(taskArgs, tezBoxConfigDir);
		}

		// Prepare sandbox-parameters.hjson for block_time
		if (sandboxConfig.blockTime) {
			await prepareSandboxParametersHjson(taskArgs, tezBoxConfigDir);
		}

		// Prepare baker.hjson if baking is disabled
		if (sandboxConfig.baking === 'disabled') {
			await prepareBakerHjson(tezBoxConfigDir);
		}
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new Error(`Failed to prepare TezBox overrides: ${errorMessage}`);
	}
}

// Function to validate block time
function validateBlockTime(taskArgs: Opts): number {
	const sandboxConfig = getSandboxConfig(taskArgs);
	const blockTime = sandboxConfig.blockTime;
	return blockTime;
}

// Function to validate protocol IDs
function validateProtocolIds(protocolIds: string[]): boolean {
	if (protocolIds.length === 0) {
		console.warn('No protocol IDs found; cannot set block_time override.');
		return false;
	}
	return true;
}

// Function to write sandbox parameters for a single protocol
async function writeSandboxParameters(
	protocolId: string,
	parameters: Record<string, string>,
	tezBoxConfigDir: string,
): Promise<void> {
	const protocolsDir = path.join(tezBoxConfigDir, 'protocols', protocolId);
	await fs.promises.mkdir(protocolsDir, { recursive: true });

	const hjsonContent = hjson.stringify(parameters, {
		quotes: 'all',
		bracesSameLine: true,
		separator: true,
	});

	const sandboxParamsPath = path.join(protocolsDir, 'sandbox-parameters.hjson');
	await fs.promises.writeFile(sandboxParamsPath, hjsonContent, 'utf8');
}

// Function to apply block time override to a single protocol
async function applyBlockTimeOverrideToProtocol(
	protocolId: string,
	blockTime: number,
	tezBoxConfigDir: string,
): Promise<void> {
	const parameters = {
		minimal_block_delay: `${blockTime}`, // Value must be a string
	};
	await writeSandboxParameters(protocolId, parameters, tezBoxConfigDir);
}

// Function to apply block time override to multiple protocols
async function applyBlockTimeOverrideToProtocols(
	protocolIds: string[],
	blockTime: number,
	tezBoxConfigDir: string,
): Promise<void> {
	for (const protocolId of protocolIds) {
		await applyBlockTimeOverrideToProtocol(protocolId, blockTime, tezBoxConfigDir);
	}
}

// Refactored prepareSandboxParametersHjson function
async function prepareSandboxParametersHjson(taskArgs: Opts, tezBoxConfigDir: string): Promise<void> {
	try {
		// Validate block time
		const blockTime = validateBlockTime(taskArgs);

		// Get all available protocol IDs
		const protocolIds = await getProtocolIds(taskArgs);

		// Validate protocol IDs
		if (!validateProtocolIds(protocolIds)) {
			return;
		}

		// Apply block time override to each protocol
		await applyBlockTimeOverrideToProtocols(protocolIds, blockTime, tezBoxConfigDir);
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new Error(`Failed to prepare sandbox parameters: ${errorMessage}`);
	}
}

async function getProtocolIds(taskArgs: Opts): Promise<string[]> {
	const image = getImage(taskArgs);
	const cmd = `docker run --rm --entrypoint octez-client ${image} -M mockup list mockup protocols`;
	const { stdout, stderr } = await execCmd(cmd);

	if (stderr.trim() !== '') {
		throw new Error(`Failed to list protocols: ${stderr.trim()}`);
	}

	const protocols = stdout
		.trim()
		.split('\n')
		.filter(line => line.trim() !== '');

	return protocols;
}

async function prepareBakerHjson(tezBoxConfigDir: string): Promise<void> {
	const servicesDir = path.join(tezBoxConfigDir, 'services');
	await fs.promises.mkdir(servicesDir, { recursive: true });

	const bakerConfig = {
		autostart: false,
	};

	const hjsonContent = hjson.stringify(bakerConfig, {
		quotes: 'all',
		bracesSameLine: true,
		separator: true,
	});

	const bakerConfigPath = path.join(servicesDir, 'baker.hjson');
	await fs.promises.writeFile(bakerConfigPath, hjsonContent, 'utf8');
}

async function startSandbox(taskArgs: Opts): Promise<void> {
	try {
		// Check if the sandbox is already running
		if (await checkSandboxRunning(taskArgs)) {
			return;
		}

		// Prepare TezBox configuration overrides
		await prepareTezBoxOverrides(taskArgs);

		// Get Docker run parameters
		const params = await getDockerRunParams(taskArgs);

		// Ensure necessary directories exist
		await ensureDirectoriesExist([params.dataDir]);

		// Construct the Docker run command
		const cmd = constructDockerRunCommand(params);
		console.error(`Starting sandbox with command: ${cmd}`);

		// Execute the Docker run command
		await executeDockerCommand(cmd);

		// Send a success response
		await sendAsyncRes('Sandbox started successfully.');
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		await sendAsyncErr(`Failed to start sandbox: ${errorMessage}`);
	}
}

async function removeSandboxContainer(taskArgs: Opts): Promise<void> {
	const containerName = getDockerContainerName(taskArgs);
	const rmCmd = `docker rm -f ${containerName}`;
	const { stderr } = await execCmd(rmCmd);

	if (stderr.includes('No such container')) {
		// Container does not exist
		await sendAsyncRes('Sandbox is not running or already stopped.');
	} else if (stderr.trim() !== '') {
		// Other errors
		throw new Error(stderr.trim());
	}
}

async function stopSandbox(taskArgs: Opts): Promise<void> {
	try {
		// Attempt to stop and remove the sandbox container
		await removeSandboxContainer(taskArgs);

		// Send a success response
		await sendAsyncRes('Sandbox stopped.');
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		await sendAsyncErr(`Failed to stop sandbox: ${errorMessage}`);
	}
}

async function restartSandbox(taskArgs: Opts): Promise<void> {
	try {
		// Stop the sandbox if it's running
		await removeSandboxContainer(taskArgs);

		// Start the sandbox
		await startSandbox(taskArgs);

		// Send a success response
		await sendAsyncRes('Sandbox restarted successfully.');
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		await sendAsyncErr(`Failed to restart sandbox: ${errorMessage}`);
	}
}

async function listProtocols(taskArgs: Opts): Promise<void> {
	try {
		const protocols = await getProtocolIds(taskArgs);
		const protocolObjects = protocols.map(protocol => ({ protocol }));
		await sendAsyncJsonRes(protocolObjects);
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		await sendAsyncErr(`Failed to list protocols: ${errorMessage}`);
	}
}

async function listAccounts(taskArgs: Opts): Promise<void> {
	try {
		if (await isSandboxRunning(taskArgs)) {
			// List accounts from the sandbox
			const containerName = getDockerContainerName(taskArgs);
			const cmd = `docker exec ${containerName} octez-client list known addresses`;
			const { stdout, stderr } = await execCmd(cmd);

			if (stderr.trim() !== '') {
				await sendAsyncErr(`Failed to list accounts: ${stderr.trim()}`);
				return;
			}

			const accounts = stdout
				.trim()
				.split('\n')
				.filter(line => line.trim() !== '')
				.map(line => {
					const [name, rest] = line.split(':');
					const address = rest ? rest.trim().split(' ')[0] : '';
					return { name: name.trim(), address };
				});

			await sendAsyncJsonRes(accounts);
		} else {
			await sendAsyncErr(`Sandbox is not running. Please start the sandbox before attempting to list accounts.`);
		}
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		await sendAsyncErr(`Failed to list accounts: ${errorMessage}`);
	}
}

export const proxy = (taskArgs: Opts): Promise<void> => {
	if (!isTezBoxEnvironment(taskArgs)) {
		return sendAsyncErr(
			`This configuration doesn't appear to be configured to use TezBox environments. Check the ${taskArgs.env} environment in your .taq/config.json.`,
		);
	}
	switch (taskArgs.task) {
		case 'start sandbox':
			return startSandbox(taskArgs);
		case 'stop sandbox':
			return stopSandbox(taskArgs);
		case 'restart sandbox':
			return restartSandbox(taskArgs);
		case 'list protocols':
		case 'list-protocols':
		case 'show protocols':
		case 'show-protocols':
			return listProtocols(taskArgs);
		case 'list accounts':
		case 'list-accounts':
		case 'show accounts':
		case 'show-accounts':
			return listAccounts(taskArgs);
		default:
			return taskArgs.task
				? sendAsyncErr(`Unknown task: ${taskArgs.task}`)
				: sendAsyncErr('No task provided');
	}
};

export default proxy;
