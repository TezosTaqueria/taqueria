import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { ProvisionerID } from '@taqueria/protocol/types';
import { ProvisionerID as ProvisionerIDStrict } from '@taqueria/protocol/out/types-strict';
export type { ProvisionerIDStrict as ProvisionerID };
export declare const from: (input: unknown) => ProvisionerIDStrict;
export declare const create: (input: ProvisionerID) => ProvisionerIDStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, ProvisionerIDStrict>;
export declare const make: (input: Omit<ProvisionerIDStrict, '__type'>) => FutureInstance<TaqError, ProvisionerIDStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, ProvisionerIDStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = ProvisionerIDStrict;
//# sourceMappingURL=ProvisionerID.d.ts.map