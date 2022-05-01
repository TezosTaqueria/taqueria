// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'

export const rawSchema = z.string().nonempty().regex(/^\d+[\d_]*(_\d+)?$/)

export const schema = rawSchema.transform(val => val as Tz)

const tzType: unique symbol = Symbol("Tz")

type Input = z.infer<typeof rawSchema>

export type Tz = Input & {
    readonly [tzType]: void
}
export type t = Tz

export const make = (value: string) => schema.parse(value)