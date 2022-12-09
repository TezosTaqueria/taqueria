// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { ProxyTaskArgs } from '@taqueria/protocol/types';
import { ProxyTaskArgs as ProxyTaskArgsStrict } from '@taqueria/protocol/out/types-strict';
import { proxyTaskArgsSchema } from '@taqueria/protocol/out/types-zod';

export type { ProxyTaskArgsStrict as ProxyTaskArgs };

export const from = (input: unknown): ProxyTaskArgsStrict => {
	try {
		return proxyTaskArgsSchema.parse(input) as ProxyTaskArgsStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["ProxyTaskArgs is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a ProxyTaskArgs.")
	}
    
};

export const create = (input: ProxyTaskArgs): ProxyTaskArgsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ProxyTaskArgsStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ProxyTaskArgsStrict, '__type'>): FutureInstance<TaqError, ProxyTaskArgsStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: proxyTaskArgsSchema,
	schema: proxyTaskArgsSchema.transform(val => val as ProxyTaskArgsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = proxyTaskArgsSchema;

export type t = ProxyTaskArgsStrict;
        