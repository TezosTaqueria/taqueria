import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { SanitizedAbsPath } from '@taqueria/protocol/types';
import { SanitizedAbsPath as SanitizedAbsPathStrict } from '@taqueria/protocol/out/types-strict';
export type { SanitizedAbsPathStrict as SanitizedAbsPath };
export declare const from: (input: unknown) => SanitizedAbsPathStrict;
export declare const create: (input: SanitizedAbsPath) => SanitizedAbsPathStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, SanitizedAbsPathStrict>;
export declare const make: (input: Omit<SanitizedAbsPathStrict, '__type'>) => FutureInstance<TaqError, SanitizedAbsPathStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, SanitizedAbsPathStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = SanitizedAbsPathStrict;
//# sourceMappingURL=SanitizedAbsPath.d.ts.map