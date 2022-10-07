import React from 'react';
import { DataEditorNode } from './DataEditorNode';

export const OptionEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any; onChange: (value: any) => void },
) => {
	if (value === null || value === undefined || typeof value !== 'object') {
		value = {
			'prim': 'None',
		};
	}
	const changeValue = (v: any) => {
		onChange({
			'prim': 'Some',
			'args': [v],
		});
	};
	const setOption = (hasValue: boolean) => {
		if (hasValue) {
			onChange({
				'prim': 'Some',
				'args': [null],
			});
		} else {
			onChange({
				'prim': 'None',
			});
		}
	};
	return (
		<div>
			<input
				type='checkbox'
				checked={value.prim !== 'None'}
				onChange={e => setOption(e.target.checked)}
			/>
			{value.prim !== 'None' && (
				<DataEditorNode
					dataType={dataType.args[0]}
					value={value.args[0]}
					onChange={v => changeValue(v)}
				/>
			)}
		</div>
	);
};
