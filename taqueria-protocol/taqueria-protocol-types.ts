import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath'
import * as SanitizedPath from '@taqueria/protocol/SanitizedPath'
import * as SHA256 from '@taqueria/protocol/SHA256'
import * as Url from '@taqueria/protocol/Url'
import * as Verb from "@taqueria/protocol/Verb"
import * as EconomicalProtocolHash from '@taqueria/protocol/EconomicalProtocolHash'
import * as NetworkConfig from "@taqueria/protocol/NetworkConfig"
import * as SandboxConfig from "@taqueria/protocol/SandboxConfig"
import * as SandboxAccountConfig from "@taqueria/protocol/SandboxAccountConfig"
import * as VersionNumber from '@taqueria/protocol/VersionNumber'
import * as HumanReadableIdentifier from '@taqueria/protocol/HumanReadableIdentifier'
import * as Alias from '@taqueria/protocol/Alias'
import * as PositionalArg from "@taqueria/protocol/PositionalArg"
import * as Option from '@taqueria/protocol/Option'
import * as Task from '@taqueria/protocol/Task'
import * as ParsedOperation from '@taqueria/protocol/ParsedOperation'
import * as Operation from '@taqueria/protocol/Operation'
import * as InstalledPlugin from '@taqueria/protocol/InstalledPlugin'
import * as ParsedPluginInfo from "@taqueria/protocol/ParsedPluginInfo"
import * as PluginInfo from '@taqueria/protocol/PluginInfo'
import * as Config from "@taqueria/protocol/Config"
import * as Environment from "@taqueria/protocol/Environment"
import * as EphemeralState from "@taqueria/protocol/EphermalState"
import * as SanitizedArgs from "@taqueria/protocol/SanitizedArgs"
import * as RequestArgs from "@taqueria/protocol/RequestArgs"
import * as LoadedConfig from "@taqueria/protocol/LoadedConfig"
import * as PersistentState from "@taqueria/protocol/PersistentState"
import * as i18n from "@taqueria/protocol/i18n"
import * as TaqError from "@taqueria/protocol/TaqError"
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

export {
    SanitizedPath,
    SanitizedAbsPath,
    SHA256,
    TaqError,
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
    EphemeralState,
    SanitizedArgs,
    RequestArgs,
    LoadedConfig,
    SandboxConfig,
    NetworkConfig,
    SandboxAccountConfig,
    PersistentState,
    i18n,
    ParsedPluginInfo,
    ParsedOperation
}