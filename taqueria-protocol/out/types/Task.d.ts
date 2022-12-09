import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Task } from '@taqueria/protocol/types';
import { Task as TaskStrict } from '@taqueria/protocol/out/types-strict';
export type { TaskStrict as Task };
export declare const from: (input: unknown) => TaskStrict;
export declare const create: (input: Task) => TaskStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, TaskStrict>;
export declare const make: (input: Omit<TaskStrict, '__type'>) => FutureInstance<TaqError, TaskStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        task: import("zod").ZodString;
        command: import("zod").ZodString;
        aliases: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>, "many">>;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        example: import("zod").ZodOptional<import("zod").ZodString>;
        hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
        encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
        handler: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodString]>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
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
        }>, "many">>;
        positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
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
        }>, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        task: import("zod").ZodString;
        command: import("zod").ZodString;
        aliases: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>, "many">>;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        example: import("zod").ZodOptional<import("zod").ZodString>;
        hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
        encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
        handler: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodString]>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
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
        }>, "many">>;
        positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
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
        }>, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }>, TaskStrict, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    task: import("zod").ZodString;
    command: import("zod").ZodString;
    aliases: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>, "many">>;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    example: import("zod").ZodOptional<import("zod").ZodString>;
    hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
    encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
    handler: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodString]>;
    options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
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
    }>, "many">>;
    positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
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
    }>, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    description?: string | undefined;
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    hidden?: boolean | undefined;
    encoding?: "none" | "json" | "application/json" | undefined;
    aliases?: string[] | undefined;
    example?: string | undefined;
    handler: string;
    command: string;
    task: string;
}, {
    description?: string | undefined;
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    hidden?: boolean | undefined;
    encoding?: "none" | "json" | "application/json" | undefined;
    aliases?: string[] | undefined;
    example?: string | undefined;
    handler: string;
    command: string;
    task: string;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    task: import("zod").ZodString;
    command: import("zod").ZodString;
    aliases: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>, "many">>;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    example: import("zod").ZodOptional<import("zod").ZodString>;
    hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
    encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
    handler: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodString]>;
    options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
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
    }>, "many">>;
    positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
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
    }>, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    description?: string | undefined;
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    hidden?: boolean | undefined;
    encoding?: "none" | "json" | "application/json" | undefined;
    aliases?: string[] | undefined;
    example?: string | undefined;
    handler: string;
    command: string;
    task: string;
}, {
    description?: string | undefined;
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    hidden?: boolean | undefined;
    encoding?: "none" | "json" | "application/json" | undefined;
    aliases?: string[] | undefined;
    example?: string | undefined;
    handler: string;
    command: string;
    task: string;
}>;
export type t = TaskStrict;
//# sourceMappingURL=Task.d.ts.map