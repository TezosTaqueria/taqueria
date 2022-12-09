// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Faucet } from '@taqueria/protocol/types';
import { Faucet as FaucetStrict } from '@taqueria/protocol/out/types-strict';
import { faucetSchema } from '@taqueria/protocol/out/types-zod';

export type { FaucetStrict as Faucet };

export const from = (input: unknown): FaucetStrict => {
	try {
		return faucetSchema.parse(input) as FaucetStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Faucet is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Faucet.")
	}
    
};

export const create = (input: Faucet): FaucetStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, FaucetStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<FaucetStrict, '__type'>): FutureInstance<TaqError, FaucetStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: faucetSchema,
	schema: faucetSchema.transform(val => val as FaucetStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = faucetSchema;

export type t = FaucetStrict;
        