import load from '@taqueria/protocol/i18n'
import {run} from './cli.ts'

const i18n = await load()

run(Deno.env, Deno.args, i18n)