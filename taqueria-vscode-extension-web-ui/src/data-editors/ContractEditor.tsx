import React from 'react';
import { MichelineDataTypeWithArgs } from '../MichelineDataType';
import { ListEditor } from './ListEditor';

export const ContractEditor = ({
	dataType,
	value,
	onChange,
}: {
	dataType: MichelineDataTypeWithArgs;
	value: unknown;
	onChange: (value: unknown) => void;
}) => {
	return (
		<ListEditor
			value={value}
			dataType={unpackAndCastValue(dataType)}
			onChange={onChange}
		/>
	);
};

function unpackAndCastValue(
	dataType: MichelineDataTypeWithArgs,
): MichelineDataTypeWithArgs {
	const unpackedDataType = dataType.args[0];
	if (!('args' in unpackedDataType)) {
		// TODO: not throw error?
		throw new Error(
			'Invalid data type for contract editor'
				+ JSON.stringify({ dataType }, null, 2),
		);
	}
	return unpackedDataType;
}
