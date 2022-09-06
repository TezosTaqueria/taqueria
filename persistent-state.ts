import * as PersistentState from '@taqueria/protocol/PersistentState';
import * as SanitizedArgs from '@taqueria/protocol/SanitizedArgs';
import * as TaqError from '@taqueria/protocol/TaqError';
import * as Timestamp from '@taqueria/protocol/Timestamp';
import * as Verb from '@taqueria/protocol/Verb';
import { chain, chainRej, map, reject, resolve } from 'fluture';
import { pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import { groupBy, takeLast } from 'rambda';
import * as utils from './taqueria-utils/taqueria-utils.ts';

// Get utils
const {
	joinPaths,
	readJsonFile,
	writeTextFile,
	memoize,
	isTaqError,
} = utils.inject({
	stdout: Deno.stdout,
	stderr: Deno.stderr,
});

const toTaskId = (task: Verb.t, plugin: string) => `${plugin}.${task}.${Timestamp.now()}`;

export const getStateAbspath = (parsedArgs: SanitizedArgs.t) =>
	joinPaths(
		parsedArgs.projectDir,
		'.taq',
		`${parsedArgs.env}-state.json`,
	);

export const load = memoize((parsedArgs: SanitizedArgs.t) =>
	pipe(
		readJsonFile<PersistentState.t>(getStateAbspath(parsedArgs)),
		chainRej(previous =>
			previous.kind === 'E_READFILE'
				? resolve({ operations: {}, tasks: {} })
				: reject(previous)
		),
		chain(PersistentState.of),
	)
);

export const save = (parsedArgs: SanitizedArgs.t) =>
	(updatedState: PersistentState.t) =>
		pipe(
			JSON.stringify(updatedState, undefined, 4),
			writeTextFile(getStateAbspath(parsedArgs)),
			map(_ => updatedState),
		);

const newTaskEntry = (task: Verb.t, plugin: string, output: unknown) => {
	const id = toTaskId(task, plugin);
	const taskEntry: Record<string, PersistentState.PersistedTask> = {};
	taskEntry[id] = {
		plugin,
		task,
		output: typeof output === 'object' ? Object(output).data : null,
		time: Timestamp.now(),
	};

	return taskEntry;
};

const imposeTaskLimits = (tasks: Record<string, PersistentState.PersistedTask>) =>
	pipe(
		Object.entries(tasks),
		pairs => groupBy(([_, task]: [string, PersistentState.PersistedTask]) => `${task.plugin}/${task.task}`, pairs),
		groups => groups as Record<string, [string, PersistentState.PersistedTask][]>,
		groups =>
			Object.entries(groups).flatMap(([_, persistedTasks]) =>
				pipe(
					persistedTasks.sort((a, b) => a[1].time - b[1].time),
					// TODO: Keeping the last 5 runs of a task may not be sufficient for the provising system
					// i.e. every ipfs publish task output would be required no matter how many folders were published or how many times it was published
					takeLast(5),
				)
			),
		Object.fromEntries,
	);

export const addTask = (parsedArgs: SanitizedArgs.t, task: Verb.t, plugin: string) =>
	(output: { data: unknown } | unknown) =>
		pipe(
			load(parsedArgs),
			chain(state => {
				if (!output) {
					return reject(TaqError.create({
						kind: 'E_PROVISION',
						msg: 'This task does not produce any output to persist',
						context: [task, plugin],
					}));
				}

				const tasks = { ...state.tasks, ...newTaskEntry(task, plugin, output) };

				const updatedState: PersistentState.t = {
					...state,
					tasks: imposeTaskLimits(tasks),
				};

				return PersistentState.make(updatedState);
			}),
			chain(save(parsedArgs)),
			chainRej(previous =>
				isTaqError(previous) && previous.kind === 'E_PROVISION'
					? load(parsedArgs)
					: reject(previous)
			),
			map(_ => output),
		);
