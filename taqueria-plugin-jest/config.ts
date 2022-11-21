import { LoadedConfig } from '@taqueria/node-sdk';

export type JestConfig = LoadedConfig.t & {
	jest: {
		testsRootDir: string;
	};
};

export default JestConfig;
