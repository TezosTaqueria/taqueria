import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Faucet } from '@taqueria/protocol/types';
import { Faucet as FaucetStrict } from '@taqueria/protocol/out/types-strict';
export type { FaucetStrict as Faucet };
export declare const from: (input: unknown) => FaucetStrict;
export declare const create: (input: Faucet) => FaucetStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, FaucetStrict>;
export declare const make: (input: Omit<FaucetStrict, '__type'>) => FutureInstance<TaqError, FaucetStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
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
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
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
    }>, FaucetStrict, {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
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
}>;
export declare const internalSchema: import("zod").ZodObject<{
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
}>;
export type t = FaucetStrict;
//# sourceMappingURL=Faucet.d.ts.map