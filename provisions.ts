import * as Alias from '@taqueria/protocol/Alias';
import * as EphemeralState from '@taqueria/protocol/EphemeralState';
import * as InstalledPlugin from '@taqueria/protocol/InstalledPlugin';
import * as LoadedConfig from '@taqueria/protocol/LoadedConfig';
import * as PersistentState from '@taqueria/protocol/PersistentState';
import * as Provisioner from '@taqueria/protocol/Provisioner';
import * as ProvisionerID from '@taqueria/protocol/ProvisionerID';
import * as Provisions from '@taqueria/protocol/Provisions';
import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath';
import * as SanitizedArgs from '@taqueria/protocol/SanitizedArgs';
import * as TaqError from '@taqueria/protocol/TaqError';
import { attemptP, chain, chainRej, Future, map, mapRej, reject, resolve } from 'fluture';
import batchingToposort from 'https://cdn.skypack.dev/batching-toposort';
import generate from 'https://cdn.skypack.dev/retronid';
import { pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import { times } from 'rambda';
import { inject } from './taqueria-utils/taqueria-utils.ts';

const { doesPathExist, writeJsonFile, joinPaths, eager, isTaqError, readJsonFile, renderTemplate, execText } = inject({
	stderr: Deno.stderr,
	stdout: Deno.stdout,
});

const getProvisions = (provisionsAbsPath: SanitizedAbsPath.t) =>
	pipe(
		readJsonFile<Provisions.t>(provisionsAbsPath),
		chain(Provisions.of),
	);

export const loadProvisions = (provisionsAbspath: SanitizedAbsPath.t) =>
	pipe(
		getProvisions(provisionsAbspath),
		mapRej((previous: Error | TaqError.t) =>
			isTaqError(previous)
				? previous as unknown as TaqError.t
				: TaqError.create({
					kind: 'E_PROVISION',
					msg: 'Could not parse provisions file',
					previous,
				})
		),
		chainRej(previous => {
			if (previous.kind === 'E_READFILE') {
				return reject(TaqError.create({
					kind: 'E_NO_PROVISIONS',
					msg: 'You have not provisioned any operations yet. See `taq provision --help` for more information.',
					previous,
					context: provisionsAbspath,
				}));
			}
			return reject(previous);
		}),
	);

const writeProvisions = (provisionsAbspath: SanitizedAbsPath.t) =>
	(provisioners: Provisioner.t[] | Provisions.t) =>
		writeJsonFile(provisionsAbspath)(provisioners)
			.pipe(map(() => provisioners));

const addProvision = (provisioner: Provisioner.t, provisionsAbspath: SanitizedAbsPath.t) =>
	pipe(
		doesPathExist(provisionsAbspath),
		chainRej(() => writeProvisions(provisionsAbspath)([])),
		chain(() => loadProvisions(provisionsAbspath)),
		map(provisioners => [...provisioners, provisioner]),
		chain(writeProvisions(provisionsAbspath)),
	);

const getOperationParams = (state: EphemeralState.t) =>
	(operationName: string, pluginName: string) => {
		const op = state.plugins
			.find(plugin => plugin.alias === pluginName)
			?.operations
			?.find(op => op.operation === operationName);

		if (op) {
			const options = op.options ?? [];
			const args = op.positionals ?? [];
			const optionNames = options.reduce(
				(retval, option) =>
					option.shortFlag
						? [...retval, option.shortFlag, option.flag]
						: [...retval, option.flag],
				[] as string[],
			);
			return args.reduce(
				(retval, arg) => [...retval, arg.placeholder],
				optionNames,
			);
		}
		throw `Could not collect arguments for the operation, ${operationName}`;
	};

/**
 * Gets the plugin associated with the request
 * @param parsedArgs
 * @returns {Alias.t}
 */
const getPluginAlias = (parsedArgs: SanitizedArgs.ProvisionTaskArgs, state: EphemeralState.t) => {
	if (parsedArgs.plugin) return parsedArgs.plugin;
	const operation = parsedArgs.operation;
	const op = state.operations[operation] as InstalledPlugin.t;
	const plugin = state.plugins.find(plugin => plugin.name == op.name);
	return plugin!.alias;
};

export const newProvision = (parsedArgs: SanitizedArgs.ProvisionTaskArgs, state: EphemeralState.t) => {
	const operation = parsedArgs.operation;
	const name = parsedArgs.name ?? generate();
	const plugin = getPluginAlias(parsedArgs, state);

	return pipe(
		ProvisionerID.make(`${plugin}.${operation}.${name}`),
		chain(id =>
			Provisioner.make({
				id,
				operation,
				plugin,
				...getOperationParams(state)(operation, plugin),
				command: operation === 'custom' ? "echo 'Custom Provision'" : undefined,
			})
		),
	);
};

export const addNewProvision = (
	parsedArgs: SanitizedArgs.ProvisionTaskArgs,
	config: LoadedConfig.t,
	state: EphemeralState.t,
) =>
	attemptP<TaqError.t, Provisions.t>(async () => {
		try {
			const provisionAbspath = await eager(
				SanitizedAbsPath.make(joinPaths(config.projectDir, '.taq', 'provisions.json')),
			);
			const provision = await eager(newProvision(parsedArgs, state));
			const provisions = await eager(addProvision(provision, provisionAbspath));
			return provisions as Provisions.t;
		} catch (previous) {
			const err: TaqError.t = {
				kind: 'E_PROVISION',
				msg: `Could not provision. Please check the operation name and try again.`,
				previous,
			};
			return Promise.reject(err);
		}
	});

export const toDAGInput = (data: Provisions.t) =>
	data.reduce(
		(retval, provisioner) => {
			const deps = provisioner.depends_on?.reduce(
				(retval, parentId) => {
					if (retval[parentId]) {
						retval[parentId] = [
							...retval[parentId],
							provisioner.id,
						];
						return retval;
					}
					retval[parentId] = [provisioner.id];
					return retval;
				},
				retval,
			) ?? retval;
			deps[provisioner.id] = deps[provisioner.id] ?? [];
			return deps;
		},
		{} as Record<ProvisionerID.t, ProvisionerID.t[]>,
	);

export const toDAG = (data: Provisions.t) =>
	batchingToposort(toDAGInput(data)).reduce(
		(retval, batch) => [
			...retval,
			batch.reduce(
				(retval, id) => {
					const provision = data.find(provision => String(provision.id) === id);
					return provision ? [...retval, provision] : retval;
				},
				[] as Provisioner.t[],
			),
		],
		[] as (Provisioner.t[])[],
	);

export const outputTab = (tabs: number) => new Array(tabs).fill('  ').join('');

export const provisionerToMermaid = (parent: ProvisionerID.t | string, tabs: number) =>
	(provisioner: Provisioner.t) => {
		const state = provisioner.label
			? `${outputTab(tabs)}${provisioner.id} : ${provisioner.label}`
			: `${outputTab(tabs)}${provisioner.id}`;

		return state;
	};

const mermaidConfig = {
	content: 'stateDiagram-v2\n',
	tabs: 1,
	parent: 'Start',
};

const toMermaidSubgraph = (batchName: string, batchDescription: string) =>
	({ content, tabs, parent }: typeof mermaidConfig, batch: Provisioner.t[]) => {
		const ops = batch.map(provisionerToMermaid(parent, tabs + 1)).join('\n');

		return {
			content: [
				content,
				`${outputTab(tabs)}${batchName} : ${batchDescription}`,
				`${outputTab(tabs)}${parent} --> ${batchName}`,
				`${outputTab(tabs)}state ${batchName} {`,
				ops,
				`${outputTab(tabs)}}`,
			].join('\n'),
			parent: batchName,
			tabs: 1,
		};
	};

const toMermaid = (data: (Provisioner.t[])[]) =>
	data.reduce(
		({ content, parent }, batch, i) =>
			batch.length > 1
				? toMermaidSubgraph(`Batch${i + 1}`, `Parallel Operation Group #${i + 1}`)({ content, tabs: 1, parent }, batch)
				: ({
					content: `${content}${provisionerToMermaid(parent, 1)(batch[0])}`,
					parent: String(batch[0].id),
					tabs: 1,
				}),
		mermaidConfig,
	);

export const plan = (data: Provisions.t) => {
	const batches = toDAG(data);
	return toMermaid(batches).content;
};

export const runProvisioner = (provisioner: Provisioner.t, state: PersistentState.t) => {
};

export const apply = (sanitizedArgs: SanitizedArgs.t, data: Provisions.t) => {
	const ids = toDAG(data).reduce(
		(retval, batch) => [...retval, ...batch.map(p => p.id)],
		[] as ProvisionerID.t[],
	);

	const lines = ids.map(id => `- ${id}`);

	console.log('This will apply the following operations:');
	console.log(lines.join('\n'));
	console.log('\nDo you wish to continue (y/N)?');

	return attemptP(() => {
		const input = new Uint8Array(1);
		return Deno.stdin.read(input);
	});
};
