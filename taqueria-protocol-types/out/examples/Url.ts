// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Url, urlSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Url as UrlStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Url } from '../../types';
import { urlSchema } from '../types-zod';

export type { UrlStrict as Url };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Url');

export const from = (input: unknown): UrlStrict => {
	return urlSchema.parse(input) as UrlStrict;
};

export const create = (input: Url): UrlStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, UrlStrict> => {
	try {
		return resolve(urlSchema.parse(input) as UrlStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: UrlStrict): FutureInstance<TaqError, UrlStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: urlSchema,
	schema: urlSchema.transform(val => val as UrlStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = UrlStrict;
