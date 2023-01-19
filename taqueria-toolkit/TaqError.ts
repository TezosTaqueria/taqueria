export class TaqError extends Error {
	public isTaqError = true;
}
export const isTaqError = (err: unknown): err is TaqError =>
	typeof err === 'object' && (err as object).hasOwnProperty('isTaqError');
