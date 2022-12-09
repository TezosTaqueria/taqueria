import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { ScaffoldConfig } from '@taqueria/protocol/types';
import { ScaffoldConfig as ScaffoldConfigStrict } from '@taqueria/protocol/out/types-strict';
export type { ScaffoldConfigStrict as ScaffoldConfig };
export declare const from: (input: unknown) => ScaffoldConfigStrict;
export declare const create: (input: ScaffoldConfig) => ScaffoldConfigStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, ScaffoldConfigStrict>;
export declare const make: (input: Omit<ScaffoldConfigStrict, '__type'>) => FutureInstance<TaqError, ScaffoldConfigStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        postInit: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        postInit?: string | undefined;
    }, {
        postInit?: string | undefined;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        postInit: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        postInit?: string | undefined;
    }, {
        postInit?: string | undefined;
    }>, ScaffoldConfigStrict, {
        postInit?: string | undefined;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    postInit: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    postInit?: string | undefined;
}, {
    postInit?: string | undefined;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    postInit: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    postInit?: string | undefined;
}, {
    postInit?: string | undefined;
}>;
export type t = ScaffoldConfigStrict;
//# sourceMappingURL=ScaffoldConfig.d.ts.map