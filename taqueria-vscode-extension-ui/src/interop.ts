export type InteropMessageInterface =
	| {
		view: 'None';
		input: {};
		onMessage: (data: {}) => void;
	}
	| {
		view: 'MichelineEditor';
		input: {
			michelineJsonObj: unknown;
		};
		onMessage: (data: { michelineJsonObj: unknown }) => void;
	};

export const createVscodeWebUiHtml = <TSubscriptions>({
	webview,
	context,
	interop,
}: {
	/** panel.webview: from vscode.window.createWebviewPanel(...) */
	webview: {
		postMessage: (eventData: unknown) => PromiseLike<boolean>;
		onDidReceiveMessage: () => void;
	};
	/** context: vscode.ExtensionContext */
	context: { subscriptions: TSubscriptions };
	interop: InteropMessageInterface;
}) => {
	// Handle messages from webview to vscode
	const onDidReceiveMessage = webview.onDidReceiveMessage as (
		messageData: unknown,
		_: undefined,
		subscriptions: TSubscriptions,
	) => void;
	onDidReceiveMessage(
		(messageData: unknown) => {
			const onMessage = interop.onMessage as (messageData: unknown) => void;
			onMessage(messageData);
		},
		undefined,
		context.subscriptions,
	);

	const html = webUiIndexHtml.replace(
		`</body>`,
		`
    <script>
(function() {
    const vscode = acquireVsCodeApi();

    // Handle postMessage
    window.addEventListener('message', event => {

        // postMessage args
        const message = event.data; 
        setGlobalInteropMessageInterface({
            ...${JSON.stringify({ view: interop.view, input: interop.input })},
            onMessage: (data) => vscode.postMessage(data),
        });
    });
}())
    </script>
</body>`,
	);

	return {
		html,
	};
};

const webUiIndexHtml = `{{WEB_UI_INDEX_HTML}}`;
