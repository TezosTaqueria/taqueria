import {z} from 'zod'
import * as Protocol from "@taqueria/protocol/taqueria-protocol-types"
import * as RequestArgs from "@taqueria/protocol/RequestArgs"
import * as PluginInfo from "@taqueria/protocol/PluginInfo"
import * as Task from "@taqueria/protocol/Task"
import * as Option from "@taqueria/protocol/Option"
import * as Operation from "@taqueria/protocol/Operation"
import * as PositionalArg from "@taqueria/protocol/PositionalArg"
import * as LoadedConfig from "@taqueria/protocol/LoadedConfig"
import * as SandboxConfig from "@taqueria/protocol/SandboxConfig"
import * as SandboxAccountConfig from "@taqueria/protocol/SandboxAccountConfig"
import * as NetworkConfig from "@taqueria/protocol/NetworkConfig"
import * as Environment from "@taqueria/protocol/Environment"
import * as PersistentState from "@taqueria/protocol/PersistentState"
import type {i18n} from "@taqueria/protocol/i18n"
import { P } from 'ts-pattern'
export type PluginResponse = Protocol.PluginResponse
export {
    Protocol,
    RequestArgs,
    PluginInfo,
    Task,
    Option,
    Operation,
    PositionalArg,
    LoadedConfig,
    SandboxConfig,
    SandboxAccountConfig,
    NetworkConfig,
    Environment,
    PersistentState
}

export interface Failure<Params> {
    readonly errorCode: string,
    readonly errorMsg: string,
    readonly context: Params
}

export interface LikeAPromise<Success, Failure> extends Promise<Success> {

}

export type PositiveInt = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export type i18nMessage = string | {message: string, numOfArguments: PositiveInt}

export interface Schema extends PluginInfo.t{
    checkRuntimeDependencies?: <T>(i18n: i18n, parsedArgs: RequestArgs.t) => LikeAPromise<PluginResponse, Failure<T>>|Promise<PluginResponse>
    installRuntimeDependencies?: <T>(i18n: i18n, parsedargs: RequestArgs.t) => LikeAPromise<PluginResponse, Failure<T>>|Promise<PluginResponse>
    proxy?: <T>(parsedArgs: RequestArgs.ProxyRequestArgs) => LikeAPromise<PluginResponse, Failure<T>>    
}

export const inputSchema = PluginInfo.rawSchema.extend({
    name: Protocol.Verb.rawSchema.optional(),
})

export interface InputSchema extends z.infer<typeof inputSchema> {
    checkRuntimeDependencies?: <T>(i18n: i18n, parsedArgs: RequestArgs.t) => LikeAPromise<PluginResponse, Failure<T>>|Promise<PluginResponse>
    installRuntimeDependencies?: <T>(i18n: i18n, parsedargs: RequestArgs.t) => LikeAPromise<PluginResponse, Failure<T>>|Promise<PluginResponse>
    proxy?: <T>(parsedArgs: RequestArgs.ProxyRequestArgs) => LikeAPromise<PluginResponse, Failure<T>>
}

export type Args = string[]

export interface StdIO {
    stdout: string,
    stderr: string
}

export type pluginDefiner = ((i18n: i18n) => InputSchema)