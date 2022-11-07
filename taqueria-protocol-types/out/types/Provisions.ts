// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Provisions as ProvisionsStrict } from '@taqueria/protocol-types/out/types-strict';
import { provisionsSchema } from '@taqueria/protocol-types/out/types-zod';
import { Provisions } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { ProvisionsStrict as Provisions };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Provisions');

export const from = (input: unknown): ProvisionsStrict => {
	return provisionsSchema.parse(input) as ProvisionsStrict;
};

export const create = (input: Provisions): ProvisionsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ProvisionsStrict> => {
	try {
		return resolve(provisionsSchema.parse(input) as ProvisionsStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<ProvisionsStrict, '__type'>): FutureInstance<TaqError, ProvisionsStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: provisionsSchema,
	schema: provisionsSchema.transform(val => val as ProvisionsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = provisionsSchema;

export type t = ProvisionsStrict;
