import { sendAsyncErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import clean from './clean';

export const core = (parsedArgs: RequestArgs.ProxyRequestArgs): Promise<void> => {
	switch (parsedArgs.task) {
		case 'clean':
			return clean(parsedArgs);
		default:
			return sendAsyncErr(`${parsedArgs.task} is not an understood task by the Core plugin`);
	}
};

export default core;
