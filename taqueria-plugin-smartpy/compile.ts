import { execCmd, sendAsyncJsonRes, sendErr } from '@taqueria/node-sdk';
import { RequestArgs, TaqError } from '@taqueria/node-sdk/types';
import glob from 'fast-glob';
import { readFile } from 'fs/promises';
import { basename, join } from 'path';

interface Opts extends RequestArgs.ProxyRequestArgs {
	sourceFile?: string;
}

const getArtifacts = (sourceAbspath: string) => {
	return readFile(sourceAbspath, { encoding: 'utf-8' })
		.then((source: string) => {
			const pattern = new RegExp(/add_compilation_target\s*\(\s*(['"])([^'"]+)\1/, 'mg');
			const results = source.matchAll(pattern);
			return results
				? Array.from(results).map(match => match[2])
				: ['--'];
		});
};

const getCompileCommand = (opts: Opts) =>
	(sourceAbspath: string) => `~/smartpy-cli/SmartPy.sh compile ${sourceAbspath} ${opts.config.artifactsDir}`;

const compileContract = (opts: Opts) =>
	(sourceFile: string) => {
		const sourceAbspath = join(opts.config.contractsDir, sourceFile);
		return execCmd(getCompileCommand(opts)(sourceAbspath))
			.then(async ({ stderr }) => { // How should we output warnings?
				if (stderr.length > 0) sendErr(`\n${stderr}`);

				return {
					contract: sourceFile,
					artifact: await getArtifacts(sourceAbspath),
				};
			})
			.catch(err => {
				sendErr(' ');
				sendErr(err.message.split('\n').slice(1).join('\n'));
				return Promise.resolve({
					contract: sourceFile,
					artifact: 'Not compiled',
				});
			})
			.then(() => getArtifacts(sourceAbspath))
			.then((artifacts: string[]) => ({ contract: sourceFile, artifacts }));
	};

const compileAll = (opts: Opts): Promise<{ contract: string; artifacts: string[] }[]> => {
	// TODO: Fetch list of files from SDK
	return glob(
		['**/*.py'],
		{ cwd: opts.config.contractsDir, absolute: false },
	)
		.then(entries => entries.map(compileContract(opts)))
		.then(promises => Promise.all(promises));
};

export const compile = <T>(parsedArgs: Opts) => {
	const p = parsedArgs.sourceFile
		? compileContract(parsedArgs)(parsedArgs.sourceFile)
			.then(data => [data])
		: compileAll(parsedArgs)
			.then(results => {
				if (results.length === 0) sendErr('No contracts found to compile.');
				return results;
			});

	return p.then(sendAsyncJsonRes);
};

export default compile;
