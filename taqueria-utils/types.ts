
import Denomander from "https://deno.land/x/denomander/mod.ts";

type Callback = () => void

interface CLICommand {
    word_command: string
}

interface CLI extends Denomander{
    configDir: string
    plugin: string,
    kind: string,
    path: string,
    // commands: unknown[]
    // command: (name: string, desc: string) => this
    hasCommand(cmdName: string): boolean
    addPluginFor(taskName: string, pluginName: string) : void
    // action: (callback: Callback) => this
}

export type Args = CLI

export interface i18n {
    t: (msg: string) => string
}

export type EnvKeys = "TAQ_CONFIG_DIR" | "TAQ_MAX_CONCURRENCY"

export interface EnvVars {
    get: (key: EnvKeys) => undefined | string
}

export type ErrorType = 
    "E_INVALID_PATH"
  | "E_INVALID_CONFIG"
  | "E_INVALID_JSON"

export interface TaqError {
    readonly kind: ErrorType,
    msg: string,
    previous?: TaqError | Error
}

export type ExistingPath = string & {kind: ExistingPath}

export type NonValidatedPath = string & {kind: NonValidatedPath}

export type Future<L,R> = unknown

export type reject = (_err:TaqError|Error) => void

export type resolve = <T>(__: T) => void