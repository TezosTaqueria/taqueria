export const isNullish = (item: unknown) => {
	return item === undefined || item === null;
};

export const notNullish = (item: unknown) => {
	return !isNullish(item);
};

export function isObject(maybeObject: unknown): maybeObject is Object {
	if (isNullish(maybeObject)) {
		return false;
	}
	if (Array.isArray(maybeObject)) {
		return false;
	}
	return typeof maybeObject === 'object';
}

export type ValidationSuccess = {
	state: 'Valid';
};

export type ValidationFailure = {
	state: 'ImmediateError' | 'DeferredError';
	messages: string[];
	hideErrorAtThisLevel?: boolean | undefined;
	innerErrors?: ValidationFailure[];
};

export type MichelineValidationResult = ValidationSuccess | ValidationFailure;

export function isError(result: MichelineValidationResult): result is ValidationFailure {
	return result.state !== 'Valid';
}

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

export type ValuePrim =
	| 'List'
	| 'Set'
	| 'Option'
	| 'Unit'
	| 'String'
	| 'Nat'
	| 'Int'
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
	| 'True'
	| 'False'
	| 'Pair'
	| 'Map'
	| 'Big_map'
	| 'None'
	| 'Some';

export type MichelineDataType = {
	prim: TypePrim;
	args?: MichelineDataType[];
};

export type MichelineValueObject = {
	prim: ValuePrim;
	args?: MichelineValue[] | undefined;
	string?: string | undefined;
	int?: string | undefined;
	bytes?: string | undefined;
};

export type MichelineValue = MichelineValueObject | MichelineValue[];

export function isValueObject(
	value: MichelineValue | undefined,
	expectedKey: 'prim' | 'int' | 'string' | 'bytes',
): value is MichelineValueObject {
	return value !== null && value !== undefined && typeof value === 'object' && Object.hasOwn(value, expectedKey);
}

export function isValueArray(value: MichelineValue | undefined): value is MichelineValue[] {
	return value !== null && value !== undefined && Array.isArray(value);
}

export const validState: MichelineValidationResult = {
	state: 'Valid',
};
