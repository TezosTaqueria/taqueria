import React, { useEffect, useState } from 'react';
import { MichelineEditor } from './data-editors/MichelineEditor';

type GlobalDependencies = {
	view: 'MichelineEditor';
	michelineJsonObj: unknown;
	onChange: (michelineJsonObj: unknown) => void;
};
const state = {
	globalDependencies: undefined as undefined | GlobalDependencies,
	onChangeCallback: (x: GlobalDependencies) => {/* empty */},
};

/** setGlobalDependencies
 *
 * After this script has loaded, call `window.setGlobalDependencies`
 * to control the view and pass required data and set callbacks.
 *
 * Example:
 *
 * ```
 * window.setGlobalDependencies({
 * 	view: 'MichelineEditor',
 * 	michelineJsonObj: { 'prim': 'pair', 'args': [{ 'string': 'hello' }, { 'int': '42' }] },
 * 	onChange: (x) => {
 * 		// Process the changed json
 *      // (this will occur immediately after every edit, so debounce if needed)
 * 		handleMichelineJsonChanged(x);
 * 	},
 * })
 * ```
 */
const setGlobalDependencies = (x: GlobalDependencies) => {
	state.globalDependencies = x;
	state.onChangeCallback(x);
};
const w = window as unknown as Record<string, unknown>;
w.setGlobalDependencies = setGlobalDependencies;

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
			setGlobalDependencies({
				view: 'MichelineEditor',
				michelineJsonObj: { 'prim': 'pair', 'args': [{ 'string': 'hello' }, { 'int': '42' }] },
				onChange: x => {
					console.log('Data was changed', { x });
				},
			});
		}, 250);
	}, []);

	return <></>;
};
