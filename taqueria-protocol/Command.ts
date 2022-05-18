import {z, ZodError} from 'zod'
import {resolve, reject, mapRej} from "fluture"
import {TaqError, toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

export const rawSchema = z
    .string({description: "Command"})
    .regex(/^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$/, "Must be a command that can be interpreted using yargs")

export const schema = rawSchema.transform(val => val as Command)

const commandType: unique symbol = Symbol("Command")

export type Command = string & {
    readonly [commandType]: void
}

export type t = Command

export const make = (value: string) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
            .pipe(mapRej(err => err as TaqError))
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Command>(err, `${value} is not a valid command`, value)
        }
        return toParseUnknownErr<Command>(err, 'There was a problem trying to parse the command', value)
    }
}

export const create = (value: string) => schema.parse(value)