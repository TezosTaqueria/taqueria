// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { BuildNumber } from '@taqueria/protocol/types';
import { BuildNumber as BuildNumberStrict } from '@taqueria/protocol/out/types-strict';
import { buildNumberSchema } from '@taqueria/protocol/out/types-zod';

export type { BuildNumberStrict as BuildNumber };

export const from = (input: unknown): BuildNumberStrict => {
	try {
		return buildNumberSchema.parse(input) as BuildNumberStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["BuildNumber is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a BuildNumber.")
	}
    
};

export const create = (input: BuildNumber): BuildNumberStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, BuildNumberStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<BuildNumberStrict, '__type'>): FutureInstance<TaqError, BuildNumberStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: buildNumberSchema,
	schema: buildNumberSchema.transform(val => val as BuildNumberStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = buildNumberSchema;

export type t = BuildNumberStrict;
        