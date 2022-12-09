// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PluginJsonResponse } from '@taqueria/protocol/types';
import { PluginJsonResponse as PluginJsonResponseStrict } from '@taqueria/protocol/out/types-strict';
import { pluginJsonResponseSchema } from '@taqueria/protocol/out/types-zod';

export type { PluginJsonResponseStrict as PluginJsonResponse };

export const from = (input: unknown): PluginJsonResponseStrict => {
	try {
		return pluginJsonResponseSchema.parse(input) as PluginJsonResponseStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PluginJsonResponse is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PluginJsonResponse.")
	}
    
};

export const create = (input: PluginJsonResponse): PluginJsonResponseStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginJsonResponseStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PluginJsonResponseStrict, '__type'>): FutureInstance<TaqError, PluginJsonResponseStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginJsonResponseSchema,
	schema: pluginJsonResponseSchema.transform(val => val as PluginJsonResponseStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = pluginJsonResponseSchema;

export type t = PluginJsonResponseStrict;
        