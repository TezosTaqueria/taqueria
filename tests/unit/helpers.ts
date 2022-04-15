import { StringWriter } from 'https://deno.land/std@0.128.0/io/writers.ts'

// Provides a Writable implementation to be used
// as stdout/stderr in tests
export class MockWriter implements Deno.Writer {
    writer: StringWriter

    constructor() {
        this.writer = new StringWriter()
    }

    clear() {
        this.writer = new StringWriter()
    }

    write(p: Uint8Array): Promise<number> {
        return this.writer.write(p)
    }

    toString() {
        const str = this.writer.toString()
        this.clear()
        return str
    }
}
