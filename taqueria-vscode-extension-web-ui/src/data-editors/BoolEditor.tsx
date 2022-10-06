import React, { useState } from 'react';

export const BoolEditor = ({ value, onChange }: { value: any; onChange: (value: any) => void }) => {
	const [currentValue, setCurrentValue] = useState(value);
	const changeValue = (v: any) => {
		setCurrentValue(v);
		onChange(v);
	};
	return <input type='checkbox' value={currentValue} onChange={e => changeValue(e.target.checked)} />;
};
