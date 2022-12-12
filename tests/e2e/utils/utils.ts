import { TezosToolkit } from '@taquito/taquito';
import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import path from 'path';
import util from 'util';
const exec = util.promisify(exec1);

export const sleep = (ms: number) => new Promise((resolve, _reject) => setTimeout(resolve, ms));

export const generateTestProject = async (
	projectPath: string,
	packageNames: string[] = [],
	localPackages: boolean = true,
) => {
	const targetDir = path.join('/tmp', projectPath);

	const projectInit = await exec(`taq init ${targetDir}`);

	await checkFolderExistsWithTimeout(targetDir);
	await fsPromises.chmod(targetDir, 0o777);

	await exec(`touch package.json`, { cwd: `${targetDir}`, encoding: `utf-8` });
	await exec('npm init -y', { cwd: `${targetDir}`, encoding: 'utf-8' });
	await exec(`mv ${targetDir} ./${projectPath}`, { encoding: 'utf8' });

	await checkFolderExistsWithTimeout(path.join('./', projectPath, 'package.json'));
	await exec('npm uninstall @taqueria/plugin-core');
	await installDependencies(projectPath, [...packageNames, 'core'], localPackages);

	return projectInit;
};

export async function getContainerName(dockerName: string): Promise<string> {
	const [_dockerContainerHeader, dockerContainerInfo] =
		(await exec(`docker ps --filter "name=taq-flextesa-${dockerName}" --no-trunc`)).stdout.split(/\r?\n/);
	const containerInfoArray = dockerContainerInfo.split('   ');
	const dockerContainerName = containerInfoArray[containerInfoArray.length - 1];
	return dockerContainerName;
}

export async function getContainerImage(dockerName: string): Promise<string> {
	const dockerContainerInfo =
		(await exec(`docker ps -a --filter "name=taq-flextesa-${dockerName}" --no-trunc | tail -1`)).stdout.split('   ');

	return dockerContainerInfo[1] ?? null;
}

export async function getContainerImages(dockerName: string): Promise<RegExpMatchArray | null> {
	const dockerContainerInfo = (await exec(`docker ps -a --filter "name=taq-flextesa-${dockerName}" --no-trunc`)).stdout;
	const dockerContainerImages = dockerContainerInfo.match(/ghcr.io\/ecadlabs\/taqueria-flextesa:[0-9,a-z,-]+/g);
	return dockerContainerImages;
}

export async function getContainerID(dockerName: string): Promise<string> {
	const [_dockerContainerHeader, dockerContainerInfo] =
		(await exec(`docker ps --filter "name=taq-flextesa-${dockerName}" --no-trunc`)).stdout.split(/\r?\n/);
	const containerInfoArray = dockerContainerInfo.split('   ');
	const dockerContainerID = containerInfoArray[0];
	return dockerContainerID;
}

export function itemArrayInTable(regex: RegExp, inputTable: { stdout: string; stderr: string }): string[] {
	const matchArray = [...inputTable.stdout.matchAll(regex)];
	return Array.from(matchArray, item => item[0]);
}

// The solution was taken from this source:
// https://stackoverflow.com/questions/26165725/nodejs-check-file-exists-if-not-wait-till-it-exist
// It is pull&wait mechanism and it is async by nature, because
// there is no fs.watch sync solution
export function checkFolderExistsWithTimeout(filePath: string, timeout = 10000, interval = 100) {
	return waitFor(() => fsPromises.stat(filePath), { timeout, interval });
}

export async function waitFor<T>(fn: () => Promise<T>, opts = { timeout: 10000, interval: 100 }) {
	let elapsed = 0;
	let lastErr = undefined;
	const timeout = opts.timeout ?? 1000;
	const interval = opts.interval ?? 100;

	while (elapsed < timeout) {
		try {
			return await fn();
		} catch (err) {
			lastErr = err;
			await sleep(interval);
			elapsed += interval;
		}
	}
	throw lastErr;
}

export async function checkContractExistsOnNetwork(contractAddress: string, networkNodeURL: string) {
	const tezos = new TezosToolkit(networkNodeURL);
	try {
		const address = await tezos.contract.at(contractAddress);
		return address.address;
	} catch (error) {
		return error;
	}
}

export async function checkContractBalanceOnNetwork(
	contractAddress: string,
	networkNodeURL: string,
): Promise<number[] | null> {
	const tezos = new TezosToolkit(networkNodeURL);
	const balance = await tezos.tz.getBalance(contractAddress);
	return balance.c;
}

export async function installDependencies(
	projectPath: string,
	packageNames: string[],
	localPackages: boolean = true,
) {
	for (const packageName of packageNames) {
		if (localPackages) {
			const output = await exec(`taq install ../../../taqueria-plugin-${packageName}`, {
				cwd: `./${projectPath}`,
				encoding: 'utf8',
			});
		} else {
			const output = await exec(`taq install @taqueria/plugin-${packageName}`, { cwd: `./${projectPath}` });
		}

		await checkFolderExistsWithTimeout(`${projectPath}/node_modules/@taqueria/plugin-${packageName}/index.js`);
	}
}
