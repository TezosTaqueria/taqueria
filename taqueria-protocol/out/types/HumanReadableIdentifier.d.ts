import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { HumanReadableIdentifier } from '@taqueria/protocol/types';
import { HumanReadableIdentifier as HumanReadableIdentifierStrict } from '@taqueria/protocol/out/types-strict';
export type { HumanReadableIdentifierStrict as HumanReadableIdentifier };
export declare const from: (input: unknown) => HumanReadableIdentifierStrict;
export declare const create: (input: HumanReadableIdentifier) => HumanReadableIdentifierStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, HumanReadableIdentifierStrict>;
export declare const make: (input: Omit<HumanReadableIdentifierStrict, '__type'>) => FutureInstance<TaqError, HumanReadableIdentifierStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, HumanReadableIdentifierStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = HumanReadableIdentifierStrict;
//# sourceMappingURL=HumanReadableIdentifier.d.ts.map