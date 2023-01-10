export type TokenInfo_TzKt = {
	id: number;
	contract: AccountReferenece;
	tokenId: string;
	standard: string;
	firstMinter: AccountReferenece;
	firstLevel: number;
	firstTime: string;
	lastLevel: number;
	lastTime: string;
	transfersCount: number;
	balancesCount: number;
	holdersCount: number;
	totalMinted: string;
	totalBurned: string;
	totalSupply: string;
	metadata: TokenMetadata;
};

export type TokenInfo_Dipdup = {
	id: bigint;
	token_id: bigint;
	link: string | undefined | null;
	metadata: string | undefined | null;
	image_processed: boolean | undefined | null;
};

export type TokenMetadata = {
	name?: string | undefined;
};

export type AccountReferenece = {
	alias: string;
	address: string;
};
