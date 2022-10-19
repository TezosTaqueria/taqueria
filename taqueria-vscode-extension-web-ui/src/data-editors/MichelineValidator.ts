type ValidationSuccess = {
	state: 'Valid';
};

type ValidationFailure = {
	state: 'ImmediateError' | 'DeferredError';
	messages: string[];
	errorShouldBeShownAtThisLevel?: boolean | undefined;
	innerErrors?: ValidationFailure[];
};

export type MichelineValidationResult = ValidationSuccess | ValidationFailure;

function isError(result: MichelineValidationResult): result is ValidationFailure {
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
	| 'Big_map';

export type MichelineDataType = {
	prim: TypePrim;
	args?: MichelineDataType[];
};

export type MichelineValue = {
	prim: ValuePrim;
	args?: MichelineValue[] | undefined;
	string?: string | undefined;
	int?: string | undefined;
} | MichelineValue[];

export const validState: MichelineValidationResult = {
	state: 'Valid',
};

export const validate = (dataType: MichelineDataType, value: MichelineValue | undefined): MichelineValidationResult => {
	if (!value) {
		return {
			state: 'ImmediateError',
			messages: [`Value is expected to be an object with at least one of 'prim', 'string' and 'int' fields.`],
		};
	}
	switch (dataType.prim) {
		case 'list':
			return validateList(dataType, value);
		case 'set':
		case 'option':
			const listResult = validateList(dataType, value);
			if (listResult.state !== 'Valid') {
				return listResult;
			}
			return itemsAreSortedAndUnique(dataType, value);
		case 'unit':
		case 'string':
			return { state: 'Valid' };
		case 'int':
			return isValidNumber(dataType, value);
		case 'nat':
			return isValidNumber(dataType, value);
		case 'bytes':
			return isValidBytes(dataType, value);
		case 'timestamp':
		case 'mutez':
		case 'address':
		case 'key':
		case 'key_hash':
		case 'signature':
		case 'chain_id':
		case 'bls12_381_g1':
		case 'bls12_381_g2':
		case 'bls12_381_fr':
		case 'sapling_transaction ms':
		case 'sapling_state ms':
		case 'ticket':
		case 'chest':
		case 'chest_key':
		case 'tx_rollup_l2_address':
			return { state: 'Valid' };
		case 'bool':
			return value.prim === 'True' || value.prim === 'False'
				? validState
				: { state: 'ImmediateError', 'messages': [`Not a valid bool value.`] };
		case 'pair':
			return isValidPair(dataType, value);
		case 'map':
		case 'big_map':
			return isValidMap(dataType, value);
	}
};

const validateList = (dataType: MichelineDataType, value: MichelineValue): MichelineValidationResult => {
	if (value.prim?.toLowerCase() !== dataType.prim || value.args === undefined || !Array.isArray(value.args)) {
		return {
			state: 'ImmediateError',
			messages: [`Wrong value shape for ${dataType.prim}`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
	const itemErrors = value.args.map(v => validate(dataType.args![0], v))
		.filter(isError);
	return aggregateChildErrors(dataType, value, itemErrors);
};

const aggregateChildErrors = (
	dataType: MichelineDataType,
	value: MichelineValue,
	itemErrors: ValidationFailure[],
): MichelineValidationResult => {
	if (itemErrors.length === 0) {
		return validState;
	}
	const firstImmediateErrorIndex = itemErrors.findIndex(x => x.state === 'ImmediateError');
	return {
		state: firstImmediateErrorIndex === -1 ? 'DeferredError' : 'ImmediateError',
		messages: ['Validation Errors in items'],
		errorShouldBeShownAtThisLevel: false,
		innerErrors: itemErrors,
	};
};

const itemsAreSortedAndUnique = (dataType: MichelineDataType, value: MichelineValue): MichelineValidationResult => {
	if (!value.args || !value.args.length || value.args.length <= 1) {
		return validState;
	}
	for (let i = 1; i < value.args?.length; i++) {
		if (!isGreater(dataType.args![0], value.args[i - 1], value.args[i])) {
			return {
				state: 'DeferredError',
				messages: [`Items in a ${dataType.prim} should be sorted and unique`],
				errorShouldBeShownAtThisLevel: true,
			};
		}
	}
	return validState;
};

const isValidNumber = (dataType: MichelineDataType, value: MichelineValue): MichelineValidationResult => {
	if (!value.int || !value.int.length) {
		return {
			state: 'ImmediateError',
			messages: [`No value is entered for the ${dataType.prim} field`],
		};
	}
	const regex = dataType.prim === 'int' ? /^\d+$/ : /-?^\d+$/;
	if (regex!.test(value.int)) {
		return {
			state: 'ImmediateError',
			messages: [`Invalid value ${value.int} for ${dataType.prim}`],
		};
	}
	const number = Number(value.int);
	return validState;
};

const isValidPair = (dataType: MichelineDataType, value: MichelineValue): MichelineValidationResult => {
	const itemErrors = dataType.args!.map((type, index) => validate(type, value.args?.[index]))
		.filter(isError);
	return aggregateChildErrors(dataType, value, itemErrors);
};

const isValidMap = (dataType: MichelineDataType, value: MichelineValue): MichelineValidationResult => {
	var keyErrors = value.args!.map((type, index) => validate(dataType.args![0], value.args?.[index]))
		.filter(isError);
	const itemErrors = dataType.args!.map((type, index) => validate(type, value.args?.[index]))
		.filter(isError);
	return aggregateChildErrors(dataType, value, itemErrors);
};

const isValidBytes = (dataType: MichelineDataType, value: MichelineValue): MichelineValidationResult => {
	return validState; // TODO: Complete the implementation
};

const isGreater = (dataType: MichelineDataType, value1: MichelineValue, value2: MichelineValue): boolean => {
	switch (dataType.prim) {
		case 'unit':
			return false;
		case 'string':
			if (value1.string === undefined || value2.string === undefined) {
				throw new Error('Cannot compare null strings');
			}
			return value2.string! > value1.string!;
		case 'int':
		case 'nat':
			if (!value1.int || !value2.int) {
				throw new Error('Cannot compare empty ints');
			}
			const int1 = Number.parseInt(value1.int, 10);
			const int2 = Number.parseInt(value2.int, 10);
			return int2 > int1;
		case 'list':
		case 'set':
		case 'option':
		case 'bytes':
		case 'timestamp':
		case 'mutez':
		case 'address':
		case 'key':
		case 'key_hash':
		case 'signature':
		case 'chain_id':
		case 'bls12_381_g1':
		case 'bls12_381_g2':
		case 'bls12_381_fr':
		case 'sapling_transaction ms':
		case 'sapling_state ms':
		case 'ticket':
		case 'chest':
		case 'chest_key':
		case 'tx_rollup_l2_address':
		case 'bool':
		case 'pair':
		case 'map':
		case 'big_map':
		default:
			return true; // TODO: Complete the implementation
	}
};
