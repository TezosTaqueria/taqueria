import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

export const rawSchema = z.object({
	disableAutostartWithSandbox: z.boolean({ description: 'Do not start TzKt when sandbox starts' }).default(false),
	postgresqlPort: z.number({ description: 'Port number for postgresql container' }).default(5432),
	apiPort: z.number({ description: 'Port number for TzKt API' }).default(5000),
});

type Input = z.infer<typeof rawSchema>;

export const { schemas: generatedSchemas, factory } = createType<Input, Input>({
	rawSchema,
	parseErrMsg: (value: unknown) => `${value} is not a valid TzKt configuration `,
	unknownErrMsg: 'Something went wrong trying to parse the TzKt configuration',
});

export type TzKtConfig = z.infer<typeof generatedSchemas.schema>;

export type t = TzKtConfig;

export const { create, of, make } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as TzKtConfig),
};
