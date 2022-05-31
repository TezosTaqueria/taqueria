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

export type TaqVsxError = {
    readonly kind: TaqVsxErrorType
    previous?: TaqVsxError | TaqError | Error | unknown
    context?: string
    msg: string
}

export type t = TaqVsxError

export class E_TaqVsxError extends Error {
  readonly context
  readonly kind
  readonly previous
  constructor(taqVsxErr: TaqVsxError) {
      super(taqVsxErr.msg)
      this.context = taqVsxErr.context
      this.kind = taqVsxErr.kind
      this.name = this.kind
      this.previous = taqVsxErr.previous
  }
}

export const create = (err: TaqVsxError) => err