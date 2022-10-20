import { getFriendlyDataType } from './MichelineEditor';

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

function isValueObject(
	value: MichelineValue | undefined,
	expectedKey: 'prim' | 'int' | 'string' | 'bytes',
): value is MichelineValueObject {
	return value !== null && value !== undefined && typeof value === 'object' && Object.hasOwn(value, expectedKey);
}

function isValueArray(value: MichelineValue | undefined): value is MichelineValue[] {
	return value !== null && value !== undefined && Array.isArray(value);
}

export const validState: MichelineValidationResult = {
	state: 'Valid',
};

export const validate = (
	dataType: MichelineDataType,
	value?: MichelineValue | undefined,
): MichelineValidationResult => {
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
			return validateBool(dataType, value);
		case 'pair':
			return isValidPair(dataType, value);
		case 'map':
		case 'big_map':
			return isValidMap(dataType, value);
	}
};

const validateBool = (dataType: MichelineDataType, value?: MichelineValue | undefined): MichelineValidationResult => {
	if (!isValueObject(value, 'prim')) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
	return value.prim === 'True' || value.prim === 'False'
		? validState
		: { state: 'ImmediateError', 'messages': [`Not a valid bool value.`] };
};

const validateList = (dataType: MichelineDataType, value?: MichelineValue | undefined): MichelineValidationResult => {
	if (!isValueArray(value)) {
		return {
			state: 'ImmediateError',
			messages: [`Wrong value shape for ${dataType.prim}`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
	const itemErrors = value.map(v => validate(dataType.args![0], v))
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

const itemsAreSortedAndUnique = (
	dataType: MichelineDataType,
	value?: MichelineValue | undefined,
): MichelineValidationResult => {
	if (!isValueArray(value)) {
		return {
			state: 'ImmediateError',
			messages: [`Wrong value shape for ${dataType.prim}`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
	if (value.length <= 1) {
		return validState;
	}
	for (let i = 1; i < value?.length; i++) {
		if (compare(dataType.args![0], value[i - 1], value[i]) <= 0) {
			return {
				state: 'DeferredError',
				messages: [`Items in a ${dataType.prim} should be sorted and unique`],
				errorShouldBeShownAtThisLevel: true,
			};
		}
	}
	return validState;
};

const isValidNumber = (dataType: MichelineDataType, value?: MichelineValue | undefined): MichelineValidationResult => {
	if (!isValueObject(value, 'int')) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
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
	return validState;
};

const isValidPair = (dataType: MichelineDataType, value?: MichelineValue | undefined): MichelineValidationResult => {
	if (!isValueObject(value, 'prim')) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
	const itemErrors = dataType.args!.map((type, index) => validate(type, value.args?.[index]))
		.filter(isError);
	return aggregateChildErrors(dataType, value, itemErrors);
};

const isValidMap = (dataType: MichelineDataType, value?: MichelineValue | undefined): MichelineValidationResult => {
	if (!isValueArray(value)) {
		return {
			state: 'ImmediateError',
			messages: [`Wrong value shape for ${dataType.prim}`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
	let itemErrors: ValidationFailure[] = [];
	let previousItem: any = undefined;
	let hasUniquaAndSortError = false;
	for (const item of value) {
		if (!isValueObject(item, 'prim') || !item.args || item.args.length != 2) {
			itemErrors.push({
				state: 'ImmediateError',
				messages: [`Value item does not have a good shape for an item of ${getFriendlyDataType(dataType)}`],
				errorShouldBeShownAtThisLevel: true,
			});
			continue;
		}
		const keyResult = validate(dataType.args![0], item.args[0]);
		if (keyResult.state !== 'Valid') {
			itemErrors.push(keyResult);
		}

		const valueResult = validate(dataType.args![1], item.args[1]);
		if (valueResult.state !== 'Valid') {
			itemErrors.push(valueResult);
		}

		if (keyResult.state !== 'Valid' || valueResult.state !== 'Valid') {
			continue;
		}

		if (previousItem && !hasUniquaAndSortError) {
			const keyComparison = compare(dataType.args![0], previousItem.args[0], item.args[0]);
			if (keyComparison < 0) {
				itemErrors.push({
					state: 'DeferredError',
					messages: ['Map keys are not sorted properly'],
					errorShouldBeShownAtThisLevel: true,
				});
				hasUniquaAndSortError = true;
			} else if (keyComparison === 0) {
				itemErrors.push({
					state: 'DeferredError',
					messages: ['Map keys are not unique'],
					errorShouldBeShownAtThisLevel: true,
				});
				hasUniquaAndSortError = true;
			}
		}
		previousItem = item;
	}
	return aggregateChildErrors(dataType, value, itemErrors);
};

const isValidBytes = (dataType: MichelineDataType, value?: MichelineValue | undefined): MichelineValidationResult => {
	if (!isValueObject(value, 'bytes')) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
	if (!value.bytes || !value.bytes.length) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Bytes value should is empty`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
	if (!/^[0-9a-fA-F]+$/.test(value.bytes!)) {
		return {
			state: 'ImmediateError' as const,
			messages: [`A bytes value should only have 0-9, a-z and/or A-Z characters`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
	if (value.bytes?.length % 2 !== 0) {
		return {
			state: 'ImmediateError' as const,
			messages: [`A bytes value should have an even number of hexadecimal characters`],
			errorShouldBeShownAtThisLevel: true,
		};
	}
	return validState;
};

// returns 1 if value2 is greater than value1, 0 if they are equal, and -1 if value2 is less than value1
const compare = (dataType: MichelineDataType, value1: MichelineValue, value2: MichelineValue): number => {
	'strung'.localeCompare;
	switch (dataType.prim) {
		case 'unit':
			return 0;
		case 'bytes':
		case 'string':
			const s1 = (value1 as { string: string }).string;
			const s2 = (value2 as { string: string }).string;
			return s2 > s1 ? 1 : s2 < s1 ? -1 : 0;
		case 'int':
		case 'nat':
			const i1 = Number((value1 as { int: string }).int);
			const i2 = Number((value2 as { int: string }).int);
			return i2 > i1 ? 1 : i2 < i1 ? -1 : 0;
		case 'list':
		case 'set':
			return compareList(dataType, value1 as MichelineValue[], value2 as MichelineValue[]);
		case 'map':
		case 'big_map':
			return compareMap(dataType, value1 as MichelineValueObject, value2 as MichelineValueObject);
		case 'option':
			return compareOption(dataType, value1 as MichelineValueObject, value2 as MichelineValueObject);
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
			const t1 = (value1 as { string: string }).string;
			const t2 = (value2 as { string: string }).string;
			return t2 > t1 ? 1 : t2 < t1 ? -1 : 0;
		case 'bool':
			return compareBool(dataType, value1 as MichelineValueObject, value2 as MichelineValueObject);
		case 'pair':
			return comparePair(dataType, value1 as MichelineValueObject, value2 as MichelineValueObject);
		default:
			throw new Error(`Comparison is not implemented for ${dataType.prim} yet.`); // TODO: Complete the implementation
	}
};

function compareOption(
	dataType: MichelineDataType,
	value1: MichelineValueObject,
	value2: MichelineValueObject,
): number {
	if (value1.prim === 'None' && value2.prim === 'None') {
		return 0;
	}
	if (value1.prim === 'None') {
		return 1;
	}
	if (value1.prim === 'Some') {
		return -1;
	}
	return compare(dataType.args![0], value1.args![0], value2.args![0]);
}

function compareList(dataType: MichelineDataType, value1: MichelineValue[], value2: MichelineValue[]): number {
	const l1 = value1.length;
	const l2 = value2.length;
	const commonElementCount = Math.min(l1, l2);
	for (let i = 0; i < commonElementCount; i++) {
		const result = compare(dataType.args![0], value1[i], value2[i]);
		if (result !== 0) {
			return result;
		}
	}
	return l2 > l1 ? 1 : l2 < l1 ? -1 : 0;
}

function compareBool(dataType: MichelineDataType, value1: MichelineValueObject, value2: MichelineValueObject): number {
	return value2.prim > value1.prim ? 1 : value2.prim < value1.prim ? -1 : 0;
}

function comparePair(dataType: MichelineDataType, value1: MichelineValueObject, value2: MichelineValueObject): number {
	const l1 = value1.args!.length;
	const l2 = value2.args!.length;
	const commonElementCount = Math.min(l1, l2);
	for (let i = 0; i < commonElementCount; i++) {
		const result = compare(dataType.args![i], value1.args![i], value2.args![i]);
		if (result !== 0) {
			return result;
		}
	}
	return l2 > l1 ? 1 : l2 < l1 ? -1 : 0;
}

function compareMap(dataType: MichelineDataType, value1: MichelineValueObject, value2: MichelineValueObject): number {
	const l1 = value1.args!.length;
	const l2 = value2.args!.length;
	const commonElementCount = Math.min(l1, l2);
	for (let i = 0; i < commonElementCount; i++) {
		const result = compare(
			dataType.args![0],
			(value1.args![i] as MichelineValueObject).args![0],
			(value2.args![i] as MichelineValueObject).args![0],
		);
		if (result !== 0) {
			return result;
		}
	}
	return l2 > l1 ? 1 : l2 < l1 ? -1 : 0;
}
