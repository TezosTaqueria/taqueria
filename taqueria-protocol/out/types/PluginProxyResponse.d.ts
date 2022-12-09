import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PluginProxyResponse } from '@taqueria/protocol/types';
import { PluginProxyResponse as PluginProxyResponseStrict } from '@taqueria/protocol/out/types-strict';
export type { PluginProxyResponseStrict as PluginProxyResponse };
export declare const from: (input: unknown) => PluginProxyResponseStrict;
export declare const create: (input: PluginProxyResponse) => PluginProxyResponseStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PluginProxyResponseStrict>;
export declare const make: (input: Omit<PluginProxyResponseStrict, '__type'>) => FutureInstance<TaqError, PluginProxyResponseStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodUnion<[import("zod").ZodVoid, import("zod").ZodUnion<[import("zod").ZodObject<{
        data: import("zod").ZodOptional<import("zod").ZodUnknown>;
        render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
    }, "strip", import("zod").ZodTypeAny, {
        data?: unknown;
        render: "string" | "none" | "table";
    }, {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>, import("zod").ZodVoid]>]>;
    schema: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodVoid, import("zod").ZodUnion<[import("zod").ZodObject<{
        data: import("zod").ZodOptional<import("zod").ZodUnknown>;
        render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
    }, "strip", import("zod").ZodTypeAny, {
        data?: unknown;
        render: "string" | "none" | "table";
    }, {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>, import("zod").ZodVoid]>]>, ({
        __type: PluginProxyResponseStrict;
    } & void) | ({
        __type: PluginProxyResponseStrict;
    } & {
        __type: import("@taqueria/protocol/out/types-strict").PluginJsonResponse;
    } & {
        data?: unknown;
        render: "string" | "none" | "table";
    }), void | {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>;
};
export declare const rawSchema: import("zod").ZodUnion<[import("zod").ZodVoid, import("zod").ZodUnion<[import("zod").ZodObject<{
    data: import("zod").ZodOptional<import("zod").ZodUnknown>;
    render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
}, "strip", import("zod").ZodTypeAny, {
    data?: unknown;
    render: "string" | "none" | "table";
}, {
    data?: unknown;
    render?: "string" | "none" | "table" | undefined;
}>, import("zod").ZodVoid]>]>;
export declare const internalSchema: import("zod").ZodUnion<[import("zod").ZodVoid, import("zod").ZodUnion<[import("zod").ZodObject<{
    data: import("zod").ZodOptional<import("zod").ZodUnknown>;
    render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
}, "strip", import("zod").ZodTypeAny, {
    data?: unknown;
    render: "string" | "none" | "table";
}, {
    data?: unknown;
    render?: "string" | "none" | "table" | undefined;
}>, import("zod").ZodVoid]>]>;
export type t = PluginProxyResponseStrict;
//# sourceMappingURL=PluginProxyResponse.d.ts.map