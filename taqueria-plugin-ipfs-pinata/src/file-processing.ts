import fs from 'fs/promises';
import path from 'path';

// Async generator
// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
async function* getFiles(fileOrDirPath: string): AsyncGenerator<string, void, unknown> {
	const dirInfo = await fs.stat(fileOrDirPath);
	if (dirInfo.isFile()) {
		yield fileOrDirPath;
		return;
	}

	const dirents = await fs.readdir(fileOrDirPath, { withFileTypes: true });
	for (const dirent of dirents) {
		const res = path.resolve(fileOrDirPath, dirent.name);
		if (dirent.isDirectory()) {
			yield* getFiles(res);
		} else {
			yield res;
		}
	}
}

const createFileProvider = async ({
	fileOrDirPath,
	filter,
	shouldEstimateFileCount,
}: {
	fileOrDirPath: string;
	filter?: (filePath: string) => boolean;
	shouldEstimateFileCount?: boolean;
}) => {
	fileOrDirPath = path.resolve(fileOrDirPath);
	const pathInfo = await fs.stat(fileOrDirPath);
	if (
		!pathInfo.isFile()
		&& !pathInfo.isDirectory()
	) {
		throw new Error(`The path '${fileOrDirPath}' is not a file or directory`);
	}

	let estimateFileCount = undefined as undefined | number;
	if (shouldEstimateFileCount) {
		estimateFileCount = 0;
		for await (const filePath of getFiles(fileOrDirPath)) {
			if (filter && !filter(filePath)) {
				continue;
			}
			estimateFileCount++;
		}
	}

	const fileGenerator = getFiles(fileOrDirPath);
	const getNextFile = async () => {
		let nextFile = (await fileGenerator.next()).value;
		if (!filter) {
			return nextFile;
		}

		while (nextFile && !filter(nextFile)) {
			nextFile = await getNextFile();
		}

		return nextFile;
	};
	return {
		getNextFile,
		estimateFileCount,
	};
};

type ProgressInfo = { processedFilesCount: number; estimateFileCount: undefined | number };
export const processFiles = async <TResult>({
	fileOrDirPath,
	processFile,
	filter,
	parallelCount = 10,
	onProgress,
}: {
	fileOrDirPath: string;
	processFile: (filePath: string, progress: ProgressInfo) => Promise<TResult>;
	filter?: (filePath: string) => boolean;
	parallelCount?: number;
	onProgress?: (progress: ProgressInfo) => void;
}) => {
	const { getNextFile, estimateFileCount } = await createFileProvider({
		fileOrDirPath,
		filter,
		shouldEstimateFileCount: true,
	});

	const successes = [] as { filePath: string; result: TResult }[];
	const failures = [] as { filePath: string; error: unknown }[];

	onProgress?.({
		processedFilesCount: 0,
		estimateFileCount,
	});

	await Promise.all([...new Array(parallelCount)].map(async x => {
		let fileToProcess = await getNextFile();
		while (fileToProcess) {
			const progressInfo = {
				processedFilesCount: successes.length + failures.length,
				estimateFileCount,
			};
			onProgress?.(progressInfo);

			try {
				const result = await processFile(fileToProcess, progressInfo);
				successes.push({ filePath: fileToProcess, result });
			} catch (err) {
				failures.push({ filePath: fileToProcess, error: err });
			}

			fileToProcess = await getNextFile();
		}
	}));

	onProgress?.({
		processedFilesCount: successes.length + failures.length,
		estimateFileCount,
	});

	return {
		successes,
		failures,
	};
};
