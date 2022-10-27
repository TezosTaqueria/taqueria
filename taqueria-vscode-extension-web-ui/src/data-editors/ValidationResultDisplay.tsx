import React from 'react';
import { MichelineValidationResult } from '../Helpers';

export const ValidationResultDisplay = (
	props: { validationResult: MichelineValidationResult; hideSublevelErrors: boolean },
) => {
	if (
		props.validationResult.state === 'Valid'
		|| (props.hideSublevelErrors && props.validationResult.hideErrorAtThisLevel)
	) {
		return null;
	}
	return (
		<h4
			style={{
				color: props.validationResult.state === 'ImmediateError' ? 'red' : 'orange',
				display: 'inline',
				verticalAlign: 'super',
			}}
		>
			&nbsp; {props.validationResult.messages.join('<br/>')}
		</h4>
	);
};
