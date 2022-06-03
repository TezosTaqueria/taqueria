import { useEffect, useRef, useState } from 'react';

export type UpdateProgressCallback = (progressMessage: string) => void;
export const useAsyncWorker = () => {
	const isMounted = useRef(true);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	const [{ loading, error, progress }, setLoadingError] = useState({
		loading: false,
		error: null as null | { message: string; innerError: unknown },
		progress: {
			message: '',
			ratioComplete: 0,
		},
	});

	const doWork = (
		work: (stopIfObsolete: () => void, updateProgress: UpdateProgressCallback) => Promise<void>,
		options?: { messageIfError?: string },
	) => {
		const UNMOUNTED = 'UNMOUNTED';
		const stopIfObsolete = () => {
			if (!isMounted.current) {
				throw UNMOUNTED;
			}
		};
		let timeoutId = setTimeout(() => {}, 0);
		const updateAutoProgressTicker = (progressMessage: string) => {
			clearTimeout(timeoutId);
			setTimeout(() => {
				setLoadingError(s => {
					if (!s.loading || s.progress.message !== progressMessage) {
						return s;
					}

					return {
						...s,
						progress: {
							...s.progress,
							ratioComplete: 1 - ((1 - s.progress.ratioComplete) * 0.98),
						},
					};
				});

				updateAutoProgressTicker(progressMessage);
			}, 1000);
		};

		const updateProgress = (progressMessage: string) => {
			setLoadingError(s => ({
				...s,
				progress: {
					message: progressMessage,
					ratioComplete: 1 - ((1 - s.progress.ratioComplete) * 0.9),
				},
			}));
			updateAutoProgressTicker(progressMessage);
		};

		(async () => {
			if (!isMounted.current) return;
			setLoadingError({ loading: true, error: null, progress: { message: '', ratioComplete: 0 } });

			try {
				await work(stopIfObsolete, updateProgress);
				stopIfObsolete();
				clearTimeout(timeoutId);
				setLoadingError({ loading: false, error: null, progress: { message: '', ratioComplete: 1 } });
			} catch (err) {
				clearTimeout(timeoutId);

				if (err === UNMOUNTED) {
					// Stop updating if unmounted
					return;
				}

				console.error('doWork Error: ', { err });
				setLoadingError(s => ({
					loading: false,
					error: {
						message: options?.messageIfError ?? (err as Record<string, string>).message ?? `Error`,
						innerError: err,
					},
					progress: s.progress,
				}));
			}
		})();
	};

	return {
		loading,
		error,
		progress,
		doWork,
	};
};
