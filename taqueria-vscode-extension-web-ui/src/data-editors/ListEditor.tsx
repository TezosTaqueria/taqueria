import React from 'react';
import { DataEditorNode } from './DataEditorNode';
import { compare, validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';

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
	const sort = () => {
		const newValue = value.slice();
		(newValue as any[]).sort((a, b) => -compare(dataType.args[0], a, b));
		onChange(newValue);
	};
	const validationResult = validate(dataType, value);
	return (
		<div className='editorDiv'>
			<table>
				{value.map((item, index) => [
					<tbody key={index}>
						<tr>
							<td className='valueTitle'>{index}:</td>
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
				<tr>
					<td>
						<button onClick={() => changeValue(value.length, {})}>➕</button>
						{dataType.prim === 'set' && <button onClick={() => sort()}>Sort</button>}
					</td>
					<td>
						<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={true} />
					</td>
				</tr>
			</table>
		</div>
	);
};
