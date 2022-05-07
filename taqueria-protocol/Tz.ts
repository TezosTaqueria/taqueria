import {z} from 'zod'

export const rawSchema = z.string({description: "Tz"}).nonempty().regex(/^\d([\d_]+\d)?$/)

export const schema = rawSchema.transform(val => val as Tz)

const tzType: unique symbol = Symbol("Tz")

type Input = z.infer<typeof rawSchema>

export type Tz = Input & {
    readonly [tzType]: void
}
export type t = Tz

export const make = (value: string) => schema.parse(value)