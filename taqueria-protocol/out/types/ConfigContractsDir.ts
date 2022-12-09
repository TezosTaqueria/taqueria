// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { ConfigContractsDir } from '@taqueria/protocol/types';
import { ConfigContractsDir as ConfigContractsDirStrict } from '@taqueria/protocol/out/types-strict';
import { configContractsDirSchema } from '@taqueria/protocol/out/types-zod';

export type { ConfigContractsDirStrict as ConfigContractsDir };

export const from = (input: unknown): ConfigContractsDirStrict => {
	try {
		return configContractsDirSchema.parse(input) as ConfigContractsDirStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["ConfigContractsDir is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a ConfigContractsDir.")
	}
    
};

export const create = (input: ConfigContractsDir): ConfigContractsDirStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ConfigContractsDirStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ConfigContractsDirStrict, '__type'>): FutureInstance<TaqError, ConfigContractsDirStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: configContractsDirSchema,
	schema: configContractsDirSchema.transform(val => val as ConfigContractsDirStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = configContractsDirSchema;

export type t = ConfigContractsDirStrict;
        