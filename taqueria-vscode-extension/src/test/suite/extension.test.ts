import assert from 'assert';
import { execSync } from 'child_process';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as vscode from 'vscode';
import { ExtensionContext, Uri } from 'vscode';
import * as taqueriaExtension from '../../extension';
import * as MockedObject from './MockedObject';

const homedir = require('os').homedir();
const sourceFilesRoot = path.resolve(__dirname, '../../../');
const testProjectRoot = path.resolve(homedir, 'TVsCE_e2e');
const testProjectSource = `${sourceFilesRoot}/src/test/suite/data`;
const ligoContractFileSource = `${testProjectSource}/hello-tacos.mligo`;

const testProjectDestination = `${testProjectRoot}/vscode-taq-test-project`;
const ligoContractFileDestination = `${testProjectDestination}/contracts/hello-tacos.mligo`;

const originalMethods = {
	'window.showInformationMessage': vscode.window.showInformationMessage,
	'window.showQuickPick': vscode.window.showQuickPick,
	'window.showOpenDialog': vscode.window.showOpenDialog,
};

let vscodeMock: typeof vscode;
let mockedReturnValues = {
	openDialogMockValues: [''],
	openDialogMockIndex: 0,
};

function setOpenDialogMocks(...mockedPaths: string[]) {
	mockedReturnValues.openDialogMockValues = mockedPaths;
	mockedReturnValues.openDialogMockIndex = 0;
}

function getNextOpenDialogUri() {
	if (
		!mockedReturnValues.openDialogMockValues
		|| mockedReturnValues.openDialogMockIndex >= mockedReturnValues.openDialogMockValues.length
	) {
		throw new Error('We have already used all mocked values.');
	}
	const mockedValue = mockedReturnValues.openDialogMockValues[mockedReturnValues.openDialogMockIndex];
	mockedReturnValues.openDialogMockIndex++;
	return mockedValue;
}

let choosePlugin: string = '@taqueria/plugin-ligo';

const mockedMethods = {
	'window.showInformationMessage': (msg: string) => Promise.resolve(console.log(msg)),
	'window.showQuickPick': () => Promise.resolve([choosePlugin]),
	'window.showOpenDialog': () => {
		return Promise.resolve([Uri.file(getNextOpenDialogUri())]);
	},
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

	it('Verify that Taqueria commands present in the command pallet list ', async () => {
		const taqCommandsList = [
			'taqueria.init',
			'taqueria.scaffold',
			'taqueria.install',
			'taqueria.uninstall',
			'taqueria.opt_in',
			'taqueria.opt_out',
			'taqueria.refresh_command_states',
			'taqueria.compile_smartpy',
			'taqueria.compile_ligo',
			'taqueria.compile_archetype',
			'taqueria.compile_pick_file',
			'taqueria.compile_current_file',
			'taqueria.add_contract',
			'taqueria.rm_contract',
			'taqueria.generate_types',
			'taqueria.typecheck',
			'taqueria.taqueria.create_test_folder',
			'taqueria.run_tests',
			'taqueria.start_sandbox',
			'taqueria.stop_sandbox',
			'taqueria.list_accounts',
			'taqueria.originate',
			'taqueria.originate_current_file',
			'taqueria.originate_pick_file',
			'taqueria.refresh_sandbox_data',
			'taqueria.show_entrypoint_parameters',
			'taqueria.show_operation_details',
		];
		const allCommands = await vscode.commands.getCommands(true);
		const taqCommands = allCommands.filter(command => command.toLowerCase().includes('taqueria.'));
		taqCommandsList.forEach(command => {
			assert.equal(taqCommands.includes(command), true);
		});
	});

	it('Verify that VS Code command Taqueria Compile Ligo will compile Ligo contract', async () => {
		// It creates another process
		// https://stackoverflow.com/questions/51385812/is-there-a-way-to-open-a-workspace-from-an-extension-in-vs-code
		// await vscodeMock.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(testProjectDestination));
		// await workspace.updateWorkspaceFolders(0, 1, { uri: Uri.parse()});

		setOpenDialogMocks(`${ligoContractFileDestination}`);

		const output = await execSync(`ls -l ${testProjectRoot}`);
		console.log('Output ' + output);

		const outputRoot = await execSync('ls -l ./');
		console.log('Output ' + outputRoot);

		// await fse.rm(testProjectDestination, { recursive: true });
		// await fse.mkdir(testProjectDestination, { recursive: true });

		await vscodeMock.commands.executeCommand('taqueria.init');

		choosePlugin = '@taqueria/plugin-ligo';

		await vscodeMock.commands.executeCommand('taqueria.install');

		// Example if we need to force to refresh command state
		// await vscodeMock.commands.executeCommand('taqueria.refresh_command_states');

		// Copy contract from data folder
		await fse.copyFile(ligoContractFileSource, ligoContractFileDestination);

		await vscodeMock.commands.executeCommand('taqueria.compile_pick_file');

		assert.doesNotThrow(() => {
			const compileResult = fse.readFileSync(`${testProjectDestination}/artifacts/hello-tacos.tz`, {
				encoding: 'utf-8',
			});
			const expectedResult = fse.readFileSync(`${testProjectSource}/hello-tacos-expected.tz`, { encoding: 'utf-8' });
			assert.equal(compileResult, expectedResult);
		}, 'The compile command has not created the expected artifacts');
	});

	after(async () => {
		// await fse.rm(testProjectRoot, { recursive: true });
		// Uncomment for local development
		// await fse.rmdir(`${projectRoot}/.vscode-test/user-data/`, {recursive: true})
	});
});
