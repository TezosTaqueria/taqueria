// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { MetadataConfig as MetadataConfigStrict } from '@taqueria/protocol-types/out/types-strict';
import { metadataConfigSchema } from '@taqueria/protocol-types/out/types-zod';
import { MetadataConfig } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { MetadataConfigStrict as MetadataConfig };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('MetadataConfig');

export const from = (input: unknown): MetadataConfigStrict => {
	return metadataConfigSchema.parse(input) as MetadataConfigStrict;
};

export const create = (input: MetadataConfig): MetadataConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, MetadataConfigStrict> => {
	try {
		return resolve(metadataConfigSchema.parse(input) as MetadataConfigStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: MetadataConfigStrict): FutureInstance<TaqError, MetadataConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: metadataConfigSchema,
	schema: metadataConfigSchema.transform(val => val as MetadataConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = MetadataConfigStrict;
