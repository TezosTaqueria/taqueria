import load from '@taqueria/protocol/i18n';
import { run } from './cli.ts';

try {
	const i18n = await load();

	run(Deno.env, Deno.args, i18n);
} catch (err) {
	// TODO something went really wrong
	console.log(err);
}
