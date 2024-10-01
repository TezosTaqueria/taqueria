import { sendAsyncRes, sendErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk';
import { spawn } from 'child_process';
import { CustomRequestArgs, ensureSelectedPartitionExists, toRequestArgs } from './common';

const execCmd = (cmd: string, args: string[], env: string): Promise<number> => {
	return new Promise(resolve => {
		const child = spawn(cmd, args, {
			shell: true,
			env: { ...process.env, FORCE_COLOR: 'true', TAQUERIA_ENV: env },
		});

		child.stdout.pipe(process.stdout);
		child.stderr.pipe(process.stderr);

		child.on('close', code => {
			resolve(code ?? 0);
		});
	});
};

export default (args: RequestArgs.t) => {
	const parsedArgs = toRequestArgs(args);
	return ensureSelectedPartitionExists(parsedArgs, parsedArgs.init ? true : false)
		.then(configAbsPath => {
			if (!parsedArgs.init) {
				const jestArgs = ['-c', configAbsPath];
				if (parsedArgs.testPattern) {
					jestArgs.push('--testPathPattern', parsedArgs.testPattern);
				}
				return execCmd('npx', ['jest', ...jestArgs], parsedArgs.env)
					.then(exitCode => {
						if (exitCode !== 0) process.exit(exitCode);
					});
			}

			return sendAsyncRes('Initialized successfully.');
		});
};
