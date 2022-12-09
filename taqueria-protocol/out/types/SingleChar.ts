// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { SingleChar } from '@taqueria/protocol/types';
import { SingleChar as SingleCharStrict } from '@taqueria/protocol/out/types-strict';
import { singleCharSchema } from '@taqueria/protocol/out/types-zod';

export type { SingleCharStrict as SingleChar };

export const from = (input: unknown): SingleCharStrict => {
	try {
		return singleCharSchema.parse(input) as SingleCharStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["SingleChar is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a SingleChar.")
	}
    
};

export const create = (input: SingleChar): SingleCharStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SingleCharStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<SingleCharStrict, '__type'>): FutureInstance<TaqError, SingleCharStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: singleCharSchema,
	schema: singleCharSchema.transform(val => val as SingleCharStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = singleCharSchema;

export type t = SingleCharStrict;
        