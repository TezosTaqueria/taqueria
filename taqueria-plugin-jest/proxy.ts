import { sendAsyncRes } from '@taqueria/node-sdk';
import { execa } from 'execa';
import { CustomRequestArgs, ensurePartitionExists } from './common';

interface Opts extends CustomRequestArgs {
	readonly init: boolean;
	readonly partition: string;
	readonly testPattern: string;
}

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

export default async (args: Opts) => {
	return ensurePartitionExists(args)
		.then(configAbsPath => {
			if (!args.init) {
				const retval = args.testPattern
					? execCmd('npx', ['jest', '-c', configAbsPath, '--testPathPattern', args.testPattern])
					: execCmd('npx', ['jest', '-c', configAbsPath]);
				return retval.then(child => {
					if (child.exitCode === 0) return;
					else process.exit(child.exitCode);
				});
			}

			return sendAsyncRes('Initialized successfully.');
		});
};
