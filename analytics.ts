import { getMachineId } from 'https://deno.land/x/machine_id@v0.3.0/mod.ts';
import * as utils from './taqueria-utils/taqueria-utils.ts';

const {
	doesPathExist,
	readTextFile,
	writeTextFile,
	eager,
} = utils.inject({
	stdout: Deno.stdout,
	stderr: Deno.stderr,
});

export const consentFilePath = Deno.env.get('HOME') + '/.taq-consent.txt';
const consentPrompt = 'Do you consent being tracked? [y/yes] or [n/no]';
export const OPT_IN = 'opt_in';
export const OPT_OUT = 'opt_out';

const promptForConsent = async () => {
	const input = prompt(consentPrompt);
	if (input && /^y(es)?$/i.test(input)) {
		await eager(writeTextFile(consentFilePath)(OPT_IN));
	} else {
		await eager(writeTextFile(consentFilePath)(OPT_OUT));
	}
};

const allowTracking = async (): Promise<boolean> => {
	try {
		await eager(doesPathExist(consentFilePath));
	} catch {
		await promptForConsent();
	}
	const consent = await eager(readTextFile(consentFilePath));
	return consent === OPT_IN && Deno.env.get('CI') === undefined;
};

export const sendEvent = async (taq_version: string, taq_ui: 'CLI' | 'VSCode') => {
	if (!(await allowTracking())) return;

	const measurement_id = 'G-8LSQ6J7P0Q';
	const api_secret = '3aHoMp2USE21ZPmAVTI1Lg';

	const client_id = await getMachineId();

	const currentTime = new Date();
	const taq_timestamp = currentTime.toDateString() + ', ' + currentTime.toTimeString();

	await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
		method: 'POST',
		body: JSON.stringify({
			client_id,
			events: [{
				name: 'taq_task_executed',
				params: {
					taq_version,
					taq_ui,
					taq_timestamp,
					taq_os: Deno.build.os,
				},
			}],
		}),
	});
	// .then((res) => console.log(res))
	// .catch((err) => console.log("Error: " + err))
};

// sendEvent("v3.0.1", "CLI")
