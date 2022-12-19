import fetch from 'node-fetch-commonjs';
import { SandboxAccount, SandboxContract } from './SandboxDataHelpers';

export type TzKTAccountData = {
	address?: string | null;
	alias?: string | null;
	balance?: number | null; // int64
};

export type TzKTContractData = {
	address?: string | null;
	alias?: string | null;
};

export async function getSmartContractFromTzkt(
	tzktBaseUrl: string,
	sandboxContract: SandboxContract,
): Promise<TzKTContractData | undefined> {
	const contractAddress = sandboxContract.config.address;
	const response = await fetch(`${tzktBaseUrl}/v1/contracts/${contractAddress}`);
	if (response.status !== 200) {
		// contract could be not originated yet or a fresh sandbox spawned
		return;
	}
	const data = (await response.json()) as TzKTContractData;
	return data;
}

export async function getAccountFromTzkt(
	tzktBaseUrl: string,
	account: SandboxAccount,
): Promise<TzKTAccountData | undefined> {
	const response = await fetch(`${tzktBaseUrl}/v1/accounts/${account.address}`);
	if (response.status !== 200) {
		// contract could be not originated yet or a fresh sandbox spawned
		return;
	}
	const data = (await response.json()) as TzKTAccountData;
	return data;
}
