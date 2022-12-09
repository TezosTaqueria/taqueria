// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { MetadataConfig } from '@taqueria/protocol/types';
import { MetadataConfig as MetadataConfigStrict } from '@taqueria/protocol/out/types-strict';
import { metadataConfigSchema } from '@taqueria/protocol/out/types-zod';

export type { MetadataConfigStrict as MetadataConfig };

export const from = (input: unknown): MetadataConfigStrict => {
	try {
		return metadataConfigSchema.parse(input) as MetadataConfigStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["MetadataConfig is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a MetadataConfig.")
	}
    
};

export const create = (input: MetadataConfig): MetadataConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, MetadataConfigStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<MetadataConfigStrict, '__type'>): FutureInstance<TaqError, MetadataConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: metadataConfigSchema,
	schema: metadataConfigSchema.transform(val => val as MetadataConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = metadataConfigSchema;

export type t = MetadataConfigStrict;
        