import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
import { vsCodeButton, vsCodeCheckbox, vsCodeTextField } from '@vscode/webview-ui-toolkit';
import { provideVSCodeDesignSystem } from '@vscode/webview-ui-toolkit';
import React from 'react';

const { wrap } = provideReactWrapper(React, provideVSCodeDesignSystem());

export const VSCodeButton = wrap(vsCodeButton(), {
	name: 'vscode-button',
});

export const VSCodeTextField = wrap(vsCodeTextField(), {
	name: 'vscode-text-field',
});

export const VSCodeCheckbox = wrap(vsCodeCheckbox(), {
	name: 'vscode-checkbox',
});
