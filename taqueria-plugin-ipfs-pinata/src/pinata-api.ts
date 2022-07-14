import FormData from 'form-data';
import fs from 'fs';
import Hash from 'ipfs-only-hash';
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
	// The data api to check for existing file is limited to 30 requests per minute
	// While uploading allows 180 requests per minute
	// i.e. it's faster to just upload again

	// // Skip if already pinned
	// const { isPinned, ipfsHash } = await checkIfFileIsPinned({ auth, item });
	// if (isPinned) {
	// 	return {
	// 		ipfsHash,
	// 	};
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

const checkIfFileIsPinned = async ({
	auth,
	item,
}: {
	auth: PinataAuth;
	item: {
		name: string;
		filePath: string;
	};
}) => {
	const ipfsHash = await Hash.of(fs.createReadStream(item.filePath));

	const response = await fetch(`https://api.pinata.cloud/data/pinList?status=pinned&hashContains=${ipfsHash}`, {
		headers: {
			Authorization: `Bearer ${auth.pinataJwtToken}`,
		},
		method: 'get',
	});

	if (!response.ok) {
		throw new Error(`Failed to query '${item.name}' status from pinata ${response.statusText}`);
	}

	const pinResult = await response.json() as {
		count: number;
		rows: {
			id: string;
			ipfs_pin_hash: string;
			size: number;
			user_id: string;
			date_pinned: null | string;
			date_unpinned: null | string;
			metadata: {
				name: string;
				keyvalues: null | string;
			};
			regions: {
				regionId: string;
				currentReplicationCount: number;
				desiredReplicationCount: number;
			}[];
		}[];
	};

	const isPinned = pinResult.rows.some(x =>
		x.ipfs_pin_hash === ipfsHash
		&& x.date_pinned
		&& !x.date_unpinned
	);

	return {
		isPinned,
		ipfsHash,
	};
};
