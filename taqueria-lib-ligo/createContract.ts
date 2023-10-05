import { sendAsyncErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk';
import { writeFile } from 'fs/promises';
import * as default_templates from './ligo_templates';

interface Opts extends RequestArgs.t {
	sourceFileName?: string;
	syntax?: string;
}

const getLigoTemplate = async (
	contractName: string,
	syntax: string | undefined,
	templateOverrides?: Record<string, string>,
): Promise<string> => {
	const matchResult = contractName.match(/\.[^.]+$/);
	const ext = matchResult ? matchResult[0].substring(1) : null;
	const templates = templateOverrides ?? default_templates;

	if (syntax === 'mligo') return templates.mligo_template;
	if (syntax === 'jsligo') return templates.jsligo_template;

	if (syntax === undefined) {
		if (ext === 'mligo') return templates.mligo_template;
		if (ext === 'jsligo') return templates.jsligo_template;
		return sendAsyncErr(
			`Unable to infer LIGO syntax from "${contractName}". Please specify a LIGO syntax via the --syntax option`,
		);
	} else {
		return sendAsyncErr(`"${syntax}" is not a valid syntax. Please specify a valid LIGO syntax`);
	}
};

const createContract = (templates?: Record<string, string>) => (args: RequestArgs.t) => {
	const unsafeOpts = args as unknown as Opts;
	const contractName = unsafeOpts.sourceFileName as string;
	const syntax = unsafeOpts.syntax;
	const contractsDir = `${args.config.projectDir}/${args.config.contractsDir}`;
	return getLigoTemplate(contractName, syntax, templates)
		.then(ligo_template => writeFile(`${contractsDir}/${contractName}`, ligo_template));
};

export default createContract;
