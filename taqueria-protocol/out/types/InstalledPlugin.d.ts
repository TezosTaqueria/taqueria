import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { InstalledPlugin } from '@taqueria/protocol/types';
import { InstalledPlugin as InstalledPluginStrict } from '@taqueria/protocol/out/types-strict';
export type { InstalledPluginStrict as InstalledPlugin };
export declare const from: (input: unknown) => InstalledPluginStrict;
export declare const create: (input: InstalledPlugin) => InstalledPluginStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, InstalledPluginStrict>;
export declare const make: (input: Omit<InstalledPluginStrict, '__type'>) => FutureInstance<TaqError, InstalledPluginStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
        name: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        type: "npm" | "binary" | "deno";
        name: string;
    }, {
        type: "npm" | "binary" | "deno";
        name: string;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
        name: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        type: "npm" | "binary" | "deno";
        name: string;
    }, {
        type: "npm" | "binary" | "deno";
        name: string;
    }>, InstalledPluginStrict, {
        type: "npm" | "binary" | "deno";
        name: string;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
    name: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    type: "npm" | "binary" | "deno";
    name: string;
}, {
    type: "npm" | "binary" | "deno";
    name: string;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
    name: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    type: "npm" | "binary" | "deno";
    name: string;
}, {
    type: "npm" | "binary" | "deno";
    name: string;
}>;
export type t = InstalledPluginStrict;
//# sourceMappingURL=InstalledPlugin.d.ts.map