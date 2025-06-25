import { execCmd, getArch, getArchSync, getDockerImage, ProxyTaskArgs, RequestArgs } from '@taqueria/node-sdk';
import { join } from 'path';

// Should point to the latest stable version, so it needs to be updated as part of our release process.
const getFlextesaImage = (_arch: 'linux/arm64/v8' | 'linux/amd64'): string => 'tezos/tezos:octez-v22.1';

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

// Need to talk to ECAD Labs about how to suppress warnings
const ENDPOINT = process.env['TAQ_TEZOS_CLIENT_RPC'] ?? 'https://rpc.tzbeta.net';
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
		`docker run --rm -v \"${projectDir}\":/project -w /project --platform ${arch} --entrypoint /bin/ls ${getClientDockerImage()}`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const cmd = `${baseCmd} ${inputFile}`;
	return cmd;
};

/**
 * Executes an octez-client command in a Docker container
 * @param args The octez-client command arguments
 * @param projectDir The project directory
 * @returns Promise with the command execution result
 */
export const execOctezClient = async (args: string, projectDir?: string) => {
	const actualProjectDir = projectDir ?? process.env.PROJECT_DIR;
	if (!actualProjectDir) throw `No project directory provided`;

	const arch = await getArch();
	const flextesaImage = getClientDockerImage();
	const baseCmd =
		`docker run --rm --entrypoint octez-client -v \"${actualProjectDir}\":/project -w /project --platform ${arch} ${flextesaImage}`;
	const cmd = `${baseCmd} ${GLOBAL_OPTIONS} ${args}`;

	return await execCmd(cmd, stderr => stderr.replace(/.*Disclaimer:[\s\S]*?\n\n/gs, '').trim());
};
