// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { ScaffoldConfig as ScaffoldConfigStrict } from '@taqueria/protocol-types/out/types-strict';
import { scaffoldConfigSchema } from '@taqueria/protocol-types/out/types-zod';
import { ScaffoldConfig } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { ScaffoldConfigStrict as ScaffoldConfig };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('ScaffoldConfig');

export const from = (input: unknown): ScaffoldConfigStrict => {
	return scaffoldConfigSchema.parse(input) as ScaffoldConfigStrict;
};

export const create = (input: ScaffoldConfig): ScaffoldConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ScaffoldConfigStrict> => {
	try {
		return resolve(scaffoldConfigSchema.parse(input) as ScaffoldConfigStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: ScaffoldConfigStrict): FutureInstance<TaqError, ScaffoldConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: scaffoldConfigSchema,
	schema: scaffoldConfigSchema.transform(val => val as ScaffoldConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = ScaffoldConfigStrict;
