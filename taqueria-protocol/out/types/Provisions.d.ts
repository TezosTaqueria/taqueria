import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Provisions } from '@taqueria/protocol/types';
import { Provisions as ProvisionsStrict } from '@taqueria/protocol/out/types-strict';
export type { ProvisionsStrict as Provisions };
export declare const from: (input: unknown) => ProvisionsStrict;
export declare const create: (input: Provisions) => ProvisionsStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, ProvisionsStrict>;
export declare const make: (input: Omit<ProvisionsStrict, '__type'>) => FutureInstance<TaqError, ProvisionsStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodString;
        plugin: import("zod").ZodString;
        operation: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodLiteral<"custom">]>;
        command: import("zod").ZodOptional<import("zod").ZodString>;
        label: import("zod").ZodOptional<import("zod").ZodString>;
        depends_on: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        command?: string | undefined;
        label?: string | undefined;
        depends_on?: string[] | undefined;
        plugin: string;
        operation: string;
        id: string;
    }, {
        command?: string | undefined;
        label?: string | undefined;
        depends_on?: string[] | undefined;
        plugin: string;
        operation: string;
        id: string;
    }>, "many">;
    schema: import("zod").ZodEffects<import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodString;
        plugin: import("zod").ZodString;
        operation: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodLiteral<"custom">]>;
        command: import("zod").ZodOptional<import("zod").ZodString>;
        label: import("zod").ZodOptional<import("zod").ZodString>;
        depends_on: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        command?: string | undefined;
        label?: string | undefined;
        depends_on?: string[] | undefined;
        plugin: string;
        operation: string;
        id: string;
    }, {
        command?: string | undefined;
        label?: string | undefined;
        depends_on?: string[] | undefined;
        plugin: string;
        operation: string;
        id: string;
    }>, "many">, ProvisionsStrict, {
        command?: string | undefined;
        label?: string | undefined;
        depends_on?: string[] | undefined;
        plugin: string;
        operation: string;
        id: string;
    }[]>;
};
export declare const rawSchema: import("zod").ZodArray<import("zod").ZodObject<{
    id: import("zod").ZodString;
    plugin: import("zod").ZodString;
    operation: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodLiteral<"custom">]>;
    command: import("zod").ZodOptional<import("zod").ZodString>;
    label: import("zod").ZodOptional<import("zod").ZodString>;
    depends_on: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    command?: string | undefined;
    label?: string | undefined;
    depends_on?: string[] | undefined;
    plugin: string;
    operation: string;
    id: string;
}, {
    command?: string | undefined;
    label?: string | undefined;
    depends_on?: string[] | undefined;
    plugin: string;
    operation: string;
    id: string;
}>, "many">;
export declare const internalSchema: import("zod").ZodArray<import("zod").ZodObject<{
    id: import("zod").ZodString;
    plugin: import("zod").ZodString;
    operation: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodLiteral<"custom">]>;
    command: import("zod").ZodOptional<import("zod").ZodString>;
    label: import("zod").ZodOptional<import("zod").ZodString>;
    depends_on: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    command?: string | undefined;
    label?: string | undefined;
    depends_on?: string[] | undefined;
    plugin: string;
    operation: string;
    id: string;
}, {
    command?: string | undefined;
    label?: string | undefined;
    depends_on?: string[] | undefined;
    plugin: string;
    operation: string;
    id: string;
}>, "many">;
export type t = ProvisionsStrict;
//# sourceMappingURL=Provisions.d.ts.map