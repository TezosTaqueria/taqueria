import * as cp from 'child_process';
import * as path from 'path';

let binaryPath = path.resolve(__dirname, '../../../../taq');
let pluginBaseDir = path.resolve(__dirname, '../../../../');

export function init({ projectPath }: { projectPath: string }) {
	console.log('Initialising project', projectPath);
	cp.execSync(`${binaryPath} init -p ${projectPath}`);
}

export function install({
	projectPath,
	pluginName,
}: {
	projectPath: string;
	pluginName: string;
}) {
	let pluginPath = path.join(pluginBaseDir, pluginName);
	console.log(`Installing ${pluginName} plugin`);
	cp.execSync(`${binaryPath} install ${pluginPath} -p ${projectPath}`);
}

export function originate({
	projectPath,
	contract,
}: {
	projectPath: string;
	contract: string;
}) {
	console.log('Originating contract', contract);
	cp.execSync(`${binaryPath} originate -p ${projectPath} ${contract}`);
}
