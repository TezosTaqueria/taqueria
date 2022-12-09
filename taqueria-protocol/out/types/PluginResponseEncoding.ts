// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PluginResponseEncoding } from '@taqueria/protocol/types';
import { PluginResponseEncoding as PluginResponseEncodingStrict } from '@taqueria/protocol/out/types-strict';
import { pluginResponseEncodingSchema } from '@taqueria/protocol/out/types-zod';

export type { PluginResponseEncodingStrict as PluginResponseEncoding };

export const from = (input: unknown): PluginResponseEncodingStrict => {
	try {
		return pluginResponseEncodingSchema.parse(input) as PluginResponseEncodingStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PluginResponseEncoding is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PluginResponseEncoding.")
	}
    
};

export const create = (input: PluginResponseEncoding): PluginResponseEncodingStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginResponseEncodingStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PluginResponseEncodingStrict, '__type'>): FutureInstance<TaqError, PluginResponseEncodingStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginResponseEncodingSchema,
	schema: pluginResponseEncodingSchema.transform(val => val as PluginResponseEncodingStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = pluginResponseEncodingSchema;

export type t = PluginResponseEncodingStrict;
        