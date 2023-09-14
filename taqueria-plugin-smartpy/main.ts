import { CompileAllOpts, CompileOpts, SmartPyOpts, TestOpts } from './common';

import { RequestArgs, sendAsyncErr } from '@taqueria/node-sdk';
import compile from './compile';
import compileAll from './compileAll';
import test from './test';

const main = (parsedArgs: RequestArgs.t): Promise<void> => {
	const unsafeArgs = parsedArgs as SmartPyOpts;
	switch (unsafeArgs.task) {
		case 'compile':
			return compile(unsafeArgs as unknown as CompileOpts);
		case 'compile-all':
			return compileAll(unsafeArgs as unknown as CompileAllOpts);
		case 'test':
			return test(unsafeArgs as unknown as TestOpts);
		default:
			return sendAsyncErr(`${unsafeArgs.task} is not an understood task by the SmartPy plugin`);
	}
};

export default main;
