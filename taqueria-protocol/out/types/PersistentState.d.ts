import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PersistentState } from '@taqueria/protocol/types';
import { PersistentState as PersistentStateStrict } from '@taqueria/protocol/out/types-strict';
export type { PersistentStateStrict as PersistentState };
export declare const from: (input: unknown) => PersistentStateStrict;
export declare const create: (input: PersistentState) => PersistentStateStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PersistentStateStrict>;
export declare const make: (input: Omit<PersistentStateStrict, '__type'>) => FutureInstance<TaqError, PersistentStateStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        operations: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
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
        }>>;
        tasks: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
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
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }, {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        operations: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
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
        }>>;
        tasks: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
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
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }, {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }>, PersistentStateStrict, {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    operations: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
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
    }>>;
    tasks: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
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
    }>>;
}, "strip", import("zod").ZodTypeAny, {
    operations: Record<string, {
        output?: unknown;
        hash: string;
        time: number;
    }>;
    tasks: Record<string, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }>;
}, {
    operations: Record<string, {
        output?: unknown;
        hash: string;
        time: number;
    }>;
    tasks: Record<string, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }>;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    operations: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
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
    }>>;
    tasks: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
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
    }>>;
}, "strip", import("zod").ZodTypeAny, {
    operations: Record<string, {
        output?: unknown;
        hash: string;
        time: number;
    }>;
    tasks: Record<string, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }>;
}, {
    operations: Record<string, {
        output?: unknown;
        hash: string;
        time: number;
    }>;
    tasks: Record<string, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }>;
}>;
export type t = PersistentStateStrict;
//# sourceMappingURL=PersistentState.d.ts.map