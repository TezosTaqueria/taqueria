import assert from 'assert';
import { exec } from 'child_process';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as vscode from 'vscode';
import { CancellationToken, ExtensionContext, QuickPickOptions, Uri, workspace } from 'vscode';
import * as taqueriaExtension from '../../extension';
import * as MockedObject from './MockedObject';
import { sleep } from './utils/utils';

const projectRoot = path.resolve(__dirname, '../../../../');
const testProjectSource = `${projectRoot}/src/test/suite/data/vscode-taq-test-project`;
const testProjectDestination = `${projectRoot}/out/vscode-taq-test-project`;
const ligoContractFileSource = `${projectRoot}/src/test/suite/data/hello-tacos.mligo`;
const ligoContractFileDestination = `${projectRoot}/vscode-taq-test-project/contracts/hello-tacos.mligo`;

const originalMethods = {
	'window.showInformationMessage': vscode.window.showInformationMessage,
	'window.showQuickPick': vscode.window.showQuickPick,
};

let vscodeMock: typeof vscode;
let choosePlugin: string = '@taqueria/plugin-smartpy';
const mockedMethods = {
	'window.showInformationMessage': (msg: string) => Promise.resolve(console.log(msg)),
	'window.showQuickPick': (
		_availablePlugins: readonly string[] | Thenable<readonly string[]>,
		_options: QuickPickOptions & { canPickMany: true },
		cancellationToken: CancellationToken,
	) => Promise.resolve([choosePlugin]),
};
vscodeMock = MockedObject.make(vscode, mockedMethods);

describe('Extension Test Suite', async () => {
	before(async () => {
		const context: ExtensionContext = {
			subscriptions: [],
		} as any;
		await taqueriaExtension.activate(context, { vscode: vscodeMock });

		vscode.window.showInformationMessage('Start all tests.');
	});

	it('Verify that Taqueria commands appears on the command palette ', async () => {
		await vscode.commands.getCommands(true).then(allCommands => {
			const taqCommands = allCommands.filter(command => command.toLowerCase().includes('taq'));
			assert.notEqual(taqCommands, undefined);
		});
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/645
	it('Verify that VS Code command Taqueria Compile Ligo will compile Ligo contract', async () => {
		fse.mkdirSync(testProjectDestination);

		await vscodeMock.commands.executeCommand('taqueria.init');

		choosePlugin = '@taqueria/plugin-ligo';

		await vscodeMock.commands.executeCommand('taqueria.install');

		// Copy contract from data folder
		await fse.copyFileSync(testProjectSource, ligoContractFileDestination);

		// Execute ligo compile command
		await vscodeMock.commands.executeCommand('taqueria.compile_ligo');

		// Run ls command
		const checkArtifact = await exec(`ls ${testProjectDestination}\artifacts`);

		// Need to find library to use contains or build it
		assert.notEqual(checkArtifact, undefined);

		await fse.rmdir(testProjectDestination, { recursive: true });
	});

	it('Verify that VS Code command Taqueria Compile will compile Archetype contract', async () => {
		fse.mkdirSync(testProjectDestination);

		await vscodeMock.commands.executeCommand('taqueria.init');

		choosePlugin = '@taqueria/plugin-ligo';

		await vscodeMock.commands.executeCommand('taqueria.install');

		// Copy contract from data folder
		await fse.copyFileSync(ligoContractFileSource, ligoContractFileDestination);

		await vscodeMock.commands.executeCommand('taqueria.compile');

		// Run ls command
		const checkArtifact = await exec(`ls ${testProjectDestination}\artifacts`);

		// Need to find library to use contains or build it
		assert.notEqual(checkArtifact, undefined);

		await fse.rmdir(testProjectDestination, { recursive: true });
	});

	it('Verify that Taqueria Jest plugin can be installed', async () => {
		fse.mkdirSync(testProjectDestination);

		await vscodeMock.commands.executeCommand('taqueria.init');

		choosePlugin = '@taqueria/plugin-jest';

		await vscodeMock.commands.executeCommand('taqueria.install');

		// Run ls command
		const checkArtifact = await exec(`ls ${testProjectDestination}\tests`);

		// Need to find library to use contains or build it
		assert.notEqual(checkArtifact, undefined);

		await fse.rmdir(testProjectDestination, { recursive: true });
	});

	it('Verify that Taqueria Contract Types plugin can be installed', async () => {
		fse.mkdirSync(testProjectDestination);

		await vscodeMock.commands.executeCommand('taqueria.init');

		choosePlugin = '@taqueria/plugin-contract-types';

		await vscodeMock.commands.executeCommand('taqueria.install');

		// Run ls command
		const checkArtifact = await exec(`ls ${testProjectDestination}`);

		// Need to find library to use contains or build it
		assert.notEqual(checkArtifact, undefined);

		await fse.rmdir(testProjectDestination, { recursive: true });
	});

	it('Verify that Taqueria Taquito plugin can be installed', async () => {
		fse.mkdirSync(testProjectDestination);

		await vscodeMock.commands.executeCommand('taqueria.init');

		choosePlugin = '@taqueria/taquito';

		await vscodeMock.commands.executeCommand('taqueria.install');

		// Run ls command
		const checkArtifact = await exec(`ls ${testProjectDestination}\tests`);

		// Need to find library to use contains or build it
		assert.notEqual(checkArtifact, undefined);

		await fse.rmdir(testProjectDestination, { recursive: true });
	});

	it('Verify that Taqueria Tezos Client plugin can be installed', async () => {
		fse.mkdirSync(testProjectDestination);

		await vscodeMock.commands.executeCommand('taqueria.init');

		choosePlugin = '@taqueria/tezos-client';

		await vscodeMock.commands.executeCommand('taqueria.install');

		await fse.rmdir(testProjectDestination, { recursive: true });
	});

	it('Verify that Taqueria SmartPy plugin can be installed', async () => {
		fse.mkdirSync(testProjectDestination);

		await vscodeMock.commands.executeCommand('taqueria.init');

		choosePlugin = '@taqueria/smartpy';

		await vscodeMock.commands.executeCommand('taqueria.install');

		// Run ls command
		const checkArtifact = await exec(`ls ${testProjectDestination}\artifacts`);

		// Need to find library to use contains or build it
		assert.notEqual(checkArtifact, undefined);

		await fse.rmdir(testProjectDestination, { recursive: true });
	});

	after(async () => {
		await fse.rmdir(testProjectDestination, { recursive: true });
		// Uncomment for local development
		// await fse.rmdir(`${projectRoot}/.vscode-test/user-data/`, {recursive: true})
	});
});
