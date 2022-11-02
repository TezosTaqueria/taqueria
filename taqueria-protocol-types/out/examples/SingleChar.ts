// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { SingleChar, singleCharSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { SingleChar as SingleCharStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { SingleChar } from '../../types';
import { singleCharSchema } from '../types-zod';

// type SingleCharStrict = SingleChar & { __type: 'SingleChar' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('SingleChar');

export const from = (input: unknown): SingleCharStrict => {
	return singleCharSchema.parse(input) as SingleCharStrict;
};

export const create = (input: SingleChar): SingleCharStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SingleCharStrict> => {
	try {
		return resolve(singleCharSchema.parse(input) as SingleCharStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: SingleCharStrict): FutureInstance<TaqError, SingleCharStrict> => of(input);
