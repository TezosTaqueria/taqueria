// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Command as CommandStrict } from '@taqueria/protocol-types/out/types-strict';
import { commandSchema } from '@taqueria/protocol-types/out/types-zod';
import { Command } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { CommandStrict as Command };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Command');

export const from = (input: unknown): CommandStrict => {
	return commandSchema.parse(input) as CommandStrict;
};

export const create = (input: Command): CommandStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, CommandStrict> => {
	try {
		return resolve(commandSchema.parse(input) as CommandStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: CommandStrict): FutureInstance<TaqError, CommandStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: commandSchema,
	schema: commandSchema.transform(val => val as CommandStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = CommandStrict;
