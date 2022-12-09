import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { SanitizedPath } from '@taqueria/protocol/types';
import { SanitizedPath as SanitizedPathStrict } from '@taqueria/protocol/out/types-strict';
export type { SanitizedPathStrict as SanitizedPath };
export declare const from: (input: unknown) => SanitizedPathStrict;
export declare const create: (input: SanitizedPath) => SanitizedPathStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, SanitizedPathStrict>;
export declare const make: (input: Omit<SanitizedPathStrict, '__type'>) => FutureInstance<TaqError, SanitizedPathStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, SanitizedPathStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = SanitizedPathStrict;
//# sourceMappingURL=SanitizedPath.d.ts.map