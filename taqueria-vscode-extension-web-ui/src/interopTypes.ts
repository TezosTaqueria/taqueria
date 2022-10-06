import { MichelineEditorMessageHandler } from './data-editors/MichelineEditor';

export type InteropMessageInterface =
	| {
		view: 'None';
		input: {};
		onMessage: (data: {}) => void;
	}
	| {
		view: 'MichelineEditor';
		input: {
			dataType: unknown;
		};
		onMessage: MichelineEditorMessageHandler;
	}
	| {
		view: 'AllEditors';
		input: {};
		onMessage: MichelineEditorMessageHandler;
	};
