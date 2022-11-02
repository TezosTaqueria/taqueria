// ---- Simple Types & Type Fragments ----

/** @minLength 1 */
export type NonEmptyString = string;

/** @pattern ^[A-Za-z]$ */
export type SingleChar = string;

/** @pattern ^[A-Za-z\-\ ]+ */
export type Verb = string;

export type Alias = (Verb | SingleChar);

/** @pattern ^[A-Za-z]+[A-Za-z0-9-_ ]*$ */
export type HumanReadableIdentifier = string;

export type SanitizedAbsPath = string;

/** @pattern ^(\.\.|\.\/|\/) */
export type SanitizedPath = string;

export type Settings = {
	consent: 'opt_in' | 'opt_out';
};

/**
 * @minimum 10
 * @integer
 */
export type Timestamp = number;

/**
 * @minLength 1
 * @pattern ^\d([\d_]+\d)?$ */
export type Tz = string;

/**
 * @minLength 1
 * @pattern ^\d+\.\d+(\.\d+)*$ */
export type VersionNumber = string;

/** @format url */
export type Url = string;

// ---- Plugin Definition Types ----

/** interpreted using yargs @pattern ^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$ */
export type Command = string;

export interface Option {
	shortFlag?: SingleChar;
	flag: Verb;
	description: NonEmptyString;
	defaultValue?: string | number | boolean;
	type?: 'string' | 'number' | 'boolean';
	required?: boolean;
	boolean?: boolean;
	choices?: NonEmptyString[];
}

export interface PositionalArg {
	placeholder: HumanReadableIdentifier;
	description: NonEmptyString;
	defaultValue?: string | number | boolean;
	type?: 'string' | 'number' | 'boolean';
	required?: boolean;
}

export interface InstalledPlugin {
	type: 'npm' | 'binary' | 'deno';
	name: NonEmptyString;
}

export interface Operation {
	operation: Verb;
	command: Command;
	description?: NonEmptyString;
	positionals?: PositionalArg[];
	options?: Option[];
	handler?: (args: PersistentState) => (args: RequestArgs) => void;
}

export type ParsedOperation = Omit<Operation, 'handler'>;

export interface Template {
	template: Verb;
	command: Command;
	/** @minLength 4 */
	description: NonEmptyString;
	hidden?: boolean;
	options?: Option;
	positionals?: PositionalArg;
	handler: TemplateHandler;
	encoding?: PluginResponseEncoding;
}

type TemplateHandler =
	| NonEmptyString // TODO: should this be Verb?
	| ((args: RequestArgs) =>
		| void
		| PluginJsonResponse
		| Promise<void>
		| Promise<Promise<void>>
		| Promise<PluginJsonResponse>);

export type ParsedTemplate = Omit<Template, 'handler'> & {
	handler: string;
};

export interface PluginSchemaBase {
	name: Alias;
	version: VersionNumber;
	schema: VersionNumber;
	alias: Alias;
	tasks?: Task[];
}

export interface PluginInfo extends PluginSchemaBase {
	operations?: ParsedOperation[];
	templates?: ParsedTemplate[];
}

export interface PluginSchema extends PluginSchemaBase {
	operations?: Operation[];
	templates?: Template[];
	proxy?: (args: RequestArgs) => Promise<PluginProxyResponse>;
	checkRuntimeDependencies?: (args: RequestArgs) => Promise<PluginDependenciesResponse>;
	installRuntimeDependencies?: (args: RequestArgs) => Promise<PluginDependenciesResponse>;
}

export interface Task {
	task: Verb;
	command: Command;
	aliases?: Alias[];
	/** @minLength 3 */
	description?: NonEmptyString;
	example?: NonEmptyString;
	hidden?: boolean;
	encoding?: PluginResponseEncoding;
	handler: 'proxy' | NonEmptyString;
	options?: Option[];
	positionals?: PositionalArg[];
}

// ---- Process Interop ----

export interface RuntimeDependency {
	name: HumanReadableIdentifier;
	path: string;
	version: string;
	kind: 'required' | 'optional';
}

export interface RuntimeDependencyReport extends RuntimeDependency {
	met: boolean;
}

export interface PluginDependenciesResponse {
	report: RuntimeDependencyReport[];
}

export interface PluginJsonResponse {
	data?: unknown;

	/** @default none */
	render: 'none' | 'table' | 'string';
}

export type PluginProxyResponse = void | PluginJsonResponse;

export type PluginResponseEncoding = undefined | 'none' | 'json' | 'application/json';

export interface SanitizedArgs {
	configAbsPath: NonEmptyString;
	sandbox: NonEmptyString;
	configure?: boolean;
	importAccounts?: boolean;
	config: ParsedConfig;
}

export type PluginActionName =
	| 'proxy'
	| 'pluginInfo'
	| 'checkRuntimeDependencies'
	| 'installRuntimeDependencies'
	| 'proxyTemplate';

export type RequestArgs = Omit<SanitizedArgs, 'config'> & {
	taqRun: PluginActionName;
	// TODO: JSON.parse if string
	config: LoadedConfig;
};

// ---- Hash Types ----

/** @pattern ^P[A-Za-z0-9]{50}$ this is a valid hash for an economical protocol*/
export type EconomicalPrototypeHash = string;

/** @pattern ^tz1[A-Za-z0-9]{33}$ */
export type PublicKeyHash = string;

/** @pattern ^[A-Fa-f0-9]{64}$ */
export type SHA256 = string;

// ---- Contract Objects ----

export interface Contract {
	sourceFile: NonEmptyString;
	hash: SHA256;
}

export type Faucet = {
	pkh: PublicKeyHash;
	mnemonic: string[];
	/** @format email */
	email: string;
	password: string;
	/** @pattern ^\d+$ */
	amount: string;
	activation_code: string;
};

// ---- External ----

/** Port number for postgresql container
 * @default 5432
 */
type TzKtConfigPostgresqlPort = number;

/** Port number for TzKt API
 * @default 5000
 */
type TzKtConfigApiPort = number;

export type TzKtConfig = {
	/** Do not start TzKt when sandbox starts */
	disableAutostartWithSandbox?: boolean;
	postgresqlPort?: TzKtConfigPostgresqlPort;
	apiPort?: TzKtConfigApiPort;
};

// ---- Project Files ----

export type Environment = {
	/**
	 * @minLength 1 Must reference the name of an existing network configuration
	 */
	networks: NonEmptyString[];
	/**
	 * @minLength 1 Must reference the name of an existing sandbox configuration
	 */
	sandboxes: NonEmptyString[];
	storage?: Record<string, unknown>;
	aliases?: Record<string, unknown>;
};

export type EphemeralState = {
	build: string;
	configHash: string;

	// Note: these were changed from a union(either type) to intersection(both types): i.e. InstalledPlugin | Task is not correct

	/** Task/Plugin Mapping */
	tasks: Record<string, InstalledPlugin & Task>;
	/** Operation/Plugin Mapping */
	operations: Record<string, InstalledPlugin & ParsedOperation>;
	/** Templates/Plugin Mapping */
	templates: Record<string, InstalledPlugin & ParsedTemplate>;

	plugins: PluginInfo[];
};

export type PersistentState = {
	operations: Record<string, PersistedOperation>;
	tasks: Record<string, PersistedTask>;
};

export type PersistedTask = {
	task: Verb;
	plugin: NonEmptyString;
	time: Timestamp;
	output?: unknown;
};

export type PersistedOperation = {
	hash: SHA256;
	time: Timestamp;
	output?: unknown;
};

/**
 * @minLength 1
 * @pattern ^[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+$
 */
export type ProvisionerID = string;

export type Provisioner = {
	id: ProvisionerID;
	plugin: NonEmptyString;
	operation: NonEmptyString | 'custom';
	command?: string;
	label?: string;
	depends_on?: ProvisionerID[];
};

export type Provisions = Provisioner[];

// ---- Project Files: Config ----

/** @minLength 1 Default environment must reference the name of an existing environment.*/
type EnvironmentName = NonEmptyString;

/** @default en */
export type HumanLanguage = 'en' | 'fr';

/**
 * @default contracts
 * @minLength 1
 */
export type ConfigContractsDir = string;

/**
 * @default artifacts
 * @minLength 1
 */
export type ConfigArtifactsDir = string;

export type Config = {
	language?: HumanLanguage;
	plugins?: InstalledPlugin[];
	contractsDir?: ConfigContractsDir;
	artifactsDir?: ConfigArtifactsDir;
	network?: Record<string, NetworkConfig>;
	sandbox?: Record<string, SandboxConfig>;
	environment?: Record<string, Environment> & { 'default': EnvironmentName };
	accounts?: Record<string, Tz>;
	contracts?: Record<string, Contract>;
	metadata?: MetadataConfig;
};

// TODO: sandbox breaks ts-to-zod
export type LoadedConfig = Config & {
	projectDir: SanitizedAbsPath;
	configFile: SanitizedAbsPath;
	hash: SHA256;
};

export type MetadataConfig = {
	name?: string;
	projectDescription?: string;
	authors?: string[];
	license?: string;
	homepage?: string;
};

export type NetworkConfig = {
	label: HumanReadableIdentifier;
	rpcUrl: Url;
	protocol: EconomicalPrototypeHash;
	accounts: Record<string, unknown>;
	faucet?: Faucet;
};

export type SandboxAccountConfig = {
	encryptedKey: NonEmptyString;
	publicKeyHash: PublicKeyHash;
	secretKey: NonEmptyString;
};

export type SandboxConfig = {
	label: NonEmptyString;
	rpcUrl: Url;
	protocol: EconomicalPrototypeHash;
	attributes?: string | number | boolean;
	plugin?: Verb;

	// TODO: This causes a type conflict and is not supported
	// accounts?: {
	// 	default: NonEmptyString;
	// } & Record<string, SandboxAccountConfig>;
	accounts?: Record<string, SandboxAccountConfig | NonEmptyString>;

	tzkt?: TzKtConfig;
};

export type ScaffoldConfig = {
	postInit?: string;
};

export type ParsedConfig = Omit<Config, 'sandbox'> & {
	sandbox: Record<string, SandboxConfig | NonEmptyString>;
};
