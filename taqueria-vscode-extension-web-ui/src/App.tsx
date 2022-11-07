import React, { useEffect, useState } from 'react';
import { AllEditors } from './AllEditors';
import { MichelineEditor } from './data-editors/MichelineEditor';
import { InteropMessageInterface } from './interopTypes';

const state = {
	interop: undefined as undefined | InteropMessageInterface,
	onChangeCallback: (x: InteropMessageInterface) => {/* empty */},
	logs: [] as { message: string; data?: unknown }[],
};

declare global {
	interface Window {
		setGlobalInteropMessageInterface: (x: InteropMessageInterface) => void;
	}
}

// const log = (message: string, data?: unknown) => {
// 	state.logs.push({ message, data });
// };
// console.log = log;

const setGlobalInteropMessageInterface = (x: InteropMessageInterface) => {
	state.interop = x;
	state.onChangeCallback(x);
};
window.setGlobalInteropMessageInterface = setGlobalInteropMessageInterface;

export const App = () => {
	const [deps, setDeps] = useState(state.interop);
	useEffect(() => {
		state.onChangeCallback = x => {
			setDeps(x);
		};
		return () => {
			state.onChangeCallback = () => {};
		};
	}, []);

	console.log('App RENDER', { deps, interop: state.interop });

	return (
		<>
			<EditorSelector deps={deps} />
			<DebugView />
		</>
	);
};

const EditorSelector = ({ deps }: { deps: undefined | InteropMessageInterface }) => {
	if (deps?.view === 'AllEditors') {
		return <AllEditors />;
	}
	if (deps?.view === 'MichelineEditor') {
		return <MichelineEditor {...deps} />;
	}

	return <DefaultView />;
};

const DebugView = () => {
	const DEBUG = true;
	if (!DEBUG) {
		return <></>;
	}

	const logs = state.logs;
	return (
		<div>
			{logs.map((x, i) => (
				<div key={`${i}`}>
					<div>{x.message}</div>
					{!!x.data && (
						<div style={{ whiteSpace: 'pre-wrap' }}>
							{JSON.stringify(x.data, null, 2)}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

const DefaultView = () => {
	useEffect(() => {
		if (import.meta.env.MODE === 'production') {
			return;
		}

		// Simulate loading during development
		setTimeout(() => {
			setGlobalInteropMessageInterface({
				view: 'AllEditors',
				input: {},
			});
		}, 250);
	}, []);

	return (
		<>
			<div>Loading...</div>
		</>
	);
};
