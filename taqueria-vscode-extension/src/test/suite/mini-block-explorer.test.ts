import assert from 'assert';
import * as cp from 'child_process';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as vscode from 'vscode';
import { ExtensionContext, Uri } from 'vscode';
import * as taqueriaExtension from '../../extension';
import { SandboxTreeItem, SandboxTreeItemBase } from '../../lib/gui/SandboxTreeItemTypes';
import * as MockedObject from './MockedObject';
import * as Taq from './taq';

const homedir = require('os').homedir();
const sourceFilesRoot = path.resolve(__dirname, '../../../');
const testProjectRoot = path.resolve(homedir, 'TVsCE_e2e');
const testProjectSource = `${sourceFilesRoot}/src/test/suite/data`;
const testProjectDestination = `${testProjectRoot}/vscode-taq-test-project`;
const ligoContractFileSource = `${testProjectSource}/hello-tacos.mligo`;
const ligoContractFileArtifact = `${testProjectSource}/hello-tacos-expected.tz`;
const ligoContractStorageSrc = `${testProjectSource}/hello-tacos.default_storage.tz`;
const ligoContractFileDestination = `${testProjectDestination}/contracts/hello-tacos.mligo`;
const ligoContractFileArtifactDestination = `${testProjectDestination}/artifacts/hello-tacos.tz`;
const ligoContractStorageDest = `${testProjectDestination}/artifacts/hello-tacos.default_storage.tz`;

async function delay(ms: number): Promise<void> {
	return new Promise(function(resolve) {
		setTimeout(_ => resolve(), ms);
	});
}

let choosePlugin: string = '@taqueria/plugin-ligo';
let dataProviderMap = new Map();

async function getSandboxDataProviderChildren(
	element?: SandboxTreeItemBase,
): Promise<Array<SandboxTreeItem>> {
	let sandboxesDataProvider = dataProviderMap.get('taqueria-sandboxes');
	return sandboxesDataProvider.getChildren(element);
}

const mockedMethods = {
	'window.showInformationMessage': (msg: string) => Promise.resolve(console.log(msg)),
	'window.showQuickPick': () => Promise.resolve([choosePlugin]),
	'window.showOpenDialog': () => {
		return Promise.resolve([Uri.file(getNextOpenDialogUri())]);
	},
	'window.createTreeView': (
		name: string,
		{ treeDataProvider }: { treeDataProvider: vscode.TreeDataProvider<any> },
	) => {
		dataProviderMap.set(name, treeDataProvider);
	},
};
let vscodeMock: typeof vscode = MockedObject.make(vscode, mockedMethods);

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
		|| mockedReturnValues.openDialogMockIndex
			>= mockedReturnValues.openDialogMockValues.length
	) {
		throw new Error('We have already used all mocked values.');
	}
	const mockedValue = mockedReturnValues.openDialogMockValues[
		mockedReturnValues.openDialogMockIndex
	];
	mockedReturnValues.openDialogMockIndex++;
	return mockedValue;
}

async function bootstrappedBlockAccountsAndContracts(
	cb: (accounts: Array<SandboxTreeItem>, contracts: Array<SandboxTreeItem>) => void,
	count: number = 0,
): Promise<void> {
	try {
		// For reference:
		// {
		//     collapsibleState: 1,
		//     containerName: undefined,
		//     contextValue: 'sandbox:stopped',
		//     description: 'stopped',
		//     iconPath: wt {
		//       color: undefined,
		//       id: 'vm-outline'
		//     },
		//     label: 'local',
		//     sandboxName: 'local',
		//     state: 'stopped',
		//     tooltip: 'local-stopped'
		// }
		let sandboxes = await getSandboxDataProviderChildren();
		assert.equal(sandboxes.length, 1);
		let sandbox = sandboxes[0];
		assert(sandbox.description !== 'stopped');
		let [implicitAccountsGroup, contractsGroup] = await getSandboxDataProviderChildren(sandbox);
		let accounts = await getSandboxDataProviderChildren(
			implicitAccountsGroup,
		);
		let contracts = await getSandboxDataProviderChildren(contractsGroup);
		cb(accounts, contracts);
	} catch (e) {
		if (count < 100) {
			await delay(2 * 1000);
			await bootstrappedBlockAccountsAndContracts(cb, count + 1);
			console.log('Retry attempt', count + 1);
		} else {
			throw e;
		}
	}
}

describe('Extension Test Suite', async () => {
	before(async () => {
		const context: ExtensionContext = {
			subscriptions: [],
			extension: { packageJSON: { version: '0.0.0' } },
		} as any;

		await taqueriaExtension.activate(context, { vscode: vscodeMock });
		vscodeMock.window.showInformationMessage('Start all tests.');
	});

	it('Mini explorer - show UI', async () => {
		try {
			await fse.rm(testProjectDestination, { recursive: true });
		} catch {}

		await fse.mkdir(path.join(testProjectDestination, 'contracts'), {
			recursive: true,
		});

		Taq.init({ projectPath: testProjectDestination });
		const configJsonPath = path.join(
			testProjectDestination,
			'.taq/config.json',
		);
		const configJson = require(configJsonPath);
		configJson.environments!.development!.protocol = 'Nairobi';
		fse.writeFileSync(configJsonPath, JSON.stringify(configJson, null, 2));

		// TODO do this in extension.test.js. Doesn't hit the network and faster
		Taq.install({ projectPath: testProjectDestination, pluginName: 'taqueria-plugin-ligo' });
		Taq.install({ projectPath: testProjectDestination, pluginName: 'taqueria-plugin-flextesa' });
		Taq.install({ projectPath: testProjectDestination, pluginName: 'taqueria-plugin-taquito' });
		// Copy contract from data folder
		await fse.copyFile(ligoContractFileSource, ligoContractFileDestination);
		await fse.copyFile(ligoContractStorageSrc, ligoContractStorageDest);
		await fse.copyFile(ligoContractFileArtifact, ligoContractFileArtifactDestination);

		setOpenDialogMocks(`${ligoContractFileDestination}`);
		cp.execSync(
			`${path.resolve(__dirname, '../../../../taq')} -p ${testProjectDestination} stop sandbox`,
		);
		await vscodeMock.commands.executeCommand('taqueria.start_sandbox');

		// Following are event driven tests. We poll every interval for change in state and run assertions instead of arbitrary delay
		await bootstrappedBlockAccountsAndContracts(
			(accounts: Array<SandboxTreeItem>, contracts: Array<SandboxTreeItem>) => {
				assert.equal(accounts.length, 5);
				assert.equal(contracts.length, 0);
			},
		);

		Taq.originate({ projectPath: testProjectDestination, contract: 'hello-tacos.tz' });
		await bootstrappedBlockAccountsAndContracts(
			(accounts: Array<SandboxTreeItem>, contracts: Array<SandboxTreeItem>) => {
				assert.equal(accounts.length, 5);
				assert.equal(contracts.length, 1);
			},
		);
	});

	after(async () => {
		// Uncomment for local development if there is an issue with the path length
		// await fse.rmdir(`${projectRoot}/.vscode-test/user-data/`, {recursive: true})
	});
});
