// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { SandboxAccountConfig } from '@taqueria/protocol/types';
import { SandboxAccountConfig as SandboxAccountConfigStrict } from '@taqueria/protocol/out/types-strict';
import { sandboxAccountConfigSchema } from '@taqueria/protocol/out/types-zod';

export type { SandboxAccountConfigStrict as SandboxAccountConfig };

export const from = (input: unknown): SandboxAccountConfigStrict => {
	try {
		return sandboxAccountConfigSchema.parse(input) as SandboxAccountConfigStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["SandboxAccountConfig is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a SandboxAccountConfig.")
	}
    
};

export const create = (input: SandboxAccountConfig): SandboxAccountConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SandboxAccountConfigStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<SandboxAccountConfigStrict, '__type'>): FutureInstance<TaqError, SandboxAccountConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: sandboxAccountConfigSchema,
	schema: sandboxAccountConfigSchema.transform(val => val as SandboxAccountConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = sandboxAccountConfigSchema;

export type t = SandboxAccountConfigStrict;
        