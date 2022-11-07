// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Provisioner as ProvisionerStrict } from '@taqueria/protocol-types/out/types-strict';
import { provisionerSchema } from '@taqueria/protocol-types/out/types-zod';
import { Provisioner } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { ProvisionerStrict as Provisioner };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Provisioner');

export const from = (input: unknown): ProvisionerStrict => {
	return provisionerSchema.parse(input) as ProvisionerStrict;
};

export const create = (input: Provisioner): ProvisionerStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ProvisionerStrict> => {
	try {
		return resolve(provisionerSchema.parse(input) as ProvisionerStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<ProvisionerStrict, '__type'>): FutureInstance<TaqError, ProvisionerStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: provisionerSchema,
	schema: provisionerSchema.transform(val => val as ProvisionerStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = provisionerSchema;

export type t = ProvisionerStrict;
