import React from 'react';
import { MichelineDataTypeWithArgs } from '../MichelineDataType';
import { MichelineValue } from '../MichelineValue';
import { DataEditorNode } from './DataEditorNode';
import { compare, validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';
import { VSCodeButton } from './VsCodeWebViewUIToolkitWrappers';

export const ListEditor = (
	{ dataType, value, onChange }: {
		dataType: MichelineDataTypeWithArgs;
		value: unknown;
		onChange: (value: unknown) => void;
	},
) => {
	const arrayValue = coerceAndCastValue(value);

	const changeValue = (index: number, v: unknown) => {
		const newValue = arrayValue.slice();
		newValue[index] = v as MichelineValue;
		onChange(newValue);
	};
	const moveUp = (index: number) => {
		if (index <= 0) {
			return;
		}
		const newValue = arrayValue.slice();
		newValue[index - 1] = arrayValue[index];
		newValue[index] = arrayValue[index - 1];
		onChange(newValue);
	};
	const moveDown = (index: number) => {
		if (index >= arrayValue.length - 1) {
			return;
		}
		const newValue = arrayValue.slice();
		newValue[index + 1] = arrayValue[index];
		newValue[index] = arrayValue[index + 1];
		onChange(newValue);
	};
	const remove = (index: number) => {
		const newValue = arrayValue.slice();
		newValue.splice(index, 1);
		onChange(newValue);
	};
	const sort = () => {
		const newValue = arrayValue.slice();
		newValue.sort((a, b) => compare(dataType.args[0], a, b));
		onChange(newValue);
	};
	const validationResult = validate(dataType, arrayValue);
	return (
		<div className='editorDiv'>
			<table>
				{arrayValue.length === 0 && (
					<tbody>
						<tr>
							<td>
								<h4>The List is empty. Please click on + button to add items to the List.</h4>
							</td>
						</tr>
					</tbody>
				)}
				{arrayValue.map((item, index) => [
					<tbody key={index}>
						<tr>
							<td className='buttonContainer'>
								{dataType.prim === 'list'
									&& (
										<VSCodeButton appearance='icon' onClick={() => moveUp(index)} disabled={index === 0}>
											<span className='codicon codicon-chevron-up'>⮝</span>
										</VSCodeButton>
									)}
								<VSCodeButton appearance='icon' onClick={() => remove(index)}>✘</VSCodeButton>
								{dataType.prim === 'list'
									&& (
										<VSCodeButton
											appearance='icon'
											onClick={() => moveDown(index)}
											disabled={index === arrayValue.length - 1}
										>
											⮟
										</VSCodeButton>
									)}
							</td>
							<td className='valueTitle'>{index}:</td>
							<td>
								<DataEditorNode
									hideDataType={true}
									dataType={dataType.args[0]}
									value={item}
									onChange={v => changeValue(index, v)}
								/>
							</td>
						</tr>
					</tbody>,
				])}
				<tbody>
					<tr>
						<td colSpan={2}>
							<button onClick={() => changeValue(arrayValue.length, {})}>➕</button>
							{dataType.prim === 'set' && <button onClick={() => sort()}>Sort</button>}
						</td>
						<td>
							<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={true} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);

	function coerceAndCastValue(value: unknown): MichelineValue[] {
		if (!Array.isArray(value)) {
			const newValue: MichelineValue[] = [];
			onChange(newValue);
			return newValue;
		}
		return value as MichelineValue[];
	}
};
