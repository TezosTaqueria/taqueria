export type TzKtHead = {
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

export type SandboxModel = {
	sandboxName: string;
	flextesaContainerName: string;
	sandboxState: 'Running' | 'Stopped' | undefined;
	sandBoxLevel: number | undefined;
	indexerLevel: number | undefined;

	implicitAccounts: ImplicitAccountModel[];
	smartContracts: SmartContractModel[];
};

export type ImplicitAccountModel = {};

export type SmartContractModel = {};
