// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { ProxyTemplateArgs } from '@taqueria/protocol/types';
import { ProxyTemplateArgs as ProxyTemplateArgsStrict } from '@taqueria/protocol/out/types-strict';
import { proxyTemplateArgsSchema } from '@taqueria/protocol/out/types-zod';

export type { ProxyTemplateArgsStrict as ProxyTemplateArgs };

export const from = (input: unknown): ProxyTemplateArgsStrict => {
	try {
		return proxyTemplateArgsSchema.parse(input) as ProxyTemplateArgsStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["ProxyTemplateArgs is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a ProxyTemplateArgs.")
	}
    
};

export const create = (input: ProxyTemplateArgs): ProxyTemplateArgsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ProxyTemplateArgsStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ProxyTemplateArgsStrict, '__type'>): FutureInstance<TaqError, ProxyTemplateArgsStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: proxyTemplateArgsSchema,
	schema: proxyTemplateArgsSchema.transform(val => val as ProxyTemplateArgsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = proxyTemplateArgsSchema;

export type t = ProxyTemplateArgsStrict;
        