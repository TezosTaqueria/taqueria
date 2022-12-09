import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Tz } from '@taqueria/protocol/types';
import { Tz as TzStrict } from '@taqueria/protocol/out/types-strict';
export type { TzStrict as Tz };
export declare const from: (input: unknown) => TzStrict;
export declare const create: (input: Tz) => TzStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, TzStrict>;
export declare const make: (input: Omit<TzStrict, '__type'>) => FutureInstance<TaqError, TzStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, TzStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = TzStrict;
//# sourceMappingURL=Tz.d.ts.map