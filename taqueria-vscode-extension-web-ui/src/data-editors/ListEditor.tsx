import React from 'react';
import { DataEditorNode } from './DataEditorNode';
import { getFriendlyDataType } from './MichelineEditor';

export const ListEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any[]; onChange: (value: any) => void },
) => {
	if (value === undefined || value === null || !Array.isArray(value)) {
		value = [];
		onChange(value);
	}
	const changeValue = (index: number, v: any) => {
		const newValue = value.slice();
		newValue[index] = v;
		onChange(newValue);
	};
	const moveUp = (index: number) => {
		if (index <= 0) {
			return;
		}
		const newValue = value.slice();
		newValue[index - 1] = value[index];
		newValue[index] = value[index - 1];
		onChange(newValue);
	};
	const moveDown = (index: number) => {
		if (index >= value.length - 1) {
			return;
		}
		const newValue = value.slice();
		newValue[index + 1] = value[index];
		newValue[index] = value[index + 1];
		onChange(newValue);
	};
	const remove = (index: number) => {
		const newValue = value.slice();
		newValue.splice(index, 1);
		onChange(newValue);
	};
	return (
		<div className='editorDiv'>
			<table>
				{value.map((item, index) => [
					<tbody key={index}>
						<tr>
							<td className='valueTitle'>{index}:</td>
							<td className='buttonContainer'>
							</td>
							<td>
								<DataEditorNode
									hideDataType={true}
									dataType={dataType.args[0]}
									value={item}
									onChange={v => changeValue(index, v)}
								/>
							</td>
							<td className='buttonContainer'>
								{dataType.prim === 'list'
									&& <button onClick={() => moveUp(index)} disabled={index === 0}>🔼</button>}
								<button onClick={() => remove(index)}>❌</button>
								{dataType.prim === 'list'
									&& <button onClick={() => moveDown(index)} disabled={index === value.length - 1}>🔽</button>}
							</td>
						</tr>
					</tbody>,
				])}
			</table>
			<button onClick={() => changeValue(value.length, null)}>➕</button>
		</div>
	);
};
