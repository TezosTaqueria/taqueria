import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { VersionNumber } from '@taqueria/protocol/types';
import { VersionNumber as VersionNumberStrict } from '@taqueria/protocol/out/types-strict';
export type { VersionNumberStrict as VersionNumber };
export declare const from: (input: unknown) => VersionNumberStrict;
export declare const create: (input: VersionNumber) => VersionNumberStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, VersionNumberStrict>;
export declare const make: (input: Omit<VersionNumberStrict, '__type'>) => FutureInstance<TaqError, VersionNumberStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, VersionNumberStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = VersionNumberStrict;
//# sourceMappingURL=VersionNumber.d.ts.map