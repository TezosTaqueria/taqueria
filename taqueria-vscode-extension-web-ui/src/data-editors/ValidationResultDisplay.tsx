import React from 'react';
import { MichelineValidationResult } from '../Helpers';

export const ValidationResultDisplay = (
	{ validationResult, hideSublevelErrors }: {
		validationResult: MichelineValidationResult;
		hideSublevelErrors: boolean;
	},
) => {
	if (
		validationResult.state === 'Valid'
		|| (hideSublevelErrors && validationResult.hideErrorAtThisLevel)
	) {
		return null;
	}
	return (
		<h4
			style={{
				color: validationResult.state === 'ImmediateError' ? 'red' : 'orange',
				display: 'inline',
				verticalAlign: 'super',
			}}
		>
			&nbsp; {validationResult.messages.join('<br/>')}
		</h4>
	);
};
