import {exec} from 'child_process'
import {stat, readFile} from 'fs/promises'
import {join} from 'path'
import {Config} from '@taqueria/protocol/taqueria-protocol-types'
import {parse} from 'comment-json'


/***********************************************************************/
// This module provides pure helper functions that do not use the VS Code API
// All helper functions should utilize dependency injection
/***********************************************************************/

export interface E_BASE {
    msg: string
    previous?: Error
}

export interface E_PROXY extends E_BASE {
    code: 'E_PROXY'
    cmd?: string
}

export interface E_TAQ_NOT_FOUND extends E_BASE {
    code: 'E_TAQ_NOT_FOUND'
    pathProvided: string
}

export interface E_INVALID_DIR extends E_BASE {
    code: 'E_INVALID_DIR'
    pathProvided: string
}

export interface E_INVALID_FILE extends E_BASE {
    code: 'E_INVALID_FILE'
    pathProvided: string
}

export interface E_NOT_TAQIFIED extends E_BASE {
    code: 'E_NOT_TAQIFIED'
    pathProvided: string
}

export interface E_INVALID_JSON extends E_BASE {
    code: 'E_INVALID_JSON'
    data: string
}

export interface E_STATE_MISSING extends E_BASE {
    code: 'E_STATE_MISSING'
    taqifiedDir: PathToDir
}

export interface E_NO_TAQUERIA_PROJECTS extends E_BASE {
    code: 'E_NO_TAQUERIA_PROJECTS'
    msg: string
}

export interface E_EXEC extends E_BASE {
    code: 'E_EXEC',
    cmd: string
}

export interface E_WINDOWS extends E_BASE {
    code: 'E_WINDOWS'
}

export type TaqErr =
    E_PROXY |
    E_TAQ_NOT_FOUND |
    E_INVALID_DIR |
    E_INVALID_FILE |
    E_NOT_TAQIFIED |
    E_INVALID_JSON |
    E_STATE_MISSING |
    E_EXEC |
    E_NO_TAQUERIA_PROJECTS |
    E_WINDOWS

export interface I18N {
    temp?: true
}

export interface ConfigHash {
    value: string
}

export type PromiseLike<L, R> = Promise<R>

export type PathToTaq = string & {__kind__: 'PathToTaq'}

export type PathToDir = string & {__kind__: 'PathToDir'}

export type PathToFile = string & {__kind__: 'PathToFile'}

export type Json<T> = T

export interface InstalledPlugin {
    name: string
    type: 'npm'
}

export interface State {
    [taskName: string]: null|string[]
}

export const taqifiedDirType: unique symbol = Symbol("taqifiedDirType")

export class TaqifiedDir {
    [taqifiedDirType]: void
    readonly dir: PathToDir
    readonly config: Config
    readonly state: State
    
    protected constructor(dir: PathToDir, config: Config, state: State) {
        this.dir = dir
        this.config = config
        this.state = state
    }

    /**
     * Makes a TaqifiedDir from an existing directory
     * @param {PathToDir} dir 
     * @param {I18N} i18n 
     * @returns {PromiseLike<E_NOT_TAQIFIED|E_STATE_MISSING, TaqifiedDir>}
     */
    static create(dir: PathToDir, i18n: I18N): PromiseLike<E_NOT_TAQIFIED|E_STATE_MISSING, TaqifiedDir> {
        return makeDir(join(dir, '.taq'), i18n)
        .then(dotTaqDir =>
            makeFile(join(dotTaqDir, 'config.json'), i18n)
            // TODO - validate config!
            .then(pathToConfig => readJsonFile<Config>(i18n, data => (data as unknown as Config)) (pathToConfig))
            .catch(previous => Promise.reject({
                code: 'E_NOT_TAQIFIED',
                pathProvided: dir,
                msg: "The given directory is not taqified as its missing a .taq/config.json file.",
                previous
            }))
            .then(config => 
                makeFile(join(dotTaqDir, 'state.json'), i18n)
                // TODO - validate state!
                .then(pathToState => readJsonFile<State>(i18n, data => (data as State)) (pathToState))
                .then(state => new TaqifiedDir(dir, config, state))
                .catch(previous => Promise.reject({
                    code: 'E_STATE_MISSING',
                    msg: 'The provided is taqified but missing a state file in .taq',
                    taqifiedDir: dir,
                    previous
                }))
            )
        )
        .catch(previous => Promise.reject({
            code: 'E_NOT_TAQIFIED',
            pathProvided: dir,
            msg: "The given directory is not taqified as its missing a .taq directory.",
            previous
        }))
    }


    /**
     * Makes a TaqifiedDir from a path to a directory
     * @param {string} inputDir 
     * @param {I18N} i18n 
     * @returns {PromiseLike<E_NOT_TAQIFIED|E_STATE_MISSING, TaqifiedDir>}
     */
    static createFromString(inputDir: string, i18n: I18N) : PromiseLike<E_NOT_TAQIFIED|E_STATE_MISSING, TaqifiedDir> {
        return makeDir(inputDir, i18n)
        .then(dir => this.create(dir, i18n))
        .catch(previous => Promise.reject({
            code: 'E_NOT_TAQIFIED',
            pathProvided: inputDir,
            msg: 'The given path is not taqified, as its not an existing directory',
            previous
        }))
    }
}

/**
 * Makes a PathToFile
 * Assures that the path provided resolves to an existing file
 * @todo Use i18n 
 * @param {string} pathToFile 
 * @param {I18N} _i18n 
 * @returns {PromiseLike<E_INVALID_FILE, PathToFile>}
 */
export const makeFile = (pathToFile: string, _i18n: I18N): PromiseLike<E_INVALID_FILE, PathToFile> =>
    stat(pathToFile)
    .then(
        stat => stat.isFile()
            ? Promise.resolve(pathToFile as PathToFile)
            : Promise.reject({code: 'E_INVALID_FILE', pathProvided: pathToFile, msg: "This path does not resolve to an existing file"})
    )
    .catch(previous => Promise.reject({code: 'E_INVALID_FILE', pathProvided: pathToFile, msg: "This path does not resolve to an existing file", previous}))


/**
 * Makes a PathToDir
 * Assures that the given dirPath is actually a directory
 * @todo Use i18n
 * @param {string} dirPath 
 * @param {I18N} _i18n 
 * @returns {PromiseLike<E_INVALID_DIR, PathToDir>}
 */
export const makeDir = (dirPath: string, _i18n: I18N): PromiseLike<E_INVALID_DIR, PathToDir> => 
    stat(dirPath)
    .then(
        result => result.isDirectory()
            ? Promise.resolve(dirPath as PathToDir)
            : Promise.reject({code: 'E_INVALID_DIR', pathProvided: dirPath, msg: "The given path is not a directory"})
    )
    .catch(previous => Promise.reject({code: 'E_INVALID_DIR', pathProvided: dirPath, previous, msg: "The given path is not a directory"}))


/**
 * Makes a PathToTaq
 * Assures that the provided inputPath points to the taq binary
 * @param {string} inputPath 
 * @param {I18N} _i18n 
 * @returns {(inputPath:string) => PromiseLike<E_TAQ_NOT_FOUND, PathToTaq>}
 */
export const makePathToTaq = (i18n: I18N) => (inputPath: string) : PromiseLike<E_TAQ_NOT_FOUND, PathToTaq> =>
        stat(inputPath)
        .then(_ => proxyToTaq (inputPath as PathToTaq, i18n) ('testFromVsCode'))
        .then(
            output => output.includes('OK')
                ? Promise.resolve(inputPath as PathToTaq)
                : Promise.reject({code: 'E_TAQ_NOT_FOUND', pathProvided: inputPath, msg: "The path to taq is invalid"})
        )
        .catch(previous => Promise.reject({code: 'E_TAQ_NOT_FOUND', pathProvided: inputPath, msg: "The path to taq is invalid", previous}))

/**
 * Executes a shell command
 * @param {string} cmd
 * @returns {PromiseLike<E_EXEC, string>}
 */        
export const execCmd = (cmd: string): PromiseLike<E_EXEC, string> => new Promise((resolve, reject) => {
    if (isWindoze()) reject({code: 'E_WINDOWS', msg: "Running in Windows without WSLv2 is currently not supported."})
    else exec(`sh -c "${cmd}"`, (previous, stdout, msg) => {
        log ("Executing command:") (cmd)
        if (previous) reject({code: 'E_EXEC', msg: `An unexpected error occurred when trying to execute the command`, previous, cmd})
        else if (msg.length) reject({code: 'E_EXEC', msg, cmd})
        else resolve(stdout)
    })
})

/**
 * Proxies a command to the taq CLI
 * @todo Use i18n 
 * @param {string} cmd 
 * @param {I18N} _i18n
 * @returns {(taskWithArgs: string) => PromiseLike<ProxyErr, string>}
 */
export const proxyToTaq = (pathToTaq: PathToTaq, i18n: I18N, projectDir?: PathToDir) => (taskWithArgs: string): PromiseLike<E_PROXY, string> =>
    (
        projectDir
            ? execCmd(`${pathToTaq} -p ${projectDir} --fromVsCode ${taskWithArgs}`)
            : execCmd(`${pathToTaq} --fromVsCode ${taskWithArgs}`)
    )
    .catch(previous => {
        if ("code" in previous) {
            if (previous.code === 'E_EXEC') {
                const {cmd, msg} = previous as E_EXEC

                // The error message from the CLI might be JSON
                // Try to parse it and if so, return its error information
                return decodeJson (msg)
                .catch(_ =>
                    msg.includes('EBADENGINE')
                        ? "Please install NodeJS v16."
                        : msg
                )
                .then(err => {
                    if (typeof err === 'object') {
                        return Promise.reject(err)
                    }
                    else return Promise.reject({code: 'E_PROXY', msg: err, previous, cmd})
                })
            }
        }
        return Promise.reject({code: 'E_PROXY', msg: "There was a problem running taq.", previous})
    })

export const readJsonFile = <T>(_i18n: I18N, make: (data: Record<string, unknown>) => T) => (pathToFile: PathToFile) =>
    readFile(pathToFile, {encoding: 'utf-8'})
    .then(data => {
        try {

            const json = parse(data)
            if (json) {
                const obj = json as Record<string, unknown>
                return make(obj) as Json<T>
            }
            else throw new Error("Could not parse JSON")
        }
        catch (previous) {
            return Promise.reject({code: 'E_INVALID_JSON', data, msg: "The provided data is invalid JSON", previous, context: pathToFile})
        }
    })

export const decodeJson = <T>(data: string): PromiseLike<E_INVALID_JSON, Json<T>> => {
    try {
        const json = parse(data)
        if (json) {
            const obj = json as unknown as Json<T>
            return Promise.resolve(obj)
        }
        else throw new Error("Could not parse JSON")
    }
    catch (previous) {
        return Promise.reject({code: 'E_INVALID_JSON', data, msg: "The provided data is invalid JSON", previous})
    }
}

export const isWindoze = () =>
    process.platform.includes('win') && !process.platform.includes('darwin')

export const findTaqBinary = (i18n: I18N) : PromiseLike<E_TAQ_NOT_FOUND, string> =>
    execCmd('which taq')
    .then(path => path.trim())
    .catch(previous => Promise.reject({code: 'E_TAQ_NOT_FOUND', msg: "Could not find taq in your path.", previous}))
    .then(makePathToTaq(i18n))


export const makeState = (_i18n: I18N) => (input: Record<string, unknown>) => {
    // TODO: Validate input
    return input as unknown as State
}

export const log = <T>(heading: string) => (input: T): T => {
    console.log('**'+heading+'**')
    console.log(input)
    return input
}