import {Future, reject, resolve, TaqError, SanitizedAbsPath, SanitizedUrl} from './taqueria-utils-types.ts'
import memoizy from "https://deno.land/x/memoizy@1.0.0/fp.ts"
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {chain, attemptP, map, Future as Fluture} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js';
import {join as _joinPaths} from 'https://deno.land/std@0.115.1/path/mod.ts'
import {render} from 'https://deno.land/x/eta@v1.12.3/mod.ts'
import * as jsonc from "https://deno.land/x/jsonc@1/main.ts"


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

const mkdirFuture = (path: string): Future<TaqError, void> => attemptP(() => Deno.mkdir(path, {recursive: true}))
export const mkdir = (path: string) : Future<TaqError, string> => pipe(path, mkdirFuture, map(() => path))

export const ensurePathExists = (path: string) : Future<TaqError, SanitizedAbsPath> => attemptP(async () =>{
    try {
        await Deno.stat(path);
        return SanitizedAbsPath.create(path);
    } catch(_e) {
        return Promise.reject({ kind: 'E_INVALID_PATH_DOES_NOT_EXIST', msg: 'TODO i18n message' })
    }  
});

export const ensurePathDoesNotExist = (path: string) : Future<TaqError, SanitizedAbsPath> => attemptP(async () =>{
    try {
        await Deno.stat(path);
        return Promise.reject({ kind: 'E_INVALID_PATH_ALREADY_EXISTS', msg: 'TODO i18n message' })
    } catch(_e) {
        // Expect exception when trying to stat a new directory
        return SanitizedAbsPath.create(path);
    }
});

const rmFuture = (path: SanitizedAbsPath): Future<TaqError, void> => attemptP(async () => {
    try {
        await Deno.remove(path.value);
    } catch {
        // Ignore if path does not exist
    }
});
export const rm = (path: SanitizedAbsPath) : Future<TaqError, SanitizedAbsPath> => pipe(path, rmFuture, map(() => path))

export const gitClone = (url: SanitizedUrl) => (destinationPath: SanitizedAbsPath) => pipe(
    attemptP(async () => {
        const cloneProcess = Deno.run({
            cmd: ["git", "clone", url.value, destinationPath.value],
        });
        const cloneResult = await cloneProcess.status();
        
        if (!cloneResult.success) {
            return Promise.reject({kind: 'E_SCAFFOLD_URL_GIT_CLONE_FAILED', msg: 'TODO i18n message'})
        }
    }), 
    map(() => destinationPath)
);

export const readTextFile = (path: string) : Future<TaqError, string> =>
    attemptP(() => {
        const decoder = new TextDecoder("utf-8")
        return Deno.readFile(path)
            .then(data => {
                const decoded = decoder.decode(data)
                return decoded
            })
            .catch((previous: Error) => Promise.reject({
                kind: "E_READ", msg: `Could not read ${path}`, previous
            }))
    })

export const readJsonFile = <T>(path: string) => pipe(
    readTextFile(path),
    chain(x => decodeJson<T>(x))
)

export const writeTextFile = (path: string) => (data: string) : Future<TaqError, string> => 
    attemptP(() => Deno.writeTextFile(path, data).then(() => path))

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