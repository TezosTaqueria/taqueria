import { sendAsyncErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import compile from './compile';
import { test } from './test';

interface Opts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
}

export const ligo = (parsedArgs: Opts): Promise<void> => {
	switch (parsedArgs.task) {
		case 'compile':
			return compile(parsedArgs);
		case 'test':
			return test(parsedArgs);
		default:
			return sendAsyncErr(`${parsedArgs.task} is not an understood task by the LIGO plugin`);
	}
};

export default ligo;
