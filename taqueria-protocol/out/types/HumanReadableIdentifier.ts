// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { HumanReadableIdentifier } from '@taqueria/protocol/types';
import { HumanReadableIdentifier as HumanReadableIdentifierStrict } from '@taqueria/protocol/out/types-strict';
import { humanReadableIdentifierSchema } from '@taqueria/protocol/out/types-zod';

export type { HumanReadableIdentifierStrict as HumanReadableIdentifier };

export const from = (input: unknown): HumanReadableIdentifierStrict => {
	try {
		return humanReadableIdentifierSchema.parse(input) as HumanReadableIdentifierStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["HumanReadableIdentifier is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a HumanReadableIdentifier.")
	}
    
};

export const create = (input: HumanReadableIdentifier): HumanReadableIdentifierStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, HumanReadableIdentifierStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<HumanReadableIdentifierStrict, '__type'>): FutureInstance<TaqError, HumanReadableIdentifierStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: humanReadableIdentifierSchema,
	schema: humanReadableIdentifierSchema.transform(val => val as HumanReadableIdentifierStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = humanReadableIdentifierSchema;

export type t = HumanReadableIdentifierStrict;
        