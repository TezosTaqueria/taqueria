// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { SanitizedAbsPath, sanitizedAbsPathSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { SanitizedAbsPath as SanitizedAbsPathStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { SanitizedAbsPath } from '../../types';
import { sanitizedAbsPathSchema } from '../types-zod';

// type SanitizedAbsPathStrict = SanitizedAbsPath & { __type: 'SanitizedAbsPath' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('SanitizedAbsPath');

export const from = (input: unknown): SanitizedAbsPathStrict => {
	return sanitizedAbsPathSchema.parse(input) as SanitizedAbsPathStrict;
};

export const create = (input: SanitizedAbsPath): SanitizedAbsPathStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SanitizedAbsPathStrict> => {
	try {
		return resolve(sanitizedAbsPathSchema.parse(input) as SanitizedAbsPathStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: SanitizedAbsPathStrict): FutureInstance<TaqError, SanitizedAbsPathStrict> => of(input);
