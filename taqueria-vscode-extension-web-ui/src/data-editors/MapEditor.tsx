import React, { useState } from 'react';
import { DataEditorNode } from './DataEditorNode';

export const MapEditor = (
	{ dataType, value, onChange }: { dataType: unknown; value: unknown[]; onChange: (value: unknown[]) => void },
) => {
	let initialValue;
	if (value === undefined || value === null || !Array.isArray(value)) {
		initialValue = [];
	} else {
		initialValue = value;
	}
	const [currentValue, setCurrentValue] = useState(initialValue);
	const changeValue = (index: number, key: unknown, v: unknown) => {
		const newValue = currentValue.slice();
		newValue[index] = {
			key,
			value,
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
									dataType={(dataType as any[])[0]}
									value={key}
									onChange={v => changeValue(index, v, value)}
								/>
							</td>
							<td>
								<DataEditorNode
									dataType={(dataType as any[])[0]}
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
