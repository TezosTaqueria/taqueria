import { emitMicheline, Parser } from '@taquito/michel-codec';
import React, { useState } from 'react';
import { WebviewApi } from 'vscode-webview';
import { isObject, MichelineValue as ValidationMichelineValue } from '../Helpers';
import { MichelineEditorMessageHandler } from '../interopTypes';
import { DataEditorNode } from './DataEditorNode';
import './MichelineEditor.css';
import { validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';
import { VSCodeButton } from './VsCodeWebViewUIToolkitWrappers';

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
	const expression = parser.parseJSON(v);
	michelson = emitMicheline(expression);
	return michelson;
};

const micheline2Json = (v: string) => {
	let json: object | undefined | null = undefined;
	json = parser.parseMichelineExpression(v);
	return json;
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

export const getFriendlyDataType = (dataType: any): string => {
	if (!isObject(dataType) || !dataType.prim) {
		return `Error: ${JSON.stringify(dataType)}`;
	}
	let friendlyDataType: string;
	switch (dataType.prim) {
		case 'list':
		case 'set':
		case 'option':
			friendlyDataType = `${dataType.prim} of ${getFriendlyDataType(dataType.args[0])}`;
			break;
		case 'unit':
			return 'unit';
		case 'string':
		case 'nat':
		case 'int':
		case 'bytes':
		case 'timestamp':
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
			friendlyDataType = dataType.prim;
			break;
		case 'pair':
			friendlyDataType = `${dataType.prim} of ${(dataType.args as any[]).map(x => getFriendlyDataType(x)).join(', ')}`;
			break;
		case 'map':
		case 'big_map':
			friendlyDataType = `${dataType.prim} from ${getFriendlyDataType(dataType.args[0])} to ${
				getFriendlyDataType(dataType.args[1])
			}`;
			break;
		default:
			return `Error: ${JSON.stringify(dataType)}`;
	}
	if (dataType.annots && dataType.annots.length) {
		return `${(dataType.annots as string[]).map(x => x?.substring(1)).join(' ')} (${friendlyDataType})`;
	}
	return friendlyDataType;
};

declare const vscodeApi: WebviewApi<any>;

export const MichelineEditor = (
	{ input: { dataType, value, actionTitle, showDiagnostics }, onMessage }: {
		input: { dataType: any; value?: MichelineValue; actionTitle?: string; showDiagnostics?: boolean };
		onMessage: MichelineEditorMessageHandler;
	},
) => {
	const previousState = vscodeApi.getState() as MichelineValue | undefined;

	const [currentState, setState] = useState({
		value: previousState ?? value,
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
		vscodeApi.setState(v);
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

	const validationResult = validate(dataType, getJson(currentState.value) as ValidationMichelineValue);
	return (
		<div className={currentState.showDiagnostics ? 'editorDiv showDiag' : 'editorDiv'}>
			<table border={currentState.showDiagnostics ? 1 : 0}>
				<tbody>
					<tr>
						<td colSpan={3}>
							<h3>{getFriendlyDataType(dataType)}</h3>
						</td>
					</tr>
					<tr>
						<td colSpan={3}>
							<DataEditorNode
								dataType={dataType}
								value={getJson(currentState.value)}
								hideDataType={true}
								onChange={v => handleChange({ value: v, originalFormat: 'json' })}
							/>
						</td>
					</tr>
					<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={false} />
					{currentState.showDiagnostics
						&& (
							<tbody>
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
											{JSON.stringify(currentState.value?.value, null, 2)}
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
								<tr>
									<span
										style={{
											'color': validationResult.state === 'Valid'
												? 'green'
												: validationResult.state === 'ImmediateError'
												? 'red'
												: 'orange',
										}}
									>
										{JSON.stringify(validationResult, null, 2)}
									</span>
								</tr>
							</tbody>
						)}
				</tbody>
			</table>
			{actionTitle
				&& (
					<VSCodeButton appearance='primary' disabled={validationResult.state !== 'Valid'} onClick={handleClick}>
						{actionTitle}
					</VSCodeButton>
				)}
			&nbsp;
			<VSCodeButton appearance='secondary' onClick={toggleDiagnostics}>Toggle Diagnostics</VSCodeButton>
		</div>
	);
};
