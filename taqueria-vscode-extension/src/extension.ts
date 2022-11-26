import * as vscode from 'vscode';
import { InjectedDependencies, sanitizeDeps, VsCodeHelper } from './lib/helpers';

let helper: VsCodeHelper;

export async function activate(context: vscode.ExtensionContext, input?: InjectedDependencies) {
	const deps = sanitizeDeps(input);
	helper = await VsCodeHelper.construct(context, deps);
	await helper.setup();
}

export function deactivate() {
	helper.watchers.clearConfigWatchers();
}
