// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Config, configSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Config as ConfigStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Config } from '../../types';
import { configSchema } from '../types-zod';

// type ConfigStrict = Config & { __type: 'Config' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Config');

export const from = (input: unknown): ConfigStrict => {
	return configSchema.parse(input) as ConfigStrict;
};

export const create = (input: Config): ConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ConfigStrict> => {
	try {
		return resolve(configSchema.parse(input) as ConfigStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: ConfigStrict): FutureInstance<TaqError, ConfigStrict> => of(input);
