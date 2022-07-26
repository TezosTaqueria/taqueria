import { sendAsyncRes } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { execa } from 'execa';
import { CustomRequestArgs, ensureSelectedPartitionExists, toRequestArgs } from './common';

const execCmd = (cmd: string, args: string[]) => {
	const child = execa(cmd, args, {
		shell: true,
		reject: false,
		env: { FORCE_COLOR: 'true' },
	});

	child.stdout?.pipe(process.stdout);
	child.stderr?.pipe(process.stderr);

	return child;
};
export default async (args: RequestArgs.t) => {
	const parsedArgs = toRequestArgs(args);
	return ensureSelectedPartitionExists(parsedArgs, parsedArgs.init ? true : false)
		.then(configAbsPath => {
			if (!parsedArgs.init) {
				const retval = parsedArgs.testPattern
					? execCmd('npx', ['jest', '-c', configAbsPath, '--testPathPattern', parsedArgs.testPattern])
					: execCmd('npx', ['jest', '-c', configAbsPath]);
				return retval.then(child => {
					if (child.exitCode === 0) return;
					else process.exit(child.exitCode);
				});
			}

			return sendAsyncRes('Initialized successfully.');
		});
};
