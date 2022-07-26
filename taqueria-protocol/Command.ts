import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

export const rawSchema = z
	.string({ description: 'Command' })
	.min(1)
	.regex(/^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$/, 'Must be a command that can be interpreted using yargs');

type RawInput = z.infer<typeof rawSchema>;

const { schemas: generatedSchemas, factory } = createType<RawInput, RawInput>({
	isStringLike: true,
	rawSchema,
	parseErrMsg: (value: unknown) => `${value} is an invalid command. Expected format is: taskName [optional] <required>`,
	unknownErrMsg: 'Something went wrong when parsing the command',
});

export const internalSchema = generatedSchemas.schema;

export type Command = z.infer<typeof internalSchema>;
export type t = Command;
export const { create, make, of } = factory;
export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as Command),
};
