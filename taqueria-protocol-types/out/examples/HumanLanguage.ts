// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { HumanLanguage, humanLanguageSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { HumanLanguage as HumanLanguageStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { HumanLanguage } from '../../types';
import { humanLanguageSchema } from '../types-zod';

// type HumanLanguageStrict = HumanLanguage & { __type: 'HumanLanguage' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('HumanLanguage');

export const from = (input: unknown): HumanLanguageStrict => {
	return humanLanguageSchema.parse(input) as HumanLanguageStrict;
};

export const create = (input: HumanLanguage): HumanLanguageStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, HumanLanguageStrict> => {
	try {
		return resolve(humanLanguageSchema.parse(input) as HumanLanguageStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: HumanLanguageStrict): FutureInstance<TaqError, HumanLanguageStrict> => of(input);
