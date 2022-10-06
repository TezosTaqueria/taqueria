import React, { useState } from 'react';

export const PrimitiveEditor = (
	{ dataType, value, onChange }: { dataType: string; value: string; onChange: (value: string) => void },
) => {
	const [currentValue, setCurrentValue] = useState(value);
	const changeValue = (v: string) => {
		setCurrentValue(v);
		onChange(v);
	};
	return <input type='text' value={currentValue} onChange={e => changeValue(e.target.value)} />;
};
