import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PersistedTask } from '@taqueria/protocol/types';
import { PersistedTask as PersistedTaskStrict } from '@taqueria/protocol/out/types-strict';
export type { PersistedTaskStrict as PersistedTask };
export declare const from: (input: unknown) => PersistedTaskStrict;
export declare const create: (input: PersistedTask) => PersistedTaskStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PersistedTaskStrict>;
export declare const make: (input: Omit<PersistedTaskStrict, '__type'>) => FutureInstance<TaqError, PersistedTaskStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        task: import("zod").ZodString;
        plugin: import("zod").ZodString;
        time: import("zod").ZodNumber;
        output: import("zod").ZodOptional<import("zod").ZodUnknown>;
    }, "strip", import("zod").ZodTypeAny, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        task: import("zod").ZodString;
        plugin: import("zod").ZodString;
        time: import("zod").ZodNumber;
        output: import("zod").ZodOptional<import("zod").ZodUnknown>;
    }, "strip", import("zod").ZodTypeAny, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }>, PersistedTaskStrict, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    task: import("zod").ZodString;
    plugin: import("zod").ZodString;
    time: import("zod").ZodNumber;
    output: import("zod").ZodOptional<import("zod").ZodUnknown>;
}, "strip", import("zod").ZodTypeAny, {
    output?: unknown;
    plugin: string;
    task: string;
    time: number;
}, {
    output?: unknown;
    plugin: string;
    task: string;
    time: number;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    task: import("zod").ZodString;
    plugin: import("zod").ZodString;
    time: import("zod").ZodNumber;
    output: import("zod").ZodOptional<import("zod").ZodUnknown>;
}, "strip", import("zod").ZodTypeAny, {
    output?: unknown;
    plugin: string;
    task: string;
    time: number;
}, {
    output?: unknown;
    plugin: string;
    task: string;
    time: number;
}>;
export type t = PersistedTaskStrict;
//# sourceMappingURL=PersistedTask.d.ts.map