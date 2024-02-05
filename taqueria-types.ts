import type { i18n } from '@taqueria/protocol/i18n';
import * as LoadedConfig from '@taqueria/protocol/LoadedConfig';
import * as SanitizedArgs from '@taqueria/protocol/SanitizedArgs';
import * as Settings from '@taqueria/protocol/Settings';
import yargs from 'deno-yargs';

// TODO: There should be an ActionResponse type that we're extending here.
// This probably exists already in the taqueria-sdk and should be moved to the
// taqueria-protocol package so that the type can be shared between the CLI
// and SDK
export type PluginResponseValidator = <T extends { success: boolean; stdout?: string; stderr?: string }>(
	json: Record<string, unknown>,
) => T;

export interface Builder {
	[key: string]: Record<string, unknown>;
	plugin: {
		choices: string[];
		default: string;
	};
}

export interface CLICommand {
	original: string;
	description: string;
	handler: (yargs: CLIConfig) => unknown;
	builder: Builder;
	middlewares: (yargs: CLIConfig) => CLIConfig[];
	demanded: string[];
	optional: string[];
}

export type DenoArgs = typeof Deno.args;

export type MachineInfo = {
	arch: string;
	os: string;
	target: string;
	vendor: string;
};

export interface UsageAnalyticsDeps {
	readonly parsedArgs: SanitizedArgs.t;
	readonly env: EnvVars;
	readonly machineInfo: MachineInfo;
}

export type EnvKey =
	| 'TAQ_COLUMNS'
	| 'TAQ_CONFIG_DIR'
	| 'TAQ_MAX_CONCURRENCY'
	| 'TAQ_PROJECT_DIR'
	| 'TAQ_ENV'
	| 'TAQ_DISABLE_STATE'
	| 'TAQ_VERSION'
	| 'HOME'
	| 'CI'
	| 'TEST';

export interface EnvVars {
	get: (key: EnvKey) => undefined | string;
}

export type CLIConfig = ReturnType<typeof yargs> & {
	handled?: boolean;
};

export type PluginRequestArgs = (string | number | boolean)[];

// Common dependencies before we retrieved the config
export interface PreExtendDeps {
	readonly parsedArgs: SanitizedArgs.t;
	readonly env: EnvVars;
	readonly i18n: i18n;
	readonly stdout: typeof Deno.stdout;
	readonly stderr: typeof Deno.stderr;
}

// Common dependencies after we retrieved the config
export interface PluginDeps extends PreExtendDeps {
	readonly config: LoadedConfig.t;
}

export { LoadedConfig };
