import fsPromises from 'fs/promises';

export function sleep(ms: number): Promise<void> {
	return new Promise<void>(resolve => setTimeout(resolve, ms));
}

// The solution was taken from this source:
// https://stackoverflow.com/questions/26165725/nodejs-check-file-exists-if-not-wait-till-it-exist
// It is pull&wait mechanism and it is async by nature, because
// there is no fs.watch sync solution
export async function checkFolderExistsWithTimeout(filePath: string, attempts = 0) {
	while (true) {
		try {
			const dir = filePath;
			const watcher = await fsPromises.stat(dir);
			break;
		} catch (e) {
			if (attempts < 5) await sleep(1000);
			else throw e;
		}
	}
}
