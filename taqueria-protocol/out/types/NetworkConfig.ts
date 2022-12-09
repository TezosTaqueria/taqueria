// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { NetworkConfig } from '@taqueria/protocol/types';
import { NetworkConfig as NetworkConfigStrict } from '@taqueria/protocol/out/types-strict';
import { networkConfigSchema } from '@taqueria/protocol/out/types-zod';

export type { NetworkConfigStrict as NetworkConfig };

export const from = (input: unknown): NetworkConfigStrict => {
	try {
		return networkConfigSchema.parse(input) as NetworkConfigStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["NetworkConfig is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a NetworkConfig.")
	}
    
};

export const create = (input: NetworkConfig): NetworkConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, NetworkConfigStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<NetworkConfigStrict, '__type'>): FutureInstance<TaqError, NetworkConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: networkConfigSchema,
	schema: networkConfigSchema.transform(val => val as NetworkConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = networkConfigSchema;

export type t = NetworkConfigStrict;
        