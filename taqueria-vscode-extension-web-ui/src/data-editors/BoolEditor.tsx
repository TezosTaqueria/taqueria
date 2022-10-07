import React from 'react';

export const BoolEditor = (
	{ value, onChange }: { value: Record<string, any>; onChange: (value: Record<string, any>) => void },
) => {
	if (value === null || value === undefined || typeof value !== 'object') {
		value = {};
	}
	const changeValue = (v: boolean) => {
		const newValue: Record<string, any> = {
			'string': v.toString(),
		};
		onChange(newValue);
	};
	return <input type='checkBox' checked={value['string'] === 'true'} onChange={e => changeValue(e.target.checked)} />;
};
