export type TypePrim =
	| 'list'
	| 'set'
	| 'option'
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
	| 'bool'
	| 'pair'
	| 'map'
	| 'big_map';

export type MichelineDataType = {
	prim: TypePrim;
	args?: MichelineDataType[];
};
