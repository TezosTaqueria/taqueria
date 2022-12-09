// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Contract } from '@taqueria/protocol/types';
import { Contract as ContractStrict } from '@taqueria/protocol/out/types-strict';
import { contractSchema } from '@taqueria/protocol/out/types-zod';

export type { ContractStrict as Contract };

export const from = (input: unknown): ContractStrict => {
	try {
		return contractSchema.parse(input) as ContractStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Contract is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Contract.")
	}
    
};

export const create = (input: Contract): ContractStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ContractStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ContractStrict, '__type'>): FutureInstance<TaqError, ContractStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: contractSchema,
	schema: contractSchema.transform(val => val as ContractStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = contractSchema;

export type t = ContractStrict;
        