import React, { useState } from 'react';
import './AllEditors.css';
import { MichelineEditor, MichelineEditorMessageHandler } from './data-editors/MichelineEditor';
import { usePageTitle } from './hooks';

const allTypes = [
	{
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
	{
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
	{
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
	{
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
	{
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
	{
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
				],
			},
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
	{
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
	{
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
	{
		'prim': 'bool',
		'annots': [
			'%simpleBool',
		],
	},
	{
		'prim': 'bytes',
		'annots': [
			'%simpleBytes',
		],
	},
	{
		'prim': 'int',
		'annots': [
			'%simpleInt',
		],
	},
	{
		'prim': 'nat',
		'annots': [
			'%simpleNat',
		],
	},
	{
		'prim': 'string',
		'annots': [
			'%simpleString',
		],
	},
	{
		'prim': 'unit',
		'annots': [
			'%simpleUnit',
		],
	},
];

export const AllEditors = () => {
	usePageTitle('Test Editors for many Data Types');

	const handleMessage: MichelineEditorMessageHandler = data => {
		console.log('Data was changed', { data });
	};
	return (
		<div className='allEditors'>
			{allTypes.map((dataType, index) => (
				<div key={index} className='singleEditor'>
					<MichelineEditor input={{ dataType: dataType, value: null }} onMessage={handleMessage} />
				</div>
			))}
		</div>
	);
};
