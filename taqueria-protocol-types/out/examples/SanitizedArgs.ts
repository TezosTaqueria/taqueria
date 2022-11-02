// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { SanitizedArgs, sanitizedArgsSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { SanitizedArgs as SanitizedArgsStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { SanitizedArgs } from '../../types';
import { sanitizedArgsSchema } from '../types-zod';

// type SanitizedArgsStrict = SanitizedArgs & { __type: 'SanitizedArgs' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('SanitizedArgs');

export const from = (input: unknown): SanitizedArgsStrict => {
	return sanitizedArgsSchema.parse(input) as SanitizedArgsStrict;
};

export const create = (input: SanitizedArgs): SanitizedArgsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SanitizedArgsStrict> => {
	try {
		return resolve(sanitizedArgsSchema.parse(input) as SanitizedArgsStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: SanitizedArgsStrict): FutureInstance<TaqError, SanitizedArgsStrict> => of(input);
