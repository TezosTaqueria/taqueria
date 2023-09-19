import { unixfs } from '@helia/unixfs';
import { readFile } from 'fs/promises';
import { createHelia } from 'helia';

export async function getFileIPFSHash(filePath: string): Promise<string> {
	// create a Helia node
	const helia = await createHelia();

	// create a filesystem on top of Helia, in this case it's UnixFS
	const fs = unixfs(helia);

	// Create a text encoder and encode the contents of the file
	// into a Uint8Array.
	const cid = fs.addFile({
		path: filePath,
		content: await readFile(filePath),
	});

	await helia.stop();

	return cid.toString();
}

export default getFileIPFSHash;
