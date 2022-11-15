import { getArchSync, getDockerImage } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { join } from 'path';

export const getFlextesaImage = (arch: 'linux/arm64/v8' | 'linux/amd64'): string =>
	arch === 'linux/arm64/v8' ? 'oxheadalpha/flextesa:rc-20220915-arm64' : 'oxheadalpha/flextesa:20220715';

export const DOCKER_IMAGE = getDockerImage(getFlextesaImage(getArchSync()), 'TAQ_TEZOS_CLIENT_IMAGE');
export interface ClientOpts extends RequestArgs.ProxyRequestArgs {
	command: string;
}

export interface TypeCheckOpts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
}

export interface SimulateOpts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
	storage?: string;
	param: string;
	entrypoint?: string;
}

export type IntersectionOpts = ClientOpts & TypeCheckOpts & SimulateOpts;

type UnionOpts = ClientOpts | TypeCheckOpts | SimulateOpts;

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
	const arch = getArchSync();
	const baseCmd = `docker run --rm -v \"${projectDir}\":/project -w /project --platform ${arch} ${DOCKER_IMAGE} ls`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const cmd = `${baseCmd} ${inputFile}`;
	return cmd;
};
