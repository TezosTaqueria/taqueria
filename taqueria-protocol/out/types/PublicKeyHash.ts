// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PublicKeyHash } from '@taqueria/protocol/types';
import { PublicKeyHash as PublicKeyHashStrict } from '@taqueria/protocol/out/types-strict';
import { publicKeyHashSchema } from '@taqueria/protocol/out/types-zod';

export type { PublicKeyHashStrict as PublicKeyHash };

export const from = (input: unknown): PublicKeyHashStrict => {
	try {
		return publicKeyHashSchema.parse(input) as PublicKeyHashStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PublicKeyHash is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PublicKeyHash.")
	}
    
};

export const create = (input: PublicKeyHash): PublicKeyHashStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PublicKeyHashStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PublicKeyHashStrict, '__type'>): FutureInstance<TaqError, PublicKeyHashStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: publicKeyHashSchema,
	schema: publicKeyHashSchema.transform(val => val as PublicKeyHashStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = publicKeyHashSchema;

export type t = PublicKeyHashStrict;
        