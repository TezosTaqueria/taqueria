import {z} from 'zod'

export const rawSchema = z
    .string({description: "Command"})
    .regex(/^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$/, "Must be a command that can be interpreted using yargs")

export const schema = rawSchema.transform(val => val as t)

const commandType: unique symbol = Symbol("Command")

export type t = string & {
    readonly [commandType]: void
}

export type Command = t

export const make = (value: string) => schema.parse(value)
