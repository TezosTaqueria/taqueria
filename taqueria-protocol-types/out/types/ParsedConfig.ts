// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { ParsedConfig as ParsedConfigStrict } from '@taqueria/protocol-types/out/types-strict';
import { parsedConfigSchema } from '@taqueria/protocol-types/out/types-zod';
import { ParsedConfig } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { ParsedConfigStrict as ParsedConfig };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('ParsedConfig');

export const from = (input: unknown): ParsedConfigStrict => {
	return parsedConfigSchema.parse(input) as ParsedConfigStrict;
};

export const create = (input: ParsedConfig): ParsedConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ParsedConfigStrict> => {
	try {
		return resolve(parsedConfigSchema.parse(input) as ParsedConfigStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: ParsedConfigStrict): FutureInstance<TaqError, ParsedConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: parsedConfigSchema,
	schema: parsedConfigSchema.transform(val => val as ParsedConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = ParsedConfigStrict;
