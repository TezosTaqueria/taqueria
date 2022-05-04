import {z} from 'zod'

export const rawSchema = z.object({
    networks: z.array(z.string().nonempty()),
    sandboxes: z.array(z.string().nonempty()),
    storage: z.record(z.any()).optional()
})

export const schema = rawSchema.transform(val => val as Environment)

const envType: unique symbol = Symbol("Environment")

type Input = z.infer<typeof rawSchema>

export type Environment = Input & {
    readonly [envType]: void
}

export type t = Environment

export const make = (data: Input) => schema.parse(data)