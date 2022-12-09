import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { NetworkConfig } from '@taqueria/protocol/types';
import { NetworkConfig as NetworkConfigStrict } from '@taqueria/protocol/out/types-strict';
export type { NetworkConfigStrict as NetworkConfig };
export declare const from: (input: unknown) => NetworkConfigStrict;
export declare const create: (input: NetworkConfig) => NetworkConfigStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, NetworkConfigStrict>;
export declare const make: (input: Omit<NetworkConfigStrict, '__type'>) => FutureInstance<TaqError, NetworkConfigStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        label: import("zod").ZodString;
        rpcUrl: import("zod").ZodString;
        protocol: import("zod").ZodString;
        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
            publicKey: import("zod").ZodString;
            publicKeyHash: import("zod").ZodString;
            privateKey: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }>>>;
        faucet: import("zod").ZodOptional<import("zod").ZodObject<{
            pkh: import("zod").ZodString;
            mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
            email: import("zod").ZodString;
            password: import("zod").ZodString;
            amount: import("zod").ZodString;
            activation_code: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        }, {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        label: import("zod").ZodString;
        rpcUrl: import("zod").ZodString;
        protocol: import("zod").ZodString;
        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
            publicKey: import("zod").ZodString;
            publicKeyHash: import("zod").ZodString;
            privateKey: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }>>>;
        faucet: import("zod").ZodOptional<import("zod").ZodObject<{
            pkh: import("zod").ZodString;
            mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
            email: import("zod").ZodString;
            password: import("zod").ZodString;
            amount: import("zod").ZodString;
            activation_code: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        }, {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>, NetworkConfigStrict, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
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
    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
        publicKey: import("zod").ZodString;
        publicKeyHash: import("zod").ZodString;
        privateKey: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }>>>;
    faucet: import("zod").ZodOptional<import("zod").ZodObject<{
        pkh: import("zod").ZodString;
        mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
        email: import("zod").ZodString;
        password: import("zod").ZodString;
        amount: import("zod").ZodString;
        activation_code: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    }, {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    }>>;
}, "strip", import("zod").ZodTypeAny, {
    accounts?: Record<string, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }> | undefined;
    faucet?: {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}, {
    accounts?: Record<string, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }> | undefined;
    faucet?: {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    label: import("zod").ZodString;
    rpcUrl: import("zod").ZodString;
    protocol: import("zod").ZodString;
    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
        publicKey: import("zod").ZodString;
        publicKeyHash: import("zod").ZodString;
        privateKey: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }>>>;
    faucet: import("zod").ZodOptional<import("zod").ZodObject<{
        pkh: import("zod").ZodString;
        mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
        email: import("zod").ZodString;
        password: import("zod").ZodString;
        amount: import("zod").ZodString;
        activation_code: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    }, {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    }>>;
}, "strip", import("zod").ZodTypeAny, {
    accounts?: Record<string, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }> | undefined;
    faucet?: {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}, {
    accounts?: Record<string, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }> | undefined;
    faucet?: {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}>;
export type t = NetworkConfigStrict;
//# sourceMappingURL=NetworkConfig.d.ts.map