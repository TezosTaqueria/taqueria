import { sendAsyncErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import simulate from './simulate';
import typecheck from './typecheck';

interface Opts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
	storage?: string;
	param: string;
	entrypoint?: string;
}

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
