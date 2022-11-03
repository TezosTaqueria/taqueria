// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { NetworkConfig as NetworkConfigStrict } from '@taqueria/protocol-types/out/types-strict';
import { networkConfigSchema } from '@taqueria/protocol-types/out/types-zod';
import { NetworkConfig } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { NetworkConfigStrict as NetworkConfig };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('NetworkConfig');

export const from = (input: unknown): NetworkConfigStrict => {
	return networkConfigSchema.parse(input) as NetworkConfigStrict;
};

export const create = (input: NetworkConfig): NetworkConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, NetworkConfigStrict> => {
	try {
		return resolve(networkConfigSchema.parse(input) as NetworkConfigStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: NetworkConfigStrict): FutureInstance<TaqError, NetworkConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: networkConfigSchema,
	schema: networkConfigSchema.transform(val => val as NetworkConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = NetworkConfigStrict;
