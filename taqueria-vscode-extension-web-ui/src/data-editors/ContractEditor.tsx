import React from 'react';
import { hasArgs, hasPrim, isObject } from '../Helpers';
import { MichelineDataTypeWithArgs } from '../MichelineDataType';
import { MichelineContractValue, MichelineValue } from '../MichelineValue';
import { DataEditorNode } from './DataEditorNode';

export const ContractEditor = ({
	dataType,
	value,
	onChange,
}: {
	dataType: MichelineDataTypeWithArgs;
	value: unknown;
	onChange: (value: unknown) => void;
}) => {
	const contractValue = coerceAndCastValue(value);
	const changeValue = (v: unknown) => {
		const newValue = {
			prim: 'Contract',
			args: contractValue.args.slice(),
		};
		newValue.args[0] = v as MichelineValue;
		onChange(newValue);
	};
	return (
		<DataEditorNode
			hideDataType={true}
			dataType={dataType.args[0]}
			value={contractValue.args[0]}
			onChange={newValue => {
				changeValue(newValue);
			}}
		/>
	);

	function coerceAndCastValue(value: unknown): MichelineContractValue {
		if (!isObject(value) || !hasPrim(value, 'Contract') || !hasArgs(value)) {
			const newValue = {
				prim: 'Contract' as const,
				args: [],
			};
			onChange(newValue);
			return newValue;
		}
		return value as MichelineContractValue;
	}
};
