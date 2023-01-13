import fetch from 'node-fetch-commonjs';

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

export type TzKTContractEntrypointData = {
	name: string;
	jsonParameters?: any;
	michelineParameters: any;
	michelsonParameters?: string;
};

export type TzKTOperationData = {
	type: string;
	hash: string;
};

export async function findContractInTzkt(
	tzktBaseUrl: string,
	contractAddress: string,
): Promise<TzKTAccountData | undefined> {
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
	accountAddress: string,
): Promise<TzKTAccountData | undefined> {
	const response = await fetch(`${tzktBaseUrl}/v1/accounts/${accountAddress}`);
	if (response.status !== 200) {
		// could be a fresh sandbox spawned
		return;
	}
	const data = (await response.json()) as TzKTAccountData;
	return data;
}

export async function findContractEntrypointsInTzKT(
	tzktBaseUrl: string,
	contractAddress: string,
): Promise<TzKTContractEntrypointData[] | undefined> {
	const response = await fetch(
		`${tzktBaseUrl}/v1/contracts/${contractAddress}/entrypoints?micheline=true&michelson=true`,
	);
	if (response.status !== 200) {
		return;
	}
	const data = (await response.json()) as TzKTContractEntrypointData[];
	return data;
}

export async function findOperationsInTzKT(
	tzktBaseUrl: string,
	address: string,
): Promise<TzKTOperationData[] | undefined> {
	const response = await fetch(`${tzktBaseUrl}/v1/accounts/${address}/operations`);
	if (response.status !== 200) {
		return;
	}
	const data = (await response.json()) as TzKTOperationData[];
	return data;
}
