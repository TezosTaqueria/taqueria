import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Url } from '@taqueria/protocol/types';
import { Url as UrlStrict } from '@taqueria/protocol/out/types-strict';
export type { UrlStrict as Url };
export declare const from: (input: unknown) => UrlStrict;
export declare const create: (input: Url) => UrlStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, UrlStrict>;
export declare const make: (input: Omit<UrlStrict, '__type'>) => FutureInstance<TaqError, UrlStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, UrlStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = UrlStrict;
//# sourceMappingURL=Url.d.ts.map