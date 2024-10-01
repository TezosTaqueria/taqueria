import {
	execCmd,
	getArch,
	getDefaultSandboxAccount,
	getDockerImage,
	NonEmptyString,
	noop,
	readJsonFile,
	sendAsyncErr,
	sendAsyncRes,
	sendErr,
	sendJsonRes,
	spawnCmd,
	stringToSHA256,
	writeJsonFile,
} from '@taqueria/node-sdk';

import { Opts } from './types';

export const proxy = (unparsedArgs: Opts): Promise<void> => {
	return Promise.resolve();
};
export default proxy;
