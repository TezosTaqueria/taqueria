import { sendAsyncRes } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { CustomConfig, ensurePartitionExists } from './common';

interface Opts extends RequestArgs.ProxyRequestArgs {
	readonly config: CustomConfig;
	readonly init: boolean;
	readonly partition: string;
	readonly testPattern: string;
}

const execCmd = async (cmd: string, args: string[]) => {
	const execa = await import('execa');
	const child = execa.default(cmd, args, {
		reject: false,
		buffer: false,
		// encoding: null,
		shell: true,
		stdio: 'inherit',
		env: { FORCE_COLOR: 'true' },
	});
	child.stdout?.pipe(process.stdout);
	child.stderr?.pipe(process.stdout);
	return;
};

export default async (args: RequestArgs.ProxyRequestArgs) => {
	const opts = args as Opts;

	return ensurePartitionExists(opts)
		.then(configAbsPath => {
			if (!opts.init) {
				return opts.testPattern
					? execCmd('npx', ['jest', '-c', configAbsPath, '--testPathPattern', opts.testPattern])
					: execCmd('npx', ['jest', '-c', configAbsPath]);
			}

			return sendAsyncRes('Initialized successfully.');
		});
};
