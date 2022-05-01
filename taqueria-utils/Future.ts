import * as TaqError from './TaqError.ts'

import type {FutureInstance} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js'
export type Future<L,R> = FutureInstance<L,R>

export type t<L,R> = Future<L,R>

export type reject = (_err:TaqError.t|Error) => void

export type resolve = <T>(__: T) => void