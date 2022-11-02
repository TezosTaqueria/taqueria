// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { ConfigArtifactsDir, configArtifactsDirSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { ConfigArtifactsDir as ConfigArtifactsDirStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { ConfigArtifactsDir } from '../../types';
import { configArtifactsDirSchema } from '../types-zod';

// type ConfigArtifactsDirStrict = ConfigArtifactsDir & { __type: 'ConfigArtifactsDir' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('ConfigArtifactsDir');

export const from = (input: unknown): ConfigArtifactsDirStrict => {
	return configArtifactsDirSchema.parse(input) as ConfigArtifactsDirStrict;
};

export const create = (input: ConfigArtifactsDir): ConfigArtifactsDirStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ConfigArtifactsDirStrict> => {
	try {
		return resolve(configArtifactsDirSchema.parse(input) as ConfigArtifactsDirStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: ConfigArtifactsDirStrict): FutureInstance<TaqError, ConfigArtifactsDirStrict> => of(input);
