// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Provisioner } from '@taqueria/protocol/types';
import { Provisioner as ProvisionerStrict } from '@taqueria/protocol/out/types-strict';
import { provisionerSchema } from '@taqueria/protocol/out/types-zod';

export type { ProvisionerStrict as Provisioner };

export const from = (input: unknown): ProvisionerStrict => {
	try {
		return provisionerSchema.parse(input) as ProvisionerStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Provisioner is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Provisioner.")
	}
    
};

export const create = (input: Provisioner): ProvisionerStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ProvisionerStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ProvisionerStrict, '__type'>): FutureInstance<TaqError, ProvisionerStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: provisionerSchema,
	schema: provisionerSchema.transform(val => val as ProvisionerStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = provisionerSchema;

export type t = ProvisionerStrict;
        