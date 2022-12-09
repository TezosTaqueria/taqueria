import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { EconomicalProtocolHash } from '@taqueria/protocol/types';
import { EconomicalProtocolHash as EconomicalProtocolHashStrict } from '@taqueria/protocol/out/types-strict';
export type { EconomicalProtocolHashStrict as EconomicalProtocolHash };
export declare const from: (input: unknown) => EconomicalProtocolHashStrict;
export declare const create: (input: EconomicalProtocolHash) => EconomicalProtocolHashStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, EconomicalProtocolHashStrict>;
export declare const make: (input: Omit<EconomicalProtocolHashStrict, '__type'>) => FutureInstance<TaqError, EconomicalProtocolHashStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, EconomicalProtocolHashStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = EconomicalProtocolHashStrict;
//# sourceMappingURL=EconomicalProtocolHash.d.ts.map