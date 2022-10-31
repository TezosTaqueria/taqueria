import React from 'react';
import { MichelineDataTypeWithArgs } from '../MichelineDataType';
import { MichelineMapValue, MichelineValue } from '../MichelineValue';
import { DataEditorNode } from './DataEditorNode';
import { getFriendlyDataType } from './MichelineEditor';
import { compare, validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';
import { VSCodeButton } from './VsCodeWebViewUIToolkitWrappers';

export const MapEditor = (
	{ dataType, value, onChange }: {
		dataType: MichelineDataTypeWithArgs;
		value: unknown;
		onChange: (value: unknown) => void;
	},
) => {
	const mapValue = coerceAndCastValue(value);
	const changeValue = (index: number, key: unknown, v: unknown) => {
		const newValue = mapValue.slice();
		newValue[index] = {
			'prim': 'Elt',
			args: [
				key as MichelineValue,
				v as MichelineValue,
			],
		};
		onChange(newValue);
	};
	const remove = (index: number) => {
		const newValue = mapValue.slice();
		newValue.splice(index, 1);
		onChange(newValue);
	};
	const sort = () => {
		const newValue = mapValue.slice();
		newValue.sort((a, b) => compare(dataType.args[0], a.args[0], b.args[0]));
		onChange(newValue);
	};
	const validationResult = validate(dataType, mapValue);
	return (
		<div className='editorDiv'>
			<table>
				<thead>
					{mapValue.length
						? (
							<tr>
								<td>&nbsp;</td>
								<td>Key: {getFriendlyDataType(dataType.args[0])}</td>
								<td>Value: {getFriendlyDataType(dataType.args[1])}</td>
							</tr>
						)
						: (
							<tr>
								<td>&nbsp;</td>
								<td>
									<h4>The Map is empty. Please click on + button to add entries to the Map.</h4>
								</td>
								<td>&nbsp;</td>
							</tr>
						)}
				</thead>
				{mapValue.map((elt, index) => (
					<tbody key={index}>
						<tr>
							<td className='buttonContainer'>
								<VSCodeButton appearance='icon' onClick={() => remove(index)}>✘</VSCodeButton>
							</td>
							<td>
								<DataEditorNode
									hideDataType={true}
									dataType={dataType.args[0]}
									value={elt.args[0]}
									onChange={v => changeValue(index, v, elt.args[1])}
								/>
							</td>
							<td>
								<DataEditorNode
									hideDataType={true}
									dataType={dataType.args[1]}
									value={elt.args[1]}
									onChange={v => changeValue(index, elt.args[0], v)}
								/>
							</td>
						</tr>
					</tbody>
				))}
				<tbody>
					<tr>
						<td>&nbsp;</td>
						<td>
							<VSCodeButton appearance='icon' onClick={() => changeValue(mapValue.length, {}, {})}>➕</VSCodeButton>
							&nbsp;
							<VSCodeButton appearance='secondary' onClick={() => sort()}>Sort</VSCodeButton>
						</td>
						<td>
							<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={true} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);

	function coerceAndCastValue(value: unknown): MichelineMapValue {
		if (!Array.isArray(value)) {
			const newValue: MichelineMapValue = [];
			onChange(newValue);
			return newValue;
		}
		return value as MichelineMapValue;
	}
};
