import {resolve as resolvePath} from 'https://deno.land/std@0.119.0/path/mod.ts'
import {StringLike} from '../taqueria-protocol/taqueria-protocol-types.ts'

type Callback = () => void

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
  | "E_FORK"

export interface TaqError {
    readonly kind: ErrorType,
    msg: string,
    previous?: TaqError | Error
}

const sanitizedPathType: unique symbol = Symbol()
export class SanitizedPath extends StringLike{
    [sanitizedPathType]: void
    static create(value: string) {
        const result = value.match(/^(\.\.|\.\/|\/)/)
        return result ? new SanitizedPath(value) : new SanitizedPath(`./${value}`)
    }
}

const sanitizedAbsPath: unique symbol = Symbol()
export class SanitizedAbsPath extends SanitizedPath {
    [sanitizedAbsPath]: void
    protected constructor(value: string) {
        super(resolvePath(value))
    }
    static create(value: string) {
        return new SanitizedAbsPath(super.create(value).value)
    }
}

export type Future<L,R> = unknown

export type reject = (_err:TaqError|Error) => void

export type resolve = <T>(__: T) => void