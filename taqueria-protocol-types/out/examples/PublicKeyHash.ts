// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { PublicKeyHash, publicKeyHashSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { PublicKeyHash as PublicKeyHashStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { PublicKeyHash } from '../../types';
import { publicKeyHashSchema } from '../types-zod';

// type PublicKeyHashStrict = PublicKeyHash & { __type: 'PublicKeyHash' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PublicKeyHash');

export const from = (input: unknown): PublicKeyHashStrict => {
	return publicKeyHashSchema.parse(input) as PublicKeyHashStrict;
};

export const create = (input: PublicKeyHash): PublicKeyHashStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PublicKeyHashStrict> => {
	try {
		return resolve(publicKeyHashSchema.parse(input) as PublicKeyHashStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: PublicKeyHashStrict): FutureInstance<TaqError, PublicKeyHashStrict> => of(input);
