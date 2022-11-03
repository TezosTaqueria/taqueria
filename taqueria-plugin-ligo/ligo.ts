import { sendAsyncErr, sendAsyncJson } from '@taqueria/node-sdk';
import { IntersectionOpts as Opts, LIGO_DOCKER_IMAGE } from './common';
import compile from './compile';
import test from './test';

const ligo = (parsedArgs: Opts): Promise<void> => {
	switch (parsedArgs.task) {
		case 'compile':
			return compile(parsedArgs);
		case 'test':
			return test(parsedArgs);
		case 'get-image':
			return sendAsyncJson({
				image: LIGO_DOCKER_IMAGE,
			});
		default:
			return sendAsyncErr(`${parsedArgs.task} is not an understood task by the LIGO plugin`);
	}
};

export default ligo;
