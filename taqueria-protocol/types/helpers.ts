import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export const parsingErrorMessages = (typeName: string) => {
	const parseErrMsg = (value: unknown, previous: unknown) => {
		const message = ['string', 'number', 'boolean'].includes(typeof value)
			? `${value} is not a valid ${typeName}`
			: `This is not a valid ${typeName}`;

		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = `  ${path}: ${issue.message}`;
					return [...retval, msg];
				},
				[message],
			);
			return msgs.join('\n') + '\n';
		}
		return message;
	};

	const unknownErrMsg = (value: unknown) => 'Something went wrong trying to parse an ${typeName}';

	return {
		parseErrMsg,
		unknownErrMsg,
	};
};
