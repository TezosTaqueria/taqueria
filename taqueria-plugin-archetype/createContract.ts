import { experimental, RequestArgs, sendAsyncErr } from '@taqueria/node-sdk';
import { writeFile } from 'fs/promises';
import { arl_template } from './archetype_template';

interface Opts extends RequestArgs.t {
	sourceFileName?: string;
}

const registerContract = (arg: Opts, contractName: string) => {
	experimental.registerContract(arg, contractName);
};

const validateExtension = async (contractName: string) => {
	const matchResult = contractName.match(/\.arl$/);
	if (matchResult) return;
	return sendAsyncErr(`"${contractName}" doesn't have extension "arl".`);
};

const createContract = (args: RequestArgs.t) => {
	const contractName = args.sourceFileName as string;
	const contractsDir = `${args.config.projectDir}/${args.config.contractsDir}`;
	return validateExtension(contractName)
		.then(_ => writeFile(`${contractsDir}/${contractName}`, arl_template))
		.then(_ => registerContract(args, contractName));
};

export default createContract;
