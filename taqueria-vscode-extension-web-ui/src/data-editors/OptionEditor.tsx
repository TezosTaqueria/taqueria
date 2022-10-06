import React, { useState } from 'react';
import { DataEditorNode } from './DataEditorNode';

export const OptionEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any; onChange: (value: any) => void },
) => {
	const [currentValue, setCurrentValue] = useState(value);
	const changeValue = (v: any) => {
		setCurrentValue(v);
		onChange(v);
	};
	return (
		<div>
			<input
				type='checkbox'
				checked={currentValue !== undefined}
				onChange={e => changeValue(e.target.checked ? null : undefined)}
			/>
			{currentValue !== undefined && (
				<DataEditorNode dataType={dataType.args[0]} value={currentValue} onChange={changeValue} />
			)}
		</div>
	);
};
