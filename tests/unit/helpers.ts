// Provides a Writable implementation to be used
// as stdout/stderr in tests
export class MockWriter {
	private encoder = new TextEncoder();
	private decoder = new TextDecoder();
	private chunks: Uint8Array[] = [];

	write(p: Uint8Array): Promise<number> {
		this.chunks.push(p);
		return Promise.resolve(p.length);
	}

	clear() {
		this.chunks = [];
	}

	toString() {
		const str = this.chunks.map(chunk => this.decoder.decode(chunk, { stream: true })).join('');
		this.clear();
		return str;
	}
}
