import { sendAsyncErr, sendJsonRes, sendSetOutputMode } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import fs from 'fs/promises';
import path from 'path';
import prompts from 'prompts';

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

	const response = await prompts([
		{
			type: `text`,
			name: `name`,
			message: `Enter contract name`,
			initial: contractName,
		},
		{
			type: `text`,
			name: `description`,
			message: `Enter contract description`,
			initial: '',
		},
		{
			type: 'list',
			name: 'authors',
			message: 'Enter contract authors (comma separated)',
			initial: '',
			separator: ',',
		},
		{
			type: 'text',
			name: 'homepage',
			message: 'Enter contract web url',
			initial: '',
		},
		{
			type: 'text',
			name: 'license',
			message: 'Enter contract license',
			initial: 'ISC',
		},
		// TODO: errors - mapping of error codes to human readable error messages
		// TODO: views - off-chain views
		// TODO: select optional interfaces and answer additional prompts
	]) as {
		name: string;
		description: string;
		authors: string[];
		license: string;
		homepage: string;
	};

	const contractMetadata = {
		name: response.name,
		version: 'v1.0.0',
		description: response.description,
		authors: response.authors,
		homepage: response.homepage,
		license: response.license,
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
