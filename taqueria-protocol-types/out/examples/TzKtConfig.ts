// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { TzKtConfig, tzKtConfigSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { TzKtConfig as TzKtConfigStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { TzKtConfig } from '../../types';
import { tzKtConfigSchema } from '../types-zod';

// type TzKtConfigStrict = TzKtConfig & { __type: 'TzKtConfig' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('TzKtConfig');

export const from = (input: unknown): TzKtConfigStrict => {
	return tzKtConfigSchema.parse(input) as TzKtConfigStrict;
};

export const create = (input: TzKtConfig): TzKtConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, TzKtConfigStrict> => {
	try {
		return resolve(tzKtConfigSchema.parse(input) as TzKtConfigStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: TzKtConfigStrict): FutureInstance<TaqError, TzKtConfigStrict> => of(input);
