import { readdir, readFile, stat } from 'fs/promises';
import path from 'path';

class CustomErr extends Error {}

export class TaqNotFoundError extends CustomErr {
	public isCustomErr = true;
}

export function isCustomError(err: unknown): err is Error {
	return typeof err === 'object' && (err as object).hasOwnProperty('isCustomErr');
}

export async function checkTaqProject(dir: string) {
	try {
		const searchPath = path.join(dir, '.taq');
		await stat(searchPath);
		return searchPath;
	} catch {
		throw new TaqNotFoundError(`${dir} is not a valid Taqueria project.`);
	}
}

function getEnvName(filename: string, prefix = '') {
	return `${prefix}TAQ_${filename}`
		.replace('.json', '')
		.replace(/\./mg, '_')
		.replace(/\-/mg, '_')
		.toUpperCase();
}

export class TaqConfigError extends CustomErr {}
export async function getConfig(taqDir: string, prefix: string) {
	try {
		const files = await readdir(taqDir);
		return files.reduce(
			async (retval, file) => {
				if (!file.endsWith('.json')) return (await retval);
				return {
					...(await retval),
					[getEnvName(file, prefix)]: await readFile(path.join(taqDir, file), 'utf-8'),
				};
			},
			Promise.resolve({}),
		);
	} catch {
		throw new TaqConfigError(
			`There was a problem reading the config files in ${taqDir}. Please check file permissions are try again.`,
		);
	}
}

export async function getEncodedConfig(taqDir: string, prefix: string) {
	const config = await getConfig(taqDir, prefix);
	return Object.fromEntries(
		Object.entries(config).map(
			([k, v]) => [k, btoa(v as string)],
		),
	);
}

export async function getEnv(env: typeof process.env, taqDir: string, prefix: string = '') {
	return Object.entries(getEncodedConfig(taqDir, prefix)).reduce(
		(retval, [k, v]) => ({ ...retval, [k]: v }),
		env,
	);
}
