// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { LoadedConfig as LoadedConfigStrict } from '@taqueria/protocol-types/out/types-strict';
import { loadedConfigSchema } from '@taqueria/protocol-types/out/types-zod';
import { LoadedConfig } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { LoadedConfigStrict as LoadedConfig };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('LoadedConfig');

export const from = (input: unknown): LoadedConfigStrict => {
	return loadedConfigSchema.parse(input) as LoadedConfigStrict;
};

export const create = (input: LoadedConfig): LoadedConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, LoadedConfigStrict> => {
	try {
		return resolve(loadedConfigSchema.parse(input) as LoadedConfigStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: LoadedConfigStrict): FutureInstance<TaqError, LoadedConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: loadedConfigSchema,
	schema: loadedConfigSchema.transform(val => val as LoadedConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = LoadedConfigStrict;
