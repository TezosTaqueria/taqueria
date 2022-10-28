import { MichelineValue, MichelineValueObject } from './MichelineValue';

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

export function hasPrim(obj: Object, ...possiblePrimValues: string[]): obj is { prim: string } {
	if (!Object.hasOwn(obj, 'prim')) {
		return false;
	}
	if (typeof (obj as { prim: unknown }).prim !== 'string') {
		return false;
	}
	if (possiblePrimValues && possiblePrimValues.length) {
		if (!possiblePrimValues.includes((obj as { prim: string }).prim)) {
			return false;
		}
	}
	return true;
}

export function hasArgs(obj: Object): obj is { args: MichelineValue[] } {
	if (!Object.hasOwn(obj, 'args')) {
		return false;
	}
	return Array.isArray((obj as { args: unknown[] }).args);
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
