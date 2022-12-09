// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PluginProxyResponse } from '@taqueria/protocol/types';
import { PluginProxyResponse as PluginProxyResponseStrict } from '@taqueria/protocol/out/types-strict';
import { pluginProxyResponseSchema } from '@taqueria/protocol/out/types-zod';

export type { PluginProxyResponseStrict as PluginProxyResponse };

export const from = (input: unknown): PluginProxyResponseStrict => {
	try {
		return pluginProxyResponseSchema.parse(input) as PluginProxyResponseStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PluginProxyResponse is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PluginProxyResponse.")
	}
    
};

export const create = (input: PluginProxyResponse): PluginProxyResponseStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginProxyResponseStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PluginProxyResponseStrict, '__type'>): FutureInstance<TaqError, PluginProxyResponseStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginProxyResponseSchema,
	schema: pluginProxyResponseSchema.transform(val => val as PluginProxyResponseStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = pluginProxyResponseSchema;

export type t = PluginProxyResponseStrict;
        