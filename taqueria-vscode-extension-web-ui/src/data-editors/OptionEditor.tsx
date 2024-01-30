import { VSCodeCheckbox } from '@vscode/webview-ui-toolkit/react';
import React from 'react';
import { hasPrim, isObject } from '../Helpers';
import { MichelineDataTypeWithArgs } from '../MichelineDataType';
import { MichelineOptionValue } from '../MichelineValue';
import { DataEditorNode } from './DataEditorNode';

export const OptionEditor = (
	{ dataType, value, onChange }: {
		dataType: MichelineDataTypeWithArgs;
		value: unknown;
		onChange: (value: unknown) => void;
	},
) => {
	const changeValue = (v: unknown) => {
		onChange({
			'prim': 'Some',
			'args': [v],
		});
	};
	const optionValue = coerceAndCastValue(value);
	const setOption = (hasValue: boolean) => {
		if (hasValue) {
			onChange({
				'prim': 'Some',
				'args': [null],
			});
		} else {
			onChange({
				'prim': 'None',
			});
		}
	};
	return (
		<table>
			<tbody>
				<tr>
					<td>
						<VSCodeCheckbox
							checked={optionValue.prim !== 'None'}
							onClick={(e: Event) => setOption((e.target as HTMLInputElement).checked)}
						/>{' '}
						<h4 style={{ display: 'inline', verticalAlign: 'super' }}>{optionValue.prim}</h4>
					</td>
					<td>
						{optionValue.prim !== 'None' && (
							<DataEditorNode
								dataType={dataType.args[0]}
								value={optionValue.args[0]}
								onChange={v => changeValue(v)}
							/>
						)}
					</td>
				</tr>
			</tbody>
		</table>
	);

	function coerceAndCastValue(value: unknown): MichelineOptionValue {
		if (!isObject(value) || !hasPrim(value, 'None', 'Some')) {
			const newValue = {
				'prim': 'None' as const,
			};
			changeValue(newValue);
			return newValue;
		}
		return value as MichelineOptionValue;
	}
};
