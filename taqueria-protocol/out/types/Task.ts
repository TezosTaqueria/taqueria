// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Task } from '@taqueria/protocol/types';
import { Task as TaskStrict } from '@taqueria/protocol/out/types-strict';
import { taskSchema } from '@taqueria/protocol/out/types-zod';

export type { TaskStrict as Task };

export const from = (input: unknown): TaskStrict => {
	try {
		return taskSchema.parse(input) as TaskStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Task is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Task.")
	}
    
};

export const create = (input: Task): TaskStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, TaskStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<TaskStrict, '__type'>): FutureInstance<TaqError, TaskStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: taskSchema,
	schema: taskSchema.transform(val => val as TaskStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = taskSchema;

export type t = TaskStrict;
        