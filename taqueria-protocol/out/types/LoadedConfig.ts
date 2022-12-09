// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { LoadedConfig } from '@taqueria/protocol/types';
import { LoadedConfig as LoadedConfigStrict } from '@taqueria/protocol/out/types-strict';
import { loadedConfigSchema } from '@taqueria/protocol/out/types-zod';

export type { LoadedConfigStrict as LoadedConfig };

export const from = (input: unknown): LoadedConfigStrict => {
	try {
		return loadedConfigSchema.parse(input) as LoadedConfigStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Your .taq/config.json is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a LoadedConfig.")
	}
    
};

export const create = (input: LoadedConfig): LoadedConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, LoadedConfigStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<LoadedConfigStrict, '__type'>): FutureInstance<TaqError, LoadedConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: loadedConfigSchema,
	schema: loadedConfigSchema.transform(val => val as LoadedConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = loadedConfigSchema;

export type t = LoadedConfigStrict;
        