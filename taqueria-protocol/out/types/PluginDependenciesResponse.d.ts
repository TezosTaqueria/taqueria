import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PluginDependenciesResponse } from '@taqueria/protocol/types';
import { PluginDependenciesResponse as PluginDependenciesResponseStrict } from '@taqueria/protocol/out/types-strict';
export type { PluginDependenciesResponseStrict as PluginDependenciesResponse };
export declare const from: (input: unknown) => PluginDependenciesResponseStrict;
export declare const create: (input: PluginDependenciesResponse) => PluginDependenciesResponseStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PluginDependenciesResponseStrict>;
export declare const make: (input: Omit<PluginDependenciesResponseStrict, '__type'>) => FutureInstance<TaqError, PluginDependenciesResponseStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        report: import("zod").ZodArray<import("zod").ZodObject<import("zod").extendShape<{
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
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }, {
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        report: import("zod").ZodArray<import("zod").ZodObject<import("zod").extendShape<{
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
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }, {
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }>, PluginDependenciesResponseStrict, {
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    report: import("zod").ZodArray<import("zod").ZodObject<import("zod").extendShape<{
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
    }>, "many">;
}, "strip", import("zod").ZodTypeAny, {
    report: {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }[];
}, {
    report: {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }[];
}>;
export declare const internalSchema: import("zod").ZodObject<{
    report: import("zod").ZodArray<import("zod").ZodObject<import("zod").extendShape<{
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
    }>, "many">;
}, "strip", import("zod").ZodTypeAny, {
    report: {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }[];
}, {
    report: {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }[];
}>;
export type t = PluginDependenciesResponseStrict;
//# sourceMappingURL=PluginDependenciesResponse.d.ts.map