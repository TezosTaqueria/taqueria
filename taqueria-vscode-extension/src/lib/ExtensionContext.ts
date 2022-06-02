import * as api from 'vscode';

export interface ExtensionContext extends api.ExtensionContext {
	readonly debugEnabled: boolean;
}

export type t = ExtensionContext;

export const of = (ctx: api.ExtensionContext): ExtensionContext => ({
	...ctx,
	debugEnabled: api.debug.activeDebugSession ? true : false,
});
