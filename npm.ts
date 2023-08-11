import * as Config from '@taqueria/protocol/Config';
import type { i18n } from '@taqueria/protocol/i18n';
import * as InstalledPlugin from '@taqueria/protocol/InstalledPlugin';
import * as LoadedConfig from '@taqueria/protocol/LoadedConfig';
import * as NonEmptyString from '@taqueria/protocol/NonEmptyString';
import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath';
import * as SanitizedArgs from '@taqueria/protocol/SanitizedArgs';
import * as TaqError from '@taqueria/protocol/TaqError';
import { chain, chainRej, FutureInstance as Future, map, mapRej, resolve } from 'fluture';
import { pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import initPlugins from './plugins.ts';
import { EnvVars } from './taqueria-types.ts';
import * as utils from './taqueria-utils/taqueria-utils.ts';

// Get utils
const { execText, readJsonFile, writeJsonFile, rm, log } = utils.inject({
	stdout: Deno.stdout,
	stderr: Deno.stderr,
});

// Alias
const exec = execText;

// This file contains logic for handling plugins distributed
// and installable using NPM

export type NpmPluginName = string & { __kind__: 'NpmPluginName' };

interface Manifest {
	name: string;
}

export const getPluginName = (input: string): NpmPluginName => {
	const endIndex = input.lastIndexOf('@');
	const hasVersion = endIndex > 0;
	const retval = hasVersion
		? input.substring(0, endIndex).trim()
		: input.trim();
	return (retval as NpmPluginName);
};

export const requireNPM = (projectDir: SanitizedAbsPath.t, i18n: i18n) =>
	pipe(
		SanitizedAbsPath.make(`${projectDir}/package.json`),
		chain(abspath => readJsonFile<Manifest>(abspath)),
		mapRej(previous => {
			const taqErr: TaqError.t = {
				kind: 'E_NPM_INIT',
				msg: i18n.__('npmInitRequired'),
				context: projectDir,
				previous,
			};
			return taqErr;
		}),
	);

export const getPluginPackageJson = (pluginNameOrPath: string, projectDir: SanitizedAbsPath.t) =>
	pipe(
		/^\//.test(pluginNameOrPath)
			// If starts with a slash, we can assume that its a path
			? SanitizedAbsPath.make(pluginNameOrPath)
			: // Otherwise, we assume that its a relative path
				SanitizedAbsPath.make(`${projectDir}/${pluginNameOrPath}`),
		chain(pluginPath => SanitizedAbsPath.make(`${pluginPath}/package.json`)),
		chain(readJsonFile),
		chainRej(() =>
			// Assumptions failed above. Assume that we're given a package name
			pipe(
				SanitizedAbsPath.make(`${projectDir}/node_modules/${pluginNameOrPath}/package.json`),
				chain(readJsonFile),
			)
		),
		map(value => value as Manifest),
	);

export const getPackageName = (projectDir: SanitizedAbsPath.t) => (pluginNameOrPath: string) =>
	pipe(
		getPluginPackageJson(pluginNameOrPath, projectDir),
		map(manifest => manifest.name)
	)

const addToPluginList = (pluginName: NpmPluginName, loadedConfig: LoadedConfig.t) =>
	pipe(
		getPluginPackageJson(pluginName, loadedConfig.projectDir),
		chain((manifest: { name: string }) => {
			const allPlugins = loadedConfig.plugins ?? [];
			const existingPlugins = allPlugins.filter(plugin => plugin.name != manifest.name);
			return NonEmptyString.make(manifest.name)
				.pipe(
					chain(name => InstalledPlugin.make({ name, type: 'npm' })),
				)
				.pipe(
					map(installedPlugin => [...existingPlugins, installedPlugin]),
				);
		}),
		chain(plugins =>
			Config.make({
				...loadedConfig,
				plugins,
			})
		),
		chain(config =>
			pipe(
				writeJsonFile(loadedConfig.configFile)(config),
				chain(_ =>
					LoadedConfig.make({
						...loadedConfig,
						...config,
					})
				),
			)
		),
	);

const rmFromPluginList = (loadedConfig: LoadedConfig.t, parsedArgs: SanitizedArgs.UninstallTaskArgs) =>
	pipe(
		getPluginName(parsedArgs.pluginName),
		pluginName => loadedConfig.plugins?.filter(plugin => plugin.name != pluginName.toString()),
		plugins =>
			pipe(
				Config.make({
					...loadedConfig,
					plugins,
				}),
				chain(writeJsonFile(loadedConfig.configFile)),
				chain(_ =>
					LoadedConfig.make({
						...loadedConfig,
						plugins,
					})
				),
			),
	);

const purgeEphemeralState = (env: EnvVars, i18n: i18n, parsedArgs: SanitizedArgs.InstallTaskArgs) =>
	(config: LoadedConfig.t) => {
		const pluginsLib = initPlugins({
			config,
			env,
			i18n,
			parsedArgs,
			stderr: Deno.stderr,
			stdout: Deno.stdout,
		});

		return pipe(
			pluginsLib.getStateAbspath(),
			chain(rm),
			map(() => config),
		);
	};

export const installPlugin = (
	config: LoadedConfig.t,
	projectDir: SanitizedAbsPath.t,
	i18n: i18n,
	env: EnvVars,
	parsedArgs: SanitizedArgs.InstallTaskArgs,
): Future<TaqError.t, LoadedConfig.t> =>
	pipe(
		requireNPM(projectDir, i18n),
		chain(_ => exec('npm install -D <%= it.plugin %>', { plugin: parsedArgs.pluginName }, false, projectDir)),
		chain(_result => {
			// TODO: we need to check whether the plugin installation was actually successful

			// The plugin name could look like this: @taqueria/plugin-ligo@1.2.3
			// We need to trim @1.2.3 from the end
			const pluginName = getPluginName(parsedArgs.pluginName);

			// Note, pluginName could be something like @taqueria/plugin-ligo
			// or ../taqueria-plugin-ligo. Thus, we still need to determine
			// what the real package name is
			return addToPluginList(pluginName, config);
		}),
		chain(purgeEphemeralState(env, i18n, parsedArgs)),
	);

export const uninstallPlugin = (
	config: LoadedConfig.t,
	projectDir: SanitizedAbsPath.t,
	i18n: i18n,
	env: EnvVars,
	parsedArgs: SanitizedArgs.UninstallTaskArgs,
) =>
	pipe(
		requireNPM(projectDir, i18n),
		chain(() => exec('npm uninstall -D <%= it.plugin %>', { plugin: parsedArgs.pluginName }, false, projectDir)),
		chain(() => rmFromPluginList(config, parsedArgs)),
		chain(purgeEphemeralState(env, i18n, parsedArgs)),
	);