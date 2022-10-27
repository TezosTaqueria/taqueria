import React from 'react';
import { isObject } from '../Helpers';

export const BoolEditor = (
	{ value, onChange }: { value: any; onChange: (value: { prim: 'True' | 'False' }) => void },
) => {
	if (!isObject(value) && !['False', 'True'].includes(value.prim)) {
		value = {
			'prim': 'False',
		};
		onChange(value);
	}
	const changeValue = (v: boolean) => {
		const newValue = {
			prim: v ? ('True' as const) : ('False' as const),
		};
		onChange(newValue);
	};
	return <input type='checkBox' checked={value['prim'] === 'True'} onChange={e => changeValue(e.target.checked)} />;
};
