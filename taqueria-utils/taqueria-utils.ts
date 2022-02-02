import type {Future, reject, resolve, TaqError, SanitizedAbsPath} from './taqueria-utils-types.ts'
import memoizy from "https://deno.land/x/memoizy@1.0.0/fp.ts"
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {chain, attemptP, map, Future as Fluture} from 'https://cdn.skypack.dev/fluture';
import {join as _joinPaths} from 'https://deno.land/std@0.115.1/path/mod.ts'
import {render} from 'https://deno.land/x/eta@v1.12.3/mod.ts'
import * as jsonc from "https://deno.land/x/jsonc@1/main.ts"

export const decodeJson = (encoded: string) => Fluture((rej: reject, res:resolve) => {
    try {
        const data = jsonc.parse(encoded)
        res(data)
    } catch (err) {
        rej({kind: "E_INVALID_JSON", msg: "The provided JSON could not be decoded.", previous: err, context: encoded})
    }
    return () => {}
})

export const log = <T>(message: string) => (input: T) : T => {
    console.log(message)
    console.log(input)
    return input
}


export const debug = <T>(input: T) => {
    debugger
    return input
}

const mkdirFuture = (path: string): Future<TaqError, void> => attemptP(() => Deno.mkdir(path, {recursive: true}))

export const mkdir = (path: string) : Future<TaqError, string> => pipe(path, mkdirFuture, map (() => path))

export const readTextFile = (path: string) => Fluture(
    (rej: reject, res: resolve) => {
        const decoder = new TextDecoder("utf-8")
        Deno.readFile(path)
            .then(data => {
                const decoded = decoder.decode(data)
                return decoded
            })
            .then(res)
            .catch(rej)
        return () => {}
    }
)

export const readJsonFile = <T>(path: string) => pipe(
    readTextFile(path),
    chain (decodeJson),
    map ((result: unknown) => (result as T))
)

export const writeTextFile = (path: string) => (data: string) => Fluture(
    (rej: reject, res: resolve) => {
        Deno.writeTextFile(path, data).then(() => res(path)).catch(rej)
        return () => {}
    }
        
)

export const writeJsonFile = <T>(path: string) => (data: T) => pipe(
    JSON.stringify(data),
    jsonStr => pipe(
        jsonc.format(jsonStr, undefined, {
            insertSpaces: true
        }),
        edits => jsonc.applyEdits(jsonStr, edits)
    ),
    writeTextFile(path)
)

export const isTaqError = (err: unknown) : err is TaqError => {
    return (err as TaqError).kind !== undefined
}

export const memoize = memoizy({})

export const joinPaths = _joinPaths

export const renderTemplate = (template: string, values: Record<string, unknown>): string => render(template, values) as string

export const exec = (cmdTemplate: string, inputArgs: Record<string, unknown>, cwd?: SanitizedAbsPath) => attemptP(async () => {
    let command = cmdTemplate
    try {
        // NOTE, uses eta templates under the hood. Very performant! https://ghcdn.rawgit.org/eta-dev/eta/master/browser-tests/benchmark.html
        /**
         * Template Variables:
         * - configDir
         * - projectDir
         * - maxConcurrency
         * - plugin
         * - config.language
         * - config.plugins
         * - config.contractsDir
         * - config.artifactsDir
         * - config.testsDir
         * - config.configFile
         * - config.configDir
         * - config.projectDir
         * - env.get()
         * - i18n.__()
         */
        const join = joinPaths
        const cmd = renderTemplate(cmdTemplate, {join, ...inputArgs})
        command = cmd
        const process = Deno.run({
            cmd: ["sh", "-c", `${cmd}`],
            cwd: cwd?.value
        })
        const status = await process.status()

        return status.code
    }
    catch (previous) {
        throw {
            kind: "E_FORK",
            msg: `Could not fork ${command}`,
            previous
        }
    }
})