import React from 'react';
import { DataEditorNode } from './DataEditorNode';
import { getFriendlyDataType } from './MichelineEditor';
import { compare, validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';

export const MapEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any; onChange: (value: any) => void },
) => {
	if (value === undefined || value === null || !Array.isArray(value)) {
		value = [];
		onChange(value);
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
	const remove = (index: number) => {
		const newValue = value.slice();
		newValue.splice(index, 1);
		onChange(newValue);
	};
	const sort = () => {
		const newValue = value.slice();
		(newValue as any[]).sort((a, b) => -compare(dataType.args[0], a.args[0], b.args[0]));
		onChange(newValue);
	};
	const validationResult = validate(dataType, value);
	return (
		<div className='editorDiv'>
			<table>
				<thead>
					<tr>
						<td>Key: {getFriendlyDataType((dataType.args as any[])[0])}</td>
						<td>Value: {getFriendlyDataType((dataType.args as any[])[0])}</td>
					</tr>
				</thead>
				{(value as any[]).map((elt, index) => (
					<tbody key={index}>
						<tr>
							<td>
								<DataEditorNode
									hideDataType={true}
									dataType={(dataType.args as any[])[0]}
									value={elt.args[0]}
									onChange={v => changeValue(index, v, elt.args[1])}
								/>
							</td>
							<td>
								<DataEditorNode
									hideDataType={true}
									dataType={(dataType.args as any[])[1]}
									value={elt.args[1]}
									onChange={v => changeValue(index, elt.args[0], v)}
								/>
							</td>
							<td className='buttonContainer'>
								<button onClick={() => remove(index)}>❌</button>
							</td>
						</tr>
					</tbody>
				))}
				<tr>
					<td>
						<button onClick={() => changeValue(value.length, null, null)}>+</button>
						<button onClick={() => sort()}>Sort</button>
					</td>
					<td>
						<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={true} />
					</td>
				</tr>
			</table>
		</div>
	);
};
