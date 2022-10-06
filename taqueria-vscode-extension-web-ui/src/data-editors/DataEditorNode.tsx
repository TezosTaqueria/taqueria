import React from 'react';
import { BoolEditor } from './BoolEditor';
import { ListEditor } from './ListEditor';
import { MapEditor } from './MapEditor';
import { OptionEditor } from './OptionEditor';
import { PairEditor } from './PairEditor';
import { PrimitiveEditor } from './PrimitiveEditor';

export const DataEditorNode = (
	{ dataType, onChange, value }: { dataType: any; value: any; onChange: (value: unknown) => void },
) => (
	<div>
		{(dataType.annots as string[])?.map(x => x.substring(1)).join(' ')}
		{getEditor({ dataType, onChange, value })}
	</div>
);

const getEditor = (
	{ dataType, onChange, value }: { dataType: any; value: any; onChange: (value: unknown) => void },
) => {
	const prim = dataType.prim;
	switch (prim) {
		case 'unit':
			return null;
		case 'string':
		case 'nat':
		case 'int':
		case 'bytes':
			return <PrimitiveEditor dataType={prim} value={value} onChange={onChange} />;
		case 'bool':
			return <BoolEditor value={value} onChange={onChange} />;
		case 'list':
			return <ListEditor dataType={dataType} value={value as unknown[]} onChange={onChange} />;
		case 'option':
			return <OptionEditor dataType={dataType} value={value} onChange={onChange} />;
		case 'pair':
			return <PairEditor value={value} dataType={dataType} onChange={onChange} />;
		case 'map':
			return <MapEditor value={value} dataType={dataType} onChange={onChange} />;
	}
};

const processDataType = (parentDataType: any) => {
	const fields = Object.entries(parentDataType).map(([key, value]) => ({
		key,
		value,
	}));

	if (fields.length === 1) {
		const { key: fieldKey, value: dataType } = fields[0];
	}
};
