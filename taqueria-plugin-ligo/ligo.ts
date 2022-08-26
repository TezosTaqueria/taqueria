import { sendAsyncErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import compile from './compile';

interface Opts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
}

export const ligo = (parsedArgs: Opts): Promise<void> => {
	switch (parsedArgs.task) {
		case 'compile':
			return compile(parsedArgs);
		// case 'test':
		// 	return test(parsedArgs); // TODO: to be implemented in the future
		default:
			return sendAsyncErr(`${parsedArgs.task} is not an understood task by the LIGO plugin`);
	}
};

export default ligo;
