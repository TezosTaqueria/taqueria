// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { EconomicalProtocolHash } from '@taqueria/protocol/types';
import { EconomicalProtocolHash as EconomicalProtocolHashStrict } from '@taqueria/protocol/out/types-strict';
import { economicalProtocolHashSchema } from '@taqueria/protocol/out/types-zod';

export type { EconomicalProtocolHashStrict as EconomicalProtocolHash };

export const from = (input: unknown): EconomicalProtocolHashStrict => {
	try {
		return economicalProtocolHashSchema.parse(input) as EconomicalProtocolHashStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["EconomicalProtocolHash is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a EconomicalProtocolHash.")
	}
    
};

export const create = (input: EconomicalProtocolHash): EconomicalProtocolHashStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, EconomicalProtocolHashStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<EconomicalProtocolHashStrict, '__type'>): FutureInstance<TaqError, EconomicalProtocolHashStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: economicalProtocolHashSchema,
	schema: economicalProtocolHashSchema.transform(val => val as EconomicalProtocolHashStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = economicalProtocolHashSchema;

export type t = EconomicalProtocolHashStrict;
        