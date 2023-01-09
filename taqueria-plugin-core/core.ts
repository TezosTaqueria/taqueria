import { RequestArgs, sendAsyncErr } from '@taqueria/node-sdk';
import clean from './clean';
import { IntersectionOpts as Opts } from './common';

export const core = (parsedArgs: RequestArgs.t): Promise<void> => {
	const unsafeOpts = parsedArgs as unknown as Opts;
	switch (unsafeOpts.task) {
		case 'clean':
			return clean(parsedArgs);
		default:
			return sendAsyncErr(`${unsafeOpts.task} is not an understood task by the Core plugin`);
	}
};

export default core;
