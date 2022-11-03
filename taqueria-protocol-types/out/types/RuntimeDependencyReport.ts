// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { RuntimeDependencyReport as RuntimeDependencyReportStrict } from '@taqueria/protocol-types/out/types-strict';
import { runtimeDependencyReportSchema } from '@taqueria/protocol-types/out/types-zod';
import { RuntimeDependencyReport } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { RuntimeDependencyReportStrict as RuntimeDependencyReport };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('RuntimeDependencyReport');

export const from = (input: unknown): RuntimeDependencyReportStrict => {
	return runtimeDependencyReportSchema.parse(input) as RuntimeDependencyReportStrict;
};

export const create = (input: RuntimeDependencyReport): RuntimeDependencyReportStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, RuntimeDependencyReportStrict> => {
	try {
		return resolve(runtimeDependencyReportSchema.parse(input) as RuntimeDependencyReportStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: RuntimeDependencyReportStrict): FutureInstance<TaqError, RuntimeDependencyReportStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: runtimeDependencyReportSchema,
	schema: runtimeDependencyReportSchema.transform(val => val as RuntimeDependencyReportStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = RuntimeDependencyReportStrict;
