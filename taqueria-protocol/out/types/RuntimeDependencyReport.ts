// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { RuntimeDependencyReport } from '@taqueria/protocol/types';
import { RuntimeDependencyReport as RuntimeDependencyReportStrict } from '@taqueria/protocol/out/types-strict';
import { runtimeDependencyReportSchema } from '@taqueria/protocol/out/types-zod';

export type { RuntimeDependencyReportStrict as RuntimeDependencyReport };

export const from = (input: unknown): RuntimeDependencyReportStrict => {
	try {
		return runtimeDependencyReportSchema.parse(input) as RuntimeDependencyReportStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["RuntimeDependencyReport is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a RuntimeDependencyReport.")
	}
    
};

export const create = (input: RuntimeDependencyReport): RuntimeDependencyReportStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, RuntimeDependencyReportStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<RuntimeDependencyReportStrict, '__type'>): FutureInstance<TaqError, RuntimeDependencyReportStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: runtimeDependencyReportSchema,
	schema: runtimeDependencyReportSchema.transform(val => val as RuntimeDependencyReportStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = runtimeDependencyReportSchema;

export type t = RuntimeDependencyReportStrict;
        