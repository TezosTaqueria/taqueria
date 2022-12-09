import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { SandboxAccountConfig } from '@taqueria/protocol/types';
import { SandboxAccountConfig as SandboxAccountConfigStrict } from '@taqueria/protocol/out/types-strict';
export type { SandboxAccountConfigStrict as SandboxAccountConfig };
export declare const from: (input: unknown) => SandboxAccountConfigStrict;
export declare const create: (input: SandboxAccountConfig) => SandboxAccountConfigStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, SandboxAccountConfigStrict>;
export declare const make: (input: Omit<SandboxAccountConfigStrict, '__type'>) => FutureInstance<TaqError, SandboxAccountConfigStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
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
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
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
    }>, SandboxAccountConfigStrict, {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
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
}>;
export declare const internalSchema: import("zod").ZodObject<{
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
}>;
export type t = SandboxAccountConfigStrict;
//# sourceMappingURL=SandboxAccountConfig.d.ts.map