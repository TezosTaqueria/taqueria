import React from 'react';
import { hasArgs, hasPrim, isObject } from '../Helpers';
import { MichelineDataTypeWithArgs } from '../MichelineDataType';
import { MichelinePairValue, MichelineValue } from '../MichelineValue';
import { DataEditorNode } from './DataEditorNode';
import { getFriendlyDataType } from './MichelineEditor';

export const PairEditor = (
	{ dataType, value, onChange }: {
		dataType: MichelineDataTypeWithArgs;
		value: unknown;
		onChange: (value: unknown) => void;
	},
) => {
	const pairValue = coerceAndCastValue(value);
	const changeValue = (index: number, v: unknown) => {
		const newValue = {
			'prim': 'Pair',
			'args': pairValue.args.slice(),
		};
		newValue.args[index] = v as MichelineValue;
		onChange(newValue);
	};
	return (
		<div className='editorDiv'>
			<table>
				<tbody>
					{dataType.args.map((item, index) => (
						<tr key={index}>
							<td className='valueTitle'>
								<h4>{getFriendlyDataType(item)}</h4>
							</td>
							<td>
								<DataEditorNode
									hideDataType={true}
									dataType={item}
									value={pairValue.args[index]}
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

	function coerceAndCastValue(value: unknown): MichelinePairValue {
		if (!isObject(value) || !hasPrim(value, 'Pair') || !hasArgs(value)) {
			const newValue = {
				'prim': 'Pair' as const,
				'args': [],
			};
			onChange(newValue);
			return newValue;
		}
		return value as MichelinePairValue;
	}
};
