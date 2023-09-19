// tsConfigModule.ts
const tsConfig = {
	compilerOptions: {
		target: 'ES2020',
		module: 'Node16',
		moduleResolution: 'Node16',
		declaration: true,
		isolatedModules: true,
		allowSyntheticDefaultImports: true,
		esModuleInterop: true,
		forceConsistentCasingInFileNames: true,
		strict: true,
		skipLibCheck: true,
		allowJs: true,
	},
};

export default tsConfig;
