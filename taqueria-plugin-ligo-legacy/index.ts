import { configurePlugin } from '@taqueria/lib-ligo';

configurePlugin({
	name: '@taqueria/plugin-ligo-legacy',
	alias: 'ligo-legacy',
	dockerImage: 'ligolang/ligo:0.73.0',
	dockerImageEnvVar: 'TAQ_LIGO_LEGACY_IMAGE',
	unparsedArgs: process.argv,
	canUseLIGOBinary: false,
});
