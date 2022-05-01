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
  | "GIT_CLONE_FAILED"
  
export interface TaqError {
    readonly kind: ErrorType,
    msg: string,
    previous?: TaqError | Error
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