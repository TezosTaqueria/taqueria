import * as esbuild from 'esbuild';
import { defineConfig, Options } from 'tsup';

const config: Options = {
	entry: [
		'[!.]+.ts',
		'out/types/*.ts',
		'out/*.ts',
	],
	sourcemap: true,
	target: 'es2019',
	outDir: './',
	dts: false,
	clean: false,
	shims: true,
	skipNodeModulesBundle: true,
	platform: 'neutral',
	esbuildPlugins: [{
		name: 'path-shim',
		setup: build => {
			build.onResolve({ filter: /^path$/ }, _args => {
				const result: esbuild.OnResolveResult = {
					namespace: 'path-shim',
				};
				return result;
			});

			build.onLoad({ filter: /.*/, namespace: 'path-shim' }, _args => {
				const result: esbuild.OnLoadResult = {
					contents: `export {resolve: (filename: str) => filename}`,
				};

				return result;
			});
		},
	}],
};

export default defineConfig(config);
