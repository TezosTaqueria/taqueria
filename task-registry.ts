import { NonEmptyString, SanitizedArgs } from '@taqueria/protocol';
import * as TaqError from '@taqueria/protocol/TaqError';
import { chain, chainRej, FutureInstance as Future, map, reject } from 'fluture';
import { pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import { equals } from 'rambda';
import * as Analytics from './analytics.ts';
import type { CLIConfig } from './taqueria-types.ts';
import { inject } from './taqueria-utils/taqueria-utils.ts';

// Get utils
const {
	taqResolve,
} = inject({
	stdout: Deno.stdout,
	stderr: Deno.stderr,
});

type RegisteredTask = {
	// Task as displayed in the CLI
	taskName: NonEmptyString.t;

	// List of aliases
	aliases: NonEmptyString.t[];

	// A method to configure the task, by adding it to yargs
	configure: (yargs: CLIConfig) => CLIConfig;

	// Task handler
	handler: (args: SanitizedArgs.t) => Future<TaqError.t, void>;

	isRunning: (args: SanitizedArgs.t) => boolean;
};

type RegisterTaskArgs = {
	taskName: NonEmptyString.t;

	// List of aliases
	aliases: NonEmptyString.t[];

	// A method to configure the task, by adding it to yargs
	configure: (yargs: CLIConfig) => CLIConfig;

	// Task handler
	handler: (args: SanitizedArgs.t) => Future<TaqError.t, void>;

	isRunning?: (args: SanitizedArgs.t) => boolean;
};

function startsWithSlice(arr: (string | number)[], slice: string[]) {
	const otherSlice = arr.slice(0, slice.length);
	return equals(otherSlice, slice) as boolean;
}

export function createRegistry() {
	const tasks: RegisteredTask[] = [];

	const registerTask = (taskArgs: RegisterTaskArgs) => {
		// Default isRunning() function should a task not provide one
		const isRunning = (parsedArgs: SanitizedArgs.t) =>
			!parsedArgs.help && (
				startsWithSlice(parsedArgs._, taskArgs.taskName.split(' ')) || taskArgs.aliases.reduce(
					(retval, alias) => retval || startsWithSlice(parsedArgs._, alias.split(' ')),
					false,
				)
			);

		// Create a registered task, using the default isRunning function above if one wasn't provided
		const task = taskArgs.isRunning ? { isRunning: taskArgs.isRunning, ...taskArgs } : { isRunning, ...taskArgs };

		// Add the task to the list of registered tasks, if it wasn't already been registered
		if (!tasks.find(t => t.taskName === task.taskName)) tasks.push(task);

		return task;
	};

	const getTasks = () => {
		return [...tasks];
	};

	const getTaskNames = () => {
		return tasks.map(t => t.taskName);
	};

	const handle = (parsedArgs: SanitizedArgs.t) => {
		const {
			sendEvent,
		} = Analytics.inject({
			env: Deno.env,
			machineInfo: Deno.build,
			parsedArgs,
		});

		return pipe(
			tasks.reduce(
				([didRun, result], task) => {
					const retval: [boolean | string, Future<TaqError.t, void>] = didRun || !task.isRunning(parsedArgs)
						? [didRun, result]
						: [task.taskName, task.handler(parsedArgs)];
					return retval;
				},
				[false, taqResolve(undefined as void)] as [boolean | string, Future<TaqError.t, void>],
			),
			([taskName, result]) =>
				pipe(
					result,
					chain(() => sendEvent({ taskName })),
					map(() => parsedArgs),
					chainRej(err =>
						pipe(
							sendEvent({ taskName, taq_error: true, errKind: err.kind, errMsg: err.msg }),
							chainRej(() => reject(err)),
							chain(() => reject(err)),
						)
					),
				),
		);
	};

	const isTaskRunning = (parsedArgs: SanitizedArgs.t) =>
		parsedArgs.help ? false : tasks.reduce(
			(retval, task) => retval || task.isRunning(parsedArgs),
			false,
		);

	const configure = (cliConfig: CLIConfig) =>
		tasks.reduce(
			(cliConfig, task) => task.configure(cliConfig),
			cliConfig,
		);

	return {
		registerTask,
		getTasks,
		getTaskNames,
		isTaskRunning,
		handle,
		configure,
	};
}
