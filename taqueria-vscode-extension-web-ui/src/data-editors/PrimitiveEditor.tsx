import { VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import React from 'react';
import { isObject } from '../Helpers';
import { TypesWithoutArgs } from '../MichelineDataType';
import { MichelineValue, MichelineValueObject } from '../MichelineValue';
import { validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';

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
	const primitiveValue = coerceAndCastValue(value);
	const validationResult = validate({ prim: dataType as TypesWithoutArgs }, primitiveValue);
	return (
		<div style={{ verticalAlign: 'middle', display: 'table-cell' }}>
			<VSCodeTextField
				type='text'
				value={(primitiveValue as Record<string, string>)[fieldName]}
				onInput={e => changeValue((e.target as HTMLInputElement).value)}
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
