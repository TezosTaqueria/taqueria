import {Future, TaqError, SanitizedAbsPath, SanitizedUrl} from './taqueria-utils-types.ts'
import memoizy from "https://deno.land/x/memoizy@1.0.0/fp.ts"
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {chain, attemptP, map, Future as Fluture, reject, resolve, mapRej} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js'
import {join as _joinPaths} from 'https://deno.land/std@0.115.1/path/mod.ts'
import {render} from 'https://deno.land/x/eta@v1.12.3/mod.ts'
import * as jsonc from "https://deno.land/x/jsonc@1/main.ts"

export const decodeJson = <T=unknown>(encoded: string): Future<TaqError, T> => Fluture((rej, res) => {
    try {
        const data = jsonc.parse(encoded)
        res(data as T)
    } catch (err) {
        rej({kind: "E_INVALID_JSON", msg: "The provided JSON could not be decoded.", previous: err, context: encoded})
    }
    return () => {};
}) as Future<TaqError, T>;

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

const mkdirFuture = (path: string): Future<TaqError | Error, void> => attemptP(() => Deno.mkdir(path, {recursive: true}))
export const mkdir = (path: string) : Future<TaqError | Error, string> => pipe(path, mkdirFuture, map(() => path))

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

const rmFuture = (path: SanitizedAbsPath): Future<TaqError | Error, void> => attemptP(async () => {
    try {
        await Deno.remove(path.value);
    } catch {
        // Ignore if path does not exist
    }
});
export const rm = (path: SanitizedAbsPath) : Future<TaqError | Error, SanitizedAbsPath> => pipe(path, rmFuture, map(() => path))

export const gitClone = (url: SanitizedUrl) => (destinationPath: SanitizedAbsPath) => pipe(
    exec('git clone <%= it.url %> <%= it.outputDir %>', {url: url.value, outputDir: destinationPath.value}),
    mapRej(previous => ({kind: 'E_SCAFFOLD_URL_GIT_CLONE_FAILED', msg: 'Could not scaffold. Is Git installed?', context: {url, destinationPath}, previous})),
    chain(status => status == 0
        ? resolve(destinationPath)
        : reject({kind: 'E_SCAFFOLD_URL_GIT_CLONE_FAILED', msg: 'Could not scaffold. Is Git installed?', context: {url, destinationPath}})
    ),
    map(() => destinationPath)
);

export const readTextFile = (path: string): Future<TaqError | Error, string> => Fluture(
    (rej, res) => {
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
) as Future<TaqError | Error, string>

export const readJsonFile = <T>(path: string): Future<TaqError | Error, T> => pipe(
    readTextFile(path),
    chain (decodeJson),
    map ((result) => (result as T))
)

export const writeTextFile = (path: string) => (data: string): Future<TaqError | Error, unknown> => Fluture(
    (rej, res) => {
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
        }
    }
})

export const as = <T>() => map(x => x as T);