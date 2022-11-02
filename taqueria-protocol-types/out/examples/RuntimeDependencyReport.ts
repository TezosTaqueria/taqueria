// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { RuntimeDependencyReport, runtimeDependencyReportSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { RuntimeDependencyReport as RuntimeDependencyReportStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { RuntimeDependencyReport } from '../../types';
import { runtimeDependencyReportSchema } from '../types-zod';

// type RuntimeDependencyReportStrict = RuntimeDependencyReport & { __type: 'RuntimeDependencyReport' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('RuntimeDependencyReport');

export const from = (input: unknown): RuntimeDependencyReportStrict => {
	return runtimeDependencyReportSchema.parse(input) as RuntimeDependencyReportStrict;
};

export const create = (input: RuntimeDependencyReport): RuntimeDependencyReportStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, RuntimeDependencyReportStrict> => {
	try {
		return resolve(runtimeDependencyReportSchema.parse(input) as RuntimeDependencyReportStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: RuntimeDependencyReportStrict): FutureInstance<TaqError, RuntimeDependencyReportStrict> =>
	of(input);
