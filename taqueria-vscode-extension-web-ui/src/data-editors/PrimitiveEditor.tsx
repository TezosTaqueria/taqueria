import React from 'react';

export const PrimitiveEditor = (
	{ dataType, value, onChange }: {
		dataType: string;
		value: Record<string, any>;
		onChange: (value: Record<string, any>) => void;
	},
) => {
	if (value === null || value === undefined || typeof value !== 'object') {
		value = {};
	}
	const fieldName = dataType === 'int' || dataType === 'nat' ? 'int' : 'string';
	const changeValue = (v: string | number) => {
		const newValue: Record<string, any> = {};
		if (fieldName === 'int' && typeof v === 'string') {
			const num = parseInt(v, 10);
			if (num.toString() === v) {
				v = num;
			}
		}
		newValue[fieldName] = v;
		onChange(newValue);
	};
	return <input type='text' value={value[fieldName]} onChange={e => changeValue(e.target.value)} />;
};
