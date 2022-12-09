// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Template } from '@taqueria/protocol/types';
import { Template as TemplateStrict } from '@taqueria/protocol/out/types-strict';
import { templateSchema } from '@taqueria/protocol/out/types-zod';

export type { TemplateStrict as Template };

export const from = (input: unknown): TemplateStrict => {
	try {
		return templateSchema.parse(input) as TemplateStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Template is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Template.")
	}
    
};

export const create = (input: Template): TemplateStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, TemplateStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<TemplateStrict, '__type'>): FutureInstance<TaqError, TemplateStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: templateSchema,
	schema: templateSchema.transform(val => val as TemplateStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = templateSchema;

export type t = TemplateStrict;
        