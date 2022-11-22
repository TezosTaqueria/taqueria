export type MichelineEditorMessageInput = {
	kind: 'change' | 'action';
	michelineJson?: unknown;
	micheline?: string | undefined;
	isValid: boolean;
	error?: unknown;
};

export type MichelineEditorMessageHandler = (
	data: MichelineEditorMessageInput,
) => void;

export type InteropMessageInterface =
	| {
		view: 'None';
		input: {};
	}
	| {
		view: 'MichelineEditor';
		input: {
			dataType: any;
			actionTitle?: string;
		};
		onMessage: MichelineEditorMessageHandler;
	}
	| {
		view: 'AllEditors';
		input: {};
	};
