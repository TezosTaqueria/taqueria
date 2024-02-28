import { RequestArgs, sendAsyncErr } from '@taqueria/node-sdk';
import run, { RunArgs } from './run';

export const proxy = <T extends RequestArgs.t>(parsedArgs: T): Promise<void> => {
	const unsafeArgs = parsedArgs as unknown as RunArgs;
	switch (unsafeArgs.task) {
		case 'run':
			return run(unsafeArgs);
		default:
			return sendAsyncErr(`${unsafeArgs.task} is not an understood task by the TzCompose plugin`);
	}
};

export default proxy;
