import * as Protocol from '@taqueria/protocol/taqueria-protocol-types'
import type {i18n} from "@taqueria/protocol/i18n"
import load from "@taqueria/protocol/i18n"
import {PluginResponse} from "@taqueria/protocol/taqueria-protocol-types"
import * as RequestArgs from "@taqueria/protocol/RequestArgs"
import * as PluginInfo from "@taqueria/protocol/PluginInfo"
import {Schema} from "./types"
import {Args, pluginDefiner, LikeAPromise, Failure, StdIO} from "./types"
import {join, dirname} from 'path'
import {readFile, writeFile} from 'fs/promises'
import {get} from 'stack-trace'
import {exec, ExecException} from 'child_process'

// @ts-ignore interop issue. Maybe find a different library later
import generateName from 'project-name-generator'

// To use esbuild with yargs, we can't use ESM: https://github.com/yargs/yargs/issues/1929
const yargs = require('yargs')

export const writeJsonFile = <T>(filename: string) => (data: T): Promise<string> =>
    writeFile(filename, JSON.stringify(data, undefined, 4), {encoding: "utf8"})
    .then(_ => filename)

export const readJsonFile = <T>(filename: string): Promise<T> =>
    readFile(filename, {encoding: "utf-8"})
    .then(JSON.parse)
    .then(result => (result as T))

export const execCmd = (cmd:string) : LikeAPromise<StdIO, ExecException> => new Promise((resolve, reject) => {
    exec(`sh -c "${cmd}"`, (err, stdout, stderr) => {
        if (err) reject(err)
        else resolve({
            stdout,
            stderr
        })
    })
})

export const getArch = () : LikeAPromise<string, Failure<string>> => 
    execCmd("uname -m")
    .then(result => result.stdout.trim().toLowerCase())
    .then(arch => {
        switch(arch) {
            case 'x86_64':
                return 'linux/amd64'
            case 'arm64':
                return 'linux/arm64/v8'
            default:
                return Promise.reject({
                    errCode: "E_INVALID_ARCH",
                    errMsg: `We do not know how to handle the ${arch} architecture`,
                    context: arch
                })
        }
    })


export const parseJSON = <T>(input: string) : LikeAPromise<T, Failure<string>> => new Promise((resolve, reject) => {
    try {
        const json = JSON.parse(input)
        resolve(json)
    }
    catch (err) {
        return reject({
            errCode: "E_INVALID_JSON",
            errMsg: `Invalid JSON: ${input}`,
            previous: err,
            context: input
        })
    }
})

export const sendRes = (msg:string, newline=true) => {
    if (!msg || msg.length === 0) return
    return newline
        ? console.log(msg)
        : process.stdout.write(msg) as unknown as void
}

export const sendAsyncRes = (msg: string, newline=true) : Promise<void> =>
    Promise.resolve(sendRes(msg, newline))


export const sendErr = (msg: string, newline=true) => {
    if (!msg || msg.length === 0) return
    return newline
        ? console.error(msg)
        : process.stderr.write(msg) as unknown as void
}

export const sendAsyncErr = (msg: string, newline=true) =>
    Promise.reject(sendErr(msg, newline)) // should this be Promise.reject?


export const sendJson = (msg:unknown, newline=true) =>
    sendRes(JSON.stringify(msg), newline)

export const sendJsonErr = (msg:unknown, newline=true) =>
    sendErr(JSON.stringify(msg), newline)

export const sendAsyncJson = (msg:unknown, newline=true) =>
    sendAsyncRes(JSON.stringify(msg), newline)

export const sendAsyncJsonErr = (msg:unknown, newline=true) =>
    sendAsyncErr(JSON.stringify(msg), newline)


export const sendJsonRes = <T>(data: T) => typeof data === 'object'
    ? sendJson({
        data,
        render: 'table'
    })
    : sendJson({
        data,
        render: 'string'
    })

export const sendAsyncJsonRes = <T>(data: T) => Promise.resolve(sendJsonRes(data))

export const noop = () => {}

const parseArgs = (unparsedArgs: Args): LikeAPromise<RequestArgs.t, Failure<undefined>> => {
    if (unparsedArgs && Array.isArray(unparsedArgs) && unparsedArgs.length >= 2) {
        const argv = yargs(unparsedArgs.slice(2)).argv
        try {
            const requestArgs = RequestArgs.make(argv)
            return Promise.resolve(requestArgs)
        }
        catch (previous) {
            return Promise.reject({
                errCode: "E_INVALID_ARGS",
                errMsg: "Invalid usage. If you were testing your plugin, did you remember to specify --taqRun?",
                context: undefined,
                previous
            })
        }
    }
    return Promise.reject({
        errCode: "E_INVALID_ARGS",
        errMsg: "Invalid usage. If you were testing your plugin, did you remember to specify --taqRun?",
        context: undefined
    })
}

const parseSchema = (i18n: i18n, definer: pluginDefiner, inferPluginName: () => string): Schema | undefined => {
    try {
        const inputSchema = definer(i18n)

        return {
            ...inputSchema,
            ...PluginInfo.create({
                ...inputSchema,
                name: inputSchema.name ?? inferPluginName()
            })
        }
    }
    catch (e) {
        sendErr((e as Error).message)
        return undefined
    }
}

const getResponse = (definer: pluginDefiner, inferPluginName: () => string) => async (requestArgs: RequestArgs.t) => {
    const {taqRun} = requestArgs
    const i18n = await load()
    const schema = parseSchema(i18n, definer, inferPluginName)
    if (schema) {
        try {
            switch (taqRun) {
                case "pluginInfo":
                    const output = {
                        ...schema,
                        proxy: schema.proxy ? true: false,
                        checkRuntimeDependencies: schema.checkRuntimeDependencies ? true: false,
                        installRuntimeDependencies: schema.installRuntimeDependencies ? true : false
                    }
                    return sendAsyncJson(output);
                case "proxy":
                    if (schema.proxy) {
                        const retval = schema.proxy(RequestArgs.createProxyArgs(requestArgs))
                        if (retval) return retval
                        return Promise.reject({
                            errCode: "E_PROXY",
                            message: "The plugin's proxy method must return a promise.",
                            context: retval
                        })
                    }
                    return Promise.reject({
                        errCode: 'E_NOT_SUPPORTED',
                        message: i18n.__('proxyNotSupported'),
                        context: requestArgs
                    })
                case "checkRuntimeDependencies":
                    return sendAsyncJson(
                        schema.checkRuntimeDependencies
                            ? schema.checkRuntimeDependencies(i18n, requestArgs)
                            : Promise.resolve({report: []})
                    )
                case "installRuntimeDependencies":
                    return sendAsyncJson(
                        schema.installRuntimeDependencies
                            ? schema.installRuntimeDependencies(i18n, requestArgs)
                            : Promise.resolve({report: []})
                    )
                default:
                    return Promise.reject({
                        errCode: 'E_NOT_SUPPORTED',
                        message: i18n.__('actionNotSupported'),
                        context: requestArgs
                    })
            }
        }
        catch (previous) {
            return Promise.reject({
                errCode: "E_UNEXPECTED",
                message: "The plugin encountered a fatal error",
                previous
            })
        }
    }
    return Promise.reject({
        errCode: 'E_INVALID_SCHEMA',
        message: i18n.__('invalidSchema')
    })
}

const getNameFromPluginManifest = (packageJsonAbspath: string): string => {
    try {
        return `${require(packageJsonAbspath).name}`
    }
    catch (_) {
        return generateName().dashed
    }
}

const inferPluginName = (stack: ReturnType<typeof get>): () => string => {
    // The definer function can provide a name for the plugin in its schema, or it
    // can omit it and we infer it from the package.json file.
    // To do so, we need to get the directory for the plugin from the call stack
    const pluginManifest = stack.reduce(
        (retval: null|string, callsite) => {
            const callerFile = callsite.getFileName()
            return retval || (
                callerFile.includes('taqueria-sdk') || 
                callerFile.includes('taqueria-node-sdk') ||
                callerFile.includes('@taqueria/node-sdk')
            )
                ? retval
                : join(dirname(callerFile), 'package.json')
        },
        null
    )

    return () =>
        !pluginManifest
            ? generateName().dashed
            : getNameFromPluginManifest(pluginManifest)
}

export const Plugin = {
    create: (definer: pluginDefiner, unparsedArgs: Args) => {
        const stack = get()
        return parseArgs(unparsedArgs)
        .then(getResponse(definer, inferPluginName(stack)))
        .catch((err: unknown) => {
            if (err) console.error(err)
            process.exit(1)
        })
    }
}

const {Task, Option, PositionalArg, Operation} = Protocol

export {
    Protocol,
    Task,
    Option,
    PositionalArg,
    Operation
}