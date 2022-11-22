import { sendAsyncErr } from '@taqueria/node-sdk';
import { IntersectionOpts as Opts } from './common';
import fund from './fund';
import instantiate_account from './instantiate_account';
import originate from './originate';
import transfer from './transfer';

export const main = (parsedArgs: Opts): Promise<void> => {
	switch (parsedArgs.task) {
		case 'deploy':
			return originate(parsedArgs);
		case 'transfer':
			return transfer(parsedArgs);
		case 'instantiate-account':
			return instantiate_account(parsedArgs);
		case 'fund':
			return fund(parsedArgs);
		default:
			return sendAsyncErr(`${parsedArgs.task} is not an understood task by the Taquito plugin`);
	}
};

export default main;
