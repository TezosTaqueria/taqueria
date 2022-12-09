import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { SandboxConfig } from '@taqueria/protocol/types';
import { SandboxConfig as SandboxConfigStrict } from '@taqueria/protocol/out/types-strict';
export type { SandboxConfigStrict as SandboxConfig };
export declare const from: (input: unknown) => SandboxConfigStrict;
export declare const create: (input: SandboxConfig) => SandboxConfigStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, SandboxConfigStrict>;
export declare const make: (input: Omit<SandboxConfigStrict, '__type'>) => FutureInstance<TaqError, SandboxConfigStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        label: import("zod").ZodString;
        rpcUrl: import("zod").ZodString;
        protocol: import("zod").ZodString;
        attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
        plugin: import("zod").ZodOptional<import("zod").ZodString>;
        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
            encryptedKey: import("zod").ZodString;
            publicKeyHash: import("zod").ZodString;
            secretKey: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }>, import("zod").ZodString]>>>;
        tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
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
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        label: import("zod").ZodString;
        rpcUrl: import("zod").ZodString;
        protocol: import("zod").ZodString;
        attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
        plugin: import("zod").ZodOptional<import("zod").ZodString>;
        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
            encryptedKey: import("zod").ZodString;
            publicKeyHash: import("zod").ZodString;
            secretKey: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }>, import("zod").ZodString]>>>;
        tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
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
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>, SandboxConfigStrict, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    label: import("zod").ZodString;
    rpcUrl: import("zod").ZodString;
    protocol: import("zod").ZodString;
    attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
    plugin: import("zod").ZodOptional<import("zod").ZodString>;
    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
        encryptedKey: import("zod").ZodString;
        publicKeyHash: import("zod").ZodString;
        secretKey: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }, {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }>, import("zod").ZodString]>>>;
    tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
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
    }>>;
}, "strip", import("zod").ZodTypeAny, {
    plugin?: string | undefined;
    accounts?: Record<string, string | {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }> | undefined;
    attributes?: string | number | boolean | undefined;
    tzkt?: {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}, {
    plugin?: string | undefined;
    accounts?: Record<string, string | {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }> | undefined;
    attributes?: string | number | boolean | undefined;
    tzkt?: {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    label: import("zod").ZodString;
    rpcUrl: import("zod").ZodString;
    protocol: import("zod").ZodString;
    attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
    plugin: import("zod").ZodOptional<import("zod").ZodString>;
    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
        encryptedKey: import("zod").ZodString;
        publicKeyHash: import("zod").ZodString;
        secretKey: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }, {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }>, import("zod").ZodString]>>>;
    tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
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
    }>>;
}, "strip", import("zod").ZodTypeAny, {
    plugin?: string | undefined;
    accounts?: Record<string, string | {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }> | undefined;
    attributes?: string | number | boolean | undefined;
    tzkt?: {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}, {
    plugin?: string | undefined;
    accounts?: Record<string, string | {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }> | undefined;
    attributes?: string | number | boolean | undefined;
    tzkt?: {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}>;
export type t = SandboxConfigStrict;
//# sourceMappingURL=SandboxConfig.d.ts.map