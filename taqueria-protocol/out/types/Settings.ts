// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Settings } from '@taqueria/protocol/types';
import { Settings as SettingsStrict } from '@taqueria/protocol/out/types-strict';
import { settingsSchema } from '@taqueria/protocol/out/types-zod';

export type { SettingsStrict as Settings };

export const from = (input: unknown): SettingsStrict => {
	try {
		return settingsSchema.parse(input) as SettingsStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Settings is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Settings.")
	}
    
};

export const create = (input: Settings): SettingsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SettingsStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<SettingsStrict, '__type'>): FutureInstance<TaqError, SettingsStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: settingsSchema,
	schema: settingsSchema.transform(val => val as SettingsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = settingsSchema;

export type t = SettingsStrict;
        