// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { SandboxConfig, sandboxConfigSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { SandboxConfig as SandboxConfigStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { SandboxConfig } from '../../types';
import { sandboxConfigSchema } from '../types-zod';

// type SandboxConfigStrict = SandboxConfig & { __type: 'SandboxConfig' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('SandboxConfig');

export const from = (input: unknown): SandboxConfigStrict => {
	return sandboxConfigSchema.parse(input) as SandboxConfigStrict;
};

export const create = (input: SandboxConfig): SandboxConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SandboxConfigStrict> => {
	try {
		return resolve(sandboxConfigSchema.parse(input) as SandboxConfigStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: SandboxConfigStrict): FutureInstance<TaqError, SandboxConfigStrict> => of(input);
