// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { ProvisionerID } from '@taqueria/protocol/types';
import { ProvisionerID as ProvisionerIDStrict } from '@taqueria/protocol/out/types-strict';
import { provisionerIDSchema } from '@taqueria/protocol/out/types-zod';

export type { ProvisionerIDStrict as ProvisionerID };

export const from = (input: unknown): ProvisionerIDStrict => {
	try {
		return provisionerIDSchema.parse(input) as ProvisionerIDStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["ProvisionerID is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a ProvisionerID.")
	}
    
};

export const create = (input: ProvisionerID): ProvisionerIDStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ProvisionerIDStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ProvisionerIDStrict, '__type'>): FutureInstance<TaqError, ProvisionerIDStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: provisionerIDSchema,
	schema: provisionerIDSchema.transform(val => val as ProvisionerIDStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = provisionerIDSchema;

export type t = ProvisionerIDStrict;
        