import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Provisioner } from '@taqueria/protocol/types';
import { Provisioner as ProvisionerStrict } from '@taqueria/protocol/out/types-strict';
export type { ProvisionerStrict as Provisioner };
export declare const from: (input: unknown) => ProvisionerStrict;
export declare const create: (input: Provisioner) => ProvisionerStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, ProvisionerStrict>;
export declare const make: (input: Omit<ProvisionerStrict, '__type'>) => FutureInstance<TaqError, ProvisionerStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
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
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
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
    }>, ProvisionerStrict, {
        command?: string | undefined;
        label?: string | undefined;
        depends_on?: string[] | undefined;
        plugin: string;
        operation: string;
        id: string;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
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
}>;
export declare const internalSchema: import("zod").ZodObject<{
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
}>;
export type t = ProvisionerStrict;
//# sourceMappingURL=Provisioner.d.ts.map