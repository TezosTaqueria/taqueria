import React, { useState } from 'react';
import { DataEditorNode } from './DataEditorNode';

export const PairEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any; onChange: (value: any) => void },
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
	const dataRecord = dataType as Record<string, any>;
	return (
		<div className='editorDiv'>
			<table>
				<tbody>
					{(dataType.args as any[]).map((item, index) => (
						<tr key={index}>
							<td className='valueTitle'>{(item.annots as string[])?.map(x => x.substring(1)).join(' ')}:</td>
							<td>
								<DataEditorNode
									dataType={item}
									value={null}
									onChange={x => {
										changeValue(index, x);
									}}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
