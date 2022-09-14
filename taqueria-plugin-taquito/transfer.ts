import {
	getAddressOfAlias,
	getCurrentEnvironmentConfig,
	getDefaultAccount,
	getNetworkConfig,
	getParameter,
	getSandboxAccountConfig,
	getSandboxAccountNames,
	getSandboxConfig,
	sendAsyncErr,
	sendErr,
	sendJsonRes,
} from '@taqueria/node-sdk';
import { Environment, RequestArgs } from '@taqueria/node-sdk/types';
import { Expr, Parser } from '@taquito/michel-codec';
import { importKey, InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';

interface Opts extends RequestArgs.t {
	contract: string;
	tez?: string;
	param?: string;
	entrypoint?: string;
}

type TableRow = {
	contractAlias: string;
	contractAddress: string;
	tezTransfer: string;
	parameter: string;
	entrypoint: string;
	destination: string;
};

const getFirstAccountAlias = (sandboxName: string, opts: Opts) => {
	const aliases = getSandboxAccountNames(opts)(sandboxName);
	return aliases.shift();
};

const configureToolKitWithSandbox = async (parsedArgs: Opts, sandboxName: string): Promise<TezosToolkit> => {
	const sandbox = getSandboxConfig(parsedArgs)(sandboxName);
	if (!sandbox) {
		return sendAsyncErr(
			`The current environment is configured to use a sandbox called '${sandboxName}'; however, no sandbox of this name has been configured in .taq/config.json.`,
		);
	}

	let defaultAccount = getDefaultAccount(parsedArgs)(sandboxName);
	if (!defaultAccount) {
		const first = getFirstAccountAlias(sandboxName, parsedArgs);
		if (first) {
			defaultAccount = getSandboxAccountConfig(parsedArgs)(sandboxName)(first);
			sendErr(
				`Warning: A default account has not been specified for sandbox ${sandboxName}. Taqueria will use the account ${first} for this operation.\nA default account can be specified in .taq/config.json at JSON path: sandbox.${sandboxName}.accounts.default\n`,
			);
		}
	}
	if (!defaultAccount) {
		return sendAsyncErr(`No accounts are available for the sandbox called ${sandboxName} to perform the operation.`);
	}

	const tezos = new TezosToolkit(sandbox.rpcUrl as string);
	tezos.setProvider({
		signer: new InMemorySigner((defaultAccount.secretKey as string).replace(/^unencrypted:/, '')),
	});
	return tezos;
};

const configureToolKitWithNetwork = async (parsedArgs: Opts, networkName: string): Promise<TezosToolkit> => {
	const network = getNetworkConfig(parsedArgs)(networkName);
	if (!network) {
		return sendAsyncErr(
			`The current environment is configured to use a network called '${networkName}'; however, no network of this name has been configured in .taq/config.json.`,
		);
	}

	const faucet = network.faucet;
	if (!faucet) return sendAsyncErr(`Network ${networkName} requires a valid faucet in config.json.`);

	const tezos = new TezosToolkit(network.rpcUrl as string);
	await importKey(
		tezos,
		network.faucet.email,
		network.faucet.password,
		network.faucet.mnemonic.join(' '),
		network.faucet.activation_code,
	);
	return tezos;
};

const configureTezosToolKit = (parsedArgs: Opts, env: Environment.t): Promise<TezosToolkit> => {
	const targetConstraintErrMsg = 'Each environment can only have one target, be it a sandbox or a network';
	if (env.sandboxes?.length === 1 && env.networks?.length === 1) return sendAsyncErr(targetConstraintErrMsg);
	if (env.sandboxes?.length === 1) return configureToolKitWithSandbox(parsedArgs, env.sandboxes[0]);
	if (env.networks?.length === 1) return configureToolKitWithNetwork(parsedArgs, env.networks[0]);
	return sendAsyncErr(targetConstraintErrMsg);
};

const isContractAddress = (contract: string): boolean =>
	contract.startsWith('tz1') || contract.startsWith('tz2') || contract.startsWith('tz3') || contract.startsWith('KT1');

const getContractInfo = async (parsedArgs: Opts, env: Environment.t, tezos: TezosToolkit): Promise<TableRow> => {
	const contract = parsedArgs.contract;
	return {
		contractAlias: isContractAddress(contract) ? 'N/A' : contract,
		contractAddress: isContractAddress(contract) ? contract : await getAddressOfAlias(env, contract),
		tezTransfer: parsedArgs.tez ?? '0',
		parameter: parsedArgs.param ? await getParameter(parsedArgs, parsedArgs.param) : 'Unit',
		entrypoint: parsedArgs.entrypoint ?? 'default',
		destination: tezos.rpc.getRpcUrl(),
	};
};

const performTransferOp = (tezos: TezosToolkit, contractInfo: TableRow): Promise<string> => {
	return tezos.contract
		.transfer({
			to: contractInfo.contractAddress,
			amount: parseFloat(contractInfo.tezTransfer),
			parameter: {
				entrypoint: contractInfo.entrypoint,
				value: new Parser().parseMichelineExpression(contractInfo.parameter) as Expr,
			},
		})
		.then(op => op.confirmation().then(() => op.hash))
		.catch(err => sendAsyncErr(`Error during transfer operation:\n${err} ${JSON.stringify(err, null, 2)}`));
};

export const transfer = async (parsedArgs: Opts): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json.`);
	try {
		const tezos = await configureTezosToolKit(parsedArgs, env);
		const contractInfo = await getContractInfo(parsedArgs, env, tezos);
		await performTransferOp(tezos, contractInfo);
		return sendJsonRes([contractInfo]);
	} catch {
		return sendAsyncErr('No operations performed.');
	}
};

export default transfer;
