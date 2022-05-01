import * as Future from "./Future.ts"
import {attemptP} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js'
import * as TaqError from './TaqError.ts'

// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'

export const schema = z.string().length(64)

const sha256Type: unique symbol = Symbol("SHA256")

export type SHA256 = z.infer<typeof schema> & {
    readonly [sha256Type]: void
}

export type t = SHA256

export const make = (value: string) => schema.parse(value) as SHA256

export const of = async (value: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(value)
    const hash = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hash));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return make(hashHex)
}

export const futureOf = (value: string): Future.t<TaqError.t, SHA256> => {
    return attemptP(() => of(value).then(result => result ? result : Promise.reject({kind: "E_SHA256", message: "Could not create hash", context: value})))
}