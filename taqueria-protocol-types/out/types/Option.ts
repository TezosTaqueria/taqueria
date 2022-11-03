// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Option as OptionStrict } from '@taqueria/protocol-types/out/types-strict';
import { optionSchema } from '@taqueria/protocol-types/out/types-zod';
import { Option } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { OptionStrict as Option };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Option');

export const from = (input: unknown): OptionStrict => {
	return optionSchema.parse(input) as OptionStrict;
};

export const create = (input: Option): OptionStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, OptionStrict> => {
	try {
		return resolve(optionSchema.parse(input) as OptionStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: OptionStrict): FutureInstance<TaqError, OptionStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: optionSchema,
	schema: optionSchema.transform(val => val as OptionStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = OptionStrict;
