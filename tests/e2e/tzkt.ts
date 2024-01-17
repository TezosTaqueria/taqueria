const host = '127.0.0.1';
const port = 5000;
const baseUrl = `http://${host}:${port}`;

async function jsonRequest(url: string, options?: any) {
	let response = await fetch(url, options);
	let text;

	if (response.status !== 200) {
		throw new Error(`Non 200 response code: ${response.status} URL: ${url}`);
	}

	try {
		text = await response.text();
		return JSON.parse(text);
	} catch (e) {
		throw new Error(`Failed to parse: ${text === '' ? '<empty>' : text}`);
	}
}

export async function fetchAccounts() {
	return jsonRequest(`${baseUrl}/v1/accounts`);
}

export async function fetchContracts() {
	return jsonRequest(`${baseUrl}/v1/contracts`);
}
