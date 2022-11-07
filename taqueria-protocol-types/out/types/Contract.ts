// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Contract as ContractStrict } from '@taqueria/protocol-types/out/types-strict';
import { contractSchema } from '@taqueria/protocol-types/out/types-zod';
import { Contract } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { ContractStrict as Contract };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Contract');

export const from = (input: unknown): ContractStrict => {
	return contractSchema.parse(input) as ContractStrict;
};

export const create = (input: Contract): ContractStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ContractStrict> => {
	try {
		return resolve(contractSchema.parse(input) as ContractStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<ContractStrict, '__type'>): FutureInstance<TaqError, ContractStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: contractSchema,
	schema: contractSchema.transform(val => val as ContractStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = contractSchema;

export type t = ContractStrict;
