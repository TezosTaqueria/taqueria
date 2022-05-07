import {z} from 'zod'

export const rawSchema = z
    .string({description: "Verb"})
    .nonempty("Must be a valid verb")
    .regex(/^[A-Za-z\-\ ]+/, "Must be a valid verb")

export const schema = rawSchema.transform(val => val as Verb)    

const verbType: unique symbol = Symbol("Verb")

export type Verb = string & {
    readonly [verbType]: void
}

export type t = Verb

export const make = (value: string) => schema.parse(value)