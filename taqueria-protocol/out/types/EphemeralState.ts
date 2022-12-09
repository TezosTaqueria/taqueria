// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { EphemeralState } from '@taqueria/protocol/types';
import { EphemeralState as EphemeralStateStrict } from '@taqueria/protocol/out/types-strict';
import { ephemeralStateSchema } from '@taqueria/protocol/out/types-zod';

export type { EphemeralStateStrict as EphemeralState };

export const from = (input: unknown): EphemeralStateStrict => {
	try {
		return ephemeralStateSchema.parse(input) as EphemeralStateStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["EphemeralState is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a EphemeralState.")
	}
    
};

export const create = (input: EphemeralState): EphemeralStateStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, EphemeralStateStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<EphemeralStateStrict, '__type'>): FutureInstance<TaqError, EphemeralStateStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: ephemeralStateSchema,
	schema: ephemeralStateSchema.transform(val => val as EphemeralStateStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = ephemeralStateSchema;

export type t = EphemeralStateStrict;
        