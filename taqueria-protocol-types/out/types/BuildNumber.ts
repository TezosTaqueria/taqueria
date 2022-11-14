// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { BuildNumber as BuildNumberStrict } from '@taqueria/protocol-types/out/types-strict';
import { buildNumberSchema } from '@taqueria/protocol-types/out/types-zod';
import { BuildNumber } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { BuildNumberStrict as BuildNumber };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('BuildNumber');

export const from = (input: unknown): BuildNumberStrict => {
	return buildNumberSchema.parse(input) as BuildNumberStrict;
};

export const create = (input: BuildNumber): BuildNumberStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, BuildNumberStrict> => {
	try {
		return resolve(buildNumberSchema.parse(input) as BuildNumberStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<BuildNumberStrict, '__type'>): FutureInstance<TaqError, BuildNumberStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: buildNumberSchema,
	schema: buildNumberSchema.transform(val => val as BuildNumberStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = buildNumberSchema;

export type t = BuildNumberStrict;
