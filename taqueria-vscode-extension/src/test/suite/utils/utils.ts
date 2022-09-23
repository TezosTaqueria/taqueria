import retry from 'async-retry';
import fsPromises from 'fs/promises';

export function sleep(ms: number): Promise<void> {
	return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export async function checkFolderExistsWithTimeout(filePath: string) {
	// return new Promise<void>(async function (resolve, reject): Promise<void> {

	try {
		const dir = filePath;

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
