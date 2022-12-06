import { RequestArgs, sendAsyncErr, sendAsyncRes } from '@taqueria/node-sdk';
import client from './client';
import { getClientDockerImage, IntersectionOpts as Opts } from './common';
import simulate from './simulate';
import typecheck from './typecheck';

const main = (parsedArgs: RequestArgs.t): Promise<void> => {
	const unsafeOpts = parsedArgs as unknown as Opts;
	switch (unsafeOpts.task) {
		case 'client':
			return client(unsafeOpts);
		case 'typecheck':
			return typecheck(unsafeOpts);
		case 'simulate':
			return simulate(unsafeOpts);
		case 'get-image':
			return sendAsyncRes(getClientDockerImage());
		default:
			return sendAsyncErr(`${unsafeOpts.task} is not an understood task by the Tezos-client plugin`);
	}
};

export default main;
