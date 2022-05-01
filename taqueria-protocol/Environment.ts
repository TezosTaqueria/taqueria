// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'

export const rawSchema = z.object({
    networks: z.array(z.string().nonempty()),
    sandboxes: z.array(z.string().nonempty())
})

export const schema = rawSchema.transform(val => val as Environment)

const envType: unique symbol = Symbol("Environment")

type Input = z.infer<typeof rawSchema>

export type Environment = Input & {
    readonly [envType]: void
}

export type t = Environment

export const make = (data: Input) => schema.parse(data)