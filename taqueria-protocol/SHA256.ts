import createType from '@taqueria/protocol/Base';
import { E_TaqError, TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance as Future, mapRej, promise } from 'fluture';
import { has } from 'rambda';
import { TextEncoder } from 'util';
import { z } from 'zod';

const eager = <T>(f: Future<TaqError, T>) =>
	promise(
		mapRej((err: TaqError) => new E_TaqError(err))(f),
	);

// Access to SubtleCrypto is different on NodeJS vs Deno
interface SubtleCrypto {
	digest(method: 'SHA-256', data: Uint8Array): ArrayBuffer;
}
export class Crypto {
	subtle: SubtleCrypto;
	constructor() {
		this.subtle = {
			digest(_method: 'SHA-256', _data: Uint8Array) {
				return new ArrayBuffer(50);
			},
		};
	}
}
// deno-lint-ignore var
declare var crypto: Crypto;

const getSubtleCrypto = async () => {
	if (has('SubtleCrypto', globalThis)) {
		return Promise.resolve(crypto.subtle);
	}

	const { Crypto } = await import('@peculiar/webcrypto');
	const webcrypto = new Crypto();
	return Promise.resolve(webcrypto.subtle);
};

export const rawSchema = z.string({ description: 'SHA256' }).length(64);

type RawInput = z.infer<typeof rawSchema>;

const { schemas: generatedSchemas, factory } = createType<RawInput, RawInput>({
	isStringLike: true,
	rawSchema,
	parseErrMsg: (value: unknown) => `${value} is an invalid SHA256 hash`,
	unknownErrMsg: (value: unknown) => `Something went wrong trying to parse the following as a SHA256 value, ${value}`,
});

export const toSHA256 = async (value: string) => {
	const encoder = new TextEncoder();
	const data = encoder.encode(value);
	const hash = await (await getSubtleCrypto()).digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hash)); // convert buffer to byte array
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	return eager(factory.make(hashHex));
};

export const internalSchema = generatedSchemas.schema;

export type SHA256 = z.infer<typeof internalSchema>;
export type t = SHA256;
export const { create, of, make } = factory;
export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as SHA256),
};
