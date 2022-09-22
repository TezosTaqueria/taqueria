export type InteropMessageInterface =
	| {
		view: 'None';
		input: {};
		onMessage: (data: {}) => void;
	}
	| {
		view: 'MichelineEditor';
		input: {
			michelineJsonObj: unknown;
		};
		onMessage: (data: { michelineJsonObj: unknown }) => void;
	};
