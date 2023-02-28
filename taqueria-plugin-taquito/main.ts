import { RequestArgs, sendAsyncErr } from '@taqueria/node-sdk';
import { IntersectionOpts as Opts } from './common';
import fund from './fund';
import instantiate_account from './instantiate_account';
import originate from './originate';
import transfer from './transfer';

export const main = (parsedArgs: RequestArgs.t): Promise<void> => {
	const unsafeArgs = parsedArgs as unknown as Opts;
	switch (unsafeArgs.task) {
		case 'deploy':
			return originate(unsafeArgs);
		case 'transfer':
			return transfer(unsafeArgs);
		case 'instantiate-account':
			return instantiate_account(parsedArgs);
		case 'fund':
			return fund(unsafeArgs);
		default:
			return sendAsyncErr(`${unsafeArgs} is not an understood task by the Taquito plugin`);
	}
};

export default main;
