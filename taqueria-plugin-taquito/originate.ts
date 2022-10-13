import {
	getAccountPrivateKey,
	getCurrentEnvironment,
	getCurrentEnvironmentConfig,
	getDefaultAccount,
	getInitialStorage,
	getNetworkConfig,
	getSandboxAccountConfig,
	getSandboxAccountNames,
	getSandboxConfig,
	newGetInitialStorage,
	sendAsyncErr,
	sendErr,
	sendJsonRes,
	sendRes,
	updateAddressAlias,
} from '@taqueria/node-sdk';
import { Protocol, RequestArgs } from '@taqueria/node-sdk/types';
import { OperationContentsAndResultOrigination } from '@taquito/rpc';
import { importKey, InMemorySigner } from '@taquito/signer';
import { TezosToolkit, WalletOperationBatch } from '@taquito/taquito';
import { BatchWalletOperation } from '@taquito/taquito/dist/types/wallet/batch-operation';
import glob from 'fast-glob';
import { readFile } from 'fs/promises';
import { basename, extname, join } from 'path';

interface Opts extends RequestArgs.t {
	contract: string;
	storage: string;
	alias?: string;
}

interface ContractStorageMapping {
	filename: string;
	storage?: unknown;
}

interface OriginationResult {
	contract: string;
	address: string;
	alias: string;
	destination: string;
}

const getFirstAccountAlias = (sandboxName: string, opts: Opts) => {
	const aliases = getSandboxAccountNames(opts)(sandboxName);
	return aliases.shift();
};

const getContractAbspath = (contractFilename: string, parsedArgs: Opts) =>
	join(parsedArgs.config.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`);

const addOrigination = (parsedArgs: Opts, batch: Promise<WalletOperationBatch>) =>
	async (mapping: ContractStorageMapping) => {
		const contractAbspath = getContractAbspath(mapping.filename, parsedArgs);
		const contractData = await readFile(contractAbspath, 'utf-8');
		return (await batch).withOrigination({
			code: contractData,
			init: mapping.storage as any,
		});
	};

const getDefaultStorageFilename = (contractName: string): string => {
	const baseFilename = basename(contractName, extname(contractName));
	const extFilename = extname(contractName);
	const defaultStorage = `${baseFilename}.default_storage${extFilename}`;
	return defaultStorage;
};

// TODO: temporary quick solution. May refactor this to only deal with one contract later
const getValidContracts = async (parsedArgs: Opts) => {
	const contracts = [parsedArgs.contract];
	const storageFilename = parsedArgs.storage ?? getDefaultStorageFilename(contracts[0]);

	return contracts.reduce(
		async (retval, filename) => {
			const storage = await newGetInitialStorage(parsedArgs, storageFilename);
			if (storage === undefined || storage === null) {
				sendErr(
					`❌ No initial storage file was found for ${filename}\nStorage must be specified in a file as a Michelson expression and will automatically be linked to this contract if specified with the name "${
						getDefaultStorageFilename(contracts[0])
					}" in the artifacts directory\nYou can also manually pass a storage file to the deploy task using the --storage STORAGE_FILE_NAME option\n`,
				);
				// sendErr(
				// 	`Michelson artifact ${filename} has no initial storage specified for the target environment.\nStorage is expected to be specified in .taq/config.json at JSON path: environment.${
				// 		getCurrentEnvironment(parsedArgs)
				// 	}.storage["${filename}"]\nThe value of the above JSON key should be the name of the file (absolute path or relative path with respect to the root of the Taqueria project) that contains the actual value of the storage, as a Michelson expression.\n`,
				// );
				return retval;
			}
			return [...(await retval), { filename, storage }];
		},
		Promise.resolve([] as ContractStorageMapping[]),
	);
};

const mapOpToContract = async (
	parsedArgs: Opts,
	contracts: ContractStorageMapping[],
	op: BatchWalletOperation,
	destination: string,
) => {
	const results = await op.operationResults();
	const originationResults = results.filter(result => result.kind === 'origination')
		.map(result => result as OperationContentsAndResultOrigination);

	return contracts.reduce(
		(retval, contract) => {
			// If initial storage was provided for the contract
			// then we submitted an operation to originate that contract
			if (contract.storage) {
				// WARNING - using side effect here.
				// For each iteration of reduce, results array is being modified-in-place.
				// TODO: Adjust to use recursion to avoid side-effect.
				const result = originationResults.shift();
				const address = result && result.metadata.operation_result.originated_contracts
					? result.metadata.operation_result.originated_contracts.join(',')
					: 'Error';

				const alias = parsedArgs.alias ?? basename(contract.filename, extname(contract.filename));
				if (address !== 'Error') updateAddressAlias(parsedArgs, alias, address);

				return [
					...retval,
					{
						contract: contract.filename,
						address,
						alias: address !== 'Error' ? alias : 'N/A',
						destination,
					},
				];
			}

			return [
				...retval,
				{
					contract: contract.filename,
					address: 'Error',
					alias: 'N/A',
					destination,
				},
			];
		},
		[] as OriginationResult[],
	);
};

const createBatch = async (parsedArgs: Opts, tezos: TezosToolkit, destination: string) => {
	const contracts = await getValidContracts(parsedArgs);
	if (!contracts.length) {
		return undefined;
	}

	const batch = await contracts.reduce(
		(batch, contractMapping) =>
			contractMapping.storage
				? addOrigination(parsedArgs, batch)(contractMapping)
				: batch,
		Promise.resolve(tezos.wallet.batch()),
	);

	try {
		const op = await batch.send();
		const confirmed = await op.confirmation();
		return await mapOpToContract(parsedArgs, contracts, op, destination);
	} catch (err) {
		const error = (err as { message: string });
		if (error.message) {
			const msg = error.message;
			if (/ENOTFOUND/.test(msg)) {
				sendErr(msg + ' - The RPC URL may be invalid. Check ./taq/config.json.\n');
			} else if (/ECONNREFUSED/.test(msg)) {
				sendErr(msg + ' - The RPC URL may be down or the sandbox is not running.');
			} else if (/empty_implicit_contract/.test(msg)) {
				const result = msg.match(/(?<="implicit":")tz[^"]+(?=")/);
				const publicKeyHash = result ? result[0] : undefined;
				if (!publicKeyHash) sendErr(msg);
				else {
					sendErr(
						`The account ${publicKeyHash} for the target environment, "${
							getCurrentEnvironment(parsedArgs)
						}", may not be funded\nTo fund this account:\n1. Go to https://teztnets.xyz and click "Faucet" of the target testnet\n2. Copy and paste the above key into the 'wallet address field\n3. Request some Tez (Note that you might need to wait for a few seconds for the network to register the funds)`,
					);
				}
			} else {
				sendErr(
					msg
						+ " - There was a problem communicating with the chain. Check the RPC URL of the network or sandbox you're targeting in config.json.\n",
				);
			}
		}
		return undefined;
	}
};

/**
 * @description Import a key to sign operation with the side-effect of setting the Tezos instance to use the InMemorySigner provider
 *
 * @param toolkit The toolkit instance to attach a signer
 * @param privateKeyOrEmail Key to load in memory
 * @param passphrase If the key is encrypted passphrase to decrypt it
 * @param mnemonic Faucet mnemonic
 * @param secret Faucet secret
 */
export async function importFaucet(
	toolkit: TezosToolkit,
	privateKeyOrEmail?: string,
	passphrase?: string,
	mnemonic?: string,
	secret?: string,
) {
	if (privateKeyOrEmail && passphrase && mnemonic && secret) {
		return await importKey(toolkit, privateKeyOrEmail, passphrase, mnemonic, secret);
	} else if (mnemonic) {
		const signer = InMemorySigner.fromFundraiser(privateKeyOrEmail ?? '', passphrase ?? '', mnemonic);
		toolkit.setProvider({ signer });
		const pkh = await signer.publicKeyHash();
		let op;
		try {
			op = await toolkit.tz.activate(pkh, secret ?? '');
			if (op) {
				await op.confirmation();
			}
		} catch (ex: any) {
		}
	} else if (privateKeyOrEmail) {
		// Fallback to regular import
		const signer = await InMemorySigner.fromSecretKey(privateKeyOrEmail, passphrase);
		toolkit.setProvider({ signer });
	}
}

const originateToNetworks = (parsedArgs: Opts, currentEnv: Protocol.Environment.t) =>
	currentEnv.networks
		? currentEnv.networks.reduce(
			(retval, networkName) => {
				const network = getNetworkConfig(parsedArgs)(networkName);
				if (network) {
					if (network.rpcUrl) {
						const result = (async () => {
							const tezos = new TezosToolkit(network.rpcUrl as string);
							const key = await getAccountPrivateKey(parsedArgs, network, 'taqRootAccount');
							await importKey(tezos, key);
							return await createBatch(parsedArgs, tezos, networkName);
						})();

						return [...retval, result];
					} else sendErr(`Network "${networkName}" is missing an RPC url in config.json.`);
				} else {
					sendErr(
						`The current environment is configured to use a network called '${networkName}'; however, no network of this name has been configured in .taq/config.json.`,
					);
				}

				return retval;
			},
			[] as Promise<OriginationResult[] | undefined>[],
		)
		: [];

const originateToSandboxes = (parsedArgs: Opts, currentEnv: Protocol.Environment.t) =>
	currentEnv.sandboxes
		? currentEnv.sandboxes.reduce(
			(retval, sandboxName) => {
				const sandbox = getSandboxConfig(parsedArgs)(sandboxName);
				if (sandbox) {
					if (sandbox.rpcUrl) {
						let defaultAccount = getDefaultAccount(parsedArgs)(sandboxName);
						if (!defaultAccount) {
							const first = getFirstAccountAlias(sandboxName, parsedArgs);
							if (first) {
								defaultAccount = getSandboxAccountConfig(parsedArgs)(sandboxName)(first);
								// TODO: The error should be a warning, not an error. Descriptive string should not begin with 'Warning:'
								sendErr(
									`Warning: A default origination account has not been specified for sandbox ${sandboxName}. Taqueria will use the account ${first} for this origination.\nA default account can be specified in .taq/config.json at JSON path: sandbox.${sandboxName}.accounts.default\n`,
								);
							}
						}
						if (defaultAccount) {
							const secretKey = defaultAccount.secretKey;
							const result = (async () => {
								const tezos = new TezosToolkit(sandbox.rpcUrl as string);
								tezos.setProvider({
									signer: new InMemorySigner(secretKey.replace(/^unencrypted:/, '')),
								});
								return await createBatch(parsedArgs, tezos, sandboxName);
							})();

							return [...retval, result];
						} else sendErr(`No accounts are available for the sandbox called ${sandboxName} to perform origination.`);
					} else sendErr(`Sandbox "${sandboxName} is missing an RPC url in config.json."`);
				} else {
					sendErr(
						`The current environment is configured to use a sandbox called '${sandboxName}'; however, no sandbox of this name has been configured in .taq/config.json.`,
					);
				}

				return retval;
			},
			[] as Promise<OriginationResult[] | undefined>[],
		)
		: [];

export const originate = <T>(parsedArgs: Opts) => {
	const env = getCurrentEnvironmentConfig(parsedArgs);

	if (!env) {
		return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json.`);
	}

	const jobs = [
		...originateToNetworks(parsedArgs, env),
		...originateToSandboxes(parsedArgs, env),
	];

	return Promise.all(jobs)
		.then(jobs =>
			jobs.reduce(
				(retval, originations) => {
					return originations
						? [...retval as OriginationResult[], ...originations]
						: retval;
				},
				[],
			)
		)
		.then(results => results && results.length > 0 ? sendJsonRes(results) : sendErr(`No contracts originated.`));
};

export default originate;
