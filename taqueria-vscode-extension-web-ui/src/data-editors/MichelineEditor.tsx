import { emitMicheline, Parser } from '@taquito/michel-codec';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import React, { useState } from 'react';
import { WebviewApi } from 'vscode-webview';
import { isObject } from '../Helpers';
import { MichelineEditorMessageHandler } from '../interopTypes';
import { MichelineDataType } from '../MichelineDataType';
import { MichelineValue } from '../MichelineValue';
import { DataEditorNode } from './DataEditorNode';
import './MichelineEditor.css';
import { validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';

const parser = new Parser();

export type OriginalFormat = 'micheline' | 'json';

export type MichelineValueContainer = {
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

export const getMicheline = (value: MichelineValueContainer | undefined) => {
	if (!value) {
		return undefined;
	}
	if (value.originalFormat === 'micheline') {
		return value.value;
	}
	return json2Micheline(value.value);
};

export const getJson = (value: MichelineValueContainer | undefined) => {
	if (!value) {
		return undefined;
	}
	if (value.originalFormat === 'json') {
		return value.value;
	}
	return micheline2Json(value.value);
};

export const getFriendlyDataType = (dataType: MichelineDataType): string => {
	if (!isObject(dataType) || !dataType.prim) {
		return `Error: ${JSON.stringify(dataType)}`;
	}
	let friendlyDataType: string;
	switch (dataType.prim) {
		case 'list':
		case 'set':
		case 'option':
			friendlyDataType = `${dataType.prim} of ${getFriendlyDataType(dataType.args![0])}`;
			break;
		case 'contract':
			friendlyDataType = `Contract with entrypoint of type ${getFriendlyDataType(dataType.args![0])}`;
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
			friendlyDataType = `${dataType.prim} of ${dataType.args.map(x => getFriendlyDataType(x)).join(', ')}`;
			break;
		case 'map':
		case 'big_map':
			friendlyDataType = `${dataType.prim} from ${getFriendlyDataType(dataType.args[0])} to ${
				getFriendlyDataType(dataType.args[1])
			}`;
			break;
		case 'or':
			friendlyDataType = `or (${dataType.args.map(type => getFriendlyDataType(type)).join(') (')} )`;
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
		input: {
			dataType: MichelineDataType;
			value?: MichelineValueContainer;
			actionTitle?: string;
			showDiagnostics?: boolean;
		};
		onMessage: MichelineEditorMessageHandler;
	},
) => {
	let previousState: MichelineValueContainer | undefined;
	try {
		previousState = vscodeApi?.getState();
	} catch {
		previousState = undefined;
	}

	const [currentState, setState] = useState({
		value: previousState ?? value,
		showDiagnostics: showDiagnostics ?? false,
	});

	console.log(currentState);

	const handleChange = (v: MichelineValueContainer) => {
		setState({
			value: v,
			showDiagnostics: currentState.showDiagnostics,
		});
		let error: unknown = undefined;
		let micheline: string | undefined = undefined;
		try {
			micheline = getMicheline(v);
		} catch (e: unknown) {
			error = e;
			console.log(`Could not convert value to Micheline:`);
			console.log(v);
			console.log(e);
		}
		let michelineJson: object | null | undefined = undefined;
		try {
			michelineJson = getJson(v);
		} catch (e: unknown) {
			error = e;
			console.log(`Could not convert value to Micheline Json:`);
			console.log(v);
			console.log(e);
		}
		if (error === undefined) {
			onMessage({
				kind: 'change',
				micheline: micheline,
				michelineJson: michelineJson,
				isValid: true,
			});
		} else {
			onMessage({
				kind: 'change',
				isValid: false,
				error,
			});
		}
		try {
			vscodeApi.setState(v);
		} catch {
			// ignore
		}
	};

	const toggleDiagnostics = () => {
		const newState = {
			...currentState,
			showDiagnostics: !currentState.showDiagnostics,
		};
		setState(newState);
	};

	const handleClick = () => {
		try {
			onMessage?.({
				kind: 'action',
				micheline: getMicheline(currentState.value),
				michelineJson: getJson(currentState.value),
				isValid: true,
			});
		} catch (error: unknown) {
			// ignore
		}
	};

	const validationResult = validate(dataType, getJson(currentState.value) as MichelineValue);

	let json: object | null | undefined;
	try {
		json = getJson(currentState.value);
	} catch {
		json = undefined;
	}

	let micheline: string | undefined;
	try {
		micheline = getMicheline(currentState.value);
	} catch (e) {
		micheline = `${e}`;
	}

	const style = {
		border: currentState.showDiagnostics ? 1 : 0,
	};

	return (
		<div className={currentState.showDiagnostics ? 'editorDiv showDiag' : 'editorDiv'}>
			<table style={style}>
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
								value={json}
								hideDataType={true}
								onChange={v => handleChange({ value: v as MichelineValue, originalFormat: 'json' })}
							/>
						</td>
					</tr>
					<tr>
						<td colSpan={3}>
							<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={false} />
						</td>
					</tr>
				</tbody>
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
										{JSON.stringify(json, null, 2)}
									</div>
								</td>
								<td>
									<h3>Micheline</h3>
									<div style={{ whiteSpace: 'pre-wrap' }}>
										<textarea
											value={micheline}
											onChange={e => handleChange({ value: e.target.value, originalFormat: 'micheline' })}
										/>
									</div>
								</td>
							</tr>
							<tr>
								<td>
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
								</td>
							</tr>
						</tbody>
					)}
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
