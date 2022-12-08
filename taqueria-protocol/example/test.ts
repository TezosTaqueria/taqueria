import { create } from '../out/types/ConfigFileV2';
import { ConfigFileV2 } from '../types';
import configV2json from './.taq/config.json';

export const __configTest0: ConfigFileV2 = {
	...configV2json,
	language: configV2json.language as `en`,
	plugins: configV2json.plugins.map(x => ({
		...x,
		type: x.type as `npm`,
	})),
};
export const __configTest1 = create({
	...configV2json,
	language: configV2json.language as `en`,
	plugins: configV2json.plugins.map(x => ({
		...x,
		type: x.type as `npm`,
	})),
});
