import {z} from 'zod'
import type {i18n} from "@taqueria/protocol/i18n"
import * as RequestArgs from "@taqueria/protocol/RequestArgs"
import * as PluginInfo from '@taqueria/protocol/PluginInfo'
import {PluginResponse} from "@taqueria/protocol/taqueria-protocol-types"

export interface Failure<Params> {
    readonly errorCode: string,
    readonly errorMsg: string,
    readonly context: Params
}

export type LikeAPromise<Success, Failure> = Promise<Success>

export type PositiveInt = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export type i18nMessage = string | {message: string, numOfArguments: PositiveInt}

export interface Schema extends PluginInfo.t{
    checkRuntimeDependencies?: <T>(i18n: i18n, parsedArgs: RequestArgs.t) => LikeAPromise<PluginResponse, Failure<T>>
    installRuntimeDependencies?: <T>(i18n: i18n, parsedargs: RequestArgs.t) => LikeAPromise<PluginResponse, Failure<T>>
    proxy?: <T>(parsedArgs: RequestArgs.ProxyRequestArgs) => LikeAPromise<PluginResponse, Failure<T>>
}
export interface InputSchema extends Omit<PluginInfo.t, "name">{
    name?: string
    checkRuntimeDependencies?: <T>(i18n: i18n, parsedArgs: RequestArgs.t) => LikeAPromise<PluginResponse, Failure<T>>
    installRuntimeDependencies?: <T>(i18n: i18n, parsedargs: RequestArgs.t) => LikeAPromise<PluginResponse, Failure<T>>
    proxy?: <T>(parsedArgs: RequestArgs.ProxyRequestArgs) => LikeAPromise<PluginResponse, Failure<T>>
}

export type Args = string[]

export interface StdIO {
    stdout: string,
    stderr: string
}

export type pluginDefiner = (i18n: i18n) => InputSchema