// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Command, commandSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Command as CommandStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Command } from '../../types';
import { commandSchema } from '../types-zod';

// type CommandStrict = Command & { __type: 'Command' };
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
