import { NonEmptyString, SanitizedArgs } from '@taqueria/protocol';
import * as TaqError from '@taqueria/protocol/TaqError';
import { FutureInstance as Future, map } from 'fluture';
import { pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import type { CLIConfig } from './taqueria-types.ts';
import { inject } from './taqueria-utils/taqueria-utils.ts';

// Get utils
const {
	log,
	taqResolve,
} = inject({
	stdout: Deno.stdout,
	stderr: Deno.stderr,
});

type InternalTask = {
	// Task as displayed in the CLI
	taskName: NonEmptyString.t;

	// A method to configure the task, by adding it to yargs
	configure: (yargs: CLIConfig) => CLIConfig;

	// Task handler
	handler: (args: SanitizedArgs.t) => Future<TaqError.t, void>;

	isRunning: (args: SanitizedArgs.t) => boolean;
};

type InternalTaskArgs = {
	taskName: NonEmptyString.t;

	// A method to configure the task, by adding it to yargs
	configure: (yargs: CLIConfig) => CLIConfig;

	// Task handler
	handler: (args: SanitizedArgs.t) => Future<TaqError.t, void>;

	isRunning?: (args: SanitizedArgs.t) => boolean;
};

export function createRegistry() {
	const tasks: InternalTask[] = [];

	const addInternalTask = (taskArgs: InternalTaskArgs) => {
		const isRunning = (parsedArgs: SanitizedArgs.t) => parsedArgs._.includes(taskArgs.taskName);
		const task = taskArgs.isRunning ? { isRunning: taskArgs.isRunning, ...taskArgs } : { isRunning, ...taskArgs };
		tasks.push(task);
		return task;
	};

	const getInternalTasks = () => {
		return [...tasks];
	};

	const getInternalTaskNames = () => {
		return tasks.map(t => t.taskName);
	};

	const handle = (parsedArgs: SanitizedArgs.t) =>
		pipe(
			tasks.reduce(
				([didRun, result], task) => {
					const retval: [boolean, Future<TaqError.t, void>] = didRun || !task.isRunning(parsedArgs)
						? [didRun, result]
						: [true, task.handler(parsedArgs)];
					return retval;
				},
				[false, taqResolve(undefined as void)] as [boolean, Future<TaqError.t, void>],
			),
			([_, result]) => map(() => parsedArgs)(result),
		);

	const isInternalTask = (parsedArgs: SanitizedArgs.t) =>
		tasks.reduce(
			(retval, task) => retval || task.isRunning(parsedArgs),
			false,
		);

	const configure = (cliConfig: CLIConfig) =>
		tasks.reduce(
			(cliConfig, task) => task.configure(cliConfig),
			cliConfig,
		);

	return {
		addInternalTask,
		getInternalTasks,
		getInternalTaskNames,
		isInternalTask,
		handle,
		configure,
	};
}
