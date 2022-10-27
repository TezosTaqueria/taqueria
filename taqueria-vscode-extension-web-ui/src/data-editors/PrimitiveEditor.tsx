import React from 'react';
import { MichelineValue as ValidationMichelineValue, TypePrim } from '../Helpers';
import { validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';
import { VSCodeTextField } from './VsCodeWebViewUIToolkitWrappers';

export const PrimitiveEditor = (
	{ dataType, value, onChange }: {
		dataType: string;
		value: Record<string, any>;
		onChange: (value: Record<string, any>) => void;
	},
) => {
	const fieldName = getFieldName();
	const changeValue = (v: string) => {
		const newValue: Record<string, any> = {};
		newValue[fieldName] = v;
		onChange(newValue);
	};
	if (value === null || value === undefined || typeof value !== 'object' || !Object.hasOwn(value, fieldName)) {
		changeValue('');
		value = {
			[fieldName]: '',
		};
	}
	const validationResult = validate({ prim: dataType as TypePrim }, value as ValidationMichelineValue);
	return (
		<div style={{ verticalAlign: 'middle', display: 'table-cell' }}>
			<VSCodeTextField
				type='text'
				value={value[fieldName]}
				onInput={e => changeValue((e.target as HTMLInputElement).value)}
			/>
			<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={false} />
		</div>
	);

	function getFieldName() {
		switch (dataType) {
			case 'int':
			case 'nat':
				return 'int';
			case 'bytes':
				return 'bytes';
			default:
				return 'string';
		}
	}
};
