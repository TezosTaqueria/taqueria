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

	it('Verify that Taqueria Initiate will init new taquifed  project ', async () => {
		await vscode.commands.getCommands(true).then(allCommands => {
			const taqCommands = allCommands.filter(command => command.toLowerCase().includes('taq'));
			assert.notEqual(taqCommands, undefined);
		});

		// Taq init won't work due to this issue
		// https://github.com/ecadlabs/taqueria/issues/939
		// Currently we are just coping taqufied project
		// await vscodeMock.commands.executeCommand('taqueria.init');
		await fse.copySync(testProjectSource, testProjectDestination);

		// Verify that taquified project has been created
		console.log('break');
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/645
	xit('Verify that VS Code command Taqueria Compile Ligo will compile Ligo contract', async () => {
		// It creates another process
		// https://stackoverflow.com/questions/51385812/is-there-a-way-to-open-a-workspace-from-an-extension-in-vs-code
		// await vscodeMock.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(testProjectDestination));
		// await workspace.updateWorkspaceFolders(0, 1, { uri: Uri.parse()});

		// Taq init won't work due to this issue
		// https://github.com/ecadlabs/taqueria/issues/939
		// Currently we are just coping taqufied project
		// await vscodeMock.commands.executeCommand('taqueria.init');

		// Run ls command
		// const checkArtifact = await exec(`ls ${testProjectDestination}\artifacts`);

		// Need to find library to use contains or build it
		// assert.notEqual(checkArtifact, undefined);
		choosePlugin = '@taqueria/plugin-ligo';

		await vscodeMock.commands.executeCommand('taqueria.install');

		// Copy contract from data folder
		await fse.copyFileSync(testProjectSource, ligoContractFileDestination);

		// Execute ligo compile command
		await vscodeMock.commands.executeCommand('taqueria.compile_ligo');

		console.log('stop');
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/645
	xit('Verify that VS Code command Taqueria Compile Ligo will compile Ligo contract', async () => {
		// It creates another process
		// https://stackoverflow.com/questions/51385812/is-there-a-way-to-open-a-workspace-from-an-extension-in-vs-code
		// await vscodeMock.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(testProjectDestination));
		// await workspace.updateWorkspaceFolders(0, 1, { uri: Uri.parse()});
		fse.rmdirSync(testProjectDestination, { recursive: true });

		fse.mkdirSync(testProjectDestination);

		await vscodeMock.commands.executeCommand('taqueria.init');

		// Run ls command
		// const checkArtifact = await exec(`ls ${testProjectDestination}\artifacts`);

		// Need to find library to use contains or build it
		// assert.notEqual(checkArtifact, undefined);
		choosePlugin = '@taqueria/plugin-flextesa';

		await vscodeMock.commands.executeCommand('taqueria.install');

		choosePlugin = '@taqueria/plugin-ligo';

		await vscodeMock.commands.executeCommand('taqueria.install');

		// Copy contract from data folder
		await fse.copyFileSync(ligoContractFileSource, ligoContractFileDestination);
	});

	after(async () => {
		await fse.rmdir(testProjectDestination, { recursive: true });
		// Uncomment for local development
		// await fse.rmdir(`${projectRoot}/.vscode-test/user-data/`, {recursive: true})
	});
});
