// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Verb as VerbStrict } from '@taqueria/protocol-types/out/types-strict';
import { verbSchema } from '@taqueria/protocol-types/out/types-zod';
import { Verb } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { VerbStrict as Verb };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Verb');

export const from = (input: unknown): VerbStrict => {
	return verbSchema.parse(input) as VerbStrict;
};

export const create = (input: Verb): VerbStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, VerbStrict> => {
	try {
		return resolve(verbSchema.parse(input) as VerbStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<VerbStrict, '__type'>): FutureInstance<TaqError, VerbStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: verbSchema,
	schema: verbSchema.transform(val => val as VerbStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = verbSchema;

export type t = VerbStrict;
