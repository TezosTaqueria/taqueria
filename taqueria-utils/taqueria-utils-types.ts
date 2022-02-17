import {resolve as resolvePath, join} from 'https://deno.land/std@0.120.0/path/mod.ts'
import {StringLike} from '../taqueria-protocol/taqueria-protocol-types.ts'
import {attemptP, FutureInstance} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js'

type Callback = () => void

export interface i18n {
    t: (msg: string) => string
}

export type EnvKeys = "TAQ_CONFIG_DIR" | "TAQ_MAX_CONCURRENCY"

export interface EnvVars {
    get: (key: EnvKeys) => undefined | string
}

export type ErrorType = 
  | "E_INVALID_PATH"
  | "E_INVALID_PATH_DOES_NOT_EXIST"
  | "E_INVALID_PATH_ALREADY_EXISTS"
  | "E_INVALID_CONFIG"
  | "E_INVALID_JSON"
  | "E_FORK"
  | "E_INVALID_TASK"

export interface TaqError {
    readonly kind: ErrorType,
    msg: string,
    previous?: TaqError | Error
    context?: unknown
}

const sanitizedPathType: unique symbol = Symbol()
export class SanitizedPath extends StringLike {
    [sanitizedPathType]: void
    static create(value: string) {
        const result = value.match(/^(\.\.|\.\/|\/)/)
        return result ? new SanitizedPath(value) : new SanitizedPath(`./${value}`)
    }
}

const sanitizedAbsPath: unique symbol = Symbol()
export class SanitizedAbsPath {
    [sanitizedAbsPath]: void
    readonly value: string
    protected constructor(value: string, cwd?: SanitizedAbsPath) {
        this.value = cwd
            ? resolvePath(cwd.join(value).value)
            : resolvePath(value)
    }
    public join(...paths: string[]): SanitizedAbsPath {
        return new SanitizedAbsPath(join(this.value, ...paths))
    }
    
    static create(value: string, cwd?: SanitizedAbsPath) {
        return new SanitizedAbsPath(value, cwd)
    }
}

const sanitizedUrl: unique symbol = Symbol()
export class SanitizedUrl extends StringLike {
    [sanitizedUrl]: void
    static create(value: string) {
        return new SanitizedUrl(value)
    }
}

export type Future<L,R> = FutureInstance<L,R>

export type reject = (_err:TaqError|Error) => void

export type resolve = <T>(__: T) => void

const sha256Type: unique symbol = Symbol()
export class SHA256 extends StringLike {
    [sha256Type]: void
    static create (value: string): SHA256 | undefined {
        return value.length === 64
            ? new SHA256(value)
            : undefined
    }
    static async of (value: string): Promise<SHA256|undefined> {
        const encoder = new TextEncoder();
        const data = encoder.encode(value)
        const hash = await crypto.subtle.digest('SHA-256', data)
        const hashArray = Array.from(new Uint8Array(hash));                     // convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return SHA256.create(hashHex)
    }

    static futureOf (value: string) : Future<TaqError, SHA256> {
        return attemptP(() => SHA256.of(value).then(result => result ? result : Promise.reject({kind: "E_SHA256", message: "Could not create hash", context: value})))
    }
}