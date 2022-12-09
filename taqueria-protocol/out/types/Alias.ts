// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Alias } from '@taqueria/protocol/types';
import { Alias as AliasStrict } from '@taqueria/protocol/out/types-strict';
import { aliasSchema } from '@taqueria/protocol/out/types-zod';

export type { AliasStrict as Alias };

export const from = (input: unknown): AliasStrict => {
	try {
		return aliasSchema.parse(input) as AliasStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Alias is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Alias.")
	}
    
};

export const create = (input: Alias): AliasStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, AliasStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<AliasStrict, '__type'>): FutureInstance<TaqError, AliasStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: aliasSchema,
	schema: aliasSchema.transform(val => val as AliasStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = aliasSchema;

export type t = AliasStrict;
        