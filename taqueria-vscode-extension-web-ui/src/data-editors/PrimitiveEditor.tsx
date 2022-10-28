import React from 'react';
import { isObject } from '../Helpers';
import { TypesWithoutArgs } from '../MichelineDataType';
import { MichelineValue, MichelineValueObject } from '../MichelineValue';
import { validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';
import { VSCodeTextField } from './VsCodeWebViewUIToolkitWrappers';

export const PrimitiveEditor = (
	{ dataType, value, onChange }: {
		dataType: string;
		value: unknown;
		onChange: (value: MichelineValueObject) => void;
	},
) => {
	const fieldName = getFieldName();
	const changeValue = (v: string) => {
		const newValue = {
			[fieldName]: v,
		};
		onChange(newValue as MichelineValueObject);
	};
	if (!isObject(value) || !Object.hasOwn(value, fieldName)) {
		changeValue('');
		value = {
			[fieldName]: '',
		};
	}
	const validationResult = validate({ prim: dataType as TypesWithoutArgs }, value as MichelineValue);
	return (
		<div style={{ verticalAlign: 'middle', display: 'table-cell' }}>
			<VSCodeTextField
				type='text'
				value={(value as Record<string, string>)[fieldName]}
				onInput={e => changeValue((e.target as HTMLInputElement).value)}
			/>
			<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={false} />
		</div>
	);

	function getFieldName(): 'int' | 'bytes' | 'string' {
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
