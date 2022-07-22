import { LoadedConfig } from '@taqueria/node-sdk';
import { z } from 'zod';

const jestType: unique symbol = Symbol('jestConfig');

const rawSchema = LoadedConfig.rawSchema.extend({
	jest: z.preprocess(
		input => {
			const overrides = typeof input === 'object'
				? input
				: {};

			return {
				'testsRootDir': 'tests',
				...overrides,
			};
		},
		z.object({
			'testsRootDir': z.preprocess(
				val => val ?? 'tests',
				z.string().min(1).describe('testsRootDir'),
			),
		}),
	),
});

const internalSchema = Object.assign({}, rawSchema);

type RawInput = z.infer<typeof rawSchema>;

type Input = z.infer<typeof internalSchema>;

export interface JestRawConfig extends LoadedConfig.t {
	[jestType]: void;
}

export type JestConfig = Input & JestRawConfig;

export type t = JestConfig;

export const schema = internalSchema.transform(val => val as JestConfig);

export const create = (input: RawInput | unknown) => {
	try {
		const retval = schema.parse(input);
		return retval;
	} catch {
		throw `The .taq/config.json file is invalid.`;
	}
};
