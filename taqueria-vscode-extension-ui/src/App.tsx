import React, { useEffect, useState } from 'react';
import { MichelineEditor } from './data-editors/MichelineEditor';
import { InteropMessageInterface } from './interop';

const state = {
	globalDependencies: undefined as undefined | InteropMessageInterface,
	onChangeCallback: (x: InteropMessageInterface) => {/* empty */},
};

const setGlobalInteropMessageInterface = (x: InteropMessageInterface) => {
	state.globalDependencies = x;
	state.onChangeCallback(x);
};
const w = window as unknown as Record<string, unknown>;
w.setGlobalInteropMessageInterface = setGlobalInteropMessageInterface;

export const App = () => {
	const [deps, setDeps] = useState(state.globalDependencies);
	useEffect(() => {
		state.onChangeCallback = x => {
			setDeps(x);
		};
		return () => {
			state.onChangeCallback = () => {};
		};
	}, []);

	if (deps?.view === 'MichelineEditor') {
		// return <MichelineEditor michelineJsonObj={{ 'prim': 'pair', 'args': [{ 'string': 'hello' }, { 'int': '42' }] }} />;
		return <MichelineEditor {...deps} />;
	}

	return <DefaultView />;
};

const DefaultView = () => {
	useEffect(() => {
		if (import.meta.env.MODE === 'production') {
			return;
		}

		// Simulate loading
		setTimeout(() => {
			setGlobalInteropMessageInterface({
				view: 'MichelineEditor',
				input: {
					michelineJsonObj: { 'prim': 'pair', 'args': [{ 'string': 'hello' }, { 'int': '42' }] },
				},
				onMessage: x => {
					console.log('Data was changed', { x });
				},
			});
		}, 250);
	}, []);

	return <></>;
};
