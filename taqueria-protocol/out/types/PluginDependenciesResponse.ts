// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PluginDependenciesResponse } from '@taqueria/protocol/types';
import { PluginDependenciesResponse as PluginDependenciesResponseStrict } from '@taqueria/protocol/out/types-strict';
import { pluginDependenciesResponseSchema } from '@taqueria/protocol/out/types-zod';

export type { PluginDependenciesResponseStrict as PluginDependenciesResponse };

export const from = (input: unknown): PluginDependenciesResponseStrict => {
	try {
		return pluginDependenciesResponseSchema.parse(input) as PluginDependenciesResponseStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PluginDependenciesResponse is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PluginDependenciesResponse.")
	}
    
};

export const create = (input: PluginDependenciesResponse): PluginDependenciesResponseStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginDependenciesResponseStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PluginDependenciesResponseStrict, '__type'>): FutureInstance<TaqError, PluginDependenciesResponseStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginDependenciesResponseSchema,
	schema: pluginDependenciesResponseSchema.transform(val => val as PluginDependenciesResponseStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = pluginDependenciesResponseSchema;

export type t = PluginDependenciesResponseStrict;
        