export type Blocktime = number;

export type FlextesaBakingEnabled = {
	baking?: 'enabled';
	block_time?: Blocktime;
};

export type FlextesaBakingDisabled = {
	baking: 'disabled';
};

export type FlextesaBakingAuto = {
	baking: 'auto';
};

export type FlextesaAnnotations = FlextesaBakingEnabled | FlextesaBakingDisabled | FlextesaBakingAuto;
