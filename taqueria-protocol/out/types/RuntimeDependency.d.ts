import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { RuntimeDependency } from '@taqueria/protocol/types';
import { RuntimeDependency as RuntimeDependencyStrict } from '@taqueria/protocol/out/types-strict';
export type { RuntimeDependencyStrict as RuntimeDependency };
export declare const from: (input: unknown) => RuntimeDependencyStrict;
export declare const create: (input: RuntimeDependency) => RuntimeDependencyStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, RuntimeDependencyStrict>;
export declare const make: (input: Omit<RuntimeDependencyStrict, '__type'>) => FutureInstance<TaqError, RuntimeDependencyStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        name: import("zod").ZodString;
        path: import("zod").ZodString;
        version: import("zod").ZodString;
        kind: import("zod").ZodUnion<[import("zod").ZodLiteral<"required">, import("zod").ZodLiteral<"optional">]>;
    }, "strip", import("zod").ZodTypeAny, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
    }, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        name: import("zod").ZodString;
        path: import("zod").ZodString;
        version: import("zod").ZodString;
        kind: import("zod").ZodUnion<[import("zod").ZodLiteral<"required">, import("zod").ZodLiteral<"optional">]>;
    }, "strip", import("zod").ZodTypeAny, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
    }, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
    }>, RuntimeDependencyStrict, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    name: import("zod").ZodString;
    path: import("zod").ZodString;
    version: import("zod").ZodString;
    kind: import("zod").ZodUnion<[import("zod").ZodLiteral<"required">, import("zod").ZodLiteral<"optional">]>;
}, "strip", import("zod").ZodTypeAny, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
}, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
}>;
export declare const internalSchema: import("zod").ZodObject<{
    name: import("zod").ZodString;
    path: import("zod").ZodString;
    version: import("zod").ZodString;
    kind: import("zod").ZodUnion<[import("zod").ZodLiteral<"required">, import("zod").ZodLiteral<"optional">]>;
}, "strip", import("zod").ZodTypeAny, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
}, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
}>;
export type t = RuntimeDependencyStrict;
//# sourceMappingURL=RuntimeDependency.d.ts.map