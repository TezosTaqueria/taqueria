import { StringWriter } from 'https://deno.land/std@0.128.0/io/writers.ts';

// Provides a Writable implementation to be used
// as stdout/stderr in tests
export class MockWriter implements Deno.Writer, Deno.WriterSync, Deno.Closer {
	writer: StringWriter;
	readonly rid = 1;
	constructor() {
		this.writer = new StringWriter();
	}

	clear() {
		this.writer = new StringWriter();
	}

	write(p: Uint8Array): Promise<number> {
		return this.writer.write(p);
	}

	writeSync(p: Uint8Array): number {
		return this.writer.writeSync(p);
	}

	close() {
		return this.clear();
	}

	toString() {
		const str = this.writer.toString();
		this.clear();
		return str;
	}
}
