export type ValuePrim =
	| 'Option'
	| 'Unit'
	| 'Bytes'
	| 'Timestamp'
	| 'Mutez'
	| 'Address'
	| 'Key'
	| 'Key_hash'
	| 'Signature'
	| 'Chain_id'
	| 'Bls12_381_g1'
	| 'Bls12_381_g2'
	| 'Bls12_381_fr'
	| 'Sapling_transaction ms'
	| 'Sapling_state ms'
	| 'Ticket'
	| 'Chest'
	| 'Chest_key'
	| 'Tx_rollup_l2_address'
	| 'Pair';

export type MichelineBoolValue = {
	prim: 'True' | 'False';
};

export type MichelineOptionValue = {
	prim: 'None';
} | {
	prim: 'Some';
	args: MichelineValue[];
};

export type MichelineNumberValue = {
	int: string;
};

export type MichelineStringValue = {
	string: string;
};

export type MichelinePairValue = {
	prim: 'Pair';
	args: MichelineValue[];
};

export type MichelineMapItem = {
	prim: 'Elt';
	args: MichelineValue[];
};

export type MichelineMapValue = MichelineMapItem[];

export type MichelineOtherValueObject = {
	prim: ValuePrim;
	args?: MichelineValue[] | undefined;
	string?: string | undefined;
	int?: string | undefined;
	bytes?: string | undefined;
};

export type MichelineValueObject =
	| MichelineOtherValueObject
	| MichelineBoolValue
	| MichelineNumberValue
	| MichelineStringValue
	| MichelineOptionValue
	| MichelinePairValue
	| MichelineMapValue;

export type MichelineValue = MichelineValueObject | MichelineValue[];
