// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
// ---- Simple Types & Type Fragments ----

/** @minLength 1 */
export type NonEmptyString = { __type: NonEmptyString } & string;

/** @pattern ^[A-Za-z]$ */
export type SingleChar = { __type: SingleChar } & SingleCharRaw;
type SingleCharRaw = NonEmptyString;

/** @pattern ^[A-Za-z\-\ ]+ */
export type Verb = { __type: Verb } & VerbRaw;
type VerbRaw = NonEmptyString;

export type Alias = { __type: Alias } & AliasRaw;
type AliasRaw = (Verb | SingleChar);

/** @pattern ^[A-Za-z]+[A-Za-z0-9-_ ]*$ */
export type HumanReadableIdentifier = { __type: HumanReadableIdentifier } & HumanReadableIdentifierRaw;
type HumanReadableIdentifierRaw = NonEmptyString;

export type SanitizedAbsPath = { __type: SanitizedAbsPath } & SanitizedAbsPathRaw;
type SanitizedAbsPathRaw = NonEmptyString;

export type SanitizedPath = { __type: SanitizedPath } & SanitizedPathRaw;
type SanitizedPathRaw = NonEmptyString;

export type Settings = { __type: Settings } & {
	consent: 'opt_in' | 'opt_out';
};

/**
 * @minimum 1651846877
 * @integer
 */
export type Timestamp = { __type: Timestamp } & number;

/**
 * @minLength 1
 * @pattern ^\d([\d_]+\d)?$ */
export type Tz = { __type: Tz } & TzRaw;
type TzRaw = NonEmptyString;

/**
 * @minLength 1
 * @pattern ^\d+\.\d+(\.\d+)*$ */
export type VersionNumber = { __type: VersionNumber } & VersionNumberRaw;
type VersionNumberRaw = NonEmptyString;

/** @format url */
export type Url = { __type: Url } & UrlRaw;
type UrlRaw = NonEmptyString;

// ---- Plugin Definition Types ----

/** interpreted using yargs @pattern ^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$ */
export type Command = { __type: Command } & CommandRaw;
type CommandRaw = NonEmptyString;

export type Option = { __type: Option } & {
	shortFlag?: SingleChar;
	flag: Verb;
	description: NonEmptyString;
	defaultValue?: string | number | boolean;
	type?: 'string' | 'number' | 'boolean';
	required?: boolean;
	boolean?: boolean;
	choices?: NonEmptyString[];
};

export type PositionalArg = { __type: PositionalArg } & {
	placeholder: HumanReadableIdentifier;
	description: NonEmptyString;
	defaultValue?: string | number | boolean;
	type?: 'string' | 'number' | 'boolean';
	required?: boolean;
};

export type InstalledPlugin = { __type: InstalledPlugin } & {
	type: 'npm' | 'binary' | 'deno';
	name: NonEmptyString;
};

export type Operation = { __type: Operation } & {
	operation: Verb;
	command: Command;
	description?: NonEmptyString;
	positionals?: PositionalArg[];
	options?: Option[];
	handler?: (args: PersistentState) => (args: RequestArgs) => void;
};

export type ParsedOperation = { __type: ParsedOperation } & ParsedOperationRaw;
type ParsedOperationRaw = Omit<Operation, 'handler'>;

export type Template = { __type: Template } & {
	template: Verb;
	command: Command;
	description: NonEmptyString;
	hidden?: boolean;
	options?: Option[];
	positionals?: PositionalArg[];
	handler: TemplateHandler;
	encoding?: PluginResponseEncoding;
};

type TemplateHandler =
	| NonEmptyString // TODO: should this be Verb?
	| ((args: RequestArgs) =>
		| PluginJsonResponse
		| Promise<PluginJsonResponse>)
	| Promise<void>;

export type ParsedTemplate = { __type: ParsedTemplate } & ParsedTemplateRaw;
type ParsedTemplateRaw = Omit<Template, 'handler'> & {
	handler: string;
};

type PluginSchemaBase = {
	name: NonEmptyString;
	version: VersionNumber;
	schema: VersionNumber;
	alias: Alias;
	tasks?: Task[];
};

export type PluginInfo = { __type: PluginInfo } & PluginInfoRaw;
type PluginInfoRaw = PluginSchemaBase & {
	operations?: ParsedOperation[];
	templates?: ParsedTemplate[];
};

export type PluginSchema = { __type: PluginSchema } & PluginSchemaRaw;
type PluginSchemaRaw = PluginSchemaBase & {
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
	description?: NonEmptyString;
	example?: NonEmptyString;
	hidden?: boolean;
	encoding?: PluginResponseEncoding;
	handler: 'proxy' | NonEmptyString;
	options?: Option[];
	positionals?: PositionalArg[];
};

// ---- Process Interop ----

export type RuntimeDependency = { __type: RuntimeDependency } & {
	name: HumanReadableIdentifier;
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
} | void;

export type PluginProxyResponse = { __type: PluginProxyResponse } & PluginProxyResponseRaw;
type PluginProxyResponseRaw = void | PluginJsonResponse;

/** @default none */
export type PluginResponseEncoding = { __type: PluginResponseEncoding } & PluginResponseEncodingRaw;
type PluginResponseEncodingRaw = 'none' | 'json' | 'application/json';

/**
 * @min 100
 */
export type BuildNumber = { __type: BuildNumber } & number;

export type SanitizedArgs = { __type: SanitizedArgs } & {
	_: string[];
	projectDir: SanitizedPath;
	maxConcurrency: number;
	debug: boolean;
	disableState: boolean;
	logPluginRequests: boolean;
	fromVsCode: boolean;
	version: boolean;
	build: boolean;
	help: boolean;
	yes: boolean;
	plugin?: NonEmptyString;
	env: NonEmptyString;
	quickstart: NonEmptyString;
	setBuild: NonEmptyString | BuildNumber;
	setVersion: NonEmptyString;
};

export type PluginActionName = { __type: PluginActionName } & PluginActionNameRaw;
type PluginActionNameRaw =
	| 'proxy'
	| 'pluginInfo'
	| 'checkRuntimeDependencies'
	| 'installRuntimeDependencies'
	| 'proxyTemplate';

export type RequestArgs = { __type: RequestArgs } & RequestArgsRaw;
type RequestArgsRaw = Omit<SanitizedArgs, 'quickstart'> & {
	taqRun: PluginActionName;
	// TODO: JSON.parse if string
	config: LoadedConfig;
};

export type ProxyTaskArgs = { __type: ProxyTaskArgs } & ProxyTaskArgsRaw;
type ProxyTaskArgsRaw = RequestArgs & {
	task: NonEmptyString;
};

export type ProxyTemplateArgs = { __type: ProxyTemplateArgs } & ProxyTemplateArgsRaw;
type ProxyTemplateArgsRaw = RequestArgs & {
	template: NonEmptyString;
};

// ---- Hash Types ----

/** @min 1 */
export type EconomicalProtocolHash = { __type: EconomicalProtocolHash } & string;

/** @pattern ^tz\d[A-Za-z0-9]{33}$ */
export type PublicKeyHash = { __type: PublicKeyHash } & string;

/** @pattern ^[A-Fa-f0-9]{64}$ */
export type SHA256 = { __type: SHA256 } & string;

// ---- Contract Objects ----

export type Contract = { __type: Contract } & {
	sourceFile: NonEmptyString;
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
	networks: NonEmptyString[];
	sandboxes: NonEmptyString[];
	storage?: Record<string, NonEmptyString>;
	aliases?: Record<string, Record<string, NonEmptyString>>;
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
type HumanLanguage = 'en' | 'fr';

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
	language?: HumanLanguage;
	plugins?: InstalledPlugin[];
	contractsDir?: ConfigContractsDir;
	artifactsDir?: ConfigArtifactsDir;
	network?: Record<string, NetworkConfig>;
	sandbox?: Record<string, SandboxConfig>;

	// TODO: This causes a type conflict and is not supported
	// accounts?: {
	// 	default: EnvironmentName;
	// } & Record<string, Environment>;
	environment: Record<string, Environment | EnvironmentName>;
	accounts?: Record<string, Tz>;
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
	protocol: EconomicalProtocolHash;
	accounts?: Record<string, NetworkAccountConfig>;
	faucet?: Faucet;
};

export type NetworkAccountConfig = { __type: NetworkAccountConfig } & {
	publicKey: NonEmptyString;
	publicKeyHash: PublicKeyHash;
	privateKey: NonEmptyString; /** TODO: Should this be secretKey: @see {SandboxAccountConfig} */
};

export type SandboxAccountConfig = { __type: SandboxAccountConfig } & {
	encryptedKey: NonEmptyString;
	publicKeyHash: PublicKeyHash;
	secretKey: NonEmptyString;
};

export type SandboxConfig = { __type: SandboxConfig } & {
	label: NonEmptyString;
	rpcUrl: Url;
	protocol: EconomicalProtocolHash;
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
