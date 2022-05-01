import {Url, SanitizedAbsPath} from './taqueria-protocol/taqueria-protocol-types.ts'
import yargs from 'https://deno.land/x/yargs@v17.4.0-deno/deno.ts'
import * as LoadedConfig from "./LoadedConfig.ts"

export interface CommandArgs extends SanitizedInitArgs {
    plugin: string
}

export type CommandHandler = (parsedArgs: CommandArgs) => unknown

// TODO: There should be an ActionResponse type that we're extending here.
// This probably exists already in the taqueria-sdk and should be moved to the
// taqueria-protocol package so that the type can be shared between the CLI
// and SDK
export type PluginResponseValidator = <T extends {success: boolean, stdout?: string, stderr?: string}>(json: Record<string, unknown>) => T

export interface Builder {
    [key: string]: Record<string, unknown>,
    plugin: {
        choices: string[],
        default: string
    }
}

export interface CLICommand {
    original: string,
    description: string,
    handler: CommandHandler,
    builder: Builder,
    middlewares: CommandHandler[],
    demanded: string[],
    optional: string[]
}

export type DenoArgs = typeof Deno.args


export interface RawInitArgs {
    _: ('init' | 'install' | 'uninstall' | 'scaffold' | string)[]
    projectDir: string // path to the project
    scaffoldUrl?: string;
    scaffoldProjectDir?: string;
    maxConcurrency: number
    debug: boolean
    plugin?: string
    env: 'production' | 'development' | 'testing' | string
    quickstart: string
    disableState: boolean
    logPluginRequests: boolean
    setBuild: string
    setVersion: string
    fromVsCode: boolean
    version?: boolean
    build?: boolean
    help: boolean
    template?: string
}

export interface InstallPluginArgs extends RawInitArgs {
    pluginName: string
}

export type UninstallPluginArgs = InstallPluginArgs

// TODO: Consolidate SanitizedInitArgs with SanitizedArgs from the SDK
export interface SanitizedInitArgs {
    _: ('init' | 'install' | 'uninstall' | 'scaffold' | string)[]
    projectDir: SanitizedAbsPath.t
    scaffoldUrl: Url.t;
    scaffoldProjectDir: SanitizedAbsPath.t;
    maxConcurrency: number,
    debug: boolean,
    plugin?: string
    env: 'production' | 'development' | 'testing' | string
    quickstart: string
    disableState: boolean
    logPluginRequests: boolean
    setBuild: string
    setVersion: string
    fromVsCode: boolean
    version: boolean
    build: boolean
    pluginName?: string
    help: boolean
    template?: string
}

export interface i18n {
    __(msg: string, ...params: string[]): string
}

export type EnvKey = "TAQ_CONFIG_DIR" | "TAQ_MAX_CONCURRENCY" | "TAQ_PROJECT_DIR" | "TAQ_ENV" | "TAQ_DISABLE_STATE" | "TAQ_VERSION"

export interface EnvVars {
    get: (key: EnvKey) => undefined | string
}

export type CLIConfig = ReturnType<typeof yargs> & {
    handled?: boolean
}

export type PluginRequestArgs = (string|number|boolean)[]

// Common dependencies before we retrieved the config
export interface PreExtendDeps {
    readonly parsedArgs: SanitizedInitArgs
    readonly env: EnvVars
    readonly i18n: i18n
    readonly stdout: Deno.Writer
    readonly stderr: Deno.Writer
}

// Common dependencies after we retrieved the config
export interface PluginDeps extends PreExtendDeps {
    readonly config: LoadedConfig.t
}

export {
    LoadedConfig
}