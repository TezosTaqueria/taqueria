import { sendAsyncErr, sendAsyncRes, sendErr, sendJsonRes } from '@taqueria/node-sdk';
import { LoadedConfig, RequestArgs, SanitizedAbsPath } from '@taqueria/node-sdk/types';
import fs from 'fs/promises';
import path from 'path';

// TODO: What should this be, it was removed from the sdk
type PluginResponse =
	| void
	| {
		render: 'table';
		data: unknown[];
	};

interface Opts extends RequestArgs.ProxyRequestArgs {
	readonly contractName?: string;
}

const createContractMetadata = async (contractName: undefined | string): Promise<PluginResponse> => {
	if (!contractName) {
		throw new Error(`contractName was not provided`);
	}

	const destFilePath = path.resolve(process.cwd(), `./artifacts/${contractName}.json`);
	// Basic Tzip-16 contract metadata
	const contractMetadata = {
		version: 'v1.0.0',
		name: 'Taqueria Metadata Plugin',
		description: 'This is a great project!',
		authors: [
			'ECAD Labs',
		],
		interfaces: [
			'TZIP-016',
		],
	};
	await fs.writeFile(destFilePath, JSON.stringify(contractMetadata, null, 2));

	return {
		render: 'table',
		data: [
			{
				contractName,
			},
		],
	};
};

const execute = async (opts: Opts): Promise<PluginResponse> => {
	const {
		task,
		contractName,
		config,
	} = opts;

	switch (task) {
		case 'metadata':
			return createContractMetadata(contractName);
		default:
			throw new Error(`${task} is not an understood task by the metadata plugin`);
	}
};

export default async (args: RequestArgs.ProxyRequestArgs): Promise<PluginResponse> => {
	const opts = args as Opts;

	try {
		const resultRaw = await execute(opts) as Record<string, unknown>;
		// TODO: Fix deno parsing
		// Without this, `data.reduce is not a function`
		const result = ('data' in resultRaw) ? resultRaw.data : resultRaw;
		return sendJsonRes(result);
	} catch (err) {
		const error = err as Error;
		if (error.message) {
			return sendAsyncErr(error.message);
		}
	}
};
