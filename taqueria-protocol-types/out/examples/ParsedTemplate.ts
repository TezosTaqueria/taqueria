// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { ParsedTemplate, parsedTemplateSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { ParsedTemplate as ParsedTemplateStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { ParsedTemplate } from '../../types';
import { parsedTemplateSchema } from '../types-zod';

export type { ParsedTemplateStrict as ParsedTemplate };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('ParsedTemplate');

export const from = (input: unknown): ParsedTemplateStrict => {
	return parsedTemplateSchema.parse(input) as ParsedTemplateStrict;
};

export const create = (input: ParsedTemplate): ParsedTemplateStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ParsedTemplateStrict> => {
	try {
		return resolve(parsedTemplateSchema.parse(input) as ParsedTemplateStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: ParsedTemplateStrict): FutureInstance<TaqError, ParsedTemplateStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: parsedTemplateSchema,
	schema: parsedTemplateSchema.transform(val => val as ParsedTemplateStrict),
};

export type t = ParsedTemplateStrict;
