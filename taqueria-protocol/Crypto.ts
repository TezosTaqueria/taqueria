export interface Crypto {
	subtle: {
		digest(method: 'SHA-256', data: Uint8Array): string;
	};
}
