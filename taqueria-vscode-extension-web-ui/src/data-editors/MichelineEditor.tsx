import { emitMicheline, Parser } from '@taquito/michel-codec';
import React, { useState } from 'react';
import { MichelineEditorMessageHandler } from '../interopTypes';
import { DataEditorNode } from './DataEditorNode';
import './MichelineEditor.css';

const parser = new Parser();

export const MichelineEditor = (
	{ input: { dataType, value, actionTitle, showDiagnostics }, onMessage }: {
		input: { dataType: any; value?: any; actionTitle?: string; showDiagnostics?: boolean };
		onMessage: MichelineEditorMessageHandler;
	},
) => {
	const [currentState, setState] = useState({
		value,
		showDiagnostics: showDiagnostics ?? false,
	});

	const handleChange = (v: unknown) => {
		setState({
			value: v as any,
			showDiagnostics: currentState.showDiagnostics,
		});
		let micheline = getMicheline(v);
		onMessage({ kind: 'change', michelineJson: v, micheline });
	};

	const toggleDiagnostics = () => {
		setState({
			...currentState,
			showDiagnostics: !currentState.showDiagnostics,
		});
	};

	const handleClick = () => {
		let micheline = getMicheline(currentState.value);
		onMessage?.({ kind: 'action', michelineJson: currentState.value, micheline });
	};

	const getMicheline = (v: unknown) => {
		let michelson: string | undefined = undefined;
		try {
			const expression = parser.parseJSON(v as object);
			michelson = emitMicheline(expression);
			return michelson;
		} catch (e: any) {
			return `${e}`;
		}
	};

	return (
		<div className={currentState.showDiagnostics ? 'editorDiv showDiag' : 'editorDiv'}>
			<table border={currentState.showDiagnostics ? 1 : 0}>
				<tbody>
					<tr>
						<td colSpan={3}>
							<DataEditorNode dataType={dataType} value={currentState.value} onChange={handleChange} />
						</td>
					</tr>
					{currentState.showDiagnostics
						&& (
							<tr>
								<td>
									<h3>Type</h3>
									<div style={{ whiteSpace: 'pre-wrap' }}>
										{JSON.stringify(dataType, null, 2)}
									</div>
								</td>
								<td>
									<h3>Json</h3>
									<div style={{ whiteSpace: 'pre-wrap' }}>
										{JSON.stringify(currentState.value, null, 2)}
									</div>
								</td>
								<td>
									<h3>Micheline</h3>
									<div style={{ whiteSpace: 'pre-wrap' }}>
										{getMicheline(currentState.value)}
									</div>
								</td>
							</tr>
						)}
				</tbody>
			</table>
			{actionTitle
				&& <button onClick={handleClick}>{actionTitle}</button>}
			<button onClick={toggleDiagnostics}>Toggle Diagnostics</button>
		</div>
	);
};
