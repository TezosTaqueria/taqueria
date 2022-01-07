import type {Future, reject, resolve, TaqError} from './taqueria-utils-types.ts'
import Url from './url.ts'
import memoizy from "https://deno.land/x/memoizy@1.0.0/fp.ts"
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {fork, attemptP, map, Future as Fluture} from 'https://cdn.skypack.dev/fluture';
import JSON from "https://deno.land/x/json5/mod.ts";
import {join as _joinPaths} from 'https://deno.land/std@0.115.1/path/mod.ts'
import {render} from 'https://deno.land/x/eta@v1.12.3/mod.ts'

export const decodeJson = (encoded: string) => Fluture((rej: reject, res:resolve) => {
    try {
        const data = JSON.parse(encoded)
        res(data)
    } catch (err) {
        rej({kind: "E_INVALID_JSON", msg: "TODO, should this use i18n?", previous: err})
    }
    return () => {}
})

export const log = <T>(message: string) => (input: T) : T => {
    console.log(message)
    console.log(input)
    return input
}

const mkdirFuture = (path: string): Future<TaqError, void> => attemptP(() => Deno.mkdir(path, {recursive: true}))

export const mkdir = (path: string) : Future<TaqError, string> => pipe(path, mkdirFuture, map (() => path))

export const readFile = (path: string) => Fluture(
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

export const writeTextFile = (path: string, data: string) => Fluture(
    (rej: reject, res: resolve) => {
        Deno.writeTextFile(path, data).then(() => res(path)).catch(rej)
        return () => {}
    }
        
)

export const isTaqError = (err: unknown) : err is TaqError => {
    return (err as TaqError).kind !== undefined
}

export const isUrl = (input:string) => fork (() => false) (() => true) (Url.make(input))

export const memoize = memoizy({})

export const joinPaths = _joinPaths

export const renderTemplate = (template: string, values: Record<string, unknown>): string => render(template, values) as string