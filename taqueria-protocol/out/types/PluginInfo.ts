// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PluginInfo } from '@taqueria/protocol/types';
import { PluginInfo as PluginInfoStrict } from '@taqueria/protocol/out/types-strict';
import { pluginInfoSchema } from '@taqueria/protocol/out/types-zod';

export type { PluginInfoStrict as PluginInfo };

export const from = (input: unknown): PluginInfoStrict => {
	try {
		return pluginInfoSchema.parse(input) as PluginInfoStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PluginInfo is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PluginInfo.")
	}
    
};

export const create = (input: PluginInfo): PluginInfoStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginInfoStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PluginInfoStrict, '__type'>): FutureInstance<TaqError, PluginInfoStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginInfoSchema,
	schema: pluginInfoSchema.transform(val => val as PluginInfoStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = pluginInfoSchema;

export type t = PluginInfoStrict;
        