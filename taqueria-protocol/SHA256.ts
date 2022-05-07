import {z} from 'zod'
import {TextEncoder} from "util"

export const schema = z.string({description: "SHA256"}).length(64)
export const rawSchema = schema

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