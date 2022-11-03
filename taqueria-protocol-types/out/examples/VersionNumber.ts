// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { VersionNumber, versionNumberSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { VersionNumber as VersionNumberStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { VersionNumber } from '../../types';
import { versionNumberSchema } from '../types-zod';

export type { VersionNumberStrict as VersionNumber };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('VersionNumber');

export const from = (input: unknown): VersionNumberStrict => {
	return versionNumberSchema.parse(input) as VersionNumberStrict;
};

export const create = (input: VersionNumber): VersionNumberStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, VersionNumberStrict> => {
	try {
		return resolve(versionNumberSchema.parse(input) as VersionNumberStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: VersionNumberStrict): FutureInstance<TaqError, VersionNumberStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: versionNumberSchema,
	schema: versionNumberSchema.transform(val => val as VersionNumberStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = VersionNumberStrict;
