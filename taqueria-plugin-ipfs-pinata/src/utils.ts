export async function delay(timeout: number): Promise<void> {
	return await new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

export const createProcessBackoffController = ({
	retryCount = 5,
	targetRequestsPerMinute = 180,
}: {
	retryCount?: number;
	targetRequestsPerMinute?: number;
}) => {
	let averageTimePerRequest = 5000;
	let targetTimePerRequest = 60000 / targetRequestsPerMinute;
	let lastTime = Date.now();

	const processWithBackoff = async <TResult>(process: () => Promise<TResult>) => {
		let attempt = 0;
		let lastError = undefined as unknown;
		while (attempt < retryCount) {
			try {
				let delayTimeMs = Math.max(10, targetTimePerRequest - averageTimePerRequest);

				// Partially randomized delay to ensure parallel requests don't line up
				await delay(Math.floor(delayTimeMs * (1 + 0.5 * Math.random())));

				const result = await process();

				const timeNow = Date.now();
				const timeElapsed = timeNow - lastTime;
				lastTime = timeNow;

				// Running average
				averageTimePerRequest = averageTimePerRequest * 0.97 + timeElapsed * 0.03;

				return result;
			} catch (err) {
				lastError = err;
			}

			// Quickly increase time to wait if failure (allow negatives to wait longer than target)
			averageTimePerRequest -= (attempt + 1) * 1000;
			attempt++;
		}

		// All attempts failed
		throw lastError;
	};

	return {
		processWithBackoff,
	};
};
