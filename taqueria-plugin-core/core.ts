import { sendAsyncErr } from '@taqueria/node-sdk';
import clean from './clean';
import { IntersectionOpts as Opts } from './common';

export const core = (parsedArgs: Opts): Promise<void> => {
	switch (parsedArgs.task) {
		case 'clean':
			return clean(parsedArgs);
		default:
			return sendAsyncErr(`${parsedArgs.task} is not an understood task by the Core plugin`);
	}
};

export default core;
