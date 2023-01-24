import React from 'react';
import { hasArgs, hasPrim, isObject } from '../Helpers';
import { MichelineDataTypeWithArgs } from '../MichelineDataType';
import { MichelineOrValue, MichelineValue } from '../MichelineValue';
import { DataEditorNode } from './DataEditorNode';
import { validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';

export const OrEditor = (
	{ dataType, value, onChange }: {
		dataType: MichelineDataTypeWithArgs;
		value: unknown;
		onChange: (value: unknown) => void;
	},
) => {
	const orValue = coerceAndCastValue(value);

	const changeValue = (side: 'Left' | 'Right', v: unknown) => {
		console.log(`I was changed to ${side} and`);
		console.log(v);
		onChange({
			'prim': side,
			'args': [v],
		});
	};
	const validationResult = validate(dataType, orValue);
	const selectedIndex = orValue.prim === 'Right' ? 1 : 0;
	return (
		<div className='editorDiv'>
			<table>
				<tbody>
					<tr>
						<select
							name='select'
							onChange={e =>
								changeValue(e.target.value as 'Left' | 'Right', e.target.value === orValue.prim ? orValue.args[0] : {})}
						>
							{dataType.args.map((item, index) => {
								const side = index === 1 ? 'Right' : 'Left';
								return <option value={side} selected={orValue.prim === side}>{side}</option>;
							})}
						</select>
						<td>
							<DataEditorNode
								dataType={dataType.args[selectedIndex]}
								value={orValue.args?.[0] ?? {}}
								onChange={v => changeValue(orValue.prim, v)}
							/>
						</td>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<td>
							<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={true} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);

	function coerceAndCastValue(value: unknown): MichelineOrValue {
		if (!isObject(value) || !hasPrim(value, 'Left', 'Right')) {
			const newValue = {
				'prim': 'Left' as const,
				'args': [{}] as any[] as MichelineValue[],
			};
			onChange(newValue);
			return newValue;
		}
		if (!hasArgs(value) || value.args.length === 0) {
			const newValue = {
				'prim': value.prim as 'Left' | 'Right',
				'args': [{}] as any[] as MichelineValue[],
			};
			onChange(newValue);
			return newValue;
		}
		if (value.args.length > 1) {
			const newValue = {
				'prim': value.prim as 'Left' | 'Right',
				'args': [value.args[0]],
			};
			onChange(newValue);
			return newValue;
		}
		return value as MichelineOrValue;
	}
};
