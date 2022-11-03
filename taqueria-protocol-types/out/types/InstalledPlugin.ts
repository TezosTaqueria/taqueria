// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { InstalledPlugin as InstalledPluginStrict } from '@taqueria/protocol-types/out/types-strict';
import { installedPluginSchema } from '@taqueria/protocol-types/out/types-zod';
import { InstalledPlugin } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { InstalledPluginStrict as InstalledPlugin };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('InstalledPlugin');

export const from = (input: unknown): InstalledPluginStrict => {
	return installedPluginSchema.parse(input) as InstalledPluginStrict;
};

export const create = (input: InstalledPlugin): InstalledPluginStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, InstalledPluginStrict> => {
	try {
		return resolve(installedPluginSchema.parse(input) as InstalledPluginStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: InstalledPluginStrict): FutureInstance<TaqError, InstalledPluginStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: installedPluginSchema,
	schema: installedPluginSchema.transform(val => val as InstalledPluginStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = InstalledPluginStrict;
