import {exec} from 'child_process'
import {stat, readFile} from 'fs/promises'
import {join, resolve} from 'path'

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

export interface E_EXEC extends E_BASE {
    code: 'E_EXEC',
    cmd: string
}

export type TaqErr =
    E_PROXY |
    E_TAQ_NOT_FOUND |
    E_INVALID_DIR |
    E_INVALID_FILE |
    E_NOT_TAQIFIED |
    E_INVALID_JSON |
    E_STATE_MISSING |
    E_EXEC

export interface I18N {
    temp?: true
}

export type PromiseLike<L, R> = Promise<R>

export type PathToTaq = string & {__kind__: 'PathToTaq'}

export type PathToDir = string & {__kind__: 'PathToDir'}

export type PathToFile = string & {__kind__: 'PathToFile'}

export type Json<T> = T

export type Config = Record<string, unknown>

export type State = Record<string, unknown>

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
    create(dir: PathToDir, i18n: I18N): PromiseLike<E_NOT_TAQIFIED|E_STATE_MISSING, TaqifiedDir> {
        return makeDir(join(dir, '.taq'), i18n)
        .then(dotTaqDir =>
            makeFile(join(dotTaqDir, 'config.json'), i18n)
            .then(pathToConfig => readJsonFile<Config>(pathToConfig, i18n, data => (data as Config)))
            .catch(previous => Promise.reject({
                code: 'E_NOT_TAQIFIED',
                pathProvided: dir,
                msg: "The given directory is not taqified as its missing a .taq/config.json file.",
                previous
            }))
            .then(config => 
                makeFile(join(dotTaqDir, 'state.json'), i18n)
                .then(pathToState => readJsonFile<State>(pathToState, i18n, data => (data as State)))
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
    createFromString(inputDir: string, i18n: I18N) : PromiseLike<E_NOT_TAQIFIED|E_STATE_MISSING, TaqifiedDir> {
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
    exec(`sh -c '${cmd}'`, (previous, stdout, msg) => {
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
            ? execCmd(`${pathToTaq} -p ${projectDir} ${taskWithArgs}`)
            : execCmd(`${pathToTaq} ${taskWithArgs}`)
    )
    .catch(previous => Promise.reject({code: 'E_PROXY', msg: "There was a problem running taq.", previous}))

export const readJsonFile = <T>(pathToFile: PathToFile, _i18n: I18N, make: (data: Record<string, unknown>) => T) =>
    readFile(pathToFile, {encoding: 'utf-8'})
    .then(data => {
        try {
            const json = JSON.parse(data)
            return make(json) as Json<T>
        }
        catch (previous) {
            return Promise.reject({code: 'E_INVALID_JSON', data, msg: "The provided data is invalid JSON", previous})
        }
    })

export const findTaqBinary = (i18n: I18N) : PromiseLike<E_TAQ_NOT_FOUND, string> =>
    execCmd('which taq')
    .then(path => path.trim())
    .catch(previous => Promise.reject({code: 'E_TAQ_NOT_FOUND', msg: "Could not find taq in your path.", previous}))
    .then(makePathToTaq(i18n))