import React from 'react';
import './AllEditors.css';
import { MichelineEditor } from './data-editors/MichelineEditor';
import { usePageTitle } from './hooks';
import { MichelineEditorMessageHandler } from './interopTypes';
import { MichelineDataType } from './MichelineDataType';
import { MichelineValue } from './MichelineValue';

const typesForTestingEditor: {
	type: MichelineDataType;
	value: MichelineValue;
}[] = [
	{
		type: {
			'prim': 'bool',
			'annots': [
				'%simpleBool',
			],
		},
		value: {
			'prim': 'True',
		},
	},
	{
		type: {
			'prim': 'bytes',
			'annots': [
				'%simpleBytes',
			],
		},
		value: {
			'bytes': '82374897239847238974892374',
		},
	},
	{
		type: {
			'prim': 'int',
			'annots': [
				'%simpleInt',
			],
		},
		value: {
			'int': '42',
		},
	},
	{
		type: {
			'prim': 'nat',
			'annots': [
				'%simpleNat',
			],
		},
		value: {
			int: '42',
		},
	},
	{
		type: {
			'prim': 'string',
			'annots': [
				'%simpleString',
			],
		},
		value: {
			'string': 'Hello World',
		},
	},
	{
		type: {
			'prim': 'unit',
			'annots': [
				'%simpleUnit',
			],
		},
		value: {
			prim: 'Unit',
		},
	},
	{
		type: {
			'prim': 'list',
			'annots': [
				'%listOfPairStringInt',
			],
			'args': [
				{
					'prim': 'pair',
					'args': [
						{
							'prim': 'string',
						},
						{
							'prim': 'int',
						},
					],
				},
			],
		},
		value: [
			{
				prim: 'Pair',
				args: [{
					'string': 'Hello',
				}, {
					'int': '42',
				}],
			},
			{
				prim: 'Pair',
				args: [{
					'string': 'World',
				}, {
					'int': '84',
				}],
			},
		],
	},
	{
		type: {
			'prim': 'list',
			'annots': [
				'%listOfStrings',
			],
			'args': [
				{
					'prim': 'string',
				},
			],
		},
		value: [
			{
				string: 'Hello',
			},
			{
				string: 'World',
			},
		],
	},
	{
		type: {
			'prim': 'map',
			'annots': [
				'%mapStringInt',
			],
			'args': [
				{
					'prim': 'string',
				},
				{
					'prim': 'int',
				},
			],
		},
		value: [
			{
				'prim': 'Elt',
				args: [
					{
						'string': 'Hello',
					},
					{
						'int': '42',
					},
				],
			},
			{
				'prim': 'Elt',
				args: [
					{
						'string': 'World',
					},
					{
						'int': '43',
					},
				],
			},
		],
	},
	{
		type: {
			'prim': 'option',
			'annots': [
				'%optionOfInt',
			],
			'args': [
				{
					'prim': 'int',
				},
			],
		},
		value: {
			'prim': 'Some',
			args: [{
				'int': '34',
			}],
		},
	},
	{
		type: {
			'prim': 'pair',
			'annots': [
				'%pairOfIntString',
			],
			'args': [
				{
					'prim': 'int',
				},
				{
					'prim': 'string',
				},
			],
		},
		value: {
			'prim': 'Pair',
			'args': [
				{
					'int': '42',
				},
				{
					'string': 'Hello',
				},
			],
		},
	},
	{
		type: {
			'prim': 'pair',
			'annots': [
				'%pairOfIntStringStringInt',
			],
			'args': [
				{
					'prim': 'pair',
					'args': [
						{
							'prim': 'int',
						},
						{
							'prim': 'string',
						},
						{
							'prim': 'string',
						},
						{
							'prim': 'int',
						},
					],
				},
			],
		},
		value: {
			'prim': 'Pair',
			'args': [
				{
					'prim': 'Pair',
					'args': [
						{
							'int': '42',
						},
						{
							'string': 'Hello',
						},
						{
							'string': 'World',
						},
						{
							'int': '43',
						},
					],
				},
			],
		},
	},
	{
		type: {
			'prim': 'pair',
			'annots': [
				'%pairOfListStringListOptionInt',
			],
			'args': [
				{
					'prim': 'list',
					'args': [
						{
							'prim': 'string',
						},
					],
				},
				{
					'prim': 'list',
					'args': [
						{
							'prim': 'option',
							'args': [
								{
									'prim': 'int',
								},
							],
						},
					],
				},
			],
		},
		value: {
			'prim': 'Pair',
			'args': [
				[
					{
						'string': 'Hello',
					},
					{
						'string': 'World',
					},
				],
				[
					{
						'prim': 'None',
					},
					{
						'prim': 'Some',
						'args': [{
							'int': '12',
						}],
					},
				],
			],
		},
	},
	{
		type: {
			'prim': 'set',
			'annots': [
				'%setOfString',
			],
			'args': [
				{
					'prim': 'string',
				},
			],
		},
		value: [
			{
				'string': 'Hello',
			},
			{
				'string': 'World',
			},
		],
	},
];

export const AllEditors = () => {
	usePageTitle('Test Editors for many Data Types');

	const handleMessage: MichelineEditorMessageHandler = data => {
		console.log(data);
	};
	return (
		<div className='allEditors'>
			{typesForTestingEditor.map((item, index) => (
				<div key={index} className='singleEditor'>
					<MichelineEditor
						input={{
							dataType: item.type,
							value: { value: item.value, originalFormat: 'json' },
							showDiagnostics: false,
						}}
						onMessage={handleMessage}
					/>
				</div>
			))}
		</div>
	);
};
