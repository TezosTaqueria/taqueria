// Generated file: Do not edit
// generated from @taqueria-protocol-types

// ---- Simple Types & Type Fragments ----

/** @minLength 1 */
export type NonEmptyString = { __type: NonEmptyString } & string;

/** @pattern ^[A-Za-z]$ */
export type SingleChar = { __type: SingleChar } & string;

/** @pattern ^[A-Za-z\-\ ]+ */
export type Verb = { __type: Verb } & string;

export type Alias = { __type: Alias } & AliasRaw;
type AliasRaw = (Verb | SingleChar);

/** @pattern ^[A-Za-z]+[A-Za-z0-9-_ ]*$ */
export type HumanReadableIdentifier = { __type: HumanReadableIdentifier } & string;

export type SanitizedAbsPath = { __type: SanitizedAbsPath } & string;

/** @pattern ^(\.\.|\.\/|\/) */
export type SanitizedPath = { __type: SanitizedPath } & string;

export type Settings = { __type: Settings } & {
	consent: 'opt_in' | 'opt_out';
};

/** @min 1651846877 */
export type Timestamp = { __type: Timestamp } & number;

/**
 * @minLength 1
 * @pattern ^\d([\d_]+\d)?$ */
export type Tz = { __type: Tz } & string;

/**
 * @minLength 1
 * @pattern ^\d+\.\d+(\.\d+)*$ */
export type VersionNumber = { __type: VersionNumber } & string;

/** @format url */
export type Url = { __type: Url } & string;

// ---- Plugin Definition Types ----

/** interpreted using yargs @pattern ^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$ */
export type Command = { __type: Command } & string;

export type Option = { __type: Option } & {
	shortFlag?: SingleChar;
	flag: Verb;
	description: NonEmptyString;
	defaultValue?: string | number | boolean;
	type?: string | number | boolean;
	required?: boolean;
	boolean?: boolean;
	choices?: string[];
};

export type PositionalArg = { __type: PositionalArg } & {
	placeholder: HumanReadableIdentifier;
	description: NonEmptyString;
	defaultValue?: string | number | boolean;
	type?: string | number | boolean;
	required?: boolean;
};

export type InstalledPlugin = { __type: InstalledPlugin } & {
	type: 'npm' | 'binary' | 'deno';
	name: string;
};

export type Operation = { __type: Operation } & {
	operation: Verb;
	command: Command;
	description?: string;
	positionals?: PositionalArg[];
	options?: Option[];
	handler?: (args: PersistentState) => (args: RequestArgs) => void;
};

export type ParsedOperation = { __type: ParsedOperation } & ParsedOperationRaw;
type ParsedOperationRaw = Omit<Operation, 'handler'>;

export type Template = { __type: Template } & {
	template: Verb;
	command: Command;
	/** @minLength 4 */
	description: string;
	hidden?: boolean;
	options?: Option;
	positionals?: PositionalArg;
	handler: TemplateHandler;
	encoding?: PluginResponseEncoding;
};

type TemplateHandler =
	| NonEmptyString // TODO: should this be Verb?
	| ((args: RequestArgs) =>
		| void
		| PluginJsonResponse
		| Promise<void>
		| Promise<Promise<void>>
		| Promise<PluginJsonResponse>);

export type ParsedTemplate = { __type: ParsedTemplate } & ParsedTemplateRaw;
type ParsedTemplateRaw = Omit<Template, 'handler'> & {
	handler: string;
};

export type PluginInfo = { __type: PluginInfo } & {
	name: NonEmptyString;
	version: VersionNumber;
	schema: VersionNumber;
	alias: Alias;
	tasks?: Task[];
	operations?: ParsedOperation[];
	templates?: ParsedTemplate[];
};

export type PluginSchema = { __type: PluginSchema } & {
	name?: Alias;
	version: VersionNumber;
	schema: VersionNumber;
	alias: Alias;
	tasks?: Task[];
	operations?: Operation[];
	templates?: Template[];
	proxy?: (args: RequestArgs) => Promise<PluginProxyResponse>;
	checkRuntimeDependencies?: (args: RequestArgs) => Promise<PluginDependenciesResponse>;
	installRuntimeDependencies?: (args: RequestArgs) => Promise<PluginDependenciesResponse>;
};

export type Task = { __type: Task } & {
	task: Verb;
	command: Command;
	aliases?: Alias[];
	/** @minLength 3 */
	description?: string;
	example?: string;
	hidden?: boolean;
	encoding?: PluginResponseEncoding;
	handler: 'proxy' | NonEmptyString;
	options?: Option[];
	positionals?: PositionalArg[];
};

// ---- Process Interop ----

export type RuntimeDependency = { __type: RuntimeDependency } & {
	name: string;
	path: string;
	version: string;
	kind: 'required' | 'optional';
};

export type RuntimeDependencyReport = { __type: RuntimeDependencyReport } & RuntimeDependencyReportRaw;
type RuntimeDependencyReportRaw = RuntimeDependency & {
	met: boolean;
};

export type PluginDependenciesResponse = { __type: PluginDependenciesResponse } & {
	report: RuntimeDependencyReport[];
};

export type PluginJsonResponse = { __type: PluginJsonResponse } & {
	data?: unknown;

	/** @default none */
	render: 'none' | 'table' | 'string';
};

export type PluginProxyResponse = { __type: PluginProxyResponse } & PluginProxyResponseRaw;
type PluginProxyResponseRaw = void | PluginJsonResponse;

export type PluginResponseEncoding = { __type: PluginResponseEncoding } & PluginResponseEncodingRaw;
type PluginResponseEncodingRaw = undefined | 'none' | 'json' | 'application/json';

export type SanitizedArgs = { __type: SanitizedArgs } & {
	configAbsPath: NonEmptyString;
	sandbox: NonEmptyString;
	configure?: boolean;
	importAccounts?: boolean;
	config: ParsedConfig;
};

export type PluginActionName = { __type: PluginActionName } & PluginActionNameRaw;
type PluginActionNameRaw =
	| 'proxy'
	| 'pluginInfo'
	| 'checkRuntimeDependencies'
	| 'installRuntimeDependencies'
	| 'proxyTemplate';

export type RequestArgs = { __type: RequestArgs } & RequestArgsRaw;
type RequestArgsRaw = Omit<SanitizedArgs, 'config'> & {
	taqRun: PluginActionName;
	// TODO: JSON.parse if string
	config: LoadedConfig;
};

// ---- Hash Types ----

/** @pattern ^P[A-Za-z0-9]{50}$ this is an invalid hash for an economical protocol*/
export type EconomicalPrototypeHash = { __type: EconomicalPrototypeHash } & string;

/** @pattern ^tz1[A-Za-z0-9]{33}$ */
export type PublicKeyHash = { __type: PublicKeyHash } & string;

/** @pattern ^[A-Fa-f0-9]{64}$ */
export type SHA256 = { __type: SHA256 } & string;

// ---- Contract Objects ----

export type Contract = { __type: Contract } & {
	sourceFile: string;
	hash: SHA256;
};

export type Faucet = { __type: Faucet } & {
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

export type TzKtConfig = { __type: TzKtConfig } & {
	/** Do not start TzKt when sandbox starts */
	disableAutostartWithSandbox?: boolean;
	postgresqlPort?: TzKtConfigPostgresqlPort;
	apiPort?: TzKtConfigApiPort;
};

// ---- Project Files ----

export type Environment = { __type: Environment } & {
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

export type EphemeralState = { __type: EphemeralState } & {
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

export type PersistentState = { __type: PersistentState } & {
	operations: Record<string, PersistedOperation>;
	tasks: Record<string, PersistedTask>;
};

export type PersistedTask = { __type: PersistedTask } & {
	task: Verb;
	plugin: NonEmptyString;
	time: Timestamp;
	output?: unknown;
};

export type PersistedOperation = { __type: PersistedOperation } & {
	hash: SHA256;
	time: Timestamp;
	output?: unknown;
};

/**
 * @minLength 1
 * @pattern ^[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+$
 */
export type ProvisionerID = { __type: ProvisionerID } & string;

export type Provisioner = { __type: Provisioner } & {
	id: ProvisionerID;
	plugin: NonEmptyString;
	operation: NonEmptyString | 'custom';
	command?: string;
	label?: string;
	depends_on?: ProvisionerID[];
};

export type Provisions = { __type: Provisions } & ProvisionsRaw;
type ProvisionsRaw = Provisioner[];

// ---- Project Files: Config ----

/** @minLength 1 Default environment must reference the name of an existing environment.*/
type EnvironmentName = NonEmptyString;

/** @default en */
export type HumanLanguange = { __type: HumanLanguange } & HumanLanguangeRaw;
type HumanLanguangeRaw = 'en' | 'fr';

/**
 * @default contracts
 * @minLength 1
 */
export type ConfigContractsDir = { __type: ConfigContractsDir } & string;

/**
 * @default artifacts
 * @minLength 1
 */
export type ConfigArtifactsDir = { __type: ConfigArtifactsDir } & string;

export type Config = { __type: Config } & {
	language?: HumanLanguange;
	plugins?: InstalledPlugin[];
	contractsDir?: ConfigContractsDir;
	artifactsDir?: ConfigArtifactsDir;

	network?: Record<string, NetworkConfig>;
	sandbox?: Record<string, SandboxConfig>;
	environment?: Record<string, Environment | EnvironmentName>;
	accounts?: Record<string, Tz | number>;
	contracts?: Record<string, Contract>;
	metadata?: MetadataConfig;
};

// TODO: sandbox breaks ts-to-zod
export type LoadedConfig = { __type: LoadedConfig } & LoadedConfigRaw;
type LoadedConfigRaw = Config & {
	projectDir: SanitizedAbsPath;
	configFile: SanitizedAbsPath;
	hash: SHA256;
};

export type MetadataConfig = { __type: MetadataConfig } & {
	name?: string;
	projectDescription?: string;
	authors?: string[];
	license?: string;
	homepage?: string;
};

export type NetworkConfig = { __type: NetworkConfig } & {
	label: HumanReadableIdentifier;
	rpcUrl: Url;
	protocol: EconomicalPrototypeHash;
	accounts: Record<string, unknown>;
	faucet?: Faucet;
};

export type SandboxAccountConfig = { __type: SandboxAccountConfig } & {
	encryptedKey: NonEmptyString;
	publicKeyHash: PublicKeyHash;
	secretKey: NonEmptyString;
};

export type SandboxConfig = { __type: SandboxConfig } & {
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

export type ScaffoldConfig = { __type: ScaffoldConfig } & {
	postInit?: string;
};

export type ParsedConfig = { __type: ParsedConfig } & ParsedConfigRaw;
type ParsedConfigRaw = Omit<Config, 'sandbox'> & {
	sandbox: Record<string, SandboxConfig | NonEmptyString>;
};
