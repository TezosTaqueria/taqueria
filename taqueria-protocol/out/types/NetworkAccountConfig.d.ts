import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { NetworkAccountConfig } from '@taqueria/protocol/types';
import { NetworkAccountConfig as NetworkAccountConfigStrict } from '@taqueria/protocol/out/types-strict';
export type { NetworkAccountConfigStrict as NetworkAccountConfig };
export declare const from: (input: unknown) => NetworkAccountConfigStrict;
export declare const create: (input: NetworkAccountConfig) => NetworkAccountConfigStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, NetworkAccountConfigStrict>;
export declare const make: (input: Omit<NetworkAccountConfigStrict, '__type'>) => FutureInstance<TaqError, NetworkAccountConfigStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
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
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
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
    }>, NetworkAccountConfigStrict, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
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
}>;
export declare const internalSchema: import("zod").ZodObject<{
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
}>;
export type t = NetworkAccountConfigStrict;
//# sourceMappingURL=NetworkAccountConfig.d.ts.map