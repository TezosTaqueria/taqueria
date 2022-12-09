// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { SandboxConfig } from '@taqueria/protocol/types';
import { SandboxConfig as SandboxConfigStrict } from '@taqueria/protocol/out/types-strict';
import { sandboxConfigSchema } from '@taqueria/protocol/out/types-zod';

export type { SandboxConfigStrict as SandboxConfig };

export const from = (input: unknown): SandboxConfigStrict => {
	try {
		return sandboxConfigSchema.parse(input) as SandboxConfigStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["SandboxConfig is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a SandboxConfig.")
	}
    
};

export const create = (input: SandboxConfig): SandboxConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SandboxConfigStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<SandboxConfigStrict, '__type'>): FutureInstance<TaqError, SandboxConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: sandboxConfigSchema,
	schema: sandboxConfigSchema.transform(val => val as SandboxConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = sandboxConfigSchema;

export type t = SandboxConfigStrict;
        