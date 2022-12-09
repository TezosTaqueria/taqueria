import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PluginResponseEncoding } from '@taqueria/protocol/types';
import { PluginResponseEncoding as PluginResponseEncodingStrict } from '@taqueria/protocol/out/types-strict';
export type { PluginResponseEncodingStrict as PluginResponseEncoding };
export declare const from: (input: unknown) => PluginResponseEncodingStrict;
export declare const create: (input: PluginResponseEncoding) => PluginResponseEncodingStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PluginResponseEncodingStrict>;
export declare const make: (input: Omit<PluginResponseEncodingStrict, '__type'>) => FutureInstance<TaqError, PluginResponseEncodingStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>;
    schema: import("zod").ZodEffects<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>, ({
        __type: PluginResponseEncodingStrict;
    } & "none") | ({
        __type: PluginResponseEncodingStrict;
    } & "json") | ({
        __type: PluginResponseEncodingStrict;
    } & "application/json"), "none" | "json" | "application/json" | undefined>;
};
export declare const rawSchema: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>;
export declare const internalSchema: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>;
export type t = PluginResponseEncodingStrict;
//# sourceMappingURL=PluginResponseEncoding.d.ts.map