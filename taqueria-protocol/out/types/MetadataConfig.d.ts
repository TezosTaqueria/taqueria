import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { MetadataConfig } from '@taqueria/protocol/types';
import { MetadataConfig as MetadataConfigStrict } from '@taqueria/protocol/out/types-strict';
export type { MetadataConfigStrict as MetadataConfig };
export declare const from: (input: unknown) => MetadataConfigStrict;
export declare const create: (input: MetadataConfig) => MetadataConfigStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, MetadataConfigStrict>;
export declare const make: (input: Omit<MetadataConfigStrict, '__type'>) => FutureInstance<TaqError, MetadataConfigStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
        authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        license: import("zod").ZodOptional<import("zod").ZodString>;
        homepage: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }>;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
        authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        license: import("zod").ZodOptional<import("zod").ZodString>;
        homepage: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }>, MetadataConfigStrict, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }>;
};
export declare const rawSchema: import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
    authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    license: import("zod").ZodOptional<import("zod").ZodString>;
    homepage: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    name?: string | undefined;
    projectDescription?: string | undefined;
    authors?: string[] | undefined;
    license?: string | undefined;
    homepage?: string | undefined;
}, {
    name?: string | undefined;
    projectDescription?: string | undefined;
    authors?: string[] | undefined;
    license?: string | undefined;
    homepage?: string | undefined;
}>;
export declare const internalSchema: import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
    authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    license: import("zod").ZodOptional<import("zod").ZodString>;
    homepage: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    name?: string | undefined;
    projectDescription?: string | undefined;
    authors?: string[] | undefined;
    license?: string | undefined;
    homepage?: string | undefined;
}, {
    name?: string | undefined;
    projectDescription?: string | undefined;
    authors?: string[] | undefined;
    license?: string | undefined;
    homepage?: string | undefined;
}>;
export type t = MetadataConfigStrict;
//# sourceMappingURL=MetadataConfig.d.ts.map