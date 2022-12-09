// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { ScaffoldConfig } from '@taqueria/protocol/types';
import { ScaffoldConfig as ScaffoldConfigStrict } from '@taqueria/protocol/out/types-strict';
import { scaffoldConfigSchema } from '@taqueria/protocol/out/types-zod';

export type { ScaffoldConfigStrict as ScaffoldConfig };

export const from = (input: unknown): ScaffoldConfigStrict => {
	try {
		return scaffoldConfigSchema.parse(input) as ScaffoldConfigStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["ScaffoldConfig is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a ScaffoldConfig.")
	}
    
};

export const create = (input: ScaffoldConfig): ScaffoldConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ScaffoldConfigStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ScaffoldConfigStrict, '__type'>): FutureInstance<TaqError, ScaffoldConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: scaffoldConfigSchema,
	schema: scaffoldConfigSchema.transform(val => val as ScaffoldConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = scaffoldConfigSchema;

export type t = ScaffoldConfigStrict;
        