import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { BuildNumber } from '@taqueria/protocol/types';
import { BuildNumber as BuildNumberStrict } from '@taqueria/protocol/out/types-strict';
export type { BuildNumberStrict as BuildNumber };
export declare const from: (input: unknown) => BuildNumberStrict;
export declare const create: (input: BuildNumber) => BuildNumberStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, BuildNumberStrict>;
export declare const make: (input: Omit<BuildNumberStrict, '__type'>) => FutureInstance<TaqError, BuildNumberStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodNumber;
    schema: import("zod").ZodEffects<import("zod").ZodNumber, BuildNumberStrict, number>;
};
export declare const rawSchema: import("zod").ZodNumber;
export declare const internalSchema: import("zod").ZodNumber;
export type t = BuildNumberStrict;
//# sourceMappingURL=BuildNumber.d.ts.map