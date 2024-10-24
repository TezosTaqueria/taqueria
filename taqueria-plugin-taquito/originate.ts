import {
	addTzExtensionIfMissing,
	getArtifactsDir,
	getContractContent,
	getCurrentEnvironment,
	getCurrentEnvironmentConfig,
	NonEmptyString,
	RequestArgs,
	sendAsyncErr,
	sendErr,
	sendJsonRes,
	updateAddressAlias,
} from '@taqueria/node-sdk';
import { OperationContentsAndResultOrigination } from '@taquito/rpc';
import { TezosToolkit, WalletOperationBatch } from '@taquito/taquito';
import { BatchWalletOperation } from '@taquito/taquito/dist/types/wallet/batch-operation';
import { basename, extname, join } from 'path';
import {
	configureToolKitForNetwork,
	configureToolKitForSandbox,
	doWithin,
	getEnvTypeAndNodeConfig,
	handleOpsError,
	OriginateOpts as Opts,
} from './common';

type ContractInfo = {
	contract: string;
	code: string;
	initStorage: string;
	mutezTransfer: number;
};

type TableRow = {
	contract: string;
	address: string;
	alias: string;
	balanceInMutez?: string;
	destination?: string;
};

const getContractPath = (parsedArgs: RequestArgs.t, contractFilename: string) =>
	join(getArtifactsDir(parsedArgs), /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`);

const getDefaultStorageFilename = (contractName: string): string => {
	const baseFilename = basename(contractName, extname(contractName));
	const extFilename = extname(contractName);
	const defaultStorage = `${baseFilename}.default_storage${extFilename}`;
	return defaultStorage;
};

const getContractInfo = async (parsedArgs: Opts): Promise<ContractInfo> => {
	const contract = parsedArgs.contract;
	const protocolArgs = RequestArgs.create(parsedArgs);
	const contractWithTzExtension = addTzExtensionIfMissing(contract);
	const contractCode = await getContractContent(protocolArgs, contractWithTzExtension);
	if (contractCode === undefined) {
		return sendAsyncErr(
			`Please generate ${contractWithTzExtension} with one of the compilers (LIGO, SmartPy, Archetype) or write it manually and put it under /${parsedArgs.config.artifactsDir}\n`,
		);
	}

	const storageFilename = parsedArgs.storage ?? getDefaultStorageFilename(contractWithTzExtension);
	const contractInitStorage = await getContractContent(protocolArgs, storageFilename);
	if (contractInitStorage === undefined) {
		return sendAsyncErr(
			`❌ No initial storage file was found for ${contractWithTzExtension}\nStorage must be specified in a file as a Michelson expression and will automatically be linked to this contract if specified with the name "${
				getDefaultStorageFilename(contractWithTzExtension)
			}" in the artifacts directory\nYou can also manually pass a storage file to the originate task using the --storage STORAGE_FILE_NAME option\n`,
		);
	}

	return {
		contract,
		code: contractCode,
		initStorage: contractInitStorage.trim(),
		mutezTransfer: parseInt(parsedArgs.mutez ?? '0'),
	};
};

const createBatchForOriginate = (
	tezos: TezosToolkit,
	contractsInfo: ContractInfo[],
	gasLimit?: number,
	storageLimit?: number,
	fee?: number,
): WalletOperationBatch =>
	contractsInfo.reduce((acc, contractInfo) =>
		acc.withOrigination({
			gasLimit,
			storageLimit,
			fee,
			code: contractInfo.code,
			init: contractInfo.initStorage,
			balance: contractInfo.mutezTransfer.toString(),
			mutez: true,
		}), tezos.wallet.batch());

const performOriginateOps = async (
	tezos: TezosToolkit,
	env: string,
	contractsInfo: ContractInfo[],
	maxTimeout: number,
	isSandbox = false,
	gasLimit?: number,
	storageLimit?: number,
	fee?: number,
): Promise<BatchWalletOperation> => {
	const batch = createBatchForOriginate(tezos, contractsInfo, gasLimit, storageLimit, fee);

	try {
		const op = await batch.send();
		await op.confirmation(isSandbox ? 1 : 3);
		return op;
	} catch (err) {
		return handleOpsError(err, env);
	}
};

const prepContractInfoForDisplay = async (
	parsedArgs: Opts,
	tezos: TezosToolkit,
	contractInfo: ContractInfo,
	op: BatchWalletOperation,
): Promise<TableRow> => {
	const protocolArgs = RequestArgs.create(parsedArgs);
	const operationResults = await op.operationResults();
	const originationResults = (operationResults ?? [])
		.filter(result => result.kind === 'origination')
		.map(result => result as unknown as OperationContentsAndResultOrigination);

	// Length should be 1 since we are batching originate operations into one
	const result = originationResults.length === 1 ? originationResults[0] : undefined;
	const address = result?.metadata?.operation_result?.originated_contracts?.join(',');
	const alias = parsedArgs.alias ?? basename(contractInfo.contract, extname(contractInfo.contract));

	const displayableAddress = address ?? 'Something went wrong during origination';

	if (address) {
		const validatedAddress = NonEmptyString.create(address);
		await updateAddressAlias(protocolArgs, alias, validatedAddress);
	}

	return {
		contract: contractInfo.contract,
		address: displayableAddress,
		alias: address ? alias : 'N/A',
		// destination: tezos.rpc.getRpcUrl(),
	};
};

const originate = async (parsedArgs: Opts): Promise<void> => {
	const protocolArgs = RequestArgs.create(parsedArgs);
	const env = getCurrentEnvironmentConfig(protocolArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json`);
	try {
		const [envType, nodeConfig] = await getEnvTypeAndNodeConfig(protocolArgs, env);
		const tezos = await (envType === 'Network'
			? configureToolKitForNetwork(protocolArgs, nodeConfig, parsedArgs.sender)
			: configureToolKitForSandbox(nodeConfig, parsedArgs.sender));

		const contractInfo = await getContractInfo(parsedArgs);

		const op = await performOriginateOps(
			tezos,
			getCurrentEnvironment(protocolArgs),
			[contractInfo],
			parsedArgs.timeout,
			envType !== 'Network',
			parsedArgs.gasLimit,
			parsedArgs.storageLimit,
			parsedArgs.fee,
		);

		const contractInfoForDisplay = await prepContractInfoForDisplay(parsedArgs, tezos, contractInfo, op);
		return sendJsonRes([contractInfoForDisplay]);
	} catch (e) {
		if (e instanceof Error && e.message.includes('503')) {
			try {
				const [envType, nodeConfig] = await getEnvTypeAndNodeConfig(protocolArgs, env);
				if (envType === 'Network' && nodeConfig.rpcUrl.includes('ghostnet')) {
					return sendAsyncErr(
						`❌ Ghostnet is returning 503 errors, indicating that the server is under heavy load.\nPlease try again later.`,
					);
				}
				return sendAsyncErr(
					`❌ The node you are trying to connect to is not available\nPlease check if the node is running and the URL is correct in your config.json`,
				);
			} catch {
				// Resort to the default error message
			}
		}
		return sendAsyncErr('No operations performed');
	}
};

export default originate;
