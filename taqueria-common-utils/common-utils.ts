import { pipe } from '@taqueria/pipe';
import { crayon } from 'crayon.js';
export { pipe };
interface Writer {
	write(p: Uint8Array): Promise<number> | boolean;
}

interface UtilsDependencies {
	stdout: Writer;
	stderr: Writer;
}

export const inject = (deps: UtilsDependencies) => {
	const { stdout, stderr } = deps;

	const encode = (msg: string) => new TextEncoder().encode(msg);

	const noop = () => {};
	type Formatter = (message: unknown) => string;

	const render = (formatter: Formatter, writer: Writer['write']) =>
		(message: unknown, newline = true) => {
			if (newline) message += '\n';
			return pipe(
				String(message),
				formatter,
				encode,
				writer,
				noop,
			);
		};

	const formatMsg = (message: unknown) => String(message);

	const formatWarning = (message: unknown) => crayon.rgb(255, 128, 0)('WARNING: ' + String(message));

	const formatErr = (message: unknown) => crayon.red.bold('ERROR: ' + String(message));

	const outputMsg = (encoded: Uint8Array) => stdout.write(encoded);

	const outputWarning = (encoded: Uint8Array) => stderr.write(encoded);

	const outputErr = (encoded: Uint8Array) => stderr.write(encoded);

	const renderMsg = render(formatMsg, outputMsg);

	const renderWarning = render(formatWarning, outputWarning);

	const renderErr = render(formatErr, outputErr);

	return {
		pipe,
		encode,
		noop,
		formatMsg,
		formatWarning,
		formatErr,
		renderMsg,
		renderWarning,
		renderErr,
		outputMsg,
		outputWarning,
		outputErr,
	};
};
