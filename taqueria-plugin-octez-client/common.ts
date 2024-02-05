import { getArchSync, getDockerImage, ProxyTaskArgs, RequestArgs } from '@taqueria/node-sdk';
import { join } from 'path';

// Should point to the latest stable version, so it needs to be updated as part of our release process.
const getFlextesaImage = (_arch: 'linux/arm64/v8' | 'linux/amd64'): string =>
	'tezos/tezos:master_9a1982bb_20240205174255';

const OCTEZ_CLIENT_IMAGE_ENV_VAR = 'TAQ_OCTEZ_CLIENT_IMAGE';

export const getClientDockerImage = (): string =>
	getDockerImage(getFlextesaImage(getArchSync()), OCTEZ_CLIENT_IMAGE_ENV_VAR);

export interface ClientOpts extends ProxyTaskArgs.t {
	command: string;
}

export interface TypeCheckOpts extends ProxyTaskArgs.t {
	sourceFile: string;
}

export interface TypeCheckAllOpts extends ProxyTaskArgs.t {
}

export interface SimulateOpts extends ProxyTaskArgs.t {
	sourceFile?: string;
	storage?: string;
	param?: string;
	entrypoint?: string;
}

export type IntersectionOpts = ClientOpts & TypeCheckOpts & TypeCheckAllOpts & SimulateOpts;

type UnionOpts = ClientOpts | TypeCheckOpts | TypeCheckAllOpts | SimulateOpts;

const ENDPOINT = process.env['TAQ_TEZOS_CLIENT_RPC'] ?? 'https://ghostnet.tezos.marigold.dev';
export const GLOBAL_OPTIONS = `--endpoint ${ENDPOINT}`;

export const trimTezosClientMenuIfPresent = (msg: string): string => {
	return msg.replace(/Usage:(.|\n)+/, '');
};

export const getInputFilename = (opts: UnionOpts, sourceFile: string) =>
	join('/project', opts.config.artifactsDir ?? 'artifacts', sourceFile);

export const getCheckFileExistenceCommand = async (parsedArgs: UnionOpts, sourceFile: string): Promise<string> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const arch = getArchSync();
	const baseCmd =
		`docker run --rm -v \"${projectDir}\":/project -w /project --platform ${arch} ${getClientDockerImage()} ls`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const cmd = `${baseCmd} ${inputFile}`;
	return cmd;
};
