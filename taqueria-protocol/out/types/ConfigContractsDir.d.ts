import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { ConfigContractsDir } from '@taqueria/protocol/types';
import { ConfigContractsDir as ConfigContractsDirStrict } from '@taqueria/protocol/out/types-strict';
export type { ConfigContractsDirStrict as ConfigContractsDir };
export declare const from: (input: unknown) => ConfigContractsDirStrict;
export declare const create: (input: ConfigContractsDir) => ConfigContractsDirStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, ConfigContractsDirStrict>;
export declare const make: (input: Omit<ConfigContractsDirStrict, '__type'>) => FutureInstance<TaqError, ConfigContractsDirStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodDefault<import("zod").ZodString>;
    schema: import("zod").ZodEffects<import("zod").ZodDefault<import("zod").ZodString>, ConfigContractsDirStrict, string | undefined>;
};
export declare const rawSchema: import("zod").ZodDefault<import("zod").ZodString>;
export declare const internalSchema: import("zod").ZodDefault<import("zod").ZodString>;
export type t = ConfigContractsDirStrict;
//# sourceMappingURL=ConfigContractsDir.d.ts.map