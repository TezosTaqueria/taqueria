import {z} from 'zod'

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

export const make = (value: string) => schema.parse(value)

export const toComponents = (url: Url) => {
    const parts = new URL(url)
    return parts
}