// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Operation, operationSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Operation as OperationStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Operation } from '../../types';
import { operationSchema } from '../types-zod';

// type OperationStrict = Operation & { __type: 'Operation' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Operation');

export const from = (input: unknown): OperationStrict => {
	return operationSchema.parse(input) as OperationStrict;
};

export const create = (input: Operation): OperationStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, OperationStrict> => {
	try {
		return resolve(operationSchema.parse(input) as OperationStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: OperationStrict): FutureInstance<TaqError, OperationStrict> => of(input);
