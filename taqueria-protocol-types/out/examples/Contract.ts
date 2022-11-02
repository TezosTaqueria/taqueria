// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Contract, contractSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Contract as ContractStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Contract } from '../../types';
import { contractSchema } from '../types-zod';

// type ContractStrict = Contract & { __type: 'Contract' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Contract');

export const from = (input: unknown): ContractStrict => {
	return contractSchema.parse(input) as ContractStrict;
};

export const create = (input: Contract): ContractStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ContractStrict> => {
	try {
		return resolve(contractSchema.parse(input) as ContractStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: ContractStrict): FutureInstance<TaqError, ContractStrict> => of(input);
