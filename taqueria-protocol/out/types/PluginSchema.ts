// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PluginSchema } from '@taqueria/protocol/types';
import { PluginSchema as PluginSchemaStrict } from '@taqueria/protocol/out/types-strict';
import { pluginSchemaSchema } from '@taqueria/protocol/out/types-zod';

export type { PluginSchemaStrict as PluginSchema };

export const from = (input: unknown): PluginSchemaStrict => {
	try {
		return pluginSchemaSchema.parse(input) as PluginSchemaStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PluginSchema is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PluginSchema.")
	}
    
};

export const create = (input: PluginSchema): PluginSchemaStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginSchemaStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PluginSchemaStrict, '__type'>): FutureInstance<TaqError, PluginSchemaStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginSchemaSchema,
	schema: pluginSchemaSchema.transform(val => val as PluginSchemaStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = pluginSchemaSchema;

export type t = PluginSchemaStrict;
        