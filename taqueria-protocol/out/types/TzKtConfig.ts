// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { TzKtConfig } from '@taqueria/protocol/types';
import { TzKtConfig as TzKtConfigStrict } from '@taqueria/protocol/out/types-strict';
import { tzKtConfigSchema } from '@taqueria/protocol/out/types-zod';

export type { TzKtConfigStrict as TzKtConfig };

export const from = (input: unknown): TzKtConfigStrict => {
	try {
		return tzKtConfigSchema.parse(input) as TzKtConfigStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["TzKtConfig is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a TzKtConfig.")
	}
    
};

export const create = (input: TzKtConfig): TzKtConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, TzKtConfigStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<TzKtConfigStrict, '__type'>): FutureInstance<TaqError, TzKtConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: tzKtConfigSchema,
	schema: tzKtConfigSchema.transform(val => val as TzKtConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = tzKtConfigSchema;

export type t = TzKtConfigStrict;
        