import createType, { Flatten } from '@taqueria/protocol/Base';
import * as PublicKeyHash from '@taqueria/protocol/PublicKeyHash';
import { z } from 'zod';

const commonSchema = z.object({
	mnemonic: z.preprocess(
		arg => typeof arg === 'string' ? arg.split(' ') : arg,
		z.array(
			z.string({ description: 'Faucet Mnemonic Word' }).min(1).regex(/^[a-z]{2,}$/),
			{ description: 'Faucet Mnemonic' },
		),
	),
	email: z.string({ description: 'Faucet E-mail' }).regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/).optional(),
	password: z.string({ description: 'Faucet Password' }).optional(),
	amount: z.string({ description: 'Faucet Amount' }).refine(
		val => val.length === 0 || /^\d+$/.test(val),
		'Amount, if present, must be numeric',
	),
	activation_code: z.string({ description: 'Faucet Activation Code' }).optional(),
});

export const rawSchema = commonSchema.extend({
	pkh: z.string({ description: 'Faucet Public Key Hash' }).min(1),
}).describe('Faucet');

const internalSchema = z.preprocess(
	input => {
		const defaults = {
			pkh: '',
			mnemonic: [],
			email: '',
			password: '',
			activation_code: '',
		};
		return typeof input === 'object'
			? { ...defaults, ...input }
			: defaults;
	},
	commonSchema.extend({
		pkh: PublicKeyHash.schemas.schema,
	}),
).describe('Faucet');

type RawInput = z.infer<typeof rawSchema>;
type Input = z.infer<typeof internalSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: (value: unknown) => `${value} is not a valid faucet configuration`,
	unknownErrMsg: 'Something went wrong trying to parse the faucet',
});

export type Faucet = Flatten<z.infer<typeof generatedSchemas.schema>>;
export type t = Faucet;
export const { create, of, make } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as Faucet),
};
