// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PluginActionName } from '@taqueria/protocol/types';
import { PluginActionName as PluginActionNameStrict } from '@taqueria/protocol/out/types-strict';
import { pluginActionNameSchema } from '@taqueria/protocol/out/types-zod';

export type { PluginActionNameStrict as PluginActionName };

export const from = (input: unknown): PluginActionNameStrict => {
	try {
		return pluginActionNameSchema.parse(input) as PluginActionNameStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PluginActionName is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PluginActionName.")
	}
    
};

export const create = (input: PluginActionName): PluginActionNameStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginActionNameStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PluginActionNameStrict, '__type'>): FutureInstance<TaqError, PluginActionNameStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginActionNameSchema,
	schema: pluginActionNameSchema.transform(val => val as PluginActionNameStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = pluginActionNameSchema;

export type t = PluginActionNameStrict;
        