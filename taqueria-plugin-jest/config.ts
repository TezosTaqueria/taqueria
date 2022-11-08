import { LoadedConfig } from '@taqueria/node-sdk';

export type JestConfig = LoadedConfig & {
	jest: {
		testsRootDir: string;
	};
};

export default JestConfig;
