import {ZodError} from "zod"
import {reject, map} from "fluture"

export type ErrorType = 
  | "E_INVALID_PATH_DOES_NOT_EXIST"
  | "E_INVALID_PATH_ALREADY_EXISTS"
  | "E_INVALID_CONFIG"
  | "E_INVALID_JSON"
  | "E_FORK"
  | "E_INVALID_TASK"
  | "E_READFILE"
  | "E_NPM_INIT"
  | "E_INVALID_PLUGIN_RESPONSE"
  | "E_INVALID_ARGS"
  | "E_MKDIR_FAILED"
  | "E_GIT_CLONE_FAILED"
  | "E_PROVISION"
  | "E_PARSE"
  | "E_PARSE_UNKNOWN"
  | "E_INVALID_ARCH"
  
export interface TaqError {
    readonly kind: ErrorType,
    msg: string,
    previous?: TaqError | Error | unknown
    context?: unknown
}

export type t = TaqError


export class E_TaqError extends Error {
  readonly context
  readonly kind
  readonly previous
  constructor(taqErr: TaqError) {
      super(taqErr.msg)
      this.context = taqErr.context
      this.kind = taqErr.kind
      this.name = this.kind
      this.previous = taqErr.previous
  }
}

export const toParseErr = <T>(previous: ZodError, msg: string, context?: unknown)  => {
  const taqErr: TaqError = {
    kind: "E_PARSE",
    msg: msg,
    context,
    previous
  }
  return reject(taqErr).pipe(map((val: unknown) => val as T))
}

export const toParseUnknownErr = <T>(previous: Error|TaqError|E_TaqError|unknown, msg: string, context?: unknown) => {
  const taqErr: TaqError = {
    kind: "E_PARSE_UNKNOWN",
    msg: msg,
    context,
    previous
  }
  return reject(taqErr).pipe(map((val: unknown) => val as T))
}

export const create = (err: TaqError) => err