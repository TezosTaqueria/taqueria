import { getArch, getLatestFlextesaImage } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { join } from 'path';

export interface TypeCheckOpts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
}

export interface SimulateOpts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
	storage?: string;
	param: string;
	entrypoint?: string;
}

// To be used for the main entrypoint of the plugin
export type IntersectionOpts = TypeCheckOpts & SimulateOpts;

// To be used for common functions in this file
type UnionOpts = TypeCheckOpts | SimulateOpts;

const ENDPOINT = process.env['TAQ_TEZOS_CLIENT_RPC'] ?? 'https://ghostnet.ecadinfra.com';
export const GLOBAL_OPTIONS = `--endpoint ${ENDPOINT}`;

export const trimTezosClientMenuIfPresent = (msg: string): string => {
	return msg.replace(/Usage:(.|\n)+/, '');
};

export const getInputFilename = (opts: UnionOpts, sourceFile: string) =>
	join('/project', opts.config.artifactsDir, sourceFile);

export const getCheckFileExistenceCommand = async (parsedArgs: UnionOpts, sourceFile: string): Promise<string> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const arch = await getArch();
	const flextesaImage = await getLatestFlextesaImage(arch);
	const baseCmd = `docker run --rm -v \"${projectDir}\":/project -w /project --platform ${arch} ${flextesaImage} ls`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const cmd = `${baseCmd} ${inputFile}`;
	return cmd;
};
