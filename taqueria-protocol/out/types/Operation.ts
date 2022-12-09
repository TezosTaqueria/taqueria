// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Operation } from '@taqueria/protocol/types';
import { Operation as OperationStrict } from '@taqueria/protocol/out/types-strict';
import { operationSchema } from '@taqueria/protocol/out/types-zod';

export type { OperationStrict as Operation };

export const from = (input: unknown): OperationStrict => {
	try {
		return operationSchema.parse(input) as OperationStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Operation is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Operation.")
	}
    
};

export const create = (input: Operation): OperationStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, OperationStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<OperationStrict, '__type'>): FutureInstance<TaqError, OperationStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: operationSchema,
	schema: operationSchema.transform(val => val as OperationStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = operationSchema;

export type t = OperationStrict;
        