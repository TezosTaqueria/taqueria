// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Command } from '@taqueria/protocol/types';
import { Command as CommandStrict } from '@taqueria/protocol/out/types-strict';
import { commandSchema } from '@taqueria/protocol/out/types-zod';

export type { CommandStrict as Command };

export const from = (input: unknown): CommandStrict => {
	try {
		return commandSchema.parse(input) as CommandStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Command is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Command.")
	}
    
};

export const create = (input: Command): CommandStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, CommandStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<CommandStrict, '__type'>): FutureInstance<TaqError, CommandStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: commandSchema,
	schema: commandSchema.transform(val => val as CommandStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = commandSchema;

export type t = CommandStrict;
        