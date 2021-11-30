import type {SanitizedPath} from './taqueria-utils/sanitized-path.ts'


export interface InstalledPlugin {
    name: string

    type: 'npm' | 'binary' | "deno"
}

export interface Config {
    language?: 'en' | 'fr'
    plugins: InstalledPlugin[]
    contractsDir: string
    testsDir: string
}

export interface TaskOption {
    shortFlag: string,
    flag: string,
    description: string
}

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

export interface Task {
    name: string
    command: string
    aliases: string[]
    description: string
    options: TaskOption[]
}

export interface Scaffold {
    [key: string]: {
        description: string
        options: TaskOption[]
    }
}

export interface PluginInfo {

    tasks: Task[],
    scaffolds: Scaffold[]
}

export type taskName = "taqify"

export type DenoArgs = typeof Deno.args

export interface RawInitArgs {
    _: ['init' | 'install' | 'uninstall']
    projectDir: string // path to the project
    configDir: string,
    maxConcurrency: number
}

export interface SanitizedInitArgs {
    _: ['init' | 'install' | 'uninstall']
    projectDir: SanitizedPath
    configDir: SanitizedPath,
    maxConcurrency: number
}

export interface i18n {
    __(msg: string, ...params: string[]): string
}

export type EnvKey = "TAQ_CONFIG_DIR" | "TAQ_MAX_CONCURRENCY" | "TAQ_PROJECT_DIR"

export interface EnvVars {
    get: (key: EnvKey) => undefined | string
}

export type AddTaskCallback = (task: Task, provider: string) => unknown