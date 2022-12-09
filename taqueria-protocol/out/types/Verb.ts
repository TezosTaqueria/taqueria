// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Verb } from '@taqueria/protocol/types';
import { Verb as VerbStrict } from '@taqueria/protocol/out/types-strict';
import { verbSchema } from '@taqueria/protocol/out/types-zod';

export type { VerbStrict as Verb };

export const from = (input: unknown): VerbStrict => {
	try {
		return verbSchema.parse(input) as VerbStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Verb is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Verb.")
	}
    
};

export const create = (input: Verb): VerbStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, VerbStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<VerbStrict, '__type'>): FutureInstance<TaqError, VerbStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: verbSchema,
	schema: verbSchema.transform(val => val as VerbStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = verbSchema;

export type t = VerbStrict;
        