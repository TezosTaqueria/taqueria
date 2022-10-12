import { emitMicheline, Parser } from '@taquito/michel-codec';
import React, { useState } from 'react';
import { MichelineEditorMessageHandler } from '../interopTypes';
import { DataEditorNode } from './DataEditorNode';
import './MichelineEditor.css';

const parser = new Parser();

export const MichelineEditor = (
	{ input: { dataType, value, actionTitle }, onMessage }: {
		input: { dataType: any; value?: any; actionTitle?: string };
		onMessage: MichelineEditorMessageHandler;
	},
) => {
	const [currentValue, setValue] = useState(value);
	const handleChange = (v: unknown) => {
		setValue(v as any);
		let micheline = getMicheline(v);
		onMessage({ kind: 'change', michelineJson: v, micheline });
	};

	const handleClick = () => {
		let micheline = getMicheline(currentValue);
		onMessage?.({ kind: 'action', michelineJson: currentValue, micheline });
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
		<div className='editorDiv'>
			<table border={1}>
				<tbody>
					<tr>
						<td colSpan={3}>
							<DataEditorNode dataType={dataType} value={currentValue} onChange={handleChange} />
						</td>
					</tr>
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
								{JSON.stringify(currentValue, null, 2)}
							</div>
						</td>
						<td>
							<h3>Micheline</h3>
							<div style={{ whiteSpace: 'pre-wrap' }}>
								{getMicheline(currentValue)}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			{actionTitle
				&& <button onClick={handleClick}>{actionTitle}</button>}
		</div>
	);
};
