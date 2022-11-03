// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Operation as OperationStrict } from '@taqueria/protocol-types/out/types-strict';
import { operationSchema } from '@taqueria/protocol-types/out/types-zod';
import { Operation } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { OperationStrict as Operation };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Operation');

export const from = (input: unknown): OperationStrict => {
	return operationSchema.parse(input) as OperationStrict;
};

export const create = (input: Operation): OperationStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, OperationStrict> => {
	try {
		return resolve(operationSchema.parse(input) as OperationStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: OperationStrict): FutureInstance<TaqError, OperationStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: operationSchema,
	schema: operationSchema.transform(val => val as OperationStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = OperationStrict;
