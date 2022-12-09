import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Timestamp } from '@taqueria/protocol/types';
import { Timestamp as TimestampStrict } from '@taqueria/protocol/out/types-strict';
export type { TimestampStrict as Timestamp };
export declare const from: (input: unknown) => TimestampStrict;
export declare const create: (input: Timestamp) => TimestampStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, TimestampStrict>;
export declare const make: (input: Omit<TimestampStrict, '__type'>) => FutureInstance<TaqError, TimestampStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodNumber;
    schema: import("zod").ZodEffects<import("zod").ZodNumber, TimestampStrict, number>;
};
export declare const rawSchema: import("zod").ZodNumber;
export declare const internalSchema: import("zod").ZodNumber;
export type t = TimestampStrict;
//# sourceMappingURL=Timestamp.d.ts.map