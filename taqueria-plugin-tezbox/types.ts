import { RequestArgs } from '@taqueria/node-sdk';
import { LoadedConfig, Protocol, SandboxConfig } from '@taqueria/node-sdk/types';

export interface Opts extends RequestArgs.t {
	task?: string;
	watch?: boolean;
}

export interface ValidLoadedConfig extends LoadedConfig.t {
	sandbox: Record<string, SandboxConfig.t>;
	accounts: Record<string, Protocol.Tz.t>;
}

export interface ValidOpts extends RequestArgs.t {
	sandboxName: string;
	task: string;
	config: ValidLoadedConfig;
	watch?: boolean;
}

/*** @int ***/
export type BlockTime = number;

export type TezBoxBakingEnabled = {
	baking: 'enabled';
	block_time?: BlockTime;
};

export type TezBoxBakingDisabled = {
	baking: 'disabled';
};

// Assigned to SandboxConfig->annotations
export type TezBoxAnnotations = TezBoxBakingEnabled | TezBoxBakingDisabled;
