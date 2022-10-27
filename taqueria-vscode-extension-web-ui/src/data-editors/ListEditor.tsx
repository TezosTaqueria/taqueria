import React from 'react';
import { DataEditorNode } from './DataEditorNode';
import { compare, validate } from './MichelineValidator';
import { ValidationResultDisplay } from './ValidationResultDisplay';
import { VSCodeButton } from './VsCodeWebViewUIToolkitWrappers';

export const ListEditor = (
	{ dataType, value, onChange }: { dataType: any; value: any[]; onChange: (value: any) => void },
) => {
	if (!Array.isArray(value)) {
		value = [];
		onChange(value);
	}
	const changeValue = (index: number, v: any) => {
		const newValue = value.slice();
		newValue[index] = v;
		onChange(newValue);
	};
	const moveUp = (index: number) => {
		if (index <= 0) {
			return;
		}
		const newValue = value.slice();
		newValue[index - 1] = value[index];
		newValue[index] = value[index - 1];
		onChange(newValue);
	};
	const moveDown = (index: number) => {
		if (index >= value.length - 1) {
			return;
		}
		const newValue = value.slice();
		newValue[index + 1] = value[index];
		newValue[index] = value[index + 1];
		onChange(newValue);
	};
	const remove = (index: number) => {
		const newValue = value.slice();
		newValue.splice(index, 1);
		onChange(newValue);
	};
	const sort = () => {
		const newValue = value.slice();
		(newValue as any[]).sort((a, b) => -compare(dataType.args[0], a, b));
		onChange(newValue);
	};
	const validationResult = validate(dataType, value);
	return (
		<div className='editorDiv'>
			<table>
				{value.length === 0 && (
					<tr>
						<td>
							<h4>The List is empty. Please click on + button to add items to the List.</h4>
						</td>
					</tr>
				)}
				{value.map((item, index) => [
					<tbody key={index}>
						<tr>
							<td className='buttonContainer'>
								{dataType.prim === 'list'
									&& (
										<VSCodeButton appearance='icon' onClick={() => moveUp(index)} disabled={index === 0}>
											<span className='codicon codicon-chevron-up'>⮝</span>
										</VSCodeButton>
									)}
								<VSCodeButton appearance='icon' onClick={() => remove(index)}>✘</VSCodeButton>
								{dataType.prim === 'list'
									&& (
										<VSCodeButton
											appearance='icon'
											onClick={() => moveDown(index)}
											disabled={index === value.length - 1}
										>
											⮟
										</VSCodeButton>
									)}
							</td>
							<td className='valueTitle'>{index}:</td>
							<td>
								<DataEditorNode
									hideDataType={true}
									dataType={dataType.args[0]}
									value={item}
									onChange={v => changeValue(index, v)}
								/>
							</td>
						</tr>
					</tbody>,
				])}
				<tr>
					<td colSpan={2}>
						<button onClick={() => changeValue(value.length, {})}>➕</button>
						{dataType.prim === 'set' && <button onClick={() => sort()}>Sort</button>}
					</td>
					<td>
						<ValidationResultDisplay validationResult={validationResult} hideSublevelErrors={true} />
					</td>
				</tr>
			</table>
		</div>
	);
};
