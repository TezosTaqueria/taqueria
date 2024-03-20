import { sendAsyncRes, sendErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk';
import { execa } from 'execa';
import { CustomRequestArgs, ensureSelectedPartitionExists, toRequestArgs } from './common';

const execCmd = (cmd: string, args: string[], env: string) => {
	const child = execa(cmd, args, {
		shell: true,
		reject: false,
		env: { FORCE_COLOR: 'true', TAQUERIA_ENV: env },
	});

	child.stdout?.pipe(process.stdout);
	child.stderr?.pipe(process.stderr);

	return child;
};
export default (args: RequestArgs.t) => {
	const parsedArgs = toRequestArgs(args);
	return ensureSelectedPartitionExists(parsedArgs, parsedArgs.init ? true : false)
		.then(configAbsPath => {
			if (!parsedArgs.init) {
				const retval = parsedArgs.testPattern
					? execCmd('npx', ['jest', '-c', configAbsPath, '--testPathPattern', parsedArgs.testPattern], parsedArgs.env)
					: execCmd('npx', ['jest', '-c', configAbsPath], parsedArgs.env);
				return retval.then(child => {
					if (child.exitCode === 0) return;
					else process.exit(child.exitCode);
				});
			}

			return sendAsyncRes('Initialized successfully.');
		});
};
