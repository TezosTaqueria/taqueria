declare module 'ipfs-only-hash' {
	export const of: (input: string | Uint8Array | AsyncIterable<Uint8Array>) => Promise<string>;
}
