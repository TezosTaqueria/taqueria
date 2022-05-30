import { TaqError } from "@taqueria/protocol/TaqError"

export type TaqVsxErrorType = 
    "E_PROXY" |
    "E_TAQ_NOT_FOUND" |
    "E_INVALID_DIR" |
    "E_INVALID_FILE" |
    "E_NOT_TAQIFIED" |
    "E_INVALID_JSON" |
    "E_STATE_MISSING" |
    "E_EXEC" |
    "E_NO_TAQUERIA_PROJECTS" |
    "E_WINDOWS"

export type TaqVsxErrorBase = {
    previous?: TaqVsxError | TaqError | Error | unknown
    context?: unknown
    msg: string,
}

export type TaqVsxCommandError = {
    readonly kind: "E_EXEC" | "E_PROXY",
    cmd: string
}

export type TaqVsxPathError = {
    readonly kind: "E_TAQ_NOT_FOUND" | "E_INVALID_DIR" | "E_INVALID_FILE" | "E_NOT_TAQIFIED"
    pathProvided: string
}

export type TaqVsxDataError = {
    readonly kind: "E_INVALID_JSON"
    data: string
}

export type TaqVsxStateError = {
    readonly kind: "E_STATE_MISSING"
    taqifiedDir: string
}

export type TaqVsxError = TaqVsxErrorBase & (TaqVsxCommandError | TaqVsxPathError | TaqVsxDataError | TaqVsxStateError | {
    readonly kind: Exclude<TaqVsxErrorType, "E_EXEC" | "E_PROXY" | "E_TAQ_NOT_FOUND" | "E_INVALID_DIR" | "E_INVALID_FILE" | "E_NOT_TAQIFIED" | "E_INVALID_JSON" | "E_STATE_MISSING">,
})

export type t = TaqVsxError


export class E_TaqVsxError extends Error {
  readonly context
  readonly kind
  readonly previous
  readonly command
  readonly pathProvided
  readonly data
  readonly taqifiedDir
  constructor(taqVsxErr: TaqVsxError) {
      super(taqVsxErr.msg)
      this.context = taqVsxErr.context
      this.kind = taqVsxErr.kind
      this.name = this.kind
      this.command = (taqVsxErr as TaqVsxCommandError)?.cmd
      this.pathProvided = (taqVsxErr as TaqVsxPathError)?.pathProvided
      this.data = (taqVsxErr as TaqVsxDataError)?.data
      this.taqifiedDir = (taqVsxErr as TaqVsxStateError)?.taqifiedDir
      this.previous = taqVsxErr.previous
  }
}

export const create = (err: TaqVsxError) => err