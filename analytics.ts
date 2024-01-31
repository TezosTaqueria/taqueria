import taqAnalytics, { Consent, EventParams } from '@taqueria/analytics';
import * as Settings from '@taqueria/protocol/Settings';
import * as TaqError from '@taqueria/protocol/TaqError';
import { attemptP, chain, chainRej, FutureInstance as Future, map, mapRej, resolve } from 'fluture';
import { pipe } from 'fun';
import { getMachineId } from 'machine-id';
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

	const getSettings = () =>
		pipe(
			doesPathExist(settingsFolder),
			chainRej(_ => mkdir(settingsFolder)),
			chain(_ => doesPathExist(settingsFilePath)),
			chainRej(_ =>
				pipe(
					Settings.of({ consent: 'unspecified' }),
					chain(writeJsonFile(settingsFilePath)),
					chain(() => doesPathExist(settingsFilePath)),
				)
			),
			chain(readJsonFile),
			chain(Settings.of),
		);

	const getTrackingConsent = () =>
		/*:Future<TaqError.t, Consent>*/ pipe(
			getSettings(),
			chain(settings =>
				settings.consent !== 'unspecified' ? taqResolve(settings.consent) : promptForConsent(OPT_IN, 'y')
			),
		);

	const promptForConsent = (option: Consent, defaultAnswer: string, noActionOnNegative: boolean = false) => {
		const promptText = option === OPT_IN ? optInConfirmationPrompt : optOutConfirmationPrompt;

		const handlePrompt = (): Future<TaqError.t, string | null> => {
			const input = parsedArgs.yes ? defaultAnswer : prompt(promptText);

			if (input === null || /^y(es)?$/i.test(input)) {
				return updateSettingsAndReturn(option);
			} else if (/^n(o)?$/i.test(input)) {
				return noActionOnNegative ? taqResolve(null) : updateSettingsAndReturn(option === OPT_IN ? OPT_OUT : OPT_IN);
			} else {
				console.log('Invalid response. Please enter "y" or "n".');
				return handlePrompt();
			}
		};

		return pipe(
			getSettings(),
			chain(() => handlePrompt()),
		);
	};

	const updateSettingsAndReturn = (consent: Consent) =>
		pipe(
			readJsonFile<Settings.t>(settingsFilePath),
			map((settingsContent: Settings.t) => {
				settingsContent.consent = consent;
				return settingsContent;
			}),
			chain(writeJsonFile(settingsFilePath)),
			map(() => consent),
		);

	const askToOptIn = () =>
		pipe(
			promptForConsent(OPT_IN, 'y'),
			map(consent =>
				consent === OPT_IN
					? 'You have successfully opted-in to sharing anonymous usage analytics.'
					: 'You have opted-out from sharing anonymous usage analytics.'
			),
		);

	const askToOptOut = () =>
		pipe(
			promptForConsent(OPT_OUT, 'n', true), // Passing true for noActionOnNegative
			map(consent =>
				consent === OPT_OUT
					? 'You have successfully opted-out from sharing anonymous usage analytics.'
					: 'No changes were made.'
			),
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
				'help',
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
					fetch,
					fields: {
						taq_ui: parsedArgs.fromVsCode ? 'VSCode' : 'CLI',
					},
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
