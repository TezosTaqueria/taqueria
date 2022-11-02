// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { RequestArgs, requestArgsSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { RequestArgs as RequestArgsStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { RequestArgs } from '../../types';
import { requestArgsSchema } from '../types-zod';

// type RequestArgsStrict = RequestArgs & { __type: 'RequestArgs' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('RequestArgs');

export const from = (input: unknown): RequestArgsStrict => {
	return requestArgsSchema.parse(input) as RequestArgsStrict;
};

export const create = (input: RequestArgs): RequestArgsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, RequestArgsStrict> => {
	try {
		return resolve(requestArgsSchema.parse(input) as RequestArgsStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: RequestArgsStrict): FutureInstance<TaqError, RequestArgsStrict> => of(input);
