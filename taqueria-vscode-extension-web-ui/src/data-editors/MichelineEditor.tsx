import React, { useState } from 'react';
import { usePageTitle } from '../hooks';
import { DataEditorNode } from './DataEditorNode';
import { ListEditor } from './ListEditor';
import './MichelineEditor.css';
import { PairEditor } from './PairEditor';
import { PrimitiveEditor } from './PrimitiveEditor';

export type MichelineEditorMessageHandler = (data: { userData: unknown }) => void;

export const MichelineEditor = (
	{ input: { dataType, value }, onMessage }: {
		input: { dataType: any; value: any };
		onMessage: MichelineEditorMessageHandler;
	},
) => {
	const [currentValue, setValue] = useState(value);
	const handleChange = (v: unknown) => {
		setValue(v as any);
		onMessage({ userData: v });
	};

	return (
		<div className='editorDiv'>
			<table border={1}>
				<tbody>
					<tr>
						<td colSpan={2}>
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
							<h3>Preview</h3>
							<div style={{ whiteSpace: 'pre-wrap' }}>
								{JSON.stringify(currentValue, null, 2)}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
