// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { VersionNumber } from '@taqueria/protocol/types';
import { VersionNumber as VersionNumberStrict } from '@taqueria/protocol/out/types-strict';
import { versionNumberSchema } from '@taqueria/protocol/out/types-zod';

export type { VersionNumberStrict as VersionNumber };

export const from = (input: unknown): VersionNumberStrict => {
	try {
		return versionNumberSchema.parse(input) as VersionNumberStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["VersionNumber is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a VersionNumber.")
	}
    
};

export const create = (input: VersionNumber): VersionNumberStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, VersionNumberStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<VersionNumberStrict, '__type'>): FutureInstance<TaqError, VersionNumberStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: versionNumberSchema,
	schema: versionNumberSchema.transform(val => val as VersionNumberStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = versionNumberSchema;

export type t = VersionNumberStrict;
        