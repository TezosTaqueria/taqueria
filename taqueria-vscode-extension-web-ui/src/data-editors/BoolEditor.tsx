import React from 'react';

export const BoolEditor = (
	{ value, onChange }: { value: Record<string, any>; onChange: (value: Record<string, any>) => void },
) => {
	if (value === null || value === undefined || typeof value !== 'object') {
		value = {
			'prim': 'False',
		};
		onChange(value);
	}
	const changeValue = (v: boolean) => {
		const newValue: Record<string, any> = {
			'prim': v ? 'True' : 'False',
		};
		onChange(newValue);
	};
	return <input type='checkBox' checked={value['prim'] === 'True'} onChange={e => changeValue(e.target.checked)} />;
};
