import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { ConfigArtifactsDir } from '@taqueria/protocol/types';
import { ConfigArtifactsDir as ConfigArtifactsDirStrict } from '@taqueria/protocol/out/types-strict';
export type { ConfigArtifactsDirStrict as ConfigArtifactsDir };
export declare const from: (input: unknown) => ConfigArtifactsDirStrict;
export declare const create: (input: ConfigArtifactsDir) => ConfigArtifactsDirStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, ConfigArtifactsDirStrict>;
export declare const make: (input: Omit<ConfigArtifactsDirStrict, '__type'>) => FutureInstance<TaqError, ConfigArtifactsDirStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodDefault<import("zod").ZodString>;
    schema: import("zod").ZodEffects<import("zod").ZodDefault<import("zod").ZodString>, ConfigArtifactsDirStrict, string | undefined>;
};
export declare const rawSchema: import("zod").ZodDefault<import("zod").ZodString>;
export declare const internalSchema: import("zod").ZodDefault<import("zod").ZodString>;
export type t = ConfigArtifactsDirStrict;
//# sourceMappingURL=ConfigArtifactsDir.d.ts.map