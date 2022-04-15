import i18n from './i18n.ts'
import { run } from './cli.ts'

run(Deno.env, Deno.args, i18n)
