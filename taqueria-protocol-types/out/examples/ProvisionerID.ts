// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { ProvisionerID, provisionerIDSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { ProvisionerID as ProvisionerIDStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { ProvisionerID } from '../../types';
import { provisionerIDSchema } from '../types-zod';

export type { ProvisionerIDStrict as ProvisionerID };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('ProvisionerID');

export const from = (input: unknown): ProvisionerIDStrict => {
	return provisionerIDSchema.parse(input) as ProvisionerIDStrict;
};

export const create = (input: ProvisionerID): ProvisionerIDStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ProvisionerIDStrict> => {
	try {
		return resolve(provisionerIDSchema.parse(input) as ProvisionerIDStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: ProvisionerIDStrict): FutureInstance<TaqError, ProvisionerIDStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: provisionerIDSchema,
	schema: provisionerIDSchema.transform(val => val as ProvisionerIDStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = ProvisionerIDStrict;
