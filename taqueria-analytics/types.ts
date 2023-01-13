import * as Settings from '@taqueria/protocol/Settings';

export type MachineInfo = {
	arch: string;
	os: string;
	target: string;
	vendor: string;
};

export type Consent = 'opt_in' | 'opt_out';

export type EventName = string;

export type EventParams = Record<string, string | boolean | number | ((string | boolean | number)[])>;

export type StoredEvent = {
	name: EventName;
	params: EventParams;
};

export type Deps = {
	isCICD: boolean;
	isTesting: boolean;
	settings: Settings.t;
	operatingSystem: string;
	taqVersion: string; // version of the taqueria CLI
	taqBuild: string; // build of the taqueria CLI
	fields?: EventParams; // other common fields to include in the event
	getMachineId: () => Promise<string>; // function used to determine the machine id
	fetch: (uri: string, opts: Record<string, unknown>) => Promise<unknown>;
};
