import React from 'react';
import { DataEditorNode } from './DataEditorNode';

export const MapEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any; onChange: (value: any) => void },
) => {
	if (value === undefined || value === null || typeof value !== 'object') {
		value = [];
	}
	const changeValue = (index: number, key: any, v: any) => {
		const newValue = value.slice();
		newValue[index] = {
			'prim': 'Elt',
			args: [
				key,
				v,
			],
		};
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
					{(value as any[]).map((elt, index) => (
						<tr key={index}>
							<td>
								<DataEditorNode
									dataType={(dataType.args as any[])[0]}
									value={elt.args[0]}
									onChange={v => changeValue(index, v, elt.args[1])}
								/>
							</td>
							<td>
								<DataEditorNode
									dataType={(dataType.args as any[])[1]}
									value={elt.args[1]}
									onChange={v => changeValue(index, elt.args[0], v)}
								/>
							</td>
						</tr>
					))}
					<tr>
						<td>
							<button onClick={() => changeValue(value.args.length, null, null)}>+</button>
						</td>
						<td>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
