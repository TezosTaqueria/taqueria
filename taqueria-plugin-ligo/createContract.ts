import { experimental, sendAsyncErr } from '@taqueria/node-sdk';
import * as RequestArgs from '@taqueria/protocol/RequestArgs';
import { writeFile } from 'fs/promises';
import { jsligo_template, mligo_template, pascaligo_template, religo_template } from './ligo_templates';

interface Opts extends RequestArgs.t {
	sourceFileName?: string;
	syntax?: string;
}

const registerContract = (arg: Opts, contractName: string) => {
	experimental.registerContract(arg, contractName);
};

const getLigoTemplate = async (contractName: string, syntax: string | undefined): Promise<string> => {
	const matchResult = contractName.match(/\.[^.]+$/);
	const ext = matchResult ? matchResult[0].substring(1) : null;

	if (syntax === 'mligo') return mligo_template;
	if (syntax === 'ligo') return pascaligo_template;
	if (syntax === 'religo') return religo_template;
	if (syntax === 'jsligo') return jsligo_template;

	if (syntax === undefined) {
		if (ext === 'mligo') return mligo_template;
		if (ext === 'ligo') return pascaligo_template;
		if (ext === 'religo') return religo_template;
		if (ext === 'jsligo') return jsligo_template;
		return sendAsyncErr(
			`Unable to infer LIGO syntax from "${contractName}". Please specify a LIGO syntax via the --syntax option`,
		);
	} else {
		return sendAsyncErr(`"${syntax}" is not a valid syntax. Please specify a valid LIGO syntax`);
	}
};

const createContract = (arg: Opts) => {
	const contractName = arg.sourceFileName as string;
	const syntax = arg.syntax;
	const contractsDir = `${arg.config.projectDir}/${arg.config.contractsDir}`;
	return getLigoTemplate(contractName, syntax)
		.then(ligo_template => writeFile(`${contractsDir}/${contractName}`, ligo_template))
		.then(_ => registerContract(arg, contractName));
};

export default createContract;
