import { TezosToolkit } from '@taquito/taquito';
import retry from 'async-retry';
import { exec as exec1, execSync } from 'child_process';
import fsPromises from 'fs/promises';
import path from 'path';
import util from 'util';
import { networkInfo } from '../data/network-info';
const exec = util.promisify(exec1);

export const sleep = (ms: number) => new Promise((resolve, reject) => setTimeout(resolve, ms));

export const generateTestProject = async (
	projectPath: string,
	packageNames: string[] = [],
	localPackages: boolean = true,
) => {
	const targetDir = path.join('/tmp', projectPath);

	try {
		await exec(`taq init ${targetDir}`);
	} catch (error) {
		throw new Error(`error: ${error}`);
	}

	await checkFolderExistsWithTimeout(targetDir);
	try {
		await fsPromises.chmod(targetDir, 0o777);
	} catch (error) {
		throw new Error(`error: ${error}`);
	}

	await exec('npm init -y', { cwd: targetDir, encoding: 'utf-8' });
	await exec(`mv ${targetDir} ./${projectPath}`, { encoding: 'utf8' });

	await checkFolderExistsWithTimeout(path.join('./', projectPath, 'package.json'));

	if (packageNames.length > 0) {
		packageNames.forEach(packageName => {
			try {
				if (localPackages) {
					execSync(`cd ./${projectPath} && taq install ../../../taqueria-plugin-${packageName}`, { encoding: 'utf8' });
				} else {
					execSync(`taq install @taqueria/plugin-${packageName}`, { cwd: projectPath });
				}
			} catch (error) {
				throw new Error(`error: ${error}`);
			}
		});
	}

	await checkFolderExistsWithTimeout(`./${projectPath}/node_modules/`);
};

export async function getContainerName(dockerName: string): Promise<string> {
	const [_dockerContainerHeader, dockerContainerName] =
		(await exec(`docker ps --filter "name=taqueria-development-${dockerName}" --no-trunc`)).stdout.split(/\r?\n/);
	return dockerContainerName;
}

// The solution was taken from this source:
// https://stackoverflow.com/questions/26165725/nodejs-check-file-exists-if-not-wait-till-it-exist
// It is pull&wait mechanism and it is async by nature, because
// there is no fs.watch sync solution
export async function checkFolderExistsWithTimeout(filePath: string) {
	// return new Promise<void>(async function (resolve, reject): Promise<void> {

	try {
		const dir = path.dirname(filePath);

		await retry(
			async () => {
				const watcher = await fsPromises.stat(dir);
				return (watcher.birthtime !== undefined);
			},
			{
				retries: 10,
				maxTimeout: 1000,
			},
		);
	} catch (error) {
		throw new Error(`error: ${error}`);
	}
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
