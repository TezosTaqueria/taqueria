import { RequestArgs, sendAsyncErr, sendAsyncRes } from '@taqueria/node-sdk';
import { configure, IntersectionOpts as Opts } from './common';
import compile from './compile';
import compileAll from './compile-all';
import ligo from './ligo';
import test from './test';

const main =
	(dockerImage: string, dockerImageEnvVar: string, canUseLIGOBinary: boolean) =>
	(parsedArgs: RequestArgs.t): Promise<void> => {
		const commonObj = configure(dockerImage, dockerImageEnvVar, canUseLIGOBinary);
		const unsafeOpts = parsedArgs as unknown as Opts;
		switch (unsafeOpts.task) {
			case 'ligo':
				return ligo(commonObj, unsafeOpts);
			case 'compile':
				return compile(commonObj, unsafeOpts);
			case 'compile-all':
				return compileAll(commonObj, unsafeOpts);
			case 'test':
				return test(commonObj, parsedArgs);
			case 'get-image':
				return sendAsyncRes(commonObj.getLigoDockerImage());
			default:
				return sendAsyncErr(`${unsafeOpts.task} is not an understood task by the LIGO plugin`);
		}
	};

export default main;
