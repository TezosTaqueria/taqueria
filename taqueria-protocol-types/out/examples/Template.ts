// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Template, templateSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Template as TemplateStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Template } from '../../types';
import { templateSchema } from '../types-zod';

export type { TemplateStrict as Template };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Template');

export const from = (input: unknown): TemplateStrict => {
	return templateSchema.parse(input) as TemplateStrict;
};

export const create = (input: Template): TemplateStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, TemplateStrict> => {
	try {
		return resolve(templateSchema.parse(input) as TemplateStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: TemplateStrict): FutureInstance<TaqError, TemplateStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: templateSchema,
	schema: templateSchema.transform(val => val as TemplateStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = TemplateStrict;
