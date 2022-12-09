import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Settings } from '@taqueria/protocol/types';
import { Settings as SettingsStrict } from '@taqueria/protocol/out/types-strict';
export type { SettingsStrict as Settings };
export declare const from: (input: unknown) => SettingsStrict;
export declare const create: (input: Settings) => SettingsStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, SettingsStrict>;
export declare const make: (input: Omit<SettingsStrict, '__type'>) => FutureInstance<TaqError, SettingsStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        consent: import("zod").ZodUnion<[import("zod").ZodLiteral<"opt_in">, import("zod").ZodLiteral<"opt_out">]>;
    }, "strip", import("zod").ZodTypeAny, {
        consent: "opt_in" | "opt_out";
    }, {
        consent: "opt_in" | "opt_out";
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        consent: import("zod").ZodUnion<[import("zod").ZodLiteral<"opt_in">, import("zod").ZodLiteral<"opt_out">]>;
    }, "strip", import("zod").ZodTypeAny, {
        consent: "opt_in" | "opt_out";
    }, {
        consent: "opt_in" | "opt_out";
    }>, SettingsStrict, {
        consent: "opt_in" | "opt_out";
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    consent: import("zod").ZodUnion<[import("zod").ZodLiteral<"opt_in">, import("zod").ZodLiteral<"opt_out">]>;
}, "strip", import("zod").ZodTypeAny, {
    consent: "opt_in" | "opt_out";
}, {
    consent: "opt_in" | "opt_out";
}>;
export declare const internalSchema: import("zod").ZodObject<{
    consent: import("zod").ZodUnion<[import("zod").ZodLiteral<"opt_in">, import("zod").ZodLiteral<"opt_out">]>;
}, "strip", import("zod").ZodTypeAny, {
    consent: "opt_in" | "opt_out";
}, {
    consent: "opt_in" | "opt_out";
}>;
export type t = SettingsStrict;
//# sourceMappingURL=Settings.d.ts.map