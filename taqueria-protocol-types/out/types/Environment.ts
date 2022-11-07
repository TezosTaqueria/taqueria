// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Environment as EnvironmentStrict } from '@taqueria/protocol-types/out/types-strict';
import { environmentSchema } from '@taqueria/protocol-types/out/types-zod';
import { Environment } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { EnvironmentStrict as Environment };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Environment');

export const from = (input: unknown): EnvironmentStrict => {
	return environmentSchema.parse(input) as EnvironmentStrict;
};

export const create = (input: Environment): EnvironmentStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, EnvironmentStrict> => {
	try {
		return resolve(environmentSchema.parse(input) as EnvironmentStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<EnvironmentStrict, '__type'>): FutureInstance<TaqError, EnvironmentStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: environmentSchema,
	schema: environmentSchema.transform(val => val as EnvironmentStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = environmentSchema;

export type t = EnvironmentStrict;
