import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Contract } from '@taqueria/protocol/types';
import { Contract as ContractStrict } from '@taqueria/protocol/out/types-strict';
export type { ContractStrict as Contract };
export declare const from: (input: unknown) => ContractStrict;
export declare const create: (input: Contract) => ContractStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, ContractStrict>;
export declare const make: (input: Omit<ContractStrict, '__type'>) => FutureInstance<TaqError, ContractStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        sourceFile: import("zod").ZodString;
        hash: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        sourceFile: string;
        hash: string;
    }, {
        sourceFile: string;
        hash: string;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        sourceFile: import("zod").ZodString;
        hash: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        sourceFile: string;
        hash: string;
    }, {
        sourceFile: string;
        hash: string;
    }>, ContractStrict, {
        sourceFile: string;
        hash: string;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    sourceFile: import("zod").ZodString;
    hash: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    sourceFile: string;
    hash: string;
}, {
    sourceFile: string;
    hash: string;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    sourceFile: import("zod").ZodString;
    hash: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    sourceFile: string;
    hash: string;
}, {
    sourceFile: string;
    hash: string;
}>;
export type t = ContractStrict;
//# sourceMappingURL=Contract.d.ts.map