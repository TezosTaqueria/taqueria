import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

const rawRuntimeDependency = z.object({
	name: z.string(),
	path: z.string(),
	version: z.string(),
	kind: z.union([z.literal('required'), z.literal('optional')]),
});

type RawRuntimeDependencyInput = z.infer<typeof rawRuntimeDependency>;

export const { schemas, factory } = createType<RawRuntimeDependencyInput, RawRuntimeDependencyInput>({
	rawSchema: rawRuntimeDependency,
	internalSchema: rawRuntimeDependency,
	parseErrMsg: (value: unknown) => `The following runtime dependency is invalid: ${value}`,
	unknownErrMsg: 'Something went wrong trying to parse the template',
});

export type RuntimeDependency = z.infer<typeof schemas.schema>;

const runtimeDependencyReport = rawRuntimeDependency.extend({ met: z.boolean() });

export type RuntimeDependencyReport = z.infer<typeof runtimeDependencyReport>;

const dependenciesResponseSchema = z.object({
	report: z.array(runtimeDependencyReport),
});

export type PluginDependenciesResponse = z.infer<typeof dependenciesResponseSchema>;
export type t = PluginDependenciesResponse;

export const { of, make, create } = factory;
