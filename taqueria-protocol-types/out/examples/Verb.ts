// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Verb, verbSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Verb as VerbStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Verb } from '../../types';
import { verbSchema } from '../types-zod';

// type VerbStrict = Verb & { __type: 'Verb' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Verb');

export const from = (input: unknown): VerbStrict => {
	return verbSchema.parse(input) as VerbStrict;
};

export const create = (input: Verb): VerbStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, VerbStrict> => {
	try {
		return resolve(verbSchema.parse(input) as VerbStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: VerbStrict): FutureInstance<TaqError, VerbStrict> => of(input);
