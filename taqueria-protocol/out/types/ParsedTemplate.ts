// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { ParsedTemplate } from '@taqueria/protocol/types';
import { ParsedTemplate as ParsedTemplateStrict } from '@taqueria/protocol/out/types-strict';
import { parsedTemplateSchema } from '@taqueria/protocol/out/types-zod';

export type { ParsedTemplateStrict as ParsedTemplate };

export const from = (input: unknown): ParsedTemplateStrict => {
	try {
		return parsedTemplateSchema.parse(input) as ParsedTemplateStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["ParsedTemplate is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a ParsedTemplate.")
	}
    
};

export const create = (input: ParsedTemplate): ParsedTemplateStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ParsedTemplateStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ParsedTemplateStrict, '__type'>): FutureInstance<TaqError, ParsedTemplateStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: parsedTemplateSchema,
	schema: parsedTemplateSchema.transform(val => val as ParsedTemplateStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = parsedTemplateSchema;

export type t = ParsedTemplateStrict;
        