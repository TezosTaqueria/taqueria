import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { SingleChar } from '@taqueria/protocol/types';
import { SingleChar as SingleCharStrict } from '@taqueria/protocol/out/types-strict';
export type { SingleCharStrict as SingleChar };
export declare const from: (input: unknown) => SingleCharStrict;
export declare const create: (input: SingleChar) => SingleCharStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, SingleCharStrict>;
export declare const make: (input: Omit<SingleCharStrict, '__type'>) => FutureInstance<TaqError, SingleCharStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, SingleCharStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = SingleCharStrict;
//# sourceMappingURL=SingleChar.d.ts.map