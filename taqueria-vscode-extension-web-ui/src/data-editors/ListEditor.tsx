import React, { useState } from 'react';
import { DataEditorNode } from './DataEditorNode';

export const ListEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any[]; onChange: (value: any[]) => void },
) => {
	if (value === undefined || value === null || !Array.isArray(value)) {
		value = [];
	}
	const [currentValue, setCurrentValue] = useState(value);
	const changeValue = (index: number, v: any) => {
		const newValue = currentValue.slice();
		newValue[index] = v;
		setCurrentValue(newValue);
		onChange(newValue);
	};
	return (
		<div className='editorDiv'>
			<table>
				<tbody>
					{currentValue.map((item, index) => (
						<tr key={index}>
							<td className='valueTitle'>{index}:</td>
							<td>
								<DataEditorNode
									dataType={dataType.args[0]}
									value={item}
									onChange={v => changeValue(index, v)}
								/>
							</td>
						</tr>
					))}
					<tr>
						<td>
							<button onClick={() => changeValue(currentValue.length, null)}>+</button>
						</td>
						<td>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
