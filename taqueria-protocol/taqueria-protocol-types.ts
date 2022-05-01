// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {SanitizedAbsPath, SanitizedPath, SHA256, Url} from '../taqueria-utils/taqueria-utils-types.ts'
// @ts-ignore see above
import * as StringMax30 from './StringMax30.ts'
// @ts-ignore see above
import * as StringNoSpaces from './StringNoSpaces.ts'
// @ts-ignore see above
import * as Verb from "./Verb.ts"
// @ts-ignore see above
import * as EconomicalProtocolHash from './EconomicalProtocolHash.ts'
// @ts-ignore see above
import * as VersionNumber from './VersionNumber.ts'
// @ts-ignore see above
import * as HumanReadableIdentifier from './HumanReadableIdentifier.ts'
// @ts-ignore see above
import * as Alias from './Alias.ts'
// @ts-ignore see above
import * as PositionalArg from './PositionalArg.ts'
// @ts-ignore see above
import * as Option from './Option.ts'
// @ts-ignore see above
import * as Task from './Task.ts'
// @ts-ignore see above
import * as Operation from './Operation.ts'
// @ts-ignore see above
import * as InstalledPlugin from './InstalledPlugin.ts'
// @ts-ignore see above
import * as PluginInfo from './PluginInfo.ts'
// @ts-ignore see above
import * as Config from "./Config.ts"
// @ts-ignore see above
import * as Environment from "./Environment.ts"
// @ts-ignore see above
import * as EphemeralState from "./EphermalState.ts"

export {
    SanitizedPath,
    SanitizedAbsPath,
    SHA256,
    StringMax30,
    StringNoSpaces,
    Verb,
    EconomicalProtocolHash,
    Url,
    VersionNumber,
    HumanReadableIdentifier,
    Alias,
    PositionalArg,
    Option,
    Task,
    Operation,
    PluginInfo,
    InstalledPlugin,
    Config,
    Environment,
    EphemeralState
}

export interface RuntimeDependency {
    readonly name: string,
    readonly path: string,
    readonly version: string,
    readonly kind: "required" | "optional"
}

export type PluginActionName = "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxy" | "pluginInfo" | string

export type PluginProxyAction = Task.t

export type PluginAction = "checkRuntimeDependencies" | "installRuntimeDependencies" | "pluginInfo" | PluginProxyAction

export interface RuntimeDependencyReport extends RuntimeDependency {
    readonly met: boolean
}

export interface CheckRuntimeDependenciesResponse {
    readonly report: RuntimeDependencyReport[]
}

export interface InstallRuntimeDependenciesResponse {
    readonly report: RuntimeDependencyReport[]
}

export type PluginActionNotSupportedResponse = {
    readonly status: "notSupported",
    readonly msg: string
}

export interface PluginJsonResponse {
    readonly data?: unknown
    readonly render?: 'none' | 'string' | 'table'
}

export type PluginResponse = PluginJsonResponse | CheckRuntimeDependenciesResponse | InstallRuntimeDependenciesResponse | PluginInfo.t | PluginActionNotSupportedResponse | void