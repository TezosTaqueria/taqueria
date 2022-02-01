import type {ConfigArgs} from './taqueria-protocol/taqueria-protocol-types.ts'
import {i18n} from './taqueria-types.ts'
import {SanitizedAbsPath, SanitizedPath} from './taqueria-utils/taqueria-utils-types.ts'
import {exec, readJsonFile, writeJsonFile} from './taqueria-utils/taqueria-utils.ts'
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {map, chain, chainRej, reject} from 'https://cdn.skypack.dev/fluture';
import {getConfig, make} from './taqueria-config.ts'

import {log, debug} from './taqueria-utils/taqueria-utils.ts'

// This file contains lfogic for handling plugins distributed
// and installable using NPM

export type NpmPluginName = string & {__kind__: 'NpmPluginName'}

export const getPluginName = (input:string): NpmPluginName => {
    const endIndex = input.lastIndexOf('@')
    const hasVersion = endIndex > 0
    const retval =  hasVersion
        ? input.substring(0, endIndex).trim()
        : input.trim()
    return (retval as NpmPluginName)
}

export const requireNPM = (projectDir: SanitizedAbsPath, i18n: i18n) => pipe(
    readJsonFile(projectDir.join("package.json").value),
    chainRej (() => reject({kind: 'E_NPM_INIT', msg: i18n.__("npmInitRequired"), context: projectDir}))
)

export const getPluginPackageJson = (pluginNameOrPath: string, projectDir: SanitizedAbsPath) => pipe(
    readJsonFile(SanitizedAbsPath.create(pluginNameOrPath, projectDir).join('package.json').value),
    chainRej (() => readJsonFile(projectDir.join("node_modules", pluginNameOrPath, "package.json").value))
)

const addToPluginList = (pluginName: NpmPluginName, config: ConfigArgs) => pipe(
    getPluginPackageJson(pluginName, config.projectDir),
    map ((manifest: {name: string}) => {
        const existingPlugins = config.plugins.filter(plugin => plugin.name != manifest.name)
        const plugins = [...existingPlugins, {name: manifest.name, type: "npm"}]
        const updatedConfig = Object.entries(config).reduce(
            (retval: Record<string, unknown>, [key, val]) => {
                if (['configFile', 'hash', 'configDir', 'projectDir'].includes(key))
                    return retval
                else if (key === 'plugins') return {...retval, plugins}
                else {
                    const next = {...retval}
                    next[key] = val
                    return next
                }
            },
            {}
        )
        return updatedConfig
    }),
    chain (writeJsonFile(config.configFile.value))                    
)


export const installPlugin = (configDir: SanitizedPath, projectDir: SanitizedAbsPath, i18n: i18n, plugin: string) => pipe(
    requireNPM(projectDir, i18n),
    chain (() => exec('npm install -D <%= it.plugin %>', {plugin}, projectDir)),
    chain (() => getConfig(projectDir, configDir, i18n, false)),
    chain ((config: ConfigArgs) => {
        // The plugin name could look like this: @taqueria/plugin-ligo@1.2.3
        // We need to trim @1.2.3 from the end
        const pluginName = getPluginName(plugin)

        // Note, pluginName could be something like @taqueria/plugin-ligo
        // or ../taqueria-plugin-ligo. Thus, we still need to determine
        // what the real package name is
        return addToPluginList(pluginName, config)
    }),
    map (() => i18n.__('pluginInstalled'))
)

export const uninstallPlugin = (configDir: SanitizedPath, projectDir: SanitizedAbsPath, i18n: i18n, plugin: string) => pipe(
    requireNPM(projectDir, i18n),
    chain(() => exec('npm uninstall -D <%= it.plugin %>', {plugin}, projectDir)),
    chain (() => getConfig(projectDir, configDir, i18n, false)),
    chain ((config: ConfigArgs) => {
        const pluginName = getPluginName(plugin)
        const plugins = config.plugins.filter(plugin => plugin.name != pluginName)
        return pipe(
            make({...config, plugins}),
            chain (writeJsonFile(config.configFile.value))                    
        )
    }),
    map (() => i18n.__('pluginUninstalled')),
)