import {resolve as resolvePath, join} from 'https://deno.land/std@0.120.0/path/mod.ts'
import {attemptP} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js'
import * as Future from './Future.ts'
import * as SanitizedPath from './SanitizedPath.ts'
import * as TaqError from './TaqError.ts'
import * as SHA256 from "./SHA256.ts"
import * as Url from "./Url.ts"
import * as SanitizedAbsPath from "./SanitizedAbsPath.ts"

type Callback = () => void

export type EnvKeys = "TAQ_CONFIG_DIR" | "TAQ_MAX_CONCURRENCY"

export interface EnvVars {
    get: (key: EnvKeys) => undefined | string
}

export interface UtilsDependencies {
    stdout: Deno.Writer
    stderr: Deno.Writer
}

export {
    Future,
    SanitizedPath,
    TaqError,
    SHA256,
    Url,
    SanitizedAbsPath
}