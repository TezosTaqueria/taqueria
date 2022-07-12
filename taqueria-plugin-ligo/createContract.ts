import * as RequestArgs from '@taqueria/protocol/RequestArgs';
// import { experimental } from '@taqueria/node-sdk';
import { writeFile } from 'fs/promises';
import { jsligo_template, mligo_template, pascaligo_template, religo_template } from './ligo_templates';

interface Opts extends RequestArgs.t {
	sourceFileName?: string;
}

const registerContract = (contractName: string) => {
	console.log('Register contract', contractName);
	// registerContract(contractName);
};

const getLigoTemplate = (contractName: string): string => {
	const matchResult = contractName.match(/\.[^.]+$/);
	const ext = matchResult ? matchResult[0] : null;
	switch (ext) {
		case '.mligo':
			return mligo_template;
		case '.ligo':
			return pascaligo_template;
		case '.religo':
			return religo_template;
		case '.jsligo':
			return jsligo_template;
		default:
			return mligo_template;
	}
};

const createContract = async (arg: Opts) => {
	const contractName = arg.sourceFileName as string;
	const contractsDir = `${arg.config.projectDir}/${arg.config.contractsDir}`;
	const ligo_template = getLigoTemplate(contractName);
	await writeFile(`${contractsDir}/${contractName}`, ligo_template);
	registerContract(contractName);
};

export default createContract;
