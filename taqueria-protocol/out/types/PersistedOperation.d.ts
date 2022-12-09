import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PersistedOperation } from '@taqueria/protocol/types';
import { PersistedOperation as PersistedOperationStrict } from '@taqueria/protocol/out/types-strict';
export type { PersistedOperationStrict as PersistedOperation };
export declare const from: (input: unknown) => PersistedOperationStrict;
export declare const create: (input: PersistedOperation) => PersistedOperationStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PersistedOperationStrict>;
export declare const make: (input: Omit<PersistedOperationStrict, '__type'>) => FutureInstance<TaqError, PersistedOperationStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        hash: import("zod").ZodString;
        time: import("zod").ZodNumber;
        output: import("zod").ZodOptional<import("zod").ZodUnknown>;
    }, "strip", import("zod").ZodTypeAny, {
        output?: unknown;
        hash: string;
        time: number;
    }, {
        output?: unknown;
        hash: string;
        time: number;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        hash: import("zod").ZodString;
        time: import("zod").ZodNumber;
        output: import("zod").ZodOptional<import("zod").ZodUnknown>;
    }, "strip", import("zod").ZodTypeAny, {
        output?: unknown;
        hash: string;
        time: number;
    }, {
        output?: unknown;
        hash: string;
        time: number;
    }>, PersistedOperationStrict, {
        output?: unknown;
        hash: string;
        time: number;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    hash: import("zod").ZodString;
    time: import("zod").ZodNumber;
    output: import("zod").ZodOptional<import("zod").ZodUnknown>;
}, "strip", import("zod").ZodTypeAny, {
    output?: unknown;
    hash: string;
    time: number;
}, {
    output?: unknown;
    hash: string;
    time: number;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    hash: import("zod").ZodString;
    time: import("zod").ZodNumber;
    output: import("zod").ZodOptional<import("zod").ZodUnknown>;
}, "strip", import("zod").ZodTypeAny, {
    output?: unknown;
    hash: string;
    time: number;
}, {
    output?: unknown;
    hash: string;
    time: number;
}>;
export type t = PersistedOperationStrict;
//# sourceMappingURL=PersistedOperation.d.ts.map