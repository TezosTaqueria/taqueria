import { RequestArgs, sendAsyncErr, sendAsyncRes } from '@taqueria/node-sdk';
import { IntersectionOpts as Opts, LIGO_DOCKER_IMAGE } from './common';
import compile from './compile';
import ligo from './ligo';
import test from './test';

const main = (parsedArgs: RequestArgs.t): Promise<void> => {
	const unsafeOpts = parsedArgs as unknown as Opts;
	switch (unsafeOpts.task) {
		case 'ligo':
			return ligo(unsafeOpts);
		case 'compile':
			return compile(unsafeOpts);
		case 'test':
			return test(parsedArgs);
		case 'get-image':
			return sendAsyncRes(LIGO_DOCKER_IMAGE);
		default:
			return sendAsyncErr(`${unsafeOpts.task} is not an understood task by the LIGO plugin`);
	}
};

export default main;
