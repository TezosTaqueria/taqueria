import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath'
import * as Url from '@taqueria/protocol/Url'
import {Future, TaqError, UtilsDependencies} from './taqueria-utils-types.ts'
import memoizy from "https://deno.land/x/memoizy@1.0.0/fp.ts"
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {chain, attemptP, map, reject, resolve, mapRej, promise} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js'
import {join as _joinPaths} from 'https://deno.land/std@0.115.1/path/mod.ts'
import {render} from 'https://deno.land/x/eta@v1.12.3/mod.ts'
import * as jsonc from "https://deno.land/x/jsonc@1/main.ts"
import {copy} from 'https://deno.land/std@0.128.0/streams/conversion.ts'


export const decodeJson = <T>(encoded: string): Future.t<TaqError.t, T> =>
    attemptP(() => {
        try {
            const data = jsonc.parse(encoded)
            return Promise.resolve(data as T)
        } catch (err) {
            throw({kind: "E_INVALID_JSON", msg: "The provided JSON could not be decoded.", previous: err, context: encoded})
        }       
    })

export const debug = <T>(input: T) => {
    debugger
    return input
}

export const mkdir = (path: string) : Future.t<TaqError.t, string> => 
    attemptP(async () => {
        try {
            await Deno.mkdir(path, {recursive: true})
            return path
        } catch (_e) {
            // TODO i18n message
            return Promise.reject({ kind: 'E_MKDIR_FAILED', msg: 'Failed to make directory', context: path, previous: _e })
        }
    })

export const ensureDirExists = (path: string) : Future.t<TaqError.t, SanitizedAbsPath.t> => 
    attemptP(async () =>{
        try {
            await Deno.mkdir(path, {recursive: true})
            return SanitizedAbsPath.make(path)
        } catch(previous) {
            if (previous.name == 'AlreadyExists') {
                return SanitizedAbsPath.make(path)
            }
            // TODO i18n message
            return Promise.reject({ kind: 'E_INVALID_PATH_DOES_NOT_EXIST', msg: 'Path does not exist', context: path, previous })
        }
    })


export const doesPathExist = (path: string) : Future.t<TaqError.t, SanitizedAbsPath.t> => 
    attemptP(async () =>{
        try {
            await Deno.stat(path)
            return SanitizedAbsPath.make(path)
        } catch(_e) {
            // TODO i18n message
            return Promise.reject({ kind: 'E_INVALID_PATH_DOES_NOT_EXIST', msg: 'Path does not exist', context: path, previous: _e })
        }  
    })

export const doesPathNotExist = (path: string) : Future.t<TaqError.t, SanitizedAbsPath.t> => 
    attemptP(async () =>{
        try {
            await Deno.stat(path)

            // TODO i18n message
            return Promise.reject({
                kind: 'E_INVALID_PATH_ALREADY_EXISTS',
                msg: 'Path already exists',
                context: path 
            })
        } catch(_e) {
            // Expect exception when trying to stat a new directory
            return SanitizedAbsPath.make(path)
        }
    })

export const rm = (path: SanitizedAbsPath.t) : Future.t<TaqError.t, SanitizedAbsPath.t> => 
    attemptP(async () => {
        try {
            await Deno.remove(path, { recursive: true })
        } catch (previous) {
            const err: TaqError.t = {
                kind: 'E_INVALID_PATH_DOES_NOT_EXIST',
                msg: `Failed to remove ${path}`,
                context: path,
                previous
            }
            return Promise.reject(err)
        }

        return path
    })


export const readTextFile = (path: string) : Future.t<TaqError.t, string> =>
    attemptP(() => {
        const decoder = new TextDecoder("utf-8")
        return Deno.readFile(path)
            .then(data => {
                const decoded = decoder.decode(data)
                return decoded
            })
            .catch((previous: Error) => Promise.reject({
                kind: "E_READFILE", msg: `Could not read ${path}`, previous
            }))
    })

export const readJsonFile = <T>(path: string) => pipe(
    readTextFile(path),
    chain(x => decodeJson<T>(x))
)

export const writeTextFile = (path: string) => (data: string) : Future.t<TaqError.t, string> => 
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

export const isTaqError = (err: unknown) : err is TaqError.t => {
    return (err as TaqError.t).kind !== undefined
}

export const memoize = memoizy({})

export const joinPaths = _joinPaths

export const renderTemplate = (template: string, values: Record<string, unknown>): string => render(template, values) as string

export const toPromise = <T>(f: Future.t<TaqError.t, T>) => pipe(
    f,
    mapRej(taqErr => new TaqError.E_TaqError(taqErr)),
    promise
)

// Exports a function to inject dependencies needed by this
// utilities package
export const inject = (deps: UtilsDependencies) => {

    const {stdout, stderr} = deps

    const log = (message: string) => {
        const encoder = new TextEncoder()
        stdout.write(encoder.encode(`${message}\n`))
    }

    const logInput = <T>(message: string) => (input: T) : T => {
        const encoder = new TextEncoder()
        const data = typeof(input) === 'object' ? JSON.stringify(input, null, 4) : input
        stdout.write(encoder.encode(`${message}\n`))
        stdout.write(encoder.encode(`${data}\n`))
        return input as T
    }

    const gitClone = (url: Url.t) => (destinationPath: SanitizedAbsPath.t) : Future.t<TaqError.t, SanitizedAbsPath.t> => pipe(
        execText('git clone <%= it.url %> <%= it.outputDir %>', {url: url.toString(), outputDir: destinationPath}),
        mapRej<TaqError.t, TaqError.t>(previous => ({kind: 'GIT_CLONE_FAILED', msg: `Could not clone ${url.toString()}. Please check the Git url and ensure that Git is installed.`, context: {url, destinationPath}, previous})),
        chain(status => status === 0
            ? resolve(destinationPath)
            : reject<TaqError.t>({kind: 'GIT_CLONE_FAILED', msg: `Could not clone ${url.toString()}. Please check the Git url and ensure that Git is installed.`, context: {url, destinationPath}})
        ),
        map(() => destinationPath)
    );

    const execText = (cmdTemplate: string, inputArgs: Record<string, unknown>, bufferOutput=false, cwd?: SanitizedAbsPath.t) : Future.t<TaqError.t, number|string> => attemptP(async () => {
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
        }
        catch (previous) {
            throw {
                kind: "E_FORK",
                msg: `There was a problem trying to evaluate this template: ${cmdTemplate}\n${previous}`,
                previous
            } as TaqError.t
        }
        try {
            const process = Deno.run({
                cmd: ["sh", "-c", `${command}`],
                cwd,
                stdout: "piped",
                stderr: "piped"
            })

            // Output for the subprocess' stderr should be copied to the parent stderr
            await copy(process.stderr, stderr)
            process.stderr.close()

            // Get output. Buffer if desired
            const output = await (async () => {
                
                if (bufferOutput) {
                    const output = await process.output()
                    const decoder = new TextDecoder()
                    return decoder.decode(output)
                }
                else {
                    await copy(process.stdout, stdout)
                    process.stdout.close()
                }
            })()

            // Wait for subprocess to exit
            const status = await process.status()
            Deno.close(process.rid)
            return output ?? status.code
        }
        catch (previous) {
            throw {
                kind: "E_FORK",
                msg: `There was a problem trying to run: ${command}`,
                previous
            } as TaqError.t
        }
    })

    return {
        decodeJson,
        log,
        logInput,
        debug,
        mkdir,
        doesPathNotExist,
        doesPathExist,
        ensureDirExists,
        rm,
        gitClone,
        readTextFile,
        readJsonFile,
        writeTextFile,
        writeJsonFile,
        isTaqError,
        memoize,
        joinPaths,
        renderTemplate,
        execText,
        toPromise,
        stdout,
        stderr
    }
}