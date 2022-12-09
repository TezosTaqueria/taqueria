import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { NonEmptyString } from '@taqueria/protocol/types';
import { NonEmptyString as NonEmptyStringStrict } from '@taqueria/protocol/out/types-strict';
export type { NonEmptyStringStrict as NonEmptyString };
export declare const from: (input: unknown) => NonEmptyStringStrict;
export declare const create: (input: NonEmptyString) => NonEmptyStringStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, NonEmptyStringStrict>;
export declare const make: (input: Omit<NonEmptyStringStrict, '__type'>) => FutureInstance<TaqError, NonEmptyStringStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, NonEmptyStringStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = NonEmptyStringStrict;
//# sourceMappingURL=NonEmptyString.d.ts.map