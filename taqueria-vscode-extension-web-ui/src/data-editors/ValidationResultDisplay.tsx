import React from 'react';
import { MichelineValidationResult } from './MichelineValidator';

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
		<span style={{ color: props.validationResult.state === 'ImmediateError' ? 'red' : 'orange' }}>
			{props.validationResult.messages.join('<br/>')}
		</span>
	);
};
