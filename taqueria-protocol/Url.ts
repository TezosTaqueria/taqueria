import {z, ZodError} from 'zod'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

const urlType: unique symbol = Symbol('Url')

const urlSchema = z
    .string({description: "Url"})
    .url()

export const schema = urlSchema.transform(val => val as Url)

type Input = z.infer<typeof urlSchema>    

export type Url =  Input & {
    readonly [urlType]: void
}

export type t = Url

export const make = (value: string) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Url>(err, `${value} is not a valid url`, value)
        }
        return toParseUnknownErr<Url>(err, "There was a problem trying to parse the url", value)
    }
}

export const toComponents = (url: Url) => {
    const parts = new URL(url)
    return parts
}