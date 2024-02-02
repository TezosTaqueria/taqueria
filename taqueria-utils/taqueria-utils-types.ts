type Callback = () => void;

export type EnvKeys = 'TAQ_CONFIG_DIR' | 'TAQ_MAX_CONCURRENCY';

export interface EnvVars {
	get: (key: EnvKeys) => undefined | string;
}

export interface UtilsDependencies {
	stdout: typeof Deno.stdout;
	stderr: typeof Deno.stderr;
}
