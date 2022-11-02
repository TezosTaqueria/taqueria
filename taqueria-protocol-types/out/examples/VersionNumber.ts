// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { VersionNumber, versionNumberSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { VersionNumber as VersionNumberStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { VersionNumber } from '../../types';
import { versionNumberSchema } from '../types-zod';

// type VersionNumberStrict = VersionNumber & { __type: 'VersionNumber' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('VersionNumber');

export const from = (input: unknown): VersionNumberStrict => {
	return versionNumberSchema.parse(input) as VersionNumberStrict;
};

export const create = (input: VersionNumber): VersionNumberStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, VersionNumberStrict> => {
	try {
		return resolve(versionNumberSchema.parse(input) as VersionNumberStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: VersionNumberStrict): FutureInstance<TaqError, VersionNumberStrict> => of(input);
