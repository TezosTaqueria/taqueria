// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { SanitizedPath, sanitizedPathSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { SanitizedPath as SanitizedPathStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { SanitizedPath } from '../../types';
import { sanitizedPathSchema } from '../types-zod';

export type { SanitizedPathStrict as SanitizedPath };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('SanitizedPath');

export const from = (input: unknown): SanitizedPathStrict => {
	return sanitizedPathSchema.parse(input) as SanitizedPathStrict;
};

export const create = (input: SanitizedPath): SanitizedPathStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SanitizedPathStrict> => {
	try {
		return resolve(sanitizedPathSchema.parse(input) as SanitizedPathStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: SanitizedPathStrict): FutureInstance<TaqError, SanitizedPathStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: sanitizedPathSchema,
	schema: sanitizedPathSchema.transform(val => val as SanitizedPathStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = SanitizedPathStrict;
