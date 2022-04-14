import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as taqueriaExtension from '../../extension';
import { ExtensionContext } from 'vscode';

function sleep(ms: number): Promise<void> {
    return new Promise<void> ((resolve) => setTimeout(resolve, ms));
}

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Sample test', async () => {
        // const result = await vscode.commands.executeCommand("taqueria.init");
        // console.log(result);
        const context: ExtensionContext = {
            subscriptions: [],
        } as any
        await taqueriaExtension.activate(context)
        await vscode.commands.executeCommand("taqueria.init");
        await vscode.workspace.openTextDocument(__filename);
        // await sleep(150000);
    });

    test.skip('Taqueria install test', async () => {
        const result = await vscode.commands.executeCommand("taqueria.init");
        await vscode.commands.executeCommand("taqueria.install");
        console.log(result);

        vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    });

    test.skip('Taqueria ligo compile test', async () => {
        const result = await vscode.commands.executeCommand("taqueria.init");
        await vscode.commands.executeCommand("taqueria.install");
        await vscode.commands.executeCommand("onCommand:taqueria.compile_ligo");
        console.log(result);

        vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    });

    test.skip('Taqueria ligo compile test', async () => {
        const result = await vscode.commands.executeCommand("taqueria.init");
        await vscode.commands.executeCommand("taqueria.install");
        await vscode.commands.executeCommand("onCommand:taqueria.compile_ligo");
        console.log(result);

        vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    });

    test.skip('Taqueria flextesa start sandbox test', async () => {
        const result = await vscode.commands.executeCommand("taqueria.init");
        await vscode.commands.executeCommand("taqueria.install");
        await vscode.commands.executeCommand("onCommand:taqueria.start_sandbox");
        console.log(result);

        vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    });

    test.skip('Taqueria flextesa stop sandbox test', async () => {
        const result = await vscode.commands.executeCommand("taqueria.init");
        await vscode.commands.executeCommand("taqueria.install");
        await vscode.commands.executeCommand("onCommand:taqueria.stop_sandbox");
        console.log(result);

        vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    });

    test.skip('Taqueria list accounts test', async () => {
        const result = await vscode.commands.executeCommand("taqueria.init");
        await vscode.commands.executeCommand("taqueria.install");
        await vscode.commands.executeCommand("onCommand:taqueria.stop_sandbox");
        console.log(result);

        vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    });

    test.skip('Taqueria list accounts test', async () => {
        const result = await vscode.commands.executeCommand("taqueria.init");
        await vscode.commands.executeCommand("taqueria.install");
        await vscode.commands.executeCommand("onCommand:taqueria.stop_sandbox");
        console.log(result);

        vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    });
});
