// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Config } from '@taqueria/protocol/types';
import { Config as ConfigStrict } from '@taqueria/protocol/out/types-strict';
import { configSchema } from '@taqueria/protocol/out/types-zod';

export type { ConfigStrict as Config };

export const from = (input: unknown): ConfigStrict => {
	try {
		return configSchema.parse(input) as ConfigStrict;
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
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Config.")
	}
    
};

export const create = (input: Config): ConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ConfigStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ConfigStrict, '__type'>): FutureInstance<TaqError, ConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: configSchema,
	schema: configSchema.transform(val => val as ConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = configSchema;

export type t = ConfigStrict;
        