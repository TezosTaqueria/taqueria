import fetch from 'node-fetch-commonjs';
import { SandboxAccount, SandboxContract } from './SandboxDataHelpers';

export type TzKtHeadData = {
	chain: string;
	chainId: string;
	cycle: number;
	level: number;
	hash: string;
	protocol: string;
	nextProtocol: string;
	timestamp: string;
	votingEpoch: number;
	votingPeriod: number;
	knownLevel: number;
	lastSync: string;
	synced: true;
	quoteLevel: number;
	quoteBtc: number;
	quoteEur: number;
	quoteUsd: number;
	quoteCny: number;
	quoteJpy: number;
	quoteKrw: number;
	quoteEth: number;
	quoteGbp: number;
};

export type TzKTAccountData = {
	type: 'delegate' | 'contract';
	address?: string | null;
	alias?: string | null;
	balance?: number | null; // int64
};

export async function findSmartContractFromTzkt(
	tzktBaseUrl: string,
	sandboxContract: SandboxContract,
): Promise<TzKTAccountData | undefined> {
	const contractAddress = sandboxContract.config.address;
	const response = await fetch(`${tzktBaseUrl}/v1/contracts/${contractAddress}`);
	if (response.status !== 200) {
		// contract could be not originated yet or a fresh sandbox spawned
		return;
	}
	const data = (await response.json()) as TzKTAccountData;
	return data;
}

export async function findAccountInTzKT(
	tzktBaseUrl: string,
	account: SandboxAccount,
): Promise<TzKTAccountData | undefined> {
	const response = await fetch(`${tzktBaseUrl}/v1/accounts/${account.address}`);
	if (response.status !== 200) {
		// a fresh sandbox spawned
		return;
	}
	const data = (await response.json()) as TzKTAccountData;
	return data;
}
