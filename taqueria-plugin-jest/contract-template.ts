import { execCmd } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';

interface Opts extends RequestArgs.t {
	readonly contractName: string;
	readonly partition?: string;
}

const getTestRootAbspath = (opts: Opts) => {
};

export default (args: RequestArgs.t) => {
	const opts = args as Opts;

	return execCmd('touch ');
};
