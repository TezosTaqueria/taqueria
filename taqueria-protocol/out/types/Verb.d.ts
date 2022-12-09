import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Verb } from '@taqueria/protocol/types';
import { Verb as VerbStrict } from '@taqueria/protocol/out/types-strict';
export type { VerbStrict as Verb };
export declare const from: (input: unknown) => VerbStrict;
export declare const create: (input: Verb) => VerbStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, VerbStrict>;
export declare const make: (input: Omit<VerbStrict, '__type'>) => FutureInstance<TaqError, VerbStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, VerbStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = VerbStrict;
//# sourceMappingURL=Verb.d.ts.map