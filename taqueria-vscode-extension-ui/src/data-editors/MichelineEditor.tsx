import { useState } from 'react';
import { useCss, usePageTitle } from '../hooks';

export const MichelineEditor = ({ michelineJsonObj }: { michelineJsonObj: unknown }) => {
	usePageTitle('Micheline Editor');
	useCss(`
body.vscode-light {
    color: black;
}

body.vscode-dark {
    color: white;
}

body.vscode-high-contrast {
    color: red;
}

.editorDiv {
    border: 1px solid;
    border-color: var(--vscode-editorWidget-resizeBorder);
    margin: 5px;
    padding: 5px;
    display: table-cell;
    vertical-align: top;
}
.valueTitle {
    vertical-align: top;
}
    `);

	const [jsonObj, setJsonObj] = useState(michelineJsonObj);

	return (
		<div className='editorDiv'>
			<table>
				<tbody>
					<tr>
						<td className='valueTitle'>
							Parameter:
						</td>
						<td>
							<DataNodeView dataNode={jsonObj} onChange={setJsonObj} />
						</td>
					</tr>
				</tbody>
			</table>
			<div>
				<h3>Preview</h3>
				<div style={{ whiteSpace: 'pre-wrap' }}>
					{JSON.stringify(jsonObj, null, 2)}
				</div>
			</div>
		</div>
	);
};

const DataNodeView = ({ dataNode: dataNode, onChange }: { dataNode: unknown; onChange: (value: unknown) => void }) => {
	if (dataNode == null || typeof dataNode !== 'object') {
		return <DataEditor value={`${dataNode}`} onChange={onChange} />;
	}
	const dataRecord = dataNode as Record<string, unknown>;
	return (
		<div className='editorDiv'>
			<table>
				<tbody>
					{Object.entries(dataRecord).map(([key, value]) => (
						<tr key={key}>
							<td className='valueTitle'>
								{key}:
							</td>
							<td>
								<DataNodeView
									dataNode={value}
									onChange={x => {
										// console.log(`Changed ${key}`, { key, old: value, new: x });

										// TODO: Cast to appropriate type (bool, number)
										onChange({ ...dataRecord, [key]: x });
									}}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const DataEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const [currentValue, setCurrentValue] = useState(value);
	const changeValue = (v: string) => {
		setCurrentValue(v);
		onChange(v);
	};
	return <input type='text' value={`${currentValue}`} onChange={e => changeValue(e.target.value)} />;
};
