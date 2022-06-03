import assert from 'assert';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as vscode from 'vscode';
import { ExtensionContext, Uri } from 'vscode';
import * as taqueriaExtension from '../../extension';
import * as MockedObject from './MockedObject';
import { sleep } from './utils/utils';

const projectRoot = path.resolve(__dirname, '../../../../');
const testProjectDestination = `${projectRoot}/out/vscode-taq-test-project`;
const testProjectSource = `${projectRoot}/src/test/suite/data/vscode-taq-test-project`;

describe('Extension Test Suite', () => {
	before(async () => {
		const context: ExtensionContext = {
			subscriptions: [],
		} as any;
		await taqueriaExtension.activate(context, {
			vscode: MockedObject.make(vscode, {
				'window.showInformationMessage': (msg: string) => Promise.resolve(console.log(msg)),
			}),
		});
		await fse.copy(testProjectSource, testProjectDestination);

		vscode.window.showInformationMessage('Start all tests.');
	});

	it('Verify that Taqueria Initiate will init new taquifed  project ', async () => {
		await vscode.commands.getCommands(true).then(allCommands => {
			const taqCommands = allCommands.filter(command => command.toLowerCase().includes('taq'));
			assert.notEqual(taqCommands, undefined);
		});

		// TODO: Need to figure out if it is possible to interact with showDialogBox
		//      If no this test cannot be automated
		//      I tried to use RobotJS, but it has an issue to work with parser properly
		//      Even if I exclude it it keeps asking to rebuild it due to an old version of npm
		//      https://stackoverflow.com/questions/46384591/node-was-compiled-against-a-different-node-js-version-using-node-module-versio

		// await vscode.commands.executeCommand("taqueria.init").then( ()=>{
		// });

		// Example how to use sleep to stop VS Code for a moment
		// await sleep(60000);
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/605
	it.skip('Verify that VS Code command Taqueria Scaffold will scaffold a project', async () => {
		// Open taquified project in workspace under testProjectDestination

		// Run taqueria scaffold command
		await vscode.commands.executeCommand('taqueria.scaffold');
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/686
	it.skip('Verify that VS Code command Taqueria Start Sandbox starts flextesa sandbox', async () => {
		// Install plugin
		await vscode.commands.executeCommand('taqueria.install @taqueria/plugin-flextesa');

		// Verify that
		await vscode.commands.executeCommand('taqueria.start_sandbox local');
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/686
	it.skip('Verify that VS Code command Taqueria List Accounts display accounts on running sandbox', async () => {
		await vscode.commands.executeCommand('taqueria.list_accounts local');
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/686
	it.skip('Verify that VS Code command Taqueria Stop Sandbox stops flextesa sandbox', async () => {
		await vscode.commands.executeCommand('taqueria.stop_sandbox local');
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/645
	it.skip('Verify that VS Code command Taqueria Compile Ligo will compile Ligo contract', async () => {
		await vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(testProjectDestination));

		// Install plugin
		await vscode.commands.executeCommand('taqueria.install @taqueria/plugin-ligo');

		await vscode.commands.executeCommand('taqueria.compile_ligo');

		// In last test or after all block
		// vscode.commands.executeCommand("workbench.action.closeActiveEditor");
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/687
	it.skip('Verify that VS Code command Taqueria Compile SmartPy will compile SmartPy contract', async () => {
		// Install plugin
		await vscode.commands.executeCommand('taqueria.install @taqueria/plugin-smartpy');

		await vscode.commands.executeCommand('taqueria.compile_smartpy');
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/688
	it.skip('Verify that VS Code command Taqueria Deploy Contract will deploy contract to a test network', async () => {
		// Install plugin
		await vscode.commands.executeCommand('taqueria.install @taqueria/plugin-smartpy');

		await vscode.commands.executeCommand('taqueria.deploy');
	});

	after(async () => {
		await fse.rmdir(testProjectDestination, { recursive: true });
		// Uncomment for local development
		// await fse.rmdir(`${projectRoot}/.vscode-test/user-data/`, {recursive: true})
	});
});
