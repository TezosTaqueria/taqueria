import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Option } from '@taqueria/protocol/types';
import { Option as OptionStrict } from '@taqueria/protocol/out/types-strict';
export type { OptionStrict as Option };
export declare const from: (input: unknown) => OptionStrict;
export declare const create: (input: Option) => OptionStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, OptionStrict>;
export declare const make: (input: Omit<OptionStrict, '__type'>) => FutureInstance<TaqError, OptionStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
        flag: import("zod").ZodString;
        description: import("zod").ZodString;
        defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
        type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
        choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
        flag: import("zod").ZodString;
        description: import("zod").ZodString;
        defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
        type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
        choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }>, OptionStrict, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
    flag: import("zod").ZodString;
    description: import("zod").ZodString;
    defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
    type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
    choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    boolean?: boolean | undefined;
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    shortFlag?: string | undefined;
    defaultValue?: string | number | boolean | undefined;
    choices?: string[] | undefined;
    description: string;
    flag: string;
}, {
    boolean?: boolean | undefined;
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    shortFlag?: string | undefined;
    defaultValue?: string | number | boolean | undefined;
    choices?: string[] | undefined;
    description: string;
    flag: string;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
    flag: import("zod").ZodString;
    description: import("zod").ZodString;
    defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
    type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
    choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    boolean?: boolean | undefined;
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    shortFlag?: string | undefined;
    defaultValue?: string | number | boolean | undefined;
    choices?: string[] | undefined;
    description: string;
    flag: string;
}, {
    boolean?: boolean | undefined;
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    shortFlag?: string | undefined;
    defaultValue?: string | number | boolean | undefined;
    choices?: string[] | undefined;
    description: string;
    flag: string;
}>;
export type t = OptionStrict;
//# sourceMappingURL=Option.d.ts.map