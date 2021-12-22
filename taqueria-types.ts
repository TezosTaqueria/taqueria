import type {SanitizedPath} from './taqueria-utils/taqueria-utils-types.ts'
import {mkdir as mkDir, joinPaths} from './taqueria-utils/taqueria-utils.ts'
import {resolve, map} from 'https://cdn.skypack.dev/fluture';

export interface CommandArgs extends SanitizedInitArgs {
    plugin: string
}

export type CommandHandler = (parsedArgs: CommandArgs) => unknown

export interface Builder {
    [key: string]: Record<string, unknown>,
    plugin: {
        choices: string[],
        default: string
    }
}

export interface Command {
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
    _: ['init' | 'install' | 'uninstall']
    projectDir: string // path to the project
    configDir: string,
    maxConcurrency: number,
    debug: boolean
}

export interface SanitizedInitArgs {
    _: ['init' | 'install' | 'uninstall']
    projectDir: SanitizedPath
    configDir: SanitizedPath,
    maxConcurrency: number,
    debug: boolean
}

export interface i18n {
    __(msg: string, ...params: string[]): string
}

export type EnvKey = "TAQ_CONFIG_DIR" | "TAQ_MAX_CONCURRENCY" | "TAQ_PROJECT_DIR"

export interface EnvVars {
    get: (key: EnvKey) => undefined | string
}

const configDirType: unique symbol = Symbol()
export class ConfigDir {
    [configDirType]: void
    readonly value: string
    private constructor(value: string) {
        this.value = value
    }
    static create(projectDir: SanitizedPath, configDir: SanitizedPath, mkdir=false) {
        const path = joinPaths(projectDir.value, configDir.value)
        return mkdir
            ? map ((path:string) => new ConfigDir(path)) (mkDir(path))
            : resolve(new ConfigDir(path))

    }
}