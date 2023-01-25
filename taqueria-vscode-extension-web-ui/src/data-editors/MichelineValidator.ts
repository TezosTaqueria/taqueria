import {
	hasArgs,
	hasPrim,
	isError,
	isValueArray,
	isValueObject,
	MichelineValidationResult,
	ValidationFailure,
	ValidationSuccess,
	validState,
} from '../Helpers';
import { MichelineDataType, MichelineDataTypeWithArgs } from '../MichelineDataType';
import {
	MichelineBoolValue,
	MichelineMapValue,
	MichelineNumberValue,
	MichelineOptionValue,
	MichelineOrValue,
	MichelinePairValue,
	MichelineStringValue,
	MichelineValue,
} from '../MichelineValue';
import { getFriendlyDataType } from './MichelineEditor';

export const validate = (
	dataType: MichelineDataType,
	value?: MichelineValue | undefined,
): MichelineValidationResult => {
	switch (dataType.prim) {
		case 'list':
			return validateList(dataType, value);
		case 'set':
			const listResult = validateList(dataType, value);
			if (listResult.state !== 'Valid') {
				return listResult;
			}
			return itemsAreSortedAndUnique(dataType, value);
		case 'option':
			return validateOption(dataType, value);
		case 'unit':
		case 'string':
			return validState;
		case 'int':
			return isValidNumber(dataType, value);
		case 'nat':
			return isValidNumber(dataType, value);
		case 'bytes':
			return isValidBytes(dataType, value);
		case 'timestamp':
		case 'mutez':
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
			return validState;
		case 'bool':
			return validateBool(dataType, value);
		case 'pair':
			return isValidPair(dataType, value);
		case 'map':
		case 'big_map':
			return isValidMap(dataType, value);
		case 'or':
			return isValieOr(dataType, value);
		case 'address':
		case 'contract':
			return isValidContract(dataType, value);
	}
};

const validateOption = (
	dataType: MichelineDataTypeWithArgs,
	v?: MichelineValue | undefined,
): MichelineValidationResult => {
	if (!isValueObject(v, 'prim') || !hasPrim(v) || !['None', 'Some'].includes(v.prim)) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
		};
	}
	const value = v as MichelineOptionValue;
	if (value.prim === 'None') {
		return validState;
	}
	return validate(dataType.args[0], value.args[0]);
};

const validateBool = (dataType: MichelineDataType, v?: MichelineValue | undefined): MichelineValidationResult => {
	if (!isValueObject(v, 'prim') || !hasPrim(v)) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
		};
	}
	const value = v as MichelineBoolValue;
	return value.prim === 'True' || value.prim === 'False'
		? validState
		: { state: 'ImmediateError', 'messages': [`Not a valid bool value.`] };
};

const validateList = (
	dataType: MichelineDataTypeWithArgs,
	value?: MichelineValue | undefined,
): MichelineValidationResult => {
	if (!isValueArray(value)) {
		return {
			state: 'ImmediateError',
			messages: [`Wrong value shape for ${dataType.prim}`],
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
		hideErrorAtThisLevel: true,
		innerErrors: itemErrors,
	};
};

const itemsAreSortedAndUnique = (
	dataType: MichelineDataTypeWithArgs,
	value?: MichelineValue | undefined,
): MichelineValidationResult => {
	if (!isValueArray(value)) {
		return {
			state: 'ImmediateError',
			messages: [`Wrong value shape for ${dataType.prim}`],
		};
	}
	if (value.length <= 1) {
		return validState;
	}
	for (let i = 1; i < value?.length; i++) {
		if (compare(dataType.args[0], value[i], value[i - 1]) <= 0) {
			return {
				state: 'DeferredError',
				messages: [`Items in a ${dataType.prim} should be sorted and unique`],
			};
		}
	}
	return validState;
};

const isValidNumber = (dataType: MichelineDataType, v?: MichelineValue | undefined): MichelineValidationResult => {
	if (!isValueObject(v, 'int')) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
		};
	}
	const value = v as MichelineNumberValue;
	if (!value.int || !value.int.length) {
		return {
			state: 'ImmediateError',
			messages: [`No value is entered for the ${dataType.prim} field`],
		};
	}
	const regex = dataType.prim === 'nat' ? /^\d+$/ : /^-?\d+$/;
	if (!regex.test(value.int)) {
		return {
			state: 'ImmediateError',
			messages: [`Invalid value ${value.int} for ${dataType.prim}`],
		};
	}
	return validState;
};

const isValidPair = (
	dataType: MichelineDataTypeWithArgs,
	v?: MichelineValue | undefined,
): MichelineValidationResult => {
	if (!isValueObject(v, 'prim') || !hasPrim(v, 'Pair') || !hasArgs(v)) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
		};
	}
	const value = v as MichelinePairValue;
	const itemErrors = dataType.args.map((type, index) => validate(type, value.args[index]))
		.filter(isError);
	return aggregateChildErrors(dataType, value, itemErrors);
};

const isValidMap = (dataType: MichelineDataTypeWithArgs, v?: MichelineValue | undefined): MichelineValidationResult => {
	if (!isValueArray(v)) {
		return {
			state: 'ImmediateError',
			messages: [`Wrong value shape for ${dataType.prim}`],
		};
	}
	const value = v as MichelineValue[];
	let itemErrors: ValidationFailure[] = [];
	for (const item of value) {
		if (
			!isValueObject(item, 'prim') || !hasPrim(item, 'Elt') || !hasArgs(item) || !item.args || item.args.length != 2
		) {
			itemErrors.push({
				state: 'ImmediateError',
				messages: [`Value item does not have a good shape for an item of ${getFriendlyDataType(dataType)}`],
			});
			continue;
		}
		const keyResult = validate(dataType.args[0], item.args[0]);
		if (keyResult.state !== 'Valid') {
			itemErrors.push(keyResult);
		}

		const valueResult = validate(dataType.args[1], item.args[1]);
		if (valueResult.state !== 'Valid') {
			itemErrors.push(valueResult);
		}
	}
	if (itemErrors.length) {
		return aggregateChildErrors(dataType, value, itemErrors);
	}

	const mapValue = value as { args: MichelineValue[] }[];

	let previousItem: { args: MichelineValue[] } | undefined = undefined;
	for (const item of mapValue) {
		if (previousItem) {
			const keyComparison = compare(dataType.args[0], item.args[0], previousItem.args[0]);
			if (keyComparison < 0) {
				return {
					state: 'DeferredError',
					messages: ['Map keys are not sorted properly'],
				};
			} else if (keyComparison === 0) {
				return {
					state: 'DeferredError',
					messages: ['Map keys are not unique'],
				};
			}
		}
		previousItem = item;
	}
	return validState;
};

const isValidBytes = (dataType: MichelineDataType, v?: MichelineValue | undefined): MichelineValidationResult => {
	if (!isValueObject(v, 'bytes')) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
		};
	}
	const value = v as { bytes: string };
	if (!value.bytes || !value.bytes.length) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Bytes value should is empty`],
		};
	}
	if (!/^[0-9a-fA-F]+$/.test(value.bytes!)) {
		return {
			state: 'ImmediateError' as const,
			messages: [`A bytes value should only have 0-9, a-z and/or A-Z characters`],
		};
	}
	if (value.bytes?.length % 2 !== 0) {
		return {
			state: 'ImmediateError' as const,
			messages: [`A bytes value should have an even number of hexadecimal characters`],
		};
	}
	return validState;
};

function isValieOr(dataType: MichelineDataTypeWithArgs, v: MichelineValue | undefined): MichelineValidationResult {
	if (!isValueObject(v, 'prim') || !hasArgs(v)) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
		};
	}
	const value = v as MichelineOrValue;
	if (value.prim !== 'Left' && value.prim !== 'Right') {
		return {
			state: 'ImmediateError',
			messages: [''],
		};
	}
	const index = value.prim === 'Left' ? 0 : 1;
	return validate(dataType.args[index], value.args?.[0]);
}

function isValidContract(
	dataType: MichelineDataType,
	v: MichelineValue | undefined,
): MichelineValidationResult {
	if (!isValueObject(v, 'string')) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Wrong value shape for ${dataType.prim}`],
		};
	}
	const value = v as MichelineStringValue;
	const address = value.string;
	if (!address) {
		return {
			state: 'ImmediateError' as const,
			messages: [`Address is empty`],
		};
	}
	// Here we can have better validation like:
	// - Checking the address format, but new protocols add new formats
	// - Also we can check that the address exists on the target network, but then we need to
	// 		have context about what network we are validating for
	// - Also, we can check that the contract actually has an entrypoint with the correct datatype.
	return validState;
}

// returns 1 if value2 is greater than value1, 0 if they are equal, and -1 if value2 is less than value1
export const compare = (dataType: MichelineDataType, value2: MichelineValue, value1: MichelineValue): number => {
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
			return compareList(dataType, value2 as MichelineValue[], value1 as MichelineValue[]);
		case 'map':
		case 'big_map':
			return compareMap(dataType, value2 as MichelineMapValue, value1 as MichelineMapValue);
		case 'option':
			return compareOption(dataType, value2 as MichelineOptionValue, value1 as MichelineOptionValue);
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
			return compareBool(dataType, value2 as MichelineBoolValue, value1 as MichelineBoolValue);
		case 'pair':
			return comparePair(dataType, value2 as MichelinePairValue, value1 as MichelinePairValue);
		default:
			throw new Error(`Comparison is not implemented for ${JSON.stringify(dataType)} yet.`); // TODO: Complete the implementation
	}
};

function compareOption(
	dataType: MichelineDataTypeWithArgs,
	value2: MichelineOptionValue,
	value1: MichelineOptionValue,
): number {
	if (value1.prim === 'None') {
		if (value2.prim === 'None') {
			return 0;
		}
		return 1;
	}
	if (value2.prim === 'None') {
		return -1;
	}
	return compare(dataType.args[0], value2.args[0], value1.args[0]);
}

function compareList(dataType: MichelineDataTypeWithArgs, value2: MichelineValue[], value1: MichelineValue[]): number {
	const l1 = value1.length;
	const l2 = value2.length;
	const commonElementCount = Math.min(l1, l2);
	for (let i = 0; i < commonElementCount; i++) {
		const result = compare(dataType.args[0], value2[i], value1[i]);
		if (result !== 0) {
			return result;
		}
	}
	return l2 > l1 ? 1 : l2 < l1 ? -1 : 0;
}

function compareBool(dataType: MichelineDataType, value2: MichelineBoolValue, value1: MichelineBoolValue): number {
	return value2.prim > value1.prim ? 1 : value2.prim < value1.prim ? -1 : 0;
}

function comparePair(
	dataType: MichelineDataTypeWithArgs,
	value2: MichelinePairValue,
	value1: MichelinePairValue,
): number {
	const l1 = value1.args.length;
	const l2 = value2.args.length;
	const commonElementCount = Math.min(l1, l2);
	for (let i = 0; i < commonElementCount; i++) {
		const result = compare(dataType.args[i], value2.args[i], value1.args[i]);
		if (result !== 0) {
			return result;
		}
	}
	return l2 > l1 ? 1 : l2 < l1 ? -1 : 0;
}

function compareMap(dataType: MichelineDataTypeWithArgs, value2: MichelineMapValue, value1: MichelineMapValue): number {
	const l1 = value1.length;
	const l2 = value2.length;
	const commonElementCount = Math.min(l1, l2);
	for (let i = 0; i < commonElementCount; i++) {
		const result = compare(
			dataType.args[0],
			value2[i].args[0],
			value1[i].args[0],
		);
		if (result !== 0) {
			return result;
		}
	}
	return l2 > l1 ? 1 : l2 < l1 ? -1 : 0;
}
