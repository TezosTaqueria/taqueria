import {z, ZodError} from 'zod'
import {FutureInstance as Future, resolve, promise, mapRej} from "fluture"
import {TaqError, E_TaqError, toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import {TextEncoder} from "util"
import {Crypto} from "@peculiar/webcrypto"

const eager = <T>(f: Future<TaqError, T>) => promise (
    mapRej ((err: TaqError) => new E_TaqError(err))
    (f)
)


export const schema = z.string({description: "SHA256"}).length(64)
export const rawSchema = schema

const sha256Type: unique symbol = Symbol("SHA256")

export type SHA256 = z.infer<typeof schema> & {
    readonly [sha256Type]: void
}

export type t = SHA256

export const make = (value: string) => {
    try {
        const retval = schema.parse(value) as SHA256
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<SHA256>(err, `${value} is not a valid SHA-256 hash`, value)
        }
        return toParseUnknownErr<SHA256>(err, "There was a problem trying to parse the SHA-256 hash", value)
    }
}

export const of = async (value: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(value)
    const crypto = new Crypto()
    const hash = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hash));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return eager (make(hashHex))
}