import {Future, reject, resolve, TaqError, SanitizedAbsPath, SanitizedUrl} from './taqueria-utils-types.ts'
import memoizy from "https://deno.land/x/memoizy@1.0.0/fp.ts"
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {chain, attemptP, map, Future as Fluture} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js';
import {join as _joinPaths} from 'https://deno.land/std@0.115.1/path/mod.ts'
import {render} from 'https://deno.land/x/eta@v1.12.3/mod.ts'
import * as jsonc from "https://deno.land/x/jsonc@1/main.ts"

type PathTypes = string | SanitizedAbsPath;
const getPathValue = (path: PathTypes) => 
    typeof path === 'string' ? path : path.value;
    
type UrlTypes = string | SanitizedUrl;
const getUrlValue = (url: UrlTypes) => 
    typeof url === 'string' ? url : url.value;

export const decodeJson = <T>(encoded: string): Future<TaqError, T> =>
    attemptP(() => {
        try {
            const data = jsonc.parse(encoded)
            return Promise.resolve(data as T)
        } catch (err) {
            throw({kind: "E_INVALID_JSON", msg: "The provided JSON could not be decoded.", previous: err, context: encoded})
        }       
    })

export const log = <T>(message: string) => (input: T) : T => {
    console.log(message)
    return input
}

export const logInput = <T>(message: string) => (input: T) : T => {
    console.log(message)
    console.log(input)
    return input
}

export const debug = <T>(input: T) => {
    debugger
    return input
}

export const mkdir = <T extends PathTypes>(path: T): Future<TaqError, T> => 
    attemptP(async () => {
        try {
            await Deno.mkdir(getPathValue(path), {recursive: true})
            return path
        } catch (_e) {
            // TODO i18n message
            return Promise.reject({ kind: 'E_MKDIR_FAILED', msg: 'Failed to make directory', context: path, previous: _e })
        }
    })

export const ensurePathExists = <T extends PathTypes>(path: T): Future<TaqError, T> => 
    attemptP(async () =>{
        try {
            await Deno.stat(getPathValue(path))
            return path
        } catch(_e) {
            // TODO i18n message
            return Promise.reject({ kind: 'E_INVALID_PATH_DOES_NOT_EXIST', msg: 'Path does not exist', context: path, previous: _e })
        }  
    })

export const ensurePathDoesNotExist = <T extends PathTypes>(path: T): Future<TaqError, T> => 
    attemptP(async () =>{
        try {
            await Deno.stat(getPathValue(path))

            // TODO i18n message
            return Promise.reject({ kind: 'E_INVALID_PATH_ALREADY_EXISTS', msg: 'Path already exists', context: path })
        } catch(_e) {
            // Expect exception when trying to stat a new directory
            return path
        }
    })

export const rm = <T extends PathTypes>(path: T, {recursive} = {recursive: true}) : Future<TaqError, void> => 
    attemptP(async () => {
        try {
            await Deno.remove(getPathValue(path), {recursive})
        } catch (_e) {
            // TODO i18n message
            return Promise.reject({ kind: 'E_INVALID_PATH_DOES_NOT_EXIST', msg: 'Path does not exist', context: path, previous: _e })
        }
    })

export const gitClone = <TUrl extends UrlTypes>(url: TUrl) => <T extends PathTypes>(path: T) : Future<TaqError, T> => 
    attemptP(async () => {
        const cloneProcess = Deno.run({
            cmd: ["git", "clone", getUrlValue(url), getPathValue(path)],
        })
        const cloneResult = await cloneProcess.status()
        
        if (!cloneResult.success) {
            // TODO i18n message
            return Promise.reject({ 
                kind: 'E_SCAFFOLD_URL_GIT_CLONE_FAILED', msg: 'Git clone failed', 
                context: { url: getUrlValue(url), path: getPathValue(path) }
            })
        }

        return path
    })

export const readTextFile = <T extends PathTypes>(path: T) : Future<TaqError, string> =>
    attemptP(() => {
        const decoder = new TextDecoder("utf-8")
        return Deno.readFile(getPathValue(path))
            .then(data => {
                const decoded = decoder.decode(data)
                return decoded
            })
            .catch((previous: Error) => Promise.reject({
                kind: "E_READ", msg: `Could not read ${getPathValue(path)}`, previous
            }))
    })

export const readJsonFile = <T>(path: string) => pipe(
    readTextFile(path),
    chain(x => decodeJson<T>(x))
)

export const writeTextFile = <T extends PathTypes>(path: T) => (data: string) : Future<TaqError, T> => 
    attemptP(() => Deno.writeTextFile(getPathValue(path), data).then(() => path))

export const writeJsonFile = <T, TPath extends PathTypes = string>(path: TPath) => (data: T) => pipe(
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

export const exec = (cmdTemplate: string, inputArgs: Record<string, unknown>, cwd?: SanitizedAbsPath) : Future<TaqError, number> => attemptP(async () => {
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
        } as TaqError
    }
})