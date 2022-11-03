// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { SanitizedAbsPath as SanitizedAbsPathStrict } from '@taqueria/protocol-types/out/types-strict';
import { sanitizedAbsPathSchema } from '@taqueria/protocol-types/out/types-zod';
import { SanitizedAbsPath } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { SanitizedAbsPathStrict as SanitizedAbsPath };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('SanitizedAbsPath');

export const from = (input: unknown): SanitizedAbsPathStrict => {
	return sanitizedAbsPathSchema.parse(input) as SanitizedAbsPathStrict;
};

export const create = (input: SanitizedAbsPath): SanitizedAbsPathStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SanitizedAbsPathStrict> => {
	try {
		return resolve(sanitizedAbsPathSchema.parse(input) as SanitizedAbsPathStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: SanitizedAbsPathStrict): FutureInstance<TaqError, SanitizedAbsPathStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: sanitizedAbsPathSchema,
	schema: sanitizedAbsPathSchema.transform(val => val as SanitizedAbsPathStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = SanitizedAbsPathStrict;
