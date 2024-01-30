import { VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import React from 'react';
import { isObject } from '../Helpers';
import { MichelineDataType } from '../MichelineDataType';
import { MichelineValue, MichelineValueObject } from '../MichelineValue';
import { validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';

export const AddressEditor = (
	{ dataType, value, onChange }: {
		dataType: MichelineDataType;
		value: unknown;
		onChange: (value: MichelineValueObject) => void;
	},
) => {
	const fieldName = 'string';
	const changeValue = (v: string) => {
		const newValue = {
			[fieldName]: v,
		};
		onChange(newValue as MichelineValueObject);
	};
	const primitiveValue = coerceAndCastValue(value);
	const validationResult = validate(dataType, primitiveValue);
	return (
		<div style={{ verticalAlign: 'middle', display: 'table-cell' }}>
			<VSCodeTextField
				placeholder='address'
				type='text'
				value={(primitiveValue as Record<string, string>)[fieldName]}
				onInput={(e: Event) => changeValue((e.target as HTMLInputElement).value)}
			/>
			<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={false} />
		</div>
	);

	function coerceAndCastValue(value: unknown): MichelineValue {
		if (!isObject(value) || !Object.hasOwn(value, fieldName)) {
			changeValue('');
			return {
				[fieldName]: '',
			} as MichelineValue;
		}
		return value as MichelineValue;
	}
};
