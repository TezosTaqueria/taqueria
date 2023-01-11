import type { Deps, EventName, EventParams, StoredEvent } from '@taqueria/analytics/types';
export type { Consent, EventParams } from '@taqueria/analytics/types';

// TODO: Move to env variable
const MEASUREMENT_ID = 'G-8LSQ6J7P0Q';
const API_SECRET = '3aHoMp2USE21ZPmAVTI1Lg';

const noop = () => {};

const getCurrentTimestamp = () => {
	const currentTime = new Date();
	return currentTime.toDateString() + ', ' + currentTime.toTimeString();
};

const toRequestURI = () =>
	`https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;

export const inject = ({ taqVersion, taqBuild, fields, getMachineId, operatingSystem, fetch, ...deps }: Deps) => {
	const events: StoredEvent[] = [];

	const toRequestBody = (client_id: string) =>
		JSON.stringify({
			client_id,
			events,
		});

	const getEvents = () => [...events];

	const addEvent = (name: EventName, params: EventParams) =>
		events.push({
			name,
			params: {
				...params,
				...fields,
				taq_timestamp: getCurrentTimestamp(),
				taq_version: taqVersion,
				taq_build: taqBuild,
				taq_os: operatingSystem,
			},
		});

	const sendEvents = () =>
		getMachineId()
			.then(toRequestBody)
			.then((body: string) => fetch(toRequestURI(), { method: 'POST', body }))
			.then(noop)
			.catch(noop);

	const isTrackingAllowed = () => deps.settings.consent === 'opt_in';

	const track = (fn: () => Promise<void>) =>
		deps.isCICD || deps.isTesting || !isTrackingAllowed()
			? Promise.resolve()
			: fn();

	const trackEvent = (name: EventName, params: EventParams) =>
		track(() => {
			addEvent(name, params);
			return Promise.resolve(noop());
		});

	const sendTrackedEvents = () => track(sendEvents);

	return {
		trackEvent,
		sendTrackedEvents,
		getEvents,
	};
};

export default {
	inject,
};
