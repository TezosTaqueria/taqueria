import { sendAsyncErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import originate from './originate';
import transfer from './transfer';

interface Opts extends RequestArgs.ProxyRequestArgs {
	// from originate.ts
	contract: string;
	storage: string;
	alias?: string;
	// from transfer.ts
	src_alias: string;
	dst_alias: string;
	amount?: number;
	param?: string;
	entrypoint?: string;
}

export const taquito = (parsedArgs: Opts): Promise<void> => {
	switch (parsedArgs.task) {
		case 'originate':
		case 'deploy':
			return originate(parsedArgs);
		case 'transfer':
		case 'call':
			return transfer(parsedArgs);
		default:
			return sendAsyncErr(`${parsedArgs.task} is not an understood task by the Taquito plugin`);
	}
};

export default taquito;
