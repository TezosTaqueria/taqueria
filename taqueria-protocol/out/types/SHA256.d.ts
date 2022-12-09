import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { SHA256 } from '@taqueria/protocol/types';
import { SHA256 as SHA256Strict } from '@taqueria/protocol/out/types-strict';
export type { SHA256Strict as SHA256 };
export declare const from: (input: unknown) => SHA256Strict;
export declare const create: (input: SHA256) => SHA256Strict;
export declare const of: (input: unknown) => FutureInstance<TaqError, SHA256Strict>;
export declare const make: (input: Omit<SHA256Strict, '__type'>) => FutureInstance<TaqError, SHA256Strict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, SHA256Strict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = SHA256Strict;
//# sourceMappingURL=SHA256.d.ts.map