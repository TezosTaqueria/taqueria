export async function delay(timeout: number): Promise<void> {
	return await new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

export const createProcessBackoffController = ({
	retryCount = 5,
}: {
	retryCount: number;
}) => {
	const DELAY_MIN = 10;
	const DELAY_SUCCESS_REDUCTION = 10;
	const DELAY_FAILURE_INCREASE = 200;

	let delayTimeMs = 100;

	const processWithBackoff = async <TResult>(process: () => Promise<TResult>) => {
		let attempt = 0;
		let lastError = undefined as unknown;
		while (attempt < retryCount) {
			try {
				await delay(delayTimeMs);

				const result = await process();

				delayTimeMs -= DELAY_SUCCESS_REDUCTION;
				delayTimeMs = Math.max(DELAY_MIN, delayTimeMs);

				return result;
			} catch (err) {
				lastError = err;
			}
			delayTimeMs += DELAY_FAILURE_INCREASE;
			attempt++;
		}

		// All attempts failed
		throw lastError;
	};

	return {
		processWithBackoff,
	};
};
