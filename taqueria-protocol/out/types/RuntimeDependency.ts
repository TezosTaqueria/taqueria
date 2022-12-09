// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { RuntimeDependency } from '@taqueria/protocol/types';
import { RuntimeDependency as RuntimeDependencyStrict } from '@taqueria/protocol/out/types-strict';
import { runtimeDependencySchema } from '@taqueria/protocol/out/types-zod';

export type { RuntimeDependencyStrict as RuntimeDependency };

export const from = (input: unknown): RuntimeDependencyStrict => {
	try {
		return runtimeDependencySchema.parse(input) as RuntimeDependencyStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["RuntimeDependency is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a RuntimeDependency.")
	}
    
};

export const create = (input: RuntimeDependency): RuntimeDependencyStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, RuntimeDependencyStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<RuntimeDependencyStrict, '__type'>): FutureInstance<TaqError, RuntimeDependencyStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: runtimeDependencySchema,
	schema: runtimeDependencySchema.transform(val => val as RuntimeDependencyStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = runtimeDependencySchema;

export type t = RuntimeDependencyStrict;
        