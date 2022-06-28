import { execCmd, sendAsyncErr, sendErr, sendJsonRes } from '@taqueria/node-sdk';
import { LikeAPromise, PluginResponse, RequestArgs, TaqError } from '@taqueria/node-sdk/types';
import glob from 'fast-glob';
import { readFile } from 'fs/promises';
import { basename, extname, join } from 'path';

interface Opts extends RequestArgs.t {
	sourceFile?: string;
}

const getInputFilename = (opts: Opts) =>
	(sourceFile: string) => {
		const inputFile = basename(sourceFile, extname(sourceFile));
		return join(opts.config.contractsDir, `${inputFile}.arl`);
	};

const getContractArtifactFilename = (opts: Opts) =>
	(sourceFile: string) => {
		const outFile = basename(sourceFile, extname(sourceFile));
		return join(opts.config.artifactsDir, `${outFile}.tz`);
	};

const getCompileCommand = (opts: Opts) =>
	(sourceFile: string) => {
		const { projectDir } = opts;
		const inputFile = getInputFilename(opts)(sourceFile);
		const baseCommand =
			`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -u $(id -u):$(id -g) -w /project completium/archetype:1.2.12 ${inputFile}`;
		const outFile = `-o ${getContractArtifactFilename(opts)(sourceFile)}`;
		const cmd = `${baseCommand} ${outFile}`;
		return cmd;
	};

const compileContract = (opts: Opts) =>
	(sourceFile: string): Promise<{ contract: string; artifact: string }> =>
		// const sourceAbspath = join(opts.contractsDir, sourceFile)
		execCmd(getCompileCommand(opts)(sourceFile))
			.then(({ stderr }) => { // How should we output warnings?
				if (stderr.length > 0) sendErr(stderr);
				return {
					contract: sourceFile,
					artifact: getContractArtifactFilename(opts)(sourceFile),
				};
			})
			.catch(err => {
				sendErr(' ');
				sendErr(err.message.split('\n').slice(1).join('\n'));
				return Promise.resolve({
					contract: sourceFile,
					artifact: 'Not compiled',
				});
			});

const compileAll = (opts: Opts): Promise<{ contract: string; artifact: string }[]> => {
	// TODO: Fetch list of files from SDK
	return glob(
		['**/*.arl'],
		{ cwd: opts.config.contractsDir, absolute: false },
	)
		.then(entries => entries.map(compileContract(opts)))
		.then(processes =>
			processes.length > 0
				? processes
				: [{ contract: 'None found', artifact: 'N/A' }]
		)
		.then(promises => Promise.all(promises));
};

const compile = <T>(parsedArgs: Opts): LikeAPromise<PluginResponse, TaqError.t> => {
	const p = parsedArgs.sourceFile
		? compileContract(parsedArgs)(parsedArgs.sourceFile)
			.then(result => [result])
		: compileAll(parsedArgs)
			.then(results => {
				if (results.length === 0) sendErr('No contracts found to compile.');
				return results;
			});

	return p
		.then(sendJsonRes)
		.catch(err => sendAsyncErr(err, false));
};

export default compile;
