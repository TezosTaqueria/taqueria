import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PublicKeyHash } from '@taqueria/protocol/types';
import { PublicKeyHash as PublicKeyHashStrict } from '@taqueria/protocol/out/types-strict';
export type { PublicKeyHashStrict as PublicKeyHash };
export declare const from: (input: unknown) => PublicKeyHashStrict;
export declare const create: (input: PublicKeyHash) => PublicKeyHashStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PublicKeyHashStrict>;
export declare const make: (input: Omit<PublicKeyHashStrict, '__type'>) => FutureInstance<TaqError, PublicKeyHashStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, PublicKeyHashStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = PublicKeyHashStrict;
//# sourceMappingURL=PublicKeyHash.d.ts.map