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

export function createRegistry() {
	const tasks: RegisteredTask[] = [];

	const registerTask = (taskArgs: RegisterTaskArgs) => {
		// Default isRunning() function should a task not provide one
		const isRunning = (parsedArgs: SanitizedArgs.t) =>
			!parsedArgs.help && (
				parsedArgs._.includes(taskArgs.taskName) || taskArgs.aliases.reduce(
					(retval, alias) => retval || parsedArgs._.includes(alias),
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
