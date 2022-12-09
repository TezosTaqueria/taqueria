// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { ConfigArtifactsDir } from '@taqueria/protocol/types';
import { ConfigArtifactsDir as ConfigArtifactsDirStrict } from '@taqueria/protocol/out/types-strict';
import { configArtifactsDirSchema } from '@taqueria/protocol/out/types-zod';

export type { ConfigArtifactsDirStrict as ConfigArtifactsDir };

export const from = (input: unknown): ConfigArtifactsDirStrict => {
	try {
		return configArtifactsDirSchema.parse(input) as ConfigArtifactsDirStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["ConfigArtifactsDir is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a ConfigArtifactsDir.")
	}
    
};

export const create = (input: ConfigArtifactsDir): ConfigArtifactsDirStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ConfigArtifactsDirStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ConfigArtifactsDirStrict, '__type'>): FutureInstance<TaqError, ConfigArtifactsDirStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: configArtifactsDirSchema,
	schema: configArtifactsDirSchema.transform(val => val as ConfigArtifactsDirStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = configArtifactsDirSchema;

export type t = ConfigArtifactsDirStrict;
        