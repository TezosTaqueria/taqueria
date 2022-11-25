import { sendAsyncErr } from '@taqueria/node-sdk';
import { IntersectionOpts as Opts } from './common';
import compile from './compile';
import test from './test';

const main = (parsedArgs: Opts): Promise<void> => {
	switch (parsedArgs.task) {
		case 'compile':
			return compile(parsedArgs);
		case 'test':
			return test(parsedArgs);
		default:
			return sendAsyncErr(`${parsedArgs.task} is not an understood task by the SmartPy plugin`);
	}
};

export default main;
