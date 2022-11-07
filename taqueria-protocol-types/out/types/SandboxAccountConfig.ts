// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { SandboxAccountConfig as SandboxAccountConfigStrict } from '@taqueria/protocol-types/out/types-strict';
import { sandboxAccountConfigSchema } from '@taqueria/protocol-types/out/types-zod';
import { SandboxAccountConfig } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { SandboxAccountConfigStrict as SandboxAccountConfig };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('SandboxAccountConfig');

export const from = (input: unknown): SandboxAccountConfigStrict => {
	return sandboxAccountConfigSchema.parse(input) as SandboxAccountConfigStrict;
};

export const create = (input: SandboxAccountConfig): SandboxAccountConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SandboxAccountConfigStrict> => {
	try {
		return resolve(sandboxAccountConfigSchema.parse(input) as SandboxAccountConfigStrict);
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
	input: Omit<SandboxAccountConfigStrict, '__type'>,
): FutureInstance<TaqError, SandboxAccountConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: sandboxAccountConfigSchema,
	schema: sandboxAccountConfigSchema.transform(val => val as SandboxAccountConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = sandboxAccountConfigSchema;

export type t = SandboxAccountConfigStrict;
