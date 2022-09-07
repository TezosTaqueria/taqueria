import createType from '@taqueria/protocol/Base';
import * as EconomicalProtocolHash from '@taqueria/protocol/EconomicalProtocolHash';
import * as HumanReadableIdentifier from '@taqueria/protocol/HumanReadableIdentifier';
import * as SandboxAccountConfig from '@taqueria/protocol/SandboxAccountConfig';
import * as TzKt from '@taqueria/protocol/tzkt-config';
import * as Url from '@taqueria/protocol/Url';
import * as Verb from '@taqueria/protocol/Verb';
import { z } from 'zod';

const accountMapSchema = z.record(
	z.union([
		z.string().nonempty(),
		SandboxAccountConfig.schemas.schema,
	]),
);

export const rawSchema = z.object({
	label: z.string({ description: 'Sandbox Label' }).min(1),
	rpcUrl: z.string({ description: 'Sandbox RPC Url' }).min(5).url(),
	protocol: z.string({ description: 'Sandbox Protocol Hash' }).min(8),
	attributes: z.record(
		z.union(
			[z.string(), z.number(), z.boolean()],
			{ description: 'Sandbox Attribute' },
		),
		{ description: 'Sandbox Attributes' },
	).optional(),
	plugin: Verb.rawSchema.describe('Sandbox Plugin').optional(),
	accounts: z.union([
		z.object({ default: z.string().min(1) }),
		z.record(SandboxAccountConfig.rawSchema),
	], { description: 'Sandbox Accounts' }).optional(),
	tzkt: TzKt.rawSchema.describe('TzKt config').optional(),
});

const internalSchema = z.object({
	label: HumanReadableIdentifier.schemas.schema.describe('Sandbox Label'),
	rpcUrl: Url.schemas.schema.describe('Sandbox RPC Url'),
	protocol: EconomicalProtocolHash.schemas.schema.describe('Sandbox Protocol Hash'),
	attributes: z.record(
		z.union([z.string(), z.number(), z.boolean()]),
		{ description: 'Sandbox Attributes' },
	).optional(),
	plugin: Verb.schemas.schema.describe('Sandbox Plugin').optional(),
	accounts: accountMapSchema.optional(),
	tzkt: TzKt.rawSchema.describe('TzKt config').optional(),
}, { description: 'Sandbox Configuration' });

type RawInput = z.infer<typeof rawSchema>;
type Input = z.infer<typeof internalSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: (value: unknown) => `${value} is not a valid sandbox configuration `,
	unknownErrMsg: 'Something went wrong trying to parse the sandbox configuration',
});

export type SandboxConfig = z.infer<typeof generatedSchemas.schema>;
export type t = SandboxConfig;
export const { create, of, make } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as SandboxConfig),
};
