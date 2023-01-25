export type TypesWithArgs =
	| 'list'
	| 'set'
	| 'option'
	| 'pair'
	| 'map'
	| 'big_map'
	| 'or'
	| 'contract';

export type TypesWithoutArgs =
	| 'unit'
	| 'string'
	| 'nat'
	| 'int'
	| 'bytes'
	| 'timestamp'
	| 'mutez'
	| 'address'
	| 'key'
	| 'key_hash'
	| 'signature'
	| 'chain_id'
	| 'bls12_381_g1'
	| 'bls12_381_g2'
	| 'bls12_381_fr'
	| 'sapling_transaction ms'
	| 'sapling_state ms'
	| 'ticket'
	| 'chest'
	| 'chest_key'
	| 'tx_rollup_l2_address'
	| 'bool';

export type MichelineDataTypeWithoutArgs = {
	prim: TypesWithoutArgs;
	annots?: string[] | undefined;
};

export type MichelineDataTypeWithArgs = {
	prim: TypesWithArgs;
	args: MichelineDataType[];
	annots?: string[] | undefined;
};

export type MichelineDataType = MichelineDataTypeWithoutArgs | MichelineDataTypeWithArgs;
