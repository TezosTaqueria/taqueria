// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { HumanLanguange, humanLanguangeSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { HumanLanguange as HumanLanguangeStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { HumanLanguange } from '../../types';
import { humanLanguangeSchema } from '../types-zod';

// type HumanLanguangeStrict = HumanLanguange & { __type: 'HumanLanguange' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('HumanLanguange');

export const from = (input: unknown): HumanLanguangeStrict => {
	return humanLanguangeSchema.parse(input) as HumanLanguangeStrict;
};

export const create = (input: HumanLanguange): HumanLanguangeStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, HumanLanguangeStrict> => {
	try {
		return resolve(humanLanguangeSchema.parse(input) as HumanLanguangeStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: HumanLanguangeStrict): FutureInstance<TaqError, HumanLanguangeStrict> => of(input);
