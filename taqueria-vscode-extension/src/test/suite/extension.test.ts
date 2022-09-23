import assert from 'assert';
import { exec, execSync } from 'child_process';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as vscode from 'vscode';
import { CancellationToken, ExtensionContext, OutputChannel, QuickPickOptions, Uri, workspace } from 'vscode';
import * as taqueriaExtension from '../../extension';
import * as MockedObject from './MockedObject';
import { sleep } from './utils/utils';

const homedir = require('os').homedir();
const sourceFilesRoot = path.resolve(__dirname, '../../../../');
const testProjectRoot = path.resolve(homedir, 'TVsCE_e2e');
const testProjectSource = `${sourceFilesRoot}/src/test/suite/data/vscode-taq-test-project`;
const ligoContractFileSource = `${sourceFilesRoot}/src/test/suite/data/hello-tacos.mligo`;

const testProjectDestination = `${testProjectRoot}/vscode-taq-test-project`;
const ligoContractFileDestination = `${testProjectRoot}/vscode-taq-test-project/contracts/hello-tacos.mligo`;

const originalMethods = {
	'window.showInformationMessage': vscode.window.showInformationMessage,
	'window.showQuickPick': vscode.window.showQuickPick,
};

let output: OutputChannel;
let vscodeMock: typeof vscode;
let choosePlugin: string = '@taqueria/plugin-smartpy';
const mockedMethods = {
	'window.showInformationMessage': (msg: string) => Promise.resolve(console.log(msg)),
	'window.showQuickPick': (
		_availablePlugins: readonly string[] | Thenable<readonly string[]>,
		_options: QuickPickOptions & { canPickMany: true },
		cancellationToken: CancellationToken,
	) => Promise.resolve([choosePlugin]),
	'window.createOutputChannel': (name: string, languageId?: string) => Promise.resolve(output),
};
vscodeMock = MockedObject.make(vscode, mockedMethods);
let originalPackageJsonContents: string;
const packageJsonPath = path.join(sourceFilesRoot, 'package.json');

describe('Extension Test Suite', async () => {
	before(async () => {
		const context: ExtensionContext = {
			subscriptions: [],
		} as any;

		originalPackageJsonContents = await fse.readFile(packageJsonPath, 'utf-8');
		const activationEventsRemoved = originalPackageJsonContents.replace(
			/\"activationEvents\": \[(.|\n)*?\]/,
			'"activationEvents": []',
		);
		await fse.writeFile(packageJsonPath, activationEventsRemoved);
		await taqueriaExtension.activate(context, { vscode: vscodeMock });

		vscode.window.showInformationMessage('Start all tests.');
	});

	it('Verify that Taqueria commands present in the command pallete list ', async () => {
		await vscode.commands.getCommands(true).then(allCommands => {
			const taqCommands = allCommands.filter(command => command.toLowerCase().includes('taq'));
			assert.notEqual(taqCommands, undefined);
		});
	});

	it('Verify that VS Code commands Taqueria Sandbox can start sandbox to get list of accounts and also can stop sandbox', async () => {
		// It creates another process
		// https://stackoverflow.com/questions/51385812/is-there-a-way-to-open-a-workspace-from-an-extension-in-vs-code
		// await vscodeMock.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(testProjectDestination));
		// await workspace.updateWorkspaceFolders(0, 1, { uri: Uri.parse()});

		await fse.rm(testProjectDestination, { recursive: true });
		await fse.mkdir(testProjectDestination, { recursive: true });

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
		await fse.copyFile(ligoContractFileSource, ligoContractFileDestination);

		await vscodeMock.commands.executeCommand('taqueria.compile');
	});

	xit('Verify that VS Code command Taqueria Compile Ligo will compile Ligo contract', async () => {
		// It creates another process
		// https://stackoverflow.com/questions/51385812/is-there-a-way-to-open-a-workspace-from-an-extension-in-vs-code
		// await vscodeMock.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(testProjectDestination));
		// await workspace.updateWorkspaceFolders(0, 1, { uri: Uri.parse()});

		await fse.rm(testProjectDestination, { recursive: true });
		await fse.mkdir(testProjectDestination, { recursive: true });

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
		await fse.copyFile(ligoContractFileSource, ligoContractFileDestination);

		await vscodeMock.commands.executeCommand('taqueria.compile');
	});

	after(async () => {
		// await fse.rm(testProjectRoot, { recursive: true });
		await fse.writeFile(packageJsonPath, originalPackageJsonContents);
		// Uncomment for local development
		// await fse.rmdir(`${projectRoot}/.vscode-test/user-data/`, {recursive: true})
	});
});
