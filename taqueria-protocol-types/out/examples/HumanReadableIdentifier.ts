// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { HumanReadableIdentifier, humanReadableIdentifierSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { HumanReadableIdentifier as HumanReadableIdentifierStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { HumanReadableIdentifier } from '../../types';
import { humanReadableIdentifierSchema } from '../types-zod';

export type { HumanReadableIdentifierStrict as HumanReadableIdentifier };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('HumanReadableIdentifier');

export const from = (input: unknown): HumanReadableIdentifierStrict => {
	return humanReadableIdentifierSchema.parse(input) as HumanReadableIdentifierStrict;
};

export const create = (input: HumanReadableIdentifier): HumanReadableIdentifierStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, HumanReadableIdentifierStrict> => {
	try {
		return resolve(humanReadableIdentifierSchema.parse(input) as HumanReadableIdentifierStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: HumanReadableIdentifierStrict): FutureInstance<TaqError, HumanReadableIdentifierStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: humanReadableIdentifierSchema,
	schema: humanReadableIdentifierSchema.transform(val => val as HumanReadableIdentifierStrict),
};

export type t = HumanReadableIdentifierStrict;
