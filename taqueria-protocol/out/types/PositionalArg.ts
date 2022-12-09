// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PositionalArg } from '@taqueria/protocol/types';
import { PositionalArg as PositionalArgStrict } from '@taqueria/protocol/out/types-strict';
import { positionalArgSchema } from '@taqueria/protocol/out/types-zod';

export type { PositionalArgStrict as PositionalArg };

export const from = (input: unknown): PositionalArgStrict => {
	try {
		return positionalArgSchema.parse(input) as PositionalArgStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PositionalArg is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PositionalArg.")
	}
    
};

export const create = (input: PositionalArg): PositionalArgStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PositionalArgStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PositionalArgStrict, '__type'>): FutureInstance<TaqError, PositionalArgStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: positionalArgSchema,
	schema: positionalArgSchema.transform(val => val as PositionalArgStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = positionalArgSchema;

export type t = PositionalArgStrict;
        