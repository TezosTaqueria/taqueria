import React from 'react';
import { DataEditorNode } from './DataEditorNode';
import { VSCodeCheckbox } from './VsCodeWebViewUIToolkitWrappers';

export const OptionEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any; onChange: (value: any) => void },
) => {
	const changeValue = (v: any) => {
		onChange({
			'prim': 'Some',
			'args': [v],
		});
	};
	if (
		value === null || value === undefined || typeof value !== 'object'
		|| (value.prim !== 'None' && value.prim !== 'Some')
	) {
		value = {
			'prim': 'None',
		};
		changeValue(value);
	}
	const setOption = (hasValue: boolean) => {
		if (hasValue) {
			onChange({
				'prim': 'Some',
				'args': [null],
			});
		} else {
			onChange({
				'prim': 'None',
			});
		}
	};
	return (
		<table>
			<tr>
				<td>
					<VSCodeCheckbox
						checked={value.prim !== 'None'}
						onClick={e => setOption((e.target as HTMLInputElement).checked)}
					/>{' '}
					<h4 style={{ display: 'inline', verticalAlign: 'super' }}>{value.prim}</h4>
				</td>
				<td>
					{value.prim !== 'None' && (
						<DataEditorNode
							dataType={dataType.args[0]}
							value={value.args[0]}
							onChange={v => changeValue(v)}
						/>
					)}
				</td>
			</tr>
		</table>
	);
};
