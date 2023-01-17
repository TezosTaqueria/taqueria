import { OutputChannel } from 'vscode';
import { VsCodeApi } from './helpers';

export enum OutputLevels {
	output,
	fatal,
	error,
	warn,
	info,
	debug,
	trace,
}

const outputLevelsOrder = [
	OutputLevels.trace,
	OutputLevels.debug,
	OutputLevels.info,
	OutputLevels.warn,
	OutputLevels.error,
	OutputLevels.fatal,
	OutputLevels.output,
];

export const shouldOutput = (currentLogLevel: OutputLevels, configuredLogLevel: OutputLevels) => {
	const currentLogIndex = outputLevelsOrder.indexOf(currentLogLevel);
	const configuredLogIndex = outputLevelsOrder.indexOf(configuredLogLevel);
	return currentLogIndex >= configuredLogIndex;
};

export class LogHelper {
	private _logLevel: OutputLevels;
	private _outputChannel: OutputChannel;
	private _logChannel: OutputChannel;

	get logLevel() {
		return this._logLevel;
	}

	get outputChannel() {
		return this._outputChannel;
	}

	get logChannel() {
		return this._logChannel;
	}

	constructor(vscode: VsCodeApi) {
		const logLevelText = process.env.LogLevel ?? OutputLevels[OutputLevels.warn];
		this._logLevel = OutputLevels[logLevelText as keyof typeof OutputLevels] ?? OutputLevels.warn;
		this._outputChannel = vscode.window.createOutputChannel('Taqueria');
		this._logChannel = vscode.window.createOutputChannel('Taqueria Logs');
		this._logChannel.appendLine(`Log level: ${OutputLevels[this._logLevel]}`);
	}

	showOutput(data: string) {
		this._outputChannel.appendLine(data);
		this._outputChannel.show();
	}

	showLog = (currentOutputLevel: OutputLevels, data: string) => {
		if (!shouldOutput(currentOutputLevel, this._logLevel)) {
			return;
		}
		this._logChannel.appendLine(data);
	};
}
