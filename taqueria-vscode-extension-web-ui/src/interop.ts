import { InteropMessageInterface } from './interopTypes';

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
		console.log('vscode-TAQ: load START', {});
		(webview.postMessage as (input: unknown) => Promise<unknown>)(INIT_UI)
			.then(x => {
				console.log('vscode-TAQ: load PROMISE DONE');
			})
			.catch(err => {
				console.log('vscode-TAQ: load ERROR', { err });
			});
		console.log('vscode-TAQ: load DONE', {});
	};

	// Handle messages from webview to vscode
	const onDidReceiveMessage = webview.onDidReceiveMessage as (
		messageData: unknown,
		_: undefined,
		subscriptions: unknown,
	) => void;
	onDidReceiveMessage(
		(messageData: unknown) => {
			console.log('vscode-TAQ: onDidReceiveMessage', { messageData });

			if (messageData === LOAD_INPUT) {
				load();
				return;
			}

			console.log('vscode-TAQ: onDidReceiveMessage - Calling onMessage', { messageData });
			const onMessage = interop.onMessage as (messageData: unknown) => void;
			onMessage(messageData);
			console.log('vscode-TAQ: onDidReceiveMessage - Called onMessage - DONE', { messageData });
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
        console.log('WebView: Received message - START');
        console.log('WebView: Received message - event', { event });

        // postMessage args
        const message = event.data; 
        console.log('WebView: Received message', { message });

        if(message === '${INIT_UI}'){
            console.log('WebView: Received message - calling setGlobalInteropMessageInterface', { message });
            setGlobalInteropMessageInterface({
                ...${JSON.stringify({ view: interop.view, input: interop.input })},
                onMessage: (data) => vscode.postMessage(data),
            });
            console.log('WebView: Received message - called setGlobalInteropMessageInterface - DONE', { message });
        }
    });

    // Ready to receive input
    console.log('WebView: Ready to receive input');
    vscode.postMessage('${LOAD_INPUT}');
    console.log('WebView: Ready to receive input - Called vscode.postMessage(LOAD_INPUT) - DONE');
}());
    </script>
</body>`,
	);

	return {
		html,
	};
};

const webUiIndexHtml = `{{WEB_UI_INDEX_HTML}}`;
