// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { ProxyTemplateArgs as ProxyTemplateArgsStrict } from '@taqueria/protocol-types/out/types-strict';
import { proxyTemplateArgsSchema } from '@taqueria/protocol-types/out/types-zod';
import { ProxyTemplateArgs } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { ProxyTemplateArgsStrict as ProxyTemplateArgs };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('ProxyTemplateArgs');

export const from = (input: unknown): ProxyTemplateArgsStrict => {
	return proxyTemplateArgsSchema.parse(input) as ProxyTemplateArgsStrict;
};

export const create = (input: ProxyTemplateArgs): ProxyTemplateArgsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ProxyTemplateArgsStrict> => {
	try {
		return resolve(proxyTemplateArgsSchema.parse(input) as ProxyTemplateArgsStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (
	input: Omit<ProxyTemplateArgsStrict, '__type'>,
): FutureInstance<TaqError, ProxyTemplateArgsStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: proxyTemplateArgsSchema,
	schema: proxyTemplateArgsSchema.transform(val => val as ProxyTemplateArgsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = proxyTemplateArgsSchema;

export type t = ProxyTemplateArgsStrict;
