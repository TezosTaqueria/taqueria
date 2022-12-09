import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Environment } from '@taqueria/protocol/types';
import { Environment as EnvironmentStrict } from '@taqueria/protocol/out/types-strict';
export type { EnvironmentStrict as Environment };
export declare const from: (input: unknown) => EnvironmentStrict;
export declare const create: (input: Environment) => EnvironmentStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, EnvironmentStrict>;
export declare const make: (input: Omit<EnvironmentStrict, '__type'>) => FutureInstance<TaqError, EnvironmentStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        networks: import("zod").ZodArray<import("zod").ZodString, "many">;
        sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
        storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
        aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
    }, "strip", import("zod").ZodTypeAny, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        networks: import("zod").ZodArray<import("zod").ZodString, "many">;
        sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
        storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
        aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
    }, "strip", import("zod").ZodTypeAny, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>, EnvironmentStrict, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    networks: import("zod").ZodArray<import("zod").ZodString, "many">;
    sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
    storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
    aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
}, "strip", import("zod").ZodTypeAny, {
    storage?: Record<string, string> | undefined;
    aliases?: Record<string, Record<string, string>> | undefined;
    networks: string[];
    sandboxes: string[];
}, {
    storage?: Record<string, string> | undefined;
    aliases?: Record<string, Record<string, string>> | undefined;
    networks: string[];
    sandboxes: string[];
}>;
export declare const internalSchema: import("zod").ZodObject<{
    networks: import("zod").ZodArray<import("zod").ZodString, "many">;
    sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
    storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
    aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
}, "strip", import("zod").ZodTypeAny, {
    storage?: Record<string, string> | undefined;
    aliases?: Record<string, Record<string, string>> | undefined;
    networks: string[];
    sandboxes: string[];
}, {
    storage?: Record<string, string> | undefined;
    aliases?: Record<string, Record<string, string>> | undefined;
    networks: string[];
    sandboxes: string[];
}>;
export type t = EnvironmentStrict;
//# sourceMappingURL=Environment.d.ts.map