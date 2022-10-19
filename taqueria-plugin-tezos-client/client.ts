import { sendAsyncErr } from '@taqueria/node-sdk';
import { IntersectionOpts as Opts } from './common';
import simulate from './simulate';
import typecheck from './typecheck';

export const client = (parsedArgs: Opts): Promise<void> => {
	switch (parsedArgs.task) {
		case 'typecheck':
			return typecheck(parsedArgs);
		case 'simulate':
			return simulate(parsedArgs);
		default:
			return sendAsyncErr(`${parsedArgs.task} is not an understood task by the Tezos-client plugin`);
	}
};

export default client;
