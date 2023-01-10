import type { i18n } from '@taqueria/protocol/i18n';
import loadI18n from '@taqueria/protocol/i18n';
import * as InstalledPlugin from '@taqueria/protocol/InstalledPlugin';
import * as NonEmptyString from '@taqueria/protocol/NonEmptyString';
import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath';
import * as SanitizedArgs from '@taqueria/protocol/SanitizedArgs';
import * as TaqError from '@taqueria/protocol/TaqError';
import * as Url from '@taqueria/protocol/Url';
import { assert, assertEquals, assertRejects } from 'https://deno.land/std@0.127.0/testing/asserts.ts';
import inject from '../../plugins.ts';
import { defaultConfig, toLoadedConfig } from '../../taqueria-config.ts';
import { joinPaths, toPromise } from '../../taqueria-utils/taqueria-utils.ts';
import { MockWriter } from './helpers.ts';

Deno.test('inject()', async t => {
	const projectDir = await toPromise(SanitizedAbsPath.make('/tmp/test-project'));

	const sanitizedArgs = SanitizedArgs.create({
		_: ['init'],
		build: false,
		debug: false,
		disableState: false,
		env: 'development',
		fromVsCode: false,
		logPluginRequests: true,
		maxConcurrency: 10,
		projectDir,
		setBuild: 'foo/bar',
		setVersion: '1.0.0',
		version: false,
		help: false,
	});

	const config = await toPromise(toLoadedConfig(
		joinPaths(projectDir, '.taq/config.json'),
		defaultConfig,
	));

	const i18n = await loadI18n();

	const deps = {
		config,
		parsedArgs: sanitizedArgs,
		env: Deno.env,
		i18n,
		stdout: new MockWriter(),
		stderr: new MockWriter(),
	};
	const pluginLib = inject(deps);

	assert(typeof pluginLib === 'object');
	assert(typeof pluginLib.getState === 'function');
	assert(typeof pluginLib.sendPluginActionRequest === 'function');

	await t.step('toPluginArguments() returns an array suitable for invoking a plugin task', async () => {
		const { toPluginArguments } = pluginLib.__TEST__;
		const requestArgs = { foo: 'bar', bar: 'foo' };

		const taqDir = await toPromise(SanitizedAbsPath.make(`${projectDir}/.taq`));
		const config = await toPromise(toLoadedConfig(
			'config.json',
			defaultConfig,
		));

		const result = toPluginArguments(requestArgs);

		assertEquals(result, [
			'_',
			"'init'",
			'--maxConcurrency',
			10,
			'--debug',
			false,
			'--disableState',
			false,
			'--logPluginRequests',
			true,
			'--fromVsCode',
			false,
			'--version',
			false,
			'--build',
			false,
			'--help',
			false,
			'--yes',
			false,
			'--env',
			"'development'",
			'--setBuild',
			"'foo/bar'",
			'--setVersion',
			"'1.0.0'",
			'--foo',
			"'bar'",
			'--bar',
			"'foo'",
			'--projectDir',
			"'/tmp/test-project'",
		]);
	});

	await t.step('execPluginText() returns string with nothing output to stderr or stdout', async () => {
		const { execPluginText } = pluginLib.__TEST__;
		const msg = 'foobar';

		const output = await toPromise(execPluginText(['echo', msg]));

		assertEquals(output, `${msg}\n`);
		assertEquals(deps.stderr.toString(), '');
		assertEquals(deps.stdout.toString(), '');
	});

	await t.step("execPluginText() returns string, outputs to stderr, and doesn't output to stdout", async () => {
		const { execPluginText } = pluginLib.__TEST__;
		const msg = 'foobar';

		const output = await toPromise(
			execPluginText(['sh', '-c', `node -e  "console.error('${msg}');console.log('${msg}')"`]),
		);

		assertEquals(output, `${msg}\n`);
		assertEquals(deps.stderr.toString(), `${msg}\n`);
		assertEquals(deps.stdout.toString(), '');
	});

	await t.step("execPluginText() returns empty string, outputs to stderr, and doesn't output stdout", async () => {
		const { execPluginText } = pluginLib.__TEST__;
		const msg = 'foobar';

		const output = await toPromise(execPluginText(['sh', '-c', `node -e  "console.error('${msg}');"`]));

		assertEquals(output, '');
		assertEquals(deps.stderr.toString(), `${msg}\n`);
		assertEquals(deps.stdout.toString(), '');
	});

	await t.step('execPluginText() throws an error when given an invalid command', () => {
		const { execPluginText } = pluginLib.__TEST__;
		assertRejects<TaqError.E_TaqError>(() => toPromise(execPluginText(['foobar'])));
		assertEquals(deps.stderr.toString(), '');
		assertEquals(deps.stdout.toString(), '');
	});

	await t.step('execPluginPassthru() returns Process, outputs nothing to stderr, and outputs to stdout', async () => {
		const { execPluginPassthru } = pluginLib.__TEST__;
		const msg = 'foobar';

		deps.stderr.clear();
		const output = await toPromise(execPluginPassthru(['echo', msg]));

		assert(output instanceof Deno.Process);
		assertEquals(deps.stdout.toString(), `${msg}\n`);
		assertEquals(deps.stderr.toString(), '');
	});

	await t.step('execPluginPassThru() returns Process, outputs nothing to stdout, and outputs to stderr', async () => {
		const { execPluginPassthru } = pluginLib.__TEST__;
		const msg = 'foobar';

		deps.stderr.clear();
		const output = await toPromise(execPluginPassthru(['sh', '-c', `node -e  "console.error('${msg}');"`]));

		assert(output instanceof Deno.Process);
		assertEquals(deps.stdout.toString(), '');
		assertEquals(deps.stderr.toString(), `${msg}\n`);
	});

	await t.step('execPluginPassThru() throws an error when given an invalid command', () => {
		const { execPluginPassthru } = pluginLib.__TEST__;
		assertRejects<TaqError.E_TaqError>(() => toPromise(execPluginPassthru(['foobar'])));
		assertEquals(deps.stderr.toString(), '');
		assertEquals(deps.stdout.toString(), '');
	});

	await t.step('execPluginJson() returns object with nothing output to stdout and stderr', async () => {
		const { execPluginJson } = pluginLib.__TEST__;
		const msg = { foo: 'bar' };

		deps.stderr.clear();
		const output = await toPromise(execPluginJson(['echo', JSON.stringify(msg)]));

		assertEquals(output, msg);
		assertEquals(deps.stdout.toString(), '');
		assertEquals(deps.stderr.toString(), '');
	});

	await t.step('execPluginJson() returns object with nothing output to stdout, but an error on stderr', async () => {
		const { execPluginJson } = pluginLib.__TEST__;
		const msg = { foo: 'bar' };

		deps.stderr.clear();
		const output = await toPromise(
			execPluginJson(['sh', '-c', "node -e \"console.log(JSON.stringify({foo:'bar'}));console.error('foobar')\""]),
		);

		assertEquals(output, msg);
		assertEquals(deps.stdout.toString(), '');
		assertEquals(deps.stderr.toString(), 'foobar\n');
	});

	await t.step('execPluginJson() throws an error when the command returns invalid JSON', async () => {
		const { execPluginJson } = pluginLib.__TEST__;

		try {
			await toPromise(execPluginJson(['echo', 'foobar']));
		} catch (err) {
			assert(err instanceof TaqError.E_TaqError);
			assertEquals(err.kind, 'E_INVALID_JSON');
		}

		assertEquals(deps.stderr.toString(), '');
		assertEquals(deps.stdout.toString(), '');
	});

	// TODO: Once we have more than one type of plugin, we'll need to add
	// appropriate tests for getPluginExe
	// No issue exists for this as it only come up when we decide to implement
	// a plugin that isn't an NPM package.
	await t.step('getPluginExe() returns the correct command to invoke an NPM script', async () => {
		const { getPluginExe } = pluginLib.__TEST__;
		const installedPlugin = await toPromise(InstalledPlugin.make({
			name: NonEmptyString.create('@taqueria/plugin-ligo'),
			type: 'npm',
		}));

		const output = getPluginExe(installedPlugin);
		assertEquals(output, ['node', '/tmp/test-project/node_modules/@taqueria/plugin-ligo/index.js']);
	});
});
