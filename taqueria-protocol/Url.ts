// @ts-ignore see above
import {z} from 'zod'
// @ts-ignore see above
import {urlParse} from './url-parse.ts'

type URL = ReturnType<typeof urlParse>

const urlType: unique symbol = Symbol('Url')

const urlSchema = z
    .string()
    .url()

export const schema = urlSchema.transform(val => val as Url)

type Input = z.infer<typeof urlSchema>    

export type Url =  Input & {
    readonly [urlType]: void
}

export type t = Url

export const make = (value: string) => schema.parse(value)

export const toComponents = (url: Url) => urlParse(url)