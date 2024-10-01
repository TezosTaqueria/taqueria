import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

export async function getFileIPFSHash(filePath: string): Promise<string> {
	// Read the file contents
	const fileContent = await readFile(filePath);

	// Create a SHA-256 hash of the file contents
	const hash = createHash('sha256').update(fileContent).digest('hex');

	// Return the hash as a string
	return hash;
}

export default getFileIPFSHash;
