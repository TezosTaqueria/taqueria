import { emitMicheline, Parser } from '@taquito/michel-codec';
import React, { useState } from 'react';
import { MichelineEditorMessageHandler } from '../interopTypes';
import { DataEditorNode } from './DataEditorNode';
import './MichelineEditor.css';

const parser = new Parser();

export type OriginalFormat = 'micheline' | 'json';

export type MichelineValue = {
	originalFormat: 'micheline';
	value: string;
} | {
	originalFormat: 'json';
	value: object;
};

const json2Micheline = (v: object) => {
	let michelson: string | undefined = undefined;
	try {
		const expression = parser.parseJSON(v);
		michelson = emitMicheline(expression);
		return michelson;
	} catch (e: any) {
		return `${e}`;
	}
};

const micheline2Json = (v: string) => {
	let json: object | undefined | null = undefined;
	try {
		json = parser.parseMichelineExpression(v);
		return json;
	} catch (e: any) {
		return undefined;
	}
};

export const getMicheline = (value: MichelineValue | undefined) => {
	if (!value) {
		return undefined;
	}
	if (value.originalFormat === 'micheline') {
		return value.value;
	}
	return json2Micheline(value.value);
};

export const getJson = (value: MichelineValue | undefined) => {
	if (!value) {
		return undefined;
	}
	if (value.originalFormat === 'json') {
		return value.value;
	}
	return micheline2Json(value.value);
};

export const getFriendlyDataType = (dataType: any) => {
	if (!dataType || typeof dataType != 'object' || !dataType.prim) {
		return `Error: ${JSON.stringify(dataType)}`;
	}
	switch (dataType.prim) {
		case 'list':
		case 'set':
		case 'option':
			return `${dataType.prim} of ${getFriendlyDataType(dataType.args[0])}`;
		case 'unit':
			return 'unit';
		case 'string':
		case 'nat':
		case 'int':
		case 'bytes':
		case 'timestamp':
		// TODO: investigate each Domain-Specific type and make sure it's working fine
		case 'mutez':
		case 'address':
		case 'key':
		case 'key_hash':
		case 'signature':
		case 'chain_id':
		case 'bls12_381_g1':
		case 'bls12_381_g2':
		case 'bls12_381_fr':
		case 'sapling_transaction ms':
		case 'sapling_state ms':
		case 'ticket':
		case 'chest':
		case 'chest_key':
		case 'tx_rollup_l2_address':
		case 'bool':
			return dataType.prim;
		case 'pair':
			return `${dataType.prim} of ${dataType.args.map(x => getFriendlyDataType(x)).join(', ')}`;
		case 'map':
		case 'big_map':
			return `${dataType.prim} from ${getFriendlyDataType(dataType.args[0])} to ${
				getFriendlyDataType(dataType.args[1])
			}`;
	}
};

export const MichelineEditor = (
	{ input: { dataType, value, actionTitle, showDiagnostics }, onMessage }: {
		input: { dataType: any; value?: MichelineValue; actionTitle?: string; showDiagnostics?: boolean };
		onMessage: MichelineEditorMessageHandler;
	},
) => {
	const [currentState, setState] = useState({
		value,
		showDiagnostics: showDiagnostics ?? false,
	});

	const handleChange = (v: MichelineValue) => {
		setState({
			value: v,
			showDiagnostics: currentState.showDiagnostics,
		});
		onMessage({
			kind: 'change',
			micheline: getMicheline(currentState.value),
			michelineJson: getJson(currentState.value),
		});
	};

	const toggleDiagnostics = () => {
		setState({
			...currentState,
			showDiagnostics: !currentState.showDiagnostics,
		});
	};

	const handleClick = () => {
		onMessage?.({
			kind: 'action',
			micheline: getMicheline(currentState.value),
			michelineJson: getJson(currentState.value),
		});
	};

	return (
		<div className={currentState.showDiagnostics ? 'editorDiv showDiag' : 'editorDiv'}>
			<table border={currentState.showDiagnostics ? 1 : 0}>
				<tbody>
					<tr>
						<td colSpan={3}>
							<DataEditorNode
								dataType={dataType}
								value={getJson(currentState.value)}
								onChange={v => handleChange({ value: v, originalFormat: 'json' })}
							/>
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
										<textarea
											value={getMicheline(currentState.value)}
											onChange={e => handleChange({ value: e.target.value, originalFormat: 'micheline' })}
										/>
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
