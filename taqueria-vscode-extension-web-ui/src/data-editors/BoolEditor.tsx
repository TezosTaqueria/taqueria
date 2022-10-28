import React from 'react';
import { hasPrim, isObject } from '../Helpers';
import { MichelineBoolValue } from '../MichelineValue';

export const BoolEditor = (
	{ value, onChange }: { value: unknown; onChange: (value: MichelineBoolValue) => void },
) => {
	const boolValue = coerceAndCastValue(value);
	const changeValue = (v: boolean) => {
		const newValue = {
			prim: v ? ('True' as const) : ('False' as const),
		};
		onChange(newValue);
	};
	return <input type='checkBox' checked={boolValue.prim === 'True'} onChange={e => changeValue(e.target.checked)} />;

	function coerceAndCastValue(value: unknown): MichelineBoolValue {
		if (!isObject(value) || !hasPrim(value) || !['False', 'True'].includes(value.prim)) {
			const newValue = {
				'prim': 'False' as const,
			};
			onChange(newValue);
			return newValue as MichelineBoolValue;
		}
		return value as MichelineBoolValue;
	}
};
