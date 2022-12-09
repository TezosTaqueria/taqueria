// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { InstalledPlugin } from '@taqueria/protocol/types';
import { InstalledPlugin as InstalledPluginStrict } from '@taqueria/protocol/out/types-strict';
import { installedPluginSchema } from '@taqueria/protocol/out/types-zod';

export type { InstalledPluginStrict as InstalledPlugin };

export const from = (input: unknown): InstalledPluginStrict => {
	try {
		return installedPluginSchema.parse(input) as InstalledPluginStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["InstalledPlugin is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a InstalledPlugin.")
	}
    
};

export const create = (input: InstalledPlugin): InstalledPluginStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, InstalledPluginStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<InstalledPluginStrict, '__type'>): FutureInstance<TaqError, InstalledPluginStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: installedPluginSchema,
	schema: installedPluginSchema.transform(val => val as InstalledPluginStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = installedPluginSchema;

export type t = InstalledPluginStrict;
        