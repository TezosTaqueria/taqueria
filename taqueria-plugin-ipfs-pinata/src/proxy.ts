import { sendAsyncErr, sendAsyncRes, sendErr } from '@taqueria/node-sdk';
import { LoadedConfig, PluginResponse, RequestArgs, SanitizedAbsPath } from '@taqueria/node-sdk/types';
import path from 'path';
import { processFiles } from './file-processing';
import { PinataAuth, publishFileToIpfs } from './pinata-api';
import { createProcessBackoffController } from './utils';

// Load .env for jwt token
// TODO: How should this be stored in a secure way?
import 'dotenv/config';

interface Opts extends RequestArgs.ProxyRequestArgs {
	readonly path?: string;
	readonly hash?: string;
}

const publishToIpfs = async (fileOrDirPath: undefined | string, auth: PinataAuth): Promise<PluginResponse> => {
	if (!fileOrDirPath) {
		throw new Error(`path was not provided`);
	}

	const { processWithBackoff } = createProcessBackoffController({
		retryCount: 5,
	});

	const result = await processFiles({
		fileOrDirPath,
		parallelCount: 10,
		processFile: async filePath => {
			// TEMP: Debug
			console.log(`publishing: ${filePath}`);

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

				// TODO: Call task sdk progress
				console.log(`Progress: ${(ratio * 100).toFixed(0)}%`);
			}
		},
	});

	// TEMP: DEBUG: Show error
	if (result.failures.length) {
		console.log('❗ Failures:\n' + result.failures.map(f => `${f.filePath}: ${f.error}`).join('\n'));
	}

	return {
		data: {
			failures: result.failures.map(x => ({
				filePath: x.filePath,
				error: x.error,
			})),
			fileIpfsHashes: result.successes.map(x => ({
				filePath: x.filePath,
				ipfsHash: x.result.ipfsHash,
			})),
		},
	};
};

const pinToIpfs = async (hash: undefined | string, auth: PinataAuth): Promise<PluginResponse> => {
	if (!hash) {
		throw new Error(`ipfs hash was not provided`);
	}

	// TODO: Implement pinning
	throw new Error('pinToIpfs: Not Implemented');
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
		return execute(opts);
	} catch (err) {
		const error = err as Error;
		if (error.message) {
			return sendAsyncErr(error.message);
		}
	}
};
