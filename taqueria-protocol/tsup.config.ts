import * as esbuild from 'esbuild';
import { readFile } from 'fs/promises';
import { defineConfig, Options } from 'tsup';

const config: Options = {
	entry: [
		'*.ts',
		'out/types/**/*.ts',
		'out/*.ts',
	],
	sourcemap: true,
	target: 'es2019',
	outDir: './',
	dts: false,
	clean: false,
	shims: true,
	bundle: true,
	skipNodeModulesBundle: true,
	platform: 'neutral',
	tsconfig: './tsconfig.json',
	// esbuildPlugins: [
	// 	{
	// 		name: 'path-shim',
	// 		setup: build => {
	// 			build.onResolve({ filter: /^path$/ }, _args => {
	// 				const result: esbuild.OnResolveResult = {
	// 					namespace: 'path-shim',
	// 				};
	// 				return result;
	// 			});

	// 			build.onLoad({ filter: /.*/, namespace: 'path-shim' }, _args => {
	// 				const result: esbuild.OnLoadResult = {
	// 					contents: `export {resolve: (filename: str) => filename}`,
	// 				};

	// 				return result;
	// 			});
	// 		},
	// 	},

	// 	// The @taqueria/protocol package is consumed by both the Deno and NodeJS Runtimes
	// 	// As Deno requires relative or absolute paths with file extensions, we use an import map
	// 	// to circumvent around this:
	// 	// E.g.: `import '@taqueria/protocol/out/types/Alias' // maps to ./taqueria-protocol/out/types/Alias`
	// 	//
	// 	// In NodeJS, we can import `@taqueria/protocol/out/types/Alias` from _within_ the `@taqueria/protocol` package.
	// 	// However, in the browser, we cannot - we need to use `./out/types/Alias`
	// 	// This plugin does the search/replace necessary to achieve the above.
	// 	{
	// 		name: 'resolve-generated-output',
	// 		setup: build => {
	// 			const fixImports = (path: string, contents: string) => {
	// 				if (path.includes('out/types')) {
	// 					return contents
	// 						.replace(/(['"])\@taqueria\/protocol\/out\/types\//gm, '$1./')
	// 						.replace(/(['"])\@taqueria\/protocol\/out\//gm, '$1../')
	// 						.replace(/(['"])\@taqueria\/protocol\//gm, '$1../../');
	// 				} else if (path.includes('out')) {
	// 					return contents
	// 						.replace(/(['"])\@taqueria\/protocol\/out\/types\//gm, '$1./types/')
	// 						.replace(/(['"])\@taqueria\/protocol\/out\//gm, '$1./')
	// 						.replace(/(['"])\@taqueria\/protocol\//gm, '$1../');
	// 				} else {
	// 					return contents
	// 						.replace(/(['"])\@taqueria\/protocol\/out\/types\//gm, '$1./out/types/')
	// 						.replace(/(['"])\@taqueria\/protocol\/out\//gm, '$1./out/')
	// 						.replace(/(['"])\@taqueria\/protocol\//gm, '$1./');
	// 				}
	// 			};

	// 			build.onLoad({ filter: /.ts/ }, async ({ path }) => {
	// 				console.error(path);
	// 				const source = await readFile(path, 'utf8');
	// 				const retval: esbuild.OnLoadResult = {
	// 					contents: fixImports(path, source),
	// 					loader: 'ts',
	// 				};
	// 				return retval;
	// 			});
	// 		},
	// 	},
	// ],
};

export default defineConfig(config);
