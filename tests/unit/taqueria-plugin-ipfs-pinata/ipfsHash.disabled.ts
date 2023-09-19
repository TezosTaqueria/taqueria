import { getFileIPFSHash } from '@taqueria/plugin-ipfs-pinata/src/ipfsHash';
import { writeFile } from 'fs/promises';

describe('getFileIPFSHash', () => {
	it('should return the correct IPFS hash for a given file', async () => {
		const helloPath = '/tmp/ipfs-hello.txt';
		await writeFile(helloPath, 'Hello, world!', 'utf-8');

		const expectedHash = 'bafkreibrl5n5w5wqpdcdxcwaazheualemevr7ttxzbutiw74stdvrfhn2m';

		// Run the function and check the result
		const result = await getFileIPFSHash(helloPath);
		expect(result).toEqual(expectedHash);
	});
});
