import React from 'react';
import { DataEditorNode } from './DataEditorNode';

export const PairEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any; onChange: (value: any) => void },
) => {
	if (value === undefined || value === null || typeof value !== 'object') {
		value = {
			'prim': 'pair',
			'args': [],
		};
	}
	const changeValue = (index: number, v: any) => {
		const newValue = {
			'prim': 'pair',
			'args': value.args.slice(),
		};
		newValue.args[index] = v;
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
									value={value.args[index]}
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
