import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PositionalArg } from '@taqueria/protocol/types';
import { PositionalArg as PositionalArgStrict } from '@taqueria/protocol/out/types-strict';
export type { PositionalArgStrict as PositionalArg };
export declare const from: (input: unknown) => PositionalArgStrict;
export declare const create: (input: PositionalArg) => PositionalArgStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PositionalArgStrict>;
export declare const make: (input: Omit<PositionalArgStrict, '__type'>) => FutureInstance<TaqError, PositionalArgStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        placeholder: import("zod").ZodString;
        description: import("zod").ZodString;
        defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
        type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        placeholder: import("zod").ZodString;
        description: import("zod").ZodString;
        defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
        type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }>, PositionalArgStrict, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    placeholder: import("zod").ZodString;
    description: import("zod").ZodString;
    defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
    type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    defaultValue?: string | number | boolean | undefined;
    description: string;
    placeholder: string;
}, {
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    defaultValue?: string | number | boolean | undefined;
    description: string;
    placeholder: string;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    placeholder: import("zod").ZodString;
    description: import("zod").ZodString;
    defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
    type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    defaultValue?: string | number | boolean | undefined;
    description: string;
    placeholder: string;
}, {
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    defaultValue?: string | number | boolean | undefined;
    description: string;
    placeholder: string;
}>;
export type t = PositionalArgStrict;
//# sourceMappingURL=PositionalArg.d.ts.map