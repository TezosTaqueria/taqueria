import * as Config from '@taqueria/protocol/Config';
import * as Environment from '@taqueria/protocol/Environment';

// Copied from state package
// const getProjectAbsPath = async (search = './'): Promise<string> => {
// 	const dir = resolve(search);

// 	// If we've reached / or c:\, then give up
// 	if (/^(\/|[A-Z]:\\?)$/.test(dir)) {
// 		throw 'Could not find project directory';
// 	}

// 	const filename = join(dir, '.taq', 'config.json');
// 	try {
// 		const exists = await stat(filename);

// 		// TODO: Will this work on Windows?
// 		// ... I might need to use .taq\config.json
// 		return filename.replace('.taq/config.json', '');
// 	} catch {
// 		// TODO: Will this work on Windows?
// 		// I might need to do ..\
// 		return await getProjectAbsPath(join(dir, '../'));
// 	}
// };

// Copied from state package
// const getConfig = async (projectAbspath: string): Promise<Config.t> => {
// 	try {
// 		const configAbspath = join(projectAbspath, '.taq', 'config.json');
// 		const contents = await readFile(configAbspath, 'utf-8');
// 		const unvalided = JSON.parse(contents);
// 		return Config.create(unvalided);
// 	} catch {
// 		throw 'Could not load .taq/config.json';
// 	}
// };

// const sendErr = (msg: string, newline = true) => {
// 	if (!msg || msg.length === 0) return;
// 	return newline
// 		? console.error(msg)
// 		: process.stderr.write(msg) as unknown as void;
// };

// const getConfigJSON = async (): Promise<Config.t> => {
// 	const projectAbspath = await getProjectAbsPath();
// 	const config = await getConfig(projectAbspath);
// 	return config;
// };

const getCurrentEnv = (config: Config.t): Environment.t | undefined => {
	const currentEnv = config?.environment?.default ? config.environment.default as string : 'development';
	return config.environment && config.environment[currentEnv]
		? config.environment[currentEnv] as Environment.t | undefined
		: undefined;
};

export const getAliasAddress = (config: any, alias: string): string => {
	const currentEnv = getCurrentEnv(config);
	if (currentEnv?.aliases?.[alias]?.address) return currentEnv.aliases[alias].address;
	alert(`Address for alias, ${alias}, is missing. Please deploy a contract with such alias`);
	return '';
};
