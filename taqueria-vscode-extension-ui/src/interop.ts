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

export const createVscodeWebUiHtml = ({
	webview,
	subscriptions,
	interop,
}: {
	/** panel.webview: from vscode.window.createWebviewPanel(...) */
	webview: {
		postMessage: unknown;
		onDidReceiveMessage: unknown;
	};
	/** context.subscriptions: from vscode.ExtensionContext */
	subscriptions: unknown;
	interop: InteropMessageInterface;
}) => {
	const LOAD_INPUT = `INTEROP_LOAD_INPUT`;
	const INIT_UI = `INTEROP_INIT_UI`;
	const load = () => {
		const postMessage = webview.postMessage as (input: unknown) => void;
		postMessage(INIT_UI);
	};

	// Handle messages from webview to vscode
	const onDidReceiveMessage = webview.onDidReceiveMessage as (
		messageData: unknown,
		_: undefined,
		subscriptions: unknown,
	) => void;
	onDidReceiveMessage(
		(messageData: unknown) => {
			if (messageData === LOAD_INPUT) {
				load();
				return;
			}

			const onMessage = interop.onMessage as (messageData: unknown) => void;
			onMessage(messageData);
		},
		undefined,
		subscriptions,
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
        console.log('Received message', { message });

        if(message === '${INIT_UI}'){
            setGlobalInteropMessageInterface({
                ...${JSON.stringify({ view: interop.view, input: interop.input })},
                onMessage: (data) => vscode.postMessage(data),
            });
        }
    });

    // Ready to receive input
    console.log('Ready to receive input');
    vscode.postMessage('${LOAD_INPUT}');
}());
    </script>
</body>`,
	);

	return {
		html,
	};
};

const webUiIndexHtml = `{{WEB_UI_INDEX_HTML}}`;
