import createType, { Flatten } from '@taqueria/protocol/Base';
import * as EconomicalProtocolHash from '@taqueria/protocol/EconomicalProtocolHash';
import * as Faucet from '@taqueria/protocol/Faucet';
import * as HumanReadableIdentifier from '@taqueria/protocol/HumanReadableIdentifier';
import * as Url from '@taqueria/protocol/Url';
import { z } from 'zod';

export const rawSchema = z.object({
	label: HumanReadableIdentifier.rawSchema,
	rpcUrl: Url.rawSchema,
	protocol: EconomicalProtocolHash.rawSchema,
	faucet: Faucet.rawSchema.describe('Network Faucet'),
}).describe('Network Config');

const internalSchema = z.object({
	label: HumanReadableIdentifier.schemas.schema.describe('Network Label'),
	rpcUrl: Url.schemas.schema.describe('Network RPC Url'),
	protocol: EconomicalProtocolHash.schemas.schema.describe('Network Protocol Hash'),
	faucet: Faucet.schemas.schema.describe('Network Faucet'),
}).describe('Network Config');

type RawInput = z.infer<typeof rawSchema>;
type Input = z.infer<typeof internalSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: (value: unknown) => `${value} is not a valid network configuration`,
	unknownErrMsg: 'Something went wrong trying to parse the network configuration',
});

export type NetworkConfig = Flatten<z.infer<typeof generatedSchemas.schema>>;
export type t = NetworkConfig;
export const { create, of, make } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as NetworkConfig),
};
