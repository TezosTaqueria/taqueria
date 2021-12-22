import {resolve, reject} from 'https://cdn.skypack.dev/fluture';

export type Url = string & {kind: "url"}

export const make = (input:string) => 
    /^(\.|http)/.test(input)
    ? resolve(input as Url)
    : reject({kind: 'E_INVALID_URL', msg: 'TODO - translate'})

export const view = (url: Url) : string => url as string

export default {
    make,
    view
}