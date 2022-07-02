import * as SandboxAccountConfig from '@taqueria/protocol/SandboxAccountConfig';
import { z } from 'zod';

export interface SandboxAccount extends SandboxAccountConfig.t {
	alias: string;
}

export type t = SandboxAccount;

export const rawSchema = SandboxAccountConfig.rawSchema
	.extend({
		alias: z.string().nonempty(),
	});

export const schema = rawSchema.transform(val => val as SandboxAccount);

export type Input = z.infer<typeof rawSchema>;

export const make = (data: Input) => {
	const { alias, ...sandboxAccountConfig } = data;
	const info = SandboxAccountConfig.create(sandboxAccountConfig);
	return schema.parse({
		alias,
		...info,
	});
};
