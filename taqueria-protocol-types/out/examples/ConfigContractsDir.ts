// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { ConfigContractsDir, configContractsDirSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { ConfigContractsDir as ConfigContractsDirStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { ConfigContractsDir } from '../../types';
import { configContractsDirSchema } from '../types-zod';

export type { ConfigContractsDirStrict as ConfigContractsDir };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('ConfigContractsDir');

export const from = (input: unknown): ConfigContractsDirStrict => {
	return configContractsDirSchema.parse(input) as ConfigContractsDirStrict;
};

export const create = (input: ConfigContractsDir): ConfigContractsDirStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ConfigContractsDirStrict> => {
	try {
		return resolve(configContractsDirSchema.parse(input) as ConfigContractsDirStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: ConfigContractsDirStrict): FutureInstance<TaqError, ConfigContractsDirStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: configContractsDirSchema,
	schema: configContractsDirSchema.transform(val => val as ConfigContractsDirStrict),
};

export type t = ConfigContractsDirStrict;
