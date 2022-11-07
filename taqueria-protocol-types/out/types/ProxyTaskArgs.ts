// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { ProxyTaskArgs as ProxyTaskArgsStrict } from '@taqueria/protocol-types/out/types-strict';
import { proxyTaskArgsSchema } from '@taqueria/protocol-types/out/types-zod';
import { ProxyTaskArgs } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { ProxyTaskArgsStrict as ProxyTaskArgs };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('ProxyTaskArgs');

export const from = (input: unknown): ProxyTaskArgsStrict => {
	return proxyTaskArgsSchema.parse(input) as ProxyTaskArgsStrict;
};

export const create = (input: ProxyTaskArgs): ProxyTaskArgsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ProxyTaskArgsStrict> => {
	try {
		return resolve(proxyTaskArgsSchema.parse(input) as ProxyTaskArgsStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<ProxyTaskArgsStrict, '__type'>): FutureInstance<TaqError, ProxyTaskArgsStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: proxyTaskArgsSchema,
	schema: proxyTaskArgsSchema.transform(val => val as ProxyTaskArgsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = proxyTaskArgsSchema;

export type t = ProxyTaskArgsStrict;
