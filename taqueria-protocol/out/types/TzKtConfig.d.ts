import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { TzKtConfig } from '@taqueria/protocol/types';
import { TzKtConfig as TzKtConfigStrict } from '@taqueria/protocol/out/types-strict';
export type { TzKtConfigStrict as TzKtConfig };
export declare const from: (input: unknown) => TzKtConfigStrict;
export declare const create: (input: TzKtConfig) => TzKtConfigStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, TzKtConfigStrict>;
export declare const make: (input: Omit<TzKtConfigStrict, '__type'>) => FutureInstance<TaqError, TzKtConfigStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
        postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
        apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    }, {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
        postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
        apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    }, {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    }>, TzKtConfigStrict, {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
    postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
    apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny, {
    disableAutostartWithSandbox?: boolean | undefined;
    postgresqlPort?: number | undefined;
    apiPort?: number | undefined;
}, {
    disableAutostartWithSandbox?: boolean | undefined;
    postgresqlPort?: number | undefined;
    apiPort?: number | undefined;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
    postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
    apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny, {
    disableAutostartWithSandbox?: boolean | undefined;
    postgresqlPort?: number | undefined;
    apiPort?: number | undefined;
}, {
    disableAutostartWithSandbox?: boolean | undefined;
    postgresqlPort?: number | undefined;
    apiPort?: number | undefined;
}>;
export type t = TzKtConfigStrict;
//# sourceMappingURL=TzKtConfig.d.ts.map