import React, { useState } from 'react';
import { DataEditorNode } from './DataEditorNode';

export const MapEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any[]; onChange: (value: any[]) => void },
) => {
	let initialValue;
	if (value === undefined || value === null || !Array.isArray(value)) {
		initialValue = [];
	} else {
		initialValue = value;
	}
	const [currentValue, setCurrentValue] = useState(initialValue);
	const changeValue = (index: number, key: any, v: any) => {
		const newValue = currentValue.slice();
		newValue[index] = {
			key,
			v,
		};
		setCurrentValue(newValue);
		onChange(newValue);
	};
	return (
		<div className='editorDiv'>
			<table>
				<thead>
					<tr>
						<td>Key</td>
						<td>Value</td>
					</tr>
				</thead>
				<tbody>
					{(currentValue as any[]).map(({ key, value }, index) => (
						<tr key={index}>
							<td>
								<DataEditorNode
									dataType={(dataType.args as any[])[0]}
									value={key}
									onChange={v => changeValue(index, v, value)}
								/>
							</td>
							<td>
								<DataEditorNode
									dataType={(dataType.args as any[])[1]}
									value={value}
									onChange={v => changeValue(index, key, v)}
								/>
							</td>
						</tr>
					))}
					<tr>
						<td>
							<button onClick={() => changeValue(currentValue.length, null, null)}>+</button>
						</td>
						<td>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
