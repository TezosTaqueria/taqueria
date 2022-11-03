// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Alias as AliasStrict } from '@taqueria/protocol-types/out/types-strict';
import { aliasSchema } from '@taqueria/protocol-types/out/types-zod';
import { Alias } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { AliasStrict as Alias };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Alias');

export const from = (input: unknown): AliasStrict => {
	return aliasSchema.parse(input) as AliasStrict;
};

export const create = (input: Alias): AliasStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, AliasStrict> => {
	try {
		return resolve(aliasSchema.parse(input) as AliasStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: AliasStrict): FutureInstance<TaqError, AliasStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: aliasSchema,
	schema: aliasSchema.transform(val => val as AliasStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = AliasStrict;
