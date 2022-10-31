import React from 'react';
import { hasPrim, isObject } from '../Helpers';
import { MichelineDataType } from '../MichelineDataType';
import { BoolEditor } from './BoolEditor';
import { ListEditor } from './ListEditor';
import { MapEditor } from './MapEditor';
import { getFriendlyDataType } from './MichelineEditor';
import { OptionEditor } from './OptionEditor';
import { PairEditor } from './PairEditor';
import { PrimitiveEditor } from './PrimitiveEditor';

export const DataEditorNode = (
	{ dataType, value, onChange, hideDataType }: {
		dataType: MichelineDataType;
		value: unknown;
		onChange: (value: unknown) => void;
		hideDataType?: boolean | undefined;
	},
) => (
	<table>
		<tbody>
			<tr>
				{hideDataType !== true && (
					<td>
						<h4 style={{ display: 'inline' }}>{getFriendlyDataType(dataType)}</h4>
					</td>
				)}
				<td>
					{getEditor({ dataType, onChange, value })}
				</td>
			</tr>
		</tbody>
	</table>
);

const getEditor = (
	{ dataType, value, onChange }: { dataType: MichelineDataType; value: unknown; onChange: (value: unknown) => void },
) => {
	const prim = dataType.prim;
	switch (prim) {
		case 'unit':
			if (!isObject(value) || !hasPrim(value, 'Unit')) {
				onChange({
					'prim': 'Unit',
				});
			}
			return null;
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
			return <PrimitiveEditor dataType={prim} value={value} onChange={onChange} />;
		case 'bool':
			return <BoolEditor value={value} onChange={onChange} />;
		case 'list':
		case 'set':
			return <ListEditor dataType={dataType} value={value} onChange={onChange} />;
		case 'option':
			return <OptionEditor dataType={dataType} value={value} onChange={onChange} />;
		case 'pair':
			return <PairEditor value={value} dataType={dataType} onChange={onChange} />;
		case 'map':
		case 'big_map':
			return <MapEditor value={value} dataType={dataType} onChange={onChange} />;
		default:
			return (
				<span>
					The editor for {JSON.stringify(dataType)}{' '}
					is not implemented yet, please contract the taqueria team at github.com/ecadlabs/taqueria to report this
					issue.
				</span>
			);
	}
};
