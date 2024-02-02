// Provides a Writable implementation to be used

import { ERR_CONTEXT_NOT_INITIALIZED } from 'https://deno.land/std@0.85.0/node/_errors.ts';

// as stdout/stderr in tests
export class MockWriter {
	private chunks: Uint8Array[] = [];
	public rid = 0;

	write(p: Uint8Array): Promise<number> {
		this.chunks.push(p);
		return Promise.resolve(p.length);
	}

	writeSync(p: Uint8Array): number {
		this.chunks.push(p);
		return p.length;
	}

	isTerminal() {
		return false;
	}

	clear() {
		this.chunks = [];
	}

	// Implementing a dummy writable stream for compatibility
	readonly writable = new WritableStream<Uint8Array>({
		write: chunk => {
			this.chunks.push(chunk);
		},
	});

	toString() {
		const decoder = new TextDecoder();
		const str = this.chunks.map(chunk => decoder.decode(chunk)).join('');
		this.clear();
		return str;
	}

	close() {
	}

	constructor() {
		this.rid = Math.random();
	}
}
