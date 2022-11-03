// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { RuntimeDependency as RuntimeDependencyStrict } from '@taqueria/protocol-types/out/types-strict';
import { runtimeDependencySchema } from '@taqueria/protocol-types/out/types-zod';
import { RuntimeDependency } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { RuntimeDependencyStrict as RuntimeDependency };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('RuntimeDependency');

export const from = (input: unknown): RuntimeDependencyStrict => {
	return runtimeDependencySchema.parse(input) as RuntimeDependencyStrict;
};

export const create = (input: RuntimeDependency): RuntimeDependencyStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, RuntimeDependencyStrict> => {
	try {
		return resolve(runtimeDependencySchema.parse(input) as RuntimeDependencyStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: RuntimeDependencyStrict): FutureInstance<TaqError, RuntimeDependencyStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: runtimeDependencySchema,
	schema: runtimeDependencySchema.transform(val => val as RuntimeDependencyStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = RuntimeDependencyStrict;
