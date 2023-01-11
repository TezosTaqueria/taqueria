import taqAnalytics, { Consent, EventParams } from '@taqueria/analytics';
import * as Settings from '@taqueria/protocol/Settings';
import * as TaqError from '@taqueria/protocol/TaqError';
import { attemptP, chain, chainRej, FutureInstance as Future, map, mapRej, resolve } from 'fluture';
import { pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import { getMachineId } from 'https://deno.land/x/machine_id@v0.3.0/mod.ts';
import { omit } from 'rambda';
import type { UsageAnalyticsDeps } from './taqueria-types.ts';
import * as utils from './taqueria-utils/taqueria-utils.ts';

const {
	mkdir,
	doesPathExist,
	readJsonFile,
	writeJsonFile,
	taqResolve,
} = utils.inject({
	stdout: Deno.stdout,
	stderr: Deno.stderr,
});

const consentPrompt =
	'Help improve Taqueria by sharing anonymous usage statistics in accordance with the privacy policy? (Y/n)';
const optInConfirmationPrompt = consentPrompt;
const optOutConfirmationPrompt = 'Are you sure you want to turn off usage statistic reporting? (Y/n)';

const OPT_IN = 'opt_in';
const OPT_OUT = 'opt_out';

export const inject = (deps: UsageAnalyticsDeps) => {
	const { env, parsedArgs, machineInfo } = deps;

	const settingsFolder = Deno.env.get('HOME') + '/.taq-settings';
	const settingsFilePath = settingsFolder + '/taq-settings.json';

	const didUserChooseYes = (input: string | null) => parsedArgs.yes || input === null || /^y(es)?$/i.test(input);

	const promptForConsent = (option: Consent) =>
		pipe(
			doesPathExist(settingsFilePath),
			chain(() => {
				const input = parsedArgs.yes
					? 'y'
					: prompt(option === OPT_IN ? optInConfirmationPrompt : optOutConfirmationPrompt);
				return !didUserChooseYes(input)
					? taqResolve(option === OPT_IN ? OPT_OUT : OPT_IN)
					: pipe(
						readJsonFile<Settings.t>(settingsFilePath),
						map((settingsContent: Settings.t) => {
							settingsContent.consent = option;
							return settingsContent;
						}),
						chain(writeJsonFile(settingsFilePath)),
						map(() => option),
					);
			}),
		);

	const optInAnalytics = () => promptForConsent(OPT_IN);
	const optOutAnalytics = () => promptForConsent(OPT_OUT);

	const getSettings = () =>
		pipe(
			doesPathExist(settingsFolder),
			chainRej(_ => mkdir(settingsFolder)),
			chain(_ => doesPathExist(settingsFilePath)),
			chain(readJsonFile),
			chain(Settings.of),
		);

	const getTrackingConsent = () =>
		/*:Future<TaqError.t, Consent>*/ pipe(
			getSettings(),
			chain(settings => settings.consent !== 'unspecified' ? taqResolve(settings.consent) : promptForConsent(OPT_IN)),
		);

	const askToOptIn = () =>
		pipe(
			optInAnalytics(),
			map(() => 'You have successfully opted-in to sharing anonymous usage analytics.'),
		);

	const askToOptOut = () =>
		pipe(
			optOutAnalytics(),
			map(() => 'You have successfully opted-out from sharing anonymous usage analytics.'),
		);

	// No-operation
	// noop: () -> void
	const noop = (input?: unknown) => {
		if (parsedArgs.debug) console.error(input);
	};

	const toEventFields = (fields: EventParams) => ({
		...omit(
			[
				'_',
				'setBuild',
				'setVersion',
				'projectDir',
				'disableState',
				'maxConcurrency',
				'fromVsCode',
				'version',
				'build',
				'quickstart',
				'lock',
				'$0',
			],
			Object.entries(parsedArgs).reduce(
				(retval, [key, value]) => key.includes('-') || key.length === 1 ? retval : { ...retval, [key]: value },
				{},
			),
		),
		...fields,
		...machineInfo,
		taq_os: machineInfo.os,
	});

	const sendEvent = (fields: EventParams) =>
		pipe(
			getTrackingConsent(),
			chain(_ => getSettings()),
			chain(settings => {
				const analytics = taqAnalytics.inject({
					getMachineId,
					settings,
					isCICD: env.get('CI') !== undefined,
					isTesting: env.get('TEST') !== undefined,
					taqBuild: parsedArgs.setBuild,
					taqVersion: parsedArgs.setVersion,
					operatingSystem: machineInfo.os,
				});
				return attemptP(() =>
					analytics.trackEvent('taq_task_executed', toEventFields(fields))
						.then(() => {
							if (parsedArgs.debug) console.error(analytics.getEvents());
						})
						.then(() => analytics.sendTrackedEvents())
						.catch(noop)
				);
			}),
			chainRej(() => taqResolve(noop)),
			map(noop),
		);

	return {
		askToOptIn,
		askToOptOut,
		sendEvent,
	};
};
