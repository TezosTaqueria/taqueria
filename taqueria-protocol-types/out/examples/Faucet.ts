// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Faucet, faucetSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Faucet as FaucetStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Faucet } from '../../types';
import { faucetSchema } from '../types-zod';

// type FaucetStrict = Faucet & { __type: 'Faucet' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Faucet');

export const from = (input: unknown): FaucetStrict => {
	return faucetSchema.parse(input) as FaucetStrict;
};

export const create = (input: Faucet): FaucetStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, FaucetStrict> => {
	try {
		return resolve(faucetSchema.parse(input) as FaucetStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: FaucetStrict): FutureInstance<TaqError, FaucetStrict> => of(input);
