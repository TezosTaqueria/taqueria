import { crayon } from 'crayon.js';
import { pipe } from './pipe.ts';

interface Writer {
	write(p: Uint8Array): Promise<number | boolean>;
}

interface UtilsDependencies {
	stdout: Writer;
	stderr: Writer;
}

export const inject = (deps: UtilsDependencies) => {
	const { stdout, stderr } = deps;

	type Formatter = (message: unknown) => string;

	const encode = (msg: string) => new TextEncoder().encode(msg);

	const noop = () => {};

	const render = (formatter: Formatter, writer: Writer['write']) =>
		(message: unknown, newline = true) => {
			if (newline) message += '\n';
			return pipe(
				message,
				formatter,
				encode,
				writer,
				noop,
			);
		};

	const formatMsg = (message: unknown) => crayon.white(String(message));

	const formatWarning = (message: unknown) => crayon.rgb(255, 128, 0)('WARNING: ' + message);

	const formatError = (message: unknown) => crayon.red.bold('ERROR: ' + message);

	const outputMsg = (encoded: Uint8Array) => stdout.write(encoded);

	const outputWarning = (encoded: Uint8Array) => stderr.write(encoded);

	const outputError = (encoded: Uint8Array) => stderr.write(encoded);

	const renderMsg = render(formatMsg, outputMsg);

	const renderWarning = render(formatWarning, outputWarning);

	const renderError = render(formatError, outputError);

	return {
		encode,
		noop,
		formatMsg,
		formatWarning,
		formatError,
		renderMsg,
		renderWarning,
		renderError,
		outputMsg,
		outputWarning,
		outputError,
	};
};
