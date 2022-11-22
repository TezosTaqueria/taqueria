import { sendAsyncErr, sendAsyncRes, sendErr, sendJsonRes } from '@taqueria/node-sdk';
import { LoadedConfig, RequestArgs, SanitizedAbsPath } from '@taqueria/node-sdk/types';
import path from 'path';
import { processFiles } from './file-processing';
import { PinataAuth, pinHash, publishFileToIpfs } from './pinata-api';
import { createProcessBackoffController } from './utils';

// Load .env for jwt token
// TODO: How should this be stored in a secure way?
import 'dotenv/config';

// TODO: What should this be, it was removed from the sdk
type PluginResponse =
	| void
	| {
		render: 'table';
		data: unknown[];
	};

interface Opts extends RequestArgs.ProxyRequestArgs {
	readonly path?: string;
	readonly hash?: string;
}

const publishToIpfs = async (fileOrDirPath: undefined | string, auth: PinataAuth): Promise<PluginResponse> => {
	if (!fileOrDirPath) {
		throw new Error(`path was not provided`);
	}

	// Pinata is limited to 180 requests per minute
	// So for the first 180 requests they can go fast

	const { processWithBackoff } = createProcessBackoffController({
		retryCount: 5,
		targetRequestsPerMinute: 180,
	});

	const result = await processFiles({
		fileOrDirPath,
		parallelCount: 10,
		processFile: async filePath => {
			// // TEMP: Debug
			// console.log(`publishing: ${filePath}`);

			return processWithBackoff(() =>
				publishFileToIpfs({
					auth,
					item: { filePath, name: path.basename(filePath) },
				})
			);
		},
		onProgress: ({ processedFilesCount, estimateFileCount }) => {
			if (estimateFileCount && processedFilesCount % 10) {
				let ratio = processedFilesCount / estimateFileCount;
				if (ratio > 1) ratio = 1;

				// // TODO: Call task sdk progress
				// console.log(`Progress: ${(ratio * 100).toFixed(0)}%`);
			}
		},
	});

	// // TEMP: DEBUG: Show error
	// if (result.failures.length) {
	// 	console.log('❗ Failures:\n' + result.failures.map(f => `${f.filePath}: ${f.error}`).join('\n'));
	// }

	return {
		render: 'table',
		data: [
			...result.failures.map(x => ({
				'?': '❌',
				filePath: x.filePath,
				ipfsHash: undefined,
				error: (x.error as { message?: string })?.message ?? JSON.stringify(x.error),
			})),
			...result.successes.map(x => ({
				'?': '✔',
				filePath: x.filePath,
				ipfsHash: x.result.ipfsHash,
				error: undefined,
			})),
		],
	};
};

const pinToIpfs = async (hash: undefined | string, auth: PinataAuth): Promise<PluginResponse> => {
	if (!hash) {
		throw new Error(`ipfs hash was not provided`);
	}

	await pinHash({ ipfsHash: hash, auth });

	return {
		render: 'table',
		data: [{ ipfsHash: hash }],
	};
};

const execute = async (opts: Opts): Promise<PluginResponse> => {
	const {
		task,
		path,
		hash,
		config,
	} = opts;

	const auth: PinataAuth = {
		// TODO: Where should this be stored?
		// pinataJwtToken: (config as Record<string, any>).credentials.pinataJwtToken,
		pinataJwtToken: process.env['pinataJwtToken'] as string,
	};

	if (!auth.pinataJwtToken) {
		throw new Error(`The 'credentials.pinataJwtToken' was not found in config`);
	}

	switch (task) {
		case 'publish':
			return publishToIpfs(path, auth);
		case 'pin':
			return pinToIpfs(hash, auth);
		default:
			throw new Error(`${task} is not an understood task by the ipfs-pinata plugin`);
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
