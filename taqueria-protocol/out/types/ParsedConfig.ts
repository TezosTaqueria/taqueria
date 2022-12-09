// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { ParsedConfig } from '@taqueria/protocol/types';
import { ParsedConfig as ParsedConfigStrict } from '@taqueria/protocol/out/types-strict';
import { parsedConfigSchema } from '@taqueria/protocol/out/types-zod';

export type { ParsedConfigStrict as ParsedConfig };

export const from = (input: unknown): ParsedConfigStrict => {
	try {
		return parsedConfigSchema.parse(input) as ParsedConfigStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["ParsedConfig is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a ParsedConfig.")
	}
    
};

export const create = (input: ParsedConfig): ParsedConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ParsedConfigStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ParsedConfigStrict, '__type'>): FutureInstance<TaqError, ParsedConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: parsedConfigSchema,
	schema: parsedConfigSchema.transform(val => val as ParsedConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = parsedConfigSchema;

export type t = ParsedConfigStrict;
        