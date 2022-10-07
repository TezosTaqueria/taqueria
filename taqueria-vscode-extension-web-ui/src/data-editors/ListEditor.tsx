import React from 'react';
import { DataEditorNode } from './DataEditorNode';

export const ListEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any; onChange: (value: any) => void },
) => {
	if (value === undefined || value === null || !Array.isArray(value)) {
		value = [];
	}
	const changeValue = (index: number, v: any) => {
		const newValue = value.slice();
		newValue[index] = v;
		onChange(newValue);
	};
	return (
		<div className='editorDiv'>
			<table>
				<tbody>
					{(value as any[]).map((item, index) => (
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
							<button onClick={() => changeValue(value.length, null)}>+</button>
						</td>
						<td>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
