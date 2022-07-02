import FormData from 'form-data';
import fs from 'fs';
import fetch from 'node-fetch';

export type PinataAuth = {
	pinataJwtToken: string;
};

export type PublishFileResult = {
	ipfsHash: string;
};

export const publishFileToIpfs = async ({
	auth,
	item,
}: {
	auth: PinataAuth;
	item: {
		name: string;
		filePath: string;
	};
}): Promise<PublishFileResult> => {
	const ipfsJsonFilePath = `${item.filePath}.ipfs.json`;

	// // Skip if already uploaded
	// try {
	//     const ipfsJsonFileContent = await fs.promises.readFile(ipfsJsonFilePath, { encoding: 'utf-8' });
	//     const ipfsResult = JSON.parse(ipfsJsonFileContent) as PublishFileResult;
	//     if (ipfsResult.ipfsHash) {
	//         console.log(`Skipping ${item.filePath}`);
	//         return;
	//     }
	// } catch (err) {
	//     // Ignore
	// }

	const data = new FormData();
	data.append('file', fs.createReadStream(item.filePath));
	data.append(
		'pinataMetadata',
		JSON.stringify({
			name: item.name,
		}),
	);

	const response = await fetch(`https://api.pinata.cloud/pinning/pinFileToIPFS`, {
		headers: {
			Authorization: `Bearer ${auth.pinataJwtToken}`,
			'Content-Type': `multipart/form-data; boundary=${(data as unknown as { _boundary: string })._boundary}`,
		},
		body: data,
		method: 'post',
	});

	if (!response.ok) {
		throw new Error(`Failed to upload '${item.name}' to ipfs ${response.statusText}`);
	}

	const uploadResult = await response.json() as {
		IpfsHash: string; // This is the IPFS multi-hash provided back for your content,
		PinSize: string; // This is how large (in bytes) the content you just pinned is,
		Timestamp: string; // This is the timestamp for your content pinning (represented in ISO 8601 format)
	};

	return {
		ipfsHash: uploadResult.IpfsHash,
	};
};
