// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Task, taskSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Task as TaskStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Task } from '../../types';
import { taskSchema } from '../types-zod';

export type { TaskStrict as Task };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Task');

export const from = (input: unknown): TaskStrict => {
	return taskSchema.parse(input) as TaskStrict;
};

export const create = (input: Task): TaskStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, TaskStrict> => {
	try {
		return resolve(taskSchema.parse(input) as TaskStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: TaskStrict): FutureInstance<TaqError, TaskStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: taskSchema,
	schema: taskSchema.transform(val => val as TaskStrict),
};

export type t = TaskStrict;
