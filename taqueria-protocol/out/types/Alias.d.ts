import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Alias } from '@taqueria/protocol/types';
import { Alias as AliasStrict } from '@taqueria/protocol/out/types-strict';
export type { AliasStrict as Alias };
export declare const from: (input: unknown) => AliasStrict;
export declare const create: (input: Alias) => AliasStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, AliasStrict>;
export declare const make: (input: Omit<AliasStrict, '__type'>) => FutureInstance<TaqError, AliasStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>;
    schema: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>, ({
        __type: AliasStrict;
    } & {
        __type: import("@taqueria/protocol/out/types-strict").SingleChar;
    } & {
        __type: import("@taqueria/protocol/out/types-strict").NonEmptyString;
    } & string) | ({
        __type: AliasStrict;
    } & {
        __type: import("@taqueria/protocol/out/types-strict").Verb;
    } & {
        __type: import("@taqueria/protocol/out/types-strict").NonEmptyString;
    } & string), string>;
};
export declare const rawSchema: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>;
export declare const internalSchema: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>;
export type t = AliasStrict;
//# sourceMappingURL=Alias.d.ts.map