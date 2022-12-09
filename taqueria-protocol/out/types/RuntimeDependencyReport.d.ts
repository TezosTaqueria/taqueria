import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { RuntimeDependencyReport } from '@taqueria/protocol/types';
import { RuntimeDependencyReport as RuntimeDependencyReportStrict } from '@taqueria/protocol/out/types-strict';
export type { RuntimeDependencyReportStrict as RuntimeDependencyReport };
export declare const from: (input: unknown) => RuntimeDependencyReportStrict;
export declare const create: (input: RuntimeDependencyReport) => RuntimeDependencyReportStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, RuntimeDependencyReportStrict>;
export declare const make: (input: Omit<RuntimeDependencyReportStrict, '__type'>) => FutureInstance<TaqError, RuntimeDependencyReportStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<import("zod").extendShape<{
        name: import("zod").ZodString;
        path: import("zod").ZodString;
        version: import("zod").ZodString;
        kind: import("zod").ZodUnion<[import("zod").ZodLiteral<"required">, import("zod").ZodLiteral<"optional">]>;
    }, {
        met: import("zod").ZodBoolean;
    }>, "strip", import("zod").ZodTypeAny, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<import("zod").extendShape<{
        name: import("zod").ZodString;
        path: import("zod").ZodString;
        version: import("zod").ZodString;
        kind: import("zod").ZodUnion<[import("zod").ZodLiteral<"required">, import("zod").ZodLiteral<"optional">]>;
    }, {
        met: import("zod").ZodBoolean;
    }>, "strip", import("zod").ZodTypeAny, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }>, RuntimeDependencyReportStrict, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<import("zod").extendShape<{
    name: import("zod").ZodString;
    path: import("zod").ZodString;
    version: import("zod").ZodString;
    kind: import("zod").ZodUnion<[import("zod").ZodLiteral<"required">, import("zod").ZodLiteral<"optional">]>;
}, {
    met: import("zod").ZodBoolean;
}>, "strip", import("zod").ZodTypeAny, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
    met: boolean;
}, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
    met: boolean;
}>;
export declare const internalSchema: import("zod").ZodObject<import("zod").extendShape<{
    name: import("zod").ZodString;
    path: import("zod").ZodString;
    version: import("zod").ZodString;
    kind: import("zod").ZodUnion<[import("zod").ZodLiteral<"required">, import("zod").ZodLiteral<"optional">]>;
}, {
    met: import("zod").ZodBoolean;
}>, "strip", import("zod").ZodTypeAny, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
    met: boolean;
}, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
    met: boolean;
}>;
export type t = RuntimeDependencyReportStrict;
//# sourceMappingURL=RuntimeDependencyReport.d.ts.map