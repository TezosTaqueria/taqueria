import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PluginJsonResponse } from '@taqueria/protocol/types';
import { PluginJsonResponse as PluginJsonResponseStrict } from '@taqueria/protocol/out/types-strict';
export type { PluginJsonResponseStrict as PluginJsonResponse };
export declare const from: (input: unknown) => PluginJsonResponseStrict;
export declare const create: (input: PluginJsonResponse) => PluginJsonResponseStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PluginJsonResponseStrict>;
export declare const make: (input: Omit<PluginJsonResponseStrict, '__type'>) => FutureInstance<TaqError, PluginJsonResponseStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodUnion<[import("zod").ZodObject<{
        data: import("zod").ZodOptional<import("zod").ZodUnknown>;
        render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
    }, "strip", import("zod").ZodTypeAny, {
        data?: unknown;
        render: "string" | "none" | "table";
    }, {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>, import("zod").ZodVoid]>;
    schema: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodObject<{
        data: import("zod").ZodOptional<import("zod").ZodUnknown>;
        render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
    }, "strip", import("zod").ZodTypeAny, {
        data?: unknown;
        render: "string" | "none" | "table";
    }, {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>, import("zod").ZodVoid]>, void | ({
        __type: PluginJsonResponseStrict;
    } & {
        data?: unknown;
        render: "string" | "none" | "table";
    }), void | {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>;
};
export declare const rawSchema: import("zod").ZodUnion<[import("zod").ZodObject<{
    data: import("zod").ZodOptional<import("zod").ZodUnknown>;
    render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
}, "strip", import("zod").ZodTypeAny, {
    data?: unknown;
    render: "string" | "none" | "table";
}, {
    data?: unknown;
    render?: "string" | "none" | "table" | undefined;
}>, import("zod").ZodVoid]>;
export declare const internalSchema: import("zod").ZodUnion<[import("zod").ZodObject<{
    data: import("zod").ZodOptional<import("zod").ZodUnknown>;
    render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
}, "strip", import("zod").ZodTypeAny, {
    data?: unknown;
    render: "string" | "none" | "table";
}, {
    data?: unknown;
    render?: "string" | "none" | "table" | undefined;
}>, import("zod").ZodVoid]>;
export type t = PluginJsonResponseStrict;
//# sourceMappingURL=PluginJsonResponse.d.ts.map