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
			<span>{getFriendlyDataType(dataType)}</span>
			<table>
				{value.map((item, index) => [
					<tbody key={index}>
						<tr>
							<td className='valueTitle' rowSpan={3}>{index}:</td>
							<td className='bottonContainer'>
							</td>
							<td rowSpan={3}>
								<DataEditorNode
									dataType={dataType.args[0]}
									value={item}
									onChange={v => changeValue(index, v)}
								/>
							</td>
							<td className='bottonContainer'>
								<button onClick={() => moveUp(index)} disabled={index === 0}>🔼</button>
								<button onClick={() => remove(index)}>❌</button>
								<button onClick={() => moveDown(index)} disabled={index === value.length - 1}>🔽</button>
							</td>
						</tr>
					</tbody>,
				])}
			</table>
			<button onClick={() => changeValue(value.length, null)}>➕</button>
		</div>
	);
};
