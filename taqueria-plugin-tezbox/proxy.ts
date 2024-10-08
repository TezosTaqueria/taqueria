import {
	execCmd,
	getArch,
	getDockerImage,
	SandboxAccountConfig,
	SandboxConfig,
	sendAsyncErr,
	sendAsyncJsonRes,
	sendAsyncRes,
} from '@taqueria/node-sdk';
import { generateSecretKey, InMemorySigner } from '@taquito/signer';
import BigNumber from 'bignumber.js';
import { createHash } from 'crypto';
import { create } from 'domain';
import * as fs from 'fs';
import * as hjson from 'hjson';
import * as path from 'path';
import { getDefaultDockerImage } from './docker';
import { Opts } from './types';

type ConfigV1Environment = {
	sandboxes?: string[];
};

type Mutez = string | number; // Represents balance in mutez

type InstantiatedAccount = Omit<SandboxAccountConfig, 'encryptedKey'> & {
	encryptedKey?: string;
};

interface TezboxAccount {
	pkh: string;
	pk: string;
	sk: string;
	balance: string;
}

type SandboxConfigV1 = SandboxConfig & {
	blockTime?: number;
	baking?: BakingOption;
};

interface ProtocolMapping {
	id: string; // e.g., "Proxford"
	hash: string; // e.g., "PsDELPH1..."
}

interface DockerRunParams {
	platform: string;
	image: string;
	containerName: string;
	configDir: string;
	dataDir: string;
}

enum BakingOption {
	ENABLED = 'enabled',
	DISABLED = 'disabled',
}

/**
 * Logger utility for standardized logging.
 */
const logger = {
	info: (message: string) => console.log(message),
	warn: (message: string) => console.warn(message),
	error: (message: string) => console.error(message),
};

/**
 * Extracts error message from unknown error type.
 */
function getErrorMessage(error: unknown): string {
	if (error instanceof Error) return error.message;
	return String(error);
}

/**
 * Executes a shell command and standardizes error handling.
 */
/**
 * Executes a shell command and standardizes error handling.
 */
async function runCommand(
	cmd: string,
	stderrHandler?: (stderr: string) => void | Promise<void>,
): Promise<{ stdout: string }> {
	logger.info(`Executing command: ${cmd}`);
	try {
		const { stdout, stderr } = await execCmd(cmd);
		if (stderr.trim()) {
			if (stderrHandler) {
				await stderrHandler(stderr.trim());
			} else {
				throw new Error(stderr.trim());
			}
		}
		return { stdout };
	} catch (error) {
		throw new Error(`Command failed: ${getErrorMessage(error)}`);
	}
}

/**
 * Checks if the given environment is configured for TezBox.
 */
function isTezBoxEnvironment(taskArgs: Opts): boolean {
	const environment = taskArgs.config.environment[taskArgs.env];
	if (!environment || typeof environment !== 'object') return false;

	const sandboxes = (environment as ConfigV1Environment).sandboxes;
	if (!Array.isArray(sandboxes) || sandboxes.length === 0) return false;

	// Currently, we don't have a way to tell if a sandbox is TezBox-provided
	return true;
}

/**
 * Throws warning indicating function is not implemented yet.
 */
async function instantiateDeclaredAccount(
	declaredAccountName: string,
	balanceInMutez: BigNumber,
): Promise<InstantiatedAccount> {
	logger.warn(`instantiateDeclaredAccount is not implemented. Returning dummy data for ${declaredAccountName}.`);
	// Return dummy data or default values
	return {
		encryptedKey: 'unencrypted:edpktdummykey123',
		publicKeyHash: `tz1_dummy_public_key_hash_${declaredAccountName}`,
		secretKey: 'unencrypted:edskdummysecretkey123',
	};
}

/**
 * Throws warning indicating function is not implemented yet.
 */
async function getInstantiatedAccounts(taskArgs: Opts): Promise<Record<string, InstantiatedAccount>> {
	const sandboxConfig = getSandboxConfig(taskArgs);
	if (!sandboxConfig.accounts) {
		throw new Error('No instantiated accounts found in sandbox config.');
	}
	const accounts = sandboxConfig.accounts as Record<string, InstantiatedAccount>;
	return Object.entries(accounts)
		.filter(([key]) => key !== 'default')
		.reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {} as Record<string, InstantiatedAccount>);
}

/**
 * Gets the sandbox configuration for the given environment.
 */
function getSandboxConfig(taskArgs: Opts): SandboxConfigV1 {
	if (!isTezBoxEnvironment(taskArgs)) {
		throw new Error(
			`This configuration doesn't appear to be configured to use TezBox environments. Check the ${taskArgs.env} environment in your .taq/config.json.`,
		);
	}

	const environment = taskArgs.config.environment[taskArgs.env] as ConfigV1Environment;
	const sandboxName = environment.sandboxes?.[0];
	if (sandboxName) {
		const sandboxConfig = taskArgs.config.sandbox?.[sandboxName];
		if (sandboxConfig) {
			const retval: SandboxConfigV1 = {
				blockTime: 1,
				baking: BakingOption.ENABLED,
				...sandboxConfig,
				...sandboxConfig.annotations,
			};

			return retval;
		}
	}
	throw new Error(`No sandbox configuration found for ${taskArgs.env} environment.`);
}

/**
 * Gets or creates instantiated accounts.
 */
async function getOrCreateInstantiatedAccounts(
	taskArgs: Opts,
): Promise<Record<string, InstantiatedAccount>> {
	let instantiatedAccounts: Record<string, InstantiatedAccount>;

	try {
		// Attempt to get instantiated accounts
		instantiatedAccounts = await getInstantiatedAccounts(taskArgs);
	} catch (error) {
		// No instantiated accounts available, so we need to instantiate them
		instantiatedAccounts = {};
		const declaredAccounts = taskArgs.config.accounts as Record<string, Mutez>;

		for (const [accountName, balanceInMutez] of Object.entries(declaredAccounts)) {
			// Convert balance to BigNumber, removing any underscores used for formatting
			const balanceInMutezBN = new BigNumber(balanceInMutez.toString().replace(/_/g, ''));

			// Instantiate the declared account
			const instantiatedAccount = await instantiateDeclaredAccount(accountName, balanceInMutezBN);

			// Store the instantiated account
			instantiatedAccounts[accountName] = instantiatedAccount;
		}

		// Optionally, save the instantiated accounts to persist them for future runs
	}

	return instantiatedAccounts;
}

import * as bip39 from 'bip39';

/**
 * Generates a mnemonic phrase using BIP39.
 * @param strength The entropy bit length, defaults to 128 (resulting in a 12-word mnemonic).
 * @returns A promise that resolves to the generated mnemonic phrase.
 */
async function generateMnemonic(strength: number = 128): Promise<string> {
	try {
		const mnemonic = bip39.generateMnemonic(strength);
		return mnemonic;
	} catch (error) {
		console.error('Error generating mnemonic:', error);
		throw new Error('Failed to generate mnemonic');
	}
}

// Function to generate a new implicit account
async function createNewAccount() {
	const mnemonic = await generateMnemonic();

	// Generate the BIP39 seed from the mnemonic
	const seed = await bip39.mnemonicToSeed(mnemonic);

	// Convert the seed (Buffer) to a UInt8Array
	const seedUInt8Array = new Uint8Array(seed);

	// Generate the secret key
	const secretKey = generateSecretKey(seedUInt8Array, "m/44'/1729'/0'/0'", 'ed25519');

	// Derive the public key and public key hash from the secret key
	const signer = new InMemorySigner(secretKey);
	const publicKey = await signer.publicKey();
	const publicKeyHash = await signer.publicKeyHash();

	// Return the object with pk, pkh, sk, and balance
	return {
		pk: publicKey,
		pkh: publicKeyHash,
		sk: `unencrypted:${secretKey}`,
	};
}

function createFunderAccount() {
	return createNewAccount().then(account => ({
		publicKeyHash: account.pkh,
		secretKey: account.sk,
	}));
}

async function getPublicKeyFromSecretKey(secretKey: string) {
	// Initialize the signer with the secret key
	const signer = await InMemorySigner.fromSecretKey(secretKey.replace('unencrypted:', ''));

	// Get the public key
	const publicKey = await signer.publicKey();

	return publicKey;
}

/**
 * Prepares TezBox accounts configuration.
 */
/**
 * Prepares TezBox accounts configuration.
 */
async function prepareTezBoxAccounts(
	instantiatedAccounts: Record<string, InstantiatedAccount>,
	declaredAccounts: Record<string, Mutez>,
): Promise<Record<string, TezboxAccount>> {
	// Add funder account to instantiatedAccounts
	// instantiatedAccounts['funder'] = await createFunderAccount();

	const tezboxAccounts: Record<string, TezboxAccount> = {};

	for (const [accountName, accountData] of Object.entries(instantiatedAccounts)) {
		if (accountName === 'default') continue;

		const secretKey = accountData.secretKey;
		tezboxAccounts[accountName] = {
			pkh: accountData.publicKeyHash,
			pk: await getPublicKeyFromSecretKey(secretKey),
			sk: secretKey,
			balance: accountName === 'funder'
				? new BigNumber(100000000000000).toString()
				: new BigNumber(declaredAccounts[accountName].toString()).toString(),
		};
	}

	return tezboxAccounts;
}

/**
 * Writes accounts.hjson file.
 */
async function writeAccountsHjson(
	tezboxAccounts: Record<string, TezboxAccount>,
	tezBoxConfigDir: string,
): Promise<void> {
	// TODO: Remove for debugging
	await Promise.resolve();

	// // Rearrange accounts record so that funder is first
	// const funderAccount = tezboxAccounts['funder'];
	// delete tezboxAccounts['funder'];
	// tezboxAccounts = { funder: funderAccount, ...tezboxAccounts };

	// Convert the accounts object to HJSON format
	const hjsonContent = hjson.stringify(tezboxAccounts, {
		quotes: 'min',
		bracesSameLine: true,
		separator: false,
	});

	// Remove quotes around sk values and ensure proper indentation
	const fixedHjsonContent = hjsonContent.replaceAll('"', '');

	// Write the accounts.hjson file
	const accountsHjsonPath = path.join(tezBoxConfigDir, 'accounts.hjson');
	await fs.promises.writeFile(accountsHjsonPath, fixedHjsonContent, 'utf8');
}

/**
 * Gets the declared accounts from the task arguments and removes underscores from Mutez values.
 */
function getDeclaredAccounts(taskArgs: Opts): Record<string, Mutez> {
	const declaredAccounts = taskArgs.config.accounts as Record<string, Mutez>;
	return Object.entries(declaredAccounts).reduce((acc, [key, value]) => {
		acc[key] = value.toString().replace(/_/g, '');
		return acc;
	}, {} as Record<string, Mutez>);
}

/**
 * Prepares accounts.hjson for TezBox.
 */
async function prepareAccountsHjson(taskArgs: Opts, tezBoxConfigDir: string): Promise<void> {
	try {
		// Get or create instantiated accounts
		const instantiatedAccounts = await getOrCreateInstantiatedAccounts(taskArgs);

		// Retrieve declared accounts
		const declaredAccounts = getDeclaredAccounts(taskArgs);

		// Prepare tezbox accounts
		const tezboxAccounts = await prepareTezBoxAccounts(instantiatedAccounts, declaredAccounts);

		// Write the accounts.hjson file
		await writeAccountsHjson(tezboxAccounts, tezBoxConfigDir);
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		throw new Error(`Failed to prepare accounts: ${errorMessage}`);
	}
}

/**
 * Prepares bakers.hjson for TezBox.
 */
async function prepareBakersHjson(taskArgs: Opts, tezBoxConfigDir: string): Promise<void> {
	try {
		// Get declared accounts
		const declaredAccounts = getDeclaredAccounts(taskArgs);

		// Calculate total balance
		const totalBalance = Object.values(declaredAccounts).reduce(
			(sum, balance) => BigNumber.sum(sum, balance),
			new BigNumber(0),
		).toString();

		// Prepare bakers object
		const bakers = {
			baker1: {
				pkh: 'tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU',
				pk: 'edpkuTXkJDGcFd5nh6VvMz8phXxU3Bi7h6hqgywNFi1vZTfQNnS1RV',
				sk: 'unencrypted:edsk4ArLQgBTLWG5FJmnGnT689VKoqhXwmDPBuGx3z4cvwU9MmrPZZ',
				balance: totalBalance,
			},
			baker2: {
				pkh: 'tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN',
				pk: 'edpktzNbDAUjUk697W7gYg2CRuBQjyPxbEg8dLccYYwKSKvkPvjtV9',
				sk: 'unencrypted:edsk39qAm1fiMjgmPkw1EgQYkMzkJezLNewd7PLNHTkr6w9XA2zdfo',
				balance: totalBalance,
			},
			baker3: {
				pkh: 'tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv',
				pk: 'edpkuFrRoDSEbJYgxRtLx2ps82UdaYc1WwfS9sE11yhauZt5DgCHbU',
				sk: 'unencrypted:edsk2uqQB9AY4FvioK2YMdfmyMrer5R8mGFyuaLLFfSRo8EoyNdht3',
				balance: totalBalance,
			},
		};

		// Convert the bakers object to HJSON format
		const hjsonContent = hjson.stringify(bakers, {
			quotes: 'min',
			bracesSameLine: true,
			separator: false,
		});

		// Remove quotes around sk values and ensure proper indentation
		const fixedHjsonContent = hjsonContent.replaceAll('"', '');

		// Write the bakers.hjson file
		const bakersHjsonPath = path.join(tezBoxConfigDir, 'bakers.hjson');
		await fs.promises.writeFile(bakersHjsonPath, fixedHjsonContent, 'utf8');
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		throw new Error(`Failed to prepare bakers: ${errorMessage}`);
	}
}

/**
 * Generates a project ID based on the project directory.
 */
function getProjectId(taskArgs: Opts): string {
	return createHash('sha256').update(taskArgs.projectDir).digest('hex');
}

/**
 * Gets the docker container name for the sandbox.
 */
function getDockerContainerName(taskArgs: Opts): string {
	const projectId = getProjectId(taskArgs);
	return `taq-${taskArgs.env}-${projectId}`;
}

/**
 * Gets the TezBox configuration directory.
 */
function getTezBoxConfigDir(taskArgs: Opts): string {
	const containerName = getDockerContainerName(taskArgs);
	return path.join(taskArgs.projectDir, `.taq/.${containerName}/config`);
}

/**
 * Gets the TezBox data directory.
 */
function getTezBoxDataDir(taskArgs: Opts): string {
	const containerName = getDockerContainerName(taskArgs);
	return path.join(taskArgs.projectDir, `.taq/.${containerName}/data`);
}

/**
 * Gets the docker image for TezBox.
 */
function getImage(taskArgs: Opts): string {
	return getDockerImage(getDefaultDockerImage(taskArgs), 'TAQ_TEZBOX_IMAGE');
}

/**
 * Checks if the sandbox is running.
 */
async function isSandboxRunning(taskArgs: Opts): Promise<boolean> {
	const containerName = getDockerContainerName(taskArgs);
	const cmd = `docker ps --filter "name=${containerName}" --format "{{.ID}}"`;
	const { stdout } = await runCommand(cmd);
	return stdout.trim() !== '';
}

/**
 * Checks if the sandbox is already running.
 */
async function checkSandboxRunning(taskArgs: Opts): Promise<boolean> {
	const running = await isSandboxRunning(taskArgs);
	if (running) {
		await sendAsyncRes('Sandbox is already running.');
	}
	return running;
}

/**
 * Gets the docker run parameters.
 */
async function getDockerRunParams(taskArgs: Opts): Promise<DockerRunParams> {
	const image = getImage(taskArgs);
	const containerName = getDockerContainerName(taskArgs);
	const platform = await getArch();
	const configDir = getTezBoxConfigDir(taskArgs);
	const dataDir = getTezBoxDataDir(taskArgs);

	return { platform, image, containerName, configDir, dataDir };
}

/**
 * Ensures directories exist.
 */
async function ensureDirectoriesExist(directories: string[]): Promise<void> {
	await Promise.all(
		directories.map(dir => fs.promises.mkdir(dir, { recursive: true })),
	);
}

/**
 * Constructs the docker run command.
 */
function constructDockerRunCommand(params: DockerRunParams): string {
	const { platform, image, containerName, configDir } = params;

	const dockerOptions = [
		'docker run',
		'-d',
		// '--rm',
		`--platform ${platform}`,
		'-p 0.0.0.0:8732:8732',
		`-v "${configDir}:/tezbox/overrides"`,
		`--name ${containerName}`,
		image,
		// 'qenabox', // TODO: restore once working upstream
	];

	return dockerOptions.join(' ');
}

/**
 * Validates the block time in the sandbox configuration.
 */
function validateBlockTime(taskArgs: Opts): number | null {
	const sandboxConfig = getSandboxConfig(taskArgs);
	const blockTime = sandboxConfig.blockTime;
	if (blockTime === undefined || blockTime === null) {
		logger.warn('Block time is not specified; skipping block_time override.');
		return null;
	}
	return blockTime;
}

/**
 * Writes sandbox parameters for a single protocol.
 */
async function writeSandboxParameters(
	protocolId: string,
	parameters: Record<string, string>,
	tezBoxConfigDir: string,
): Promise<void> {
	const protocolsDir = path.join(tezBoxConfigDir, 'protocols', protocolId);
	await fs.promises.mkdir(protocolsDir, { recursive: true });

	const hjsonContent = hjson.stringify(parameters, {
		quotes: 'min',
		bracesSameLine: true,
		separator: false,
	});

	const sandboxParamsPath = path.join(protocolsDir, 'sandbox-parameters.hjson');
	await fs.promises.writeFile(sandboxParamsPath, hjsonContent, 'utf8');

	// Ensure the file has write permissions
	try {
		await fs.promises.chmod(sandboxParamsPath, 0o644);
	} catch (error) {
		logger.warn(`Failed to set file permissions for ${sandboxParamsPath}: ${getErrorMessage(error)}`);
	}
}

/**
 * Applies block time override to a single protocol.
 */
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

/**
 * Applies block time override to multiple protocols.
 */
async function applyBlockTimeOverrideToProtocols(
	protocolIds: string[],
	blockTime: number,
	tezBoxConfigDir: string,
): Promise<void> {
	await Promise.all(
		protocolIds.map(async protocolId => {
			// Skip alpha protocol as it's a placeholder
			if (/^alpha$/i.test(protocolId)) {
				return;
			}
			await applyBlockTimeOverrideToProtocol(protocolId, blockTime, tezBoxConfigDir);
		}),
	);
}

/**
 * Gets protocol identifiers from TezBox configuration.
 */
async function getProtocolIds(taskArgs: Opts): Promise<string[]> {
	const image = getImage(taskArgs);

	// List the protocol directories inside the TezBox image
	const cmd = `docker run --rm --entrypoint ls ${image} /tezbox/configuration/protocols`;
	const { stdout } = await runCommand(cmd);

	const protocolIds = stdout
		.trim()
		.split('\n')
		.map(line => line.trim())
		.filter(line => line !== '');

	return protocolIds;
}

/**
 * Reads and parses protocol.hjson for a given protocolId.
 */
async function readProtocolJson(image: string, protocolId: string): Promise<ProtocolMapping | null> {
	const cmd = `docker run --rm --entrypoint cat ${image} /tezbox/configuration/protocols/${protocolId}/protocol.hjson`;

	try {
		const { stdout } = await runCommand(cmd);

		if (!stdout.trim()) {
			logger.warn(`protocol.hjson not found or empty for protocolId ${protocolId}; skipping this protocol.`);
			return null;
		}

		// Parse the HJSON content
		const protocolData = hjson.parse(stdout);
		const protocolHash: string = protocolData.hash;
		if (protocolHash) {
			return { id: protocolId, hash: protocolHash };
		} else {
			logger.warn(`Protocol hash not found in protocol.hjson for protocolId ${protocolId}; skipping.`);
			return null;
		}
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		logger.warn(`Failed to read protocol.hjson for protocolId ${protocolId}: ${errorMessage}`);
		return null;
	}
}

/**
 * Gets protocol mappings.
 */
async function getProtocolMappings(taskArgs: Opts): Promise<ProtocolMapping[]> {
	const image = getImage(taskArgs);
	const protocolIds = await getProtocolIds(taskArgs);

	const protocolMappingsPromises = protocolIds.map(async protocolId => {
		const mapping = await readProtocolJson(image, protocolId);
		return mapping;
	});

	const protocolMappings = await Promise.all(protocolMappingsPromises);
	return protocolMappings.filter((mapping): mapping is ProtocolMapping => mapping !== null);
}

/**
 * Gets protocol hashes from octez-client.
 */
async function getOctezClientProtocols(taskArgs: Opts): Promise<string[]> {
	const image = getImage(taskArgs);
	const cmd = `docker run --rm --entrypoint octez-client ${image} -M mockup list mockup protocols`;
	const { stdout } = await runCommand(cmd, stderr => {
		const ignorableError = 'Base directory /tezbox/data/.tezos-client does not exist.';

		if (stderr.trim() !== '' && !stderr.includes(ignorableError)) {
			throw new Error(`Failed to list protocols: ${stderr.trim()}`);
		}
	});

	const protocols = stdout
		.trim()
		.split('\n')
		.filter(line => line.trim() !== '');

	return protocols;
}

/**
 * Prepares sandbox-parameters.hjson for block_time override.
 */
async function prepareSandboxParametersHjson(taskArgs: Opts, tezBoxConfigDir: string): Promise<void> {
	try {
		// Validate block time
		const blockTime = validateBlockTime(taskArgs);
		if (blockTime === null) {
			return;
		}

		// Get the protocol mappings from TezBox
		const protocolMappings = await getProtocolMappings(taskArgs);
		const hashToIdMap: Record<string, string> = {};
		for (const mapping of protocolMappings) {
			hashToIdMap[mapping.hash] = mapping.id;
		}

		// Get the list of protocol hashes supported by octez-client
		const protocolHashes = await getOctezClientProtocols(taskArgs);

		// Map protocol hashes to TezBox protocol IDs
		const protocolIdsToOverride = protocolHashes
			.map(hash => hashToIdMap[hash])
			.filter((id): id is string => id !== undefined);

		if (protocolIdsToOverride.length === 0) {
			logger.warn('No matching protocol IDs found; cannot set block_time override.');
			return;
		}

		// Debug: Log the protocol IDs to override
		logger.info(`Protocol IDs to override: ${protocolIdsToOverride.join(', ')}`);

		// Apply block time override to each protocol ID
		await applyBlockTimeOverrideToProtocols(protocolIdsToOverride, blockTime, tezBoxConfigDir);
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		throw new Error(`Failed to prepare sandbox parameters: ${errorMessage}`);
	}
}

/**
 * Prepares baker.hjson if baking is disabled.
 */
async function prepareBakerHjson(tezBoxConfigDir: string): Promise<void> {
	const servicesDir = path.join(tezBoxConfigDir, 'services');
	try {
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
	} catch (error) {
		throw new Error(`Failed to prepare baker.hjson: ${getErrorMessage(error)}`);
	}
}

/**
 * Prepares TezBox configuration overrides.
 */
async function prepareTezBoxOverrides(taskArgs: Opts): Promise<void> {
	const tezBoxConfigDir = getTezBoxConfigDir(taskArgs);

	try {
		// Get sandbox configuration
		const sandboxConfig = getSandboxConfig(taskArgs);

		// Ensure the configuration directory exists
		await fs.promises.mkdir(tezBoxConfigDir, { recursive: true });

		// Prepare tasks
		const tasks: Promise<void>[] = [];

		// Prepare bakers.hjson
		tasks.push(prepareBakersHjson(taskArgs, tezBoxConfigDir));

		// Prepare accounts.hjson
		if (taskArgs.config.accounts) {
			tasks.push(prepareAccountsHjson(taskArgs, tezBoxConfigDir));
		}

		// Prepare sandbox-parameters.hjson for block_time
		if (sandboxConfig.blockTime) {
			tasks.push(prepareSandboxParametersHjson(taskArgs, tezBoxConfigDir));
		}

		// Prepare baker.hjson if baking is disabled
		if (sandboxConfig.baking === BakingOption.DISABLED) {
			tasks.push(prepareBakerHjson(tezBoxConfigDir));
		}

		// Run all preparations in parallel
		await Promise.all(tasks);
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		throw new Error(`Failed to prepare TezBox overrides: ${errorMessage}`);
	}
}

/**
 * Starts the sandbox.
 */
async function startSandbox(taskArgs: Opts): Promise<void> {
	try {
		// Check for Docker availability
		await checkDockerAvailability();

		// Check if the sandbox is already running
		if (await checkSandboxRunning(taskArgs)) {
			return;
		}

		// Get Docker run parameters
		const params = await getDockerRunParams(taskArgs);

		// Ensure necessary directories exist
		await ensureDirectoriesExist([params.dataDir, params.configDir]);

		// Prepare TezBox configuration overrides
		await prepareTezBoxOverrides(taskArgs);

		// Construct the Docker run command
		const cmd = constructDockerRunCommand(params);
		logger.info(`Starting sandbox with command: ${cmd}`);

		// Execute the Docker run command
		await runCommand(cmd);

		// Send a success response
		await sendAsyncRes('Sandbox started successfully.');
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		await sendAsyncErr(`Failed to start sandbox: ${errorMessage}`);
	}
}

/**
 * Checks for Docker availability.
 */
async function checkDockerAvailability(): Promise<void> {
	try {
		await runCommand('docker --version');
	} catch (error) {
		throw new Error('Docker is not installed or not running. Please install and start Docker.');
	}
}

/**
 * Removes the sandbox container.
 */
async function removeSandboxContainer(taskArgs: Opts): Promise<void> {
	const containerName = getDockerContainerName(taskArgs);
	const cmd = `docker rm -f ${containerName}`;

	try {
		await runCommand(cmd);
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		if (errorMessage.includes('No such container')) {
			// Container does not exist
			await sendAsyncRes('Sandbox is not running or already stopped.');
		} else {
			throw new Error(errorMessage);
		}
	}
}

/**
 * Stops the sandbox.
 */
async function stopSandbox(taskArgs: Opts): Promise<void> {
	try {
		// Attempt to stop and remove the sandbox container
		await removeSandboxContainer(taskArgs);

		// Optionally, clean up configuration directory if needed
		const configDir = getTezBoxConfigDir(taskArgs);
		await fs.promises.rm(configDir, { recursive: true, force: true });

		// Send a success response
		await sendAsyncRes('Sandbox stopped and cleaned up.');
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		await sendAsyncErr(`Failed to stop sandbox: ${errorMessage}`);
	}
}

/**
 * Restarts the sandbox.
 */
async function restartSandbox(taskArgs: Opts): Promise<void> {
	try {
		// Stop the sandbox if it's running
		await removeSandboxContainer(taskArgs);

		// Start the sandbox
		await startSandbox(taskArgs);

		// Send a success response
		await sendAsyncRes('Sandbox restarted successfully.');
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		await sendAsyncErr(`Failed to restart sandbox: ${errorMessage}`);
	}
}

/**
 * Lists protocols.
 */
async function listProtocols(taskArgs: Opts): Promise<void> {
	try {
		const protocolHashes = await getOctezClientProtocols(taskArgs);
		const protocolObjects = protocolHashes.map(protocol => ({ protocol }));
		await sendAsyncJsonRes(protocolObjects);
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		await sendAsyncErr(`Failed to list protocols: ${errorMessage}`);
	}
}

/**
 * Lists accounts.
 */
async function listAccounts(taskArgs: Opts): Promise<void> {
	try {
		if (await isSandboxRunning(taskArgs)) {
			// List accounts from the sandbox
			const containerName = getDockerContainerName(taskArgs);
			const cmd = `docker exec ${containerName} octez-client list known addresses`;
			const { stdout } = await runCommand(cmd);

			if (!stdout.trim()) {
				await sendAsyncRes('No accounts found.');
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
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		await sendAsyncErr(`Failed to list accounts: ${errorMessage}`);
	}
}

/**
 * Main proxy function to handle tasks.
 */
export const proxy = async (taskArgs: Opts): Promise<void> => {
	if (!isTezBoxEnvironment(taskArgs)) {
		await sendAsyncErr(
			`This configuration doesn't appear to be configured to use TezBox environments. Check the ${taskArgs.env} environment in your .taq/config.json.`,
		);
		return;
	}

	const taskName = taskArgs.task?.toLowerCase().trim();

	const taskHandlers: Record<string, (args: Opts) => Promise<void>> = {
		'start sandbox': startSandbox,
		'stop sandbox': stopSandbox,
		'restart sandbox': restartSandbox,
		'list protocols': listProtocols,
		'list-protocols': listProtocols,
		'show protocols': listProtocols,
		'show-protocols': listProtocols,
		'list accounts': listAccounts,
		'list-accounts': listAccounts,
		'show accounts': listAccounts,
		'show-accounts': listAccounts,
	};

	const handler = taskName ? taskHandlers[taskName] : undefined;

	if (handler) {
		try {
			await handler(taskArgs);
		} catch (error) {
			const errorMessage = getErrorMessage(error);
			await sendAsyncErr(`Error executing task '${taskArgs.task}': ${errorMessage}`);
		}
	} else {
		await sendAsyncErr(taskArgs.task ? `Unknown task: ${taskArgs.task}` : 'No task provided');
	}
};

export default proxy;
