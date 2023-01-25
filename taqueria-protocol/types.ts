// ---- Simple Types & Type Fragments ----

/** @minLength 1 */
export type NonEmptyString = string;

/** @pattern ^[A-Za-z]$ */
export type SingleChar = NonEmptyString;

/** @pattern ^[A-Za-z\-\ ]+ */
export type Verb = NonEmptyString;

export type Alias = (Verb | SingleChar);

/** @pattern ^[A-Za-z]+[A-Za-z0-9-_ ]*$ */
export type HumanReadableIdentifier = NonEmptyString;

export type SanitizedAbsPath = NonEmptyString;

export type SanitizedPath = NonEmptyString;

export type Settings = {
	consent: 'opt_in' | 'opt_out' | 'unspecified';
};

/**
 * @minimum 1651846877
 * @integer
 */
export type Timestamp = number;

/**
 * @minLength 1
 * @pattern ^\d([\d_]+\d)?$ */
export type Tz = NonEmptyString;

/**
 * @minLength 1
 * @pattern ^\d+\.\d+(\.\d+)*$ */
export type VersionNumber = NonEmptyString;

/** @format url */
export type Url = NonEmptyString;

// ---- Plugin Definition Types ----

/** interpreted using yargs @pattern ^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$ */
export type Command = NonEmptyString;

export type Option = {
	shortFlag?: SingleChar;
	flag: Verb;
	description: NonEmptyString;
	defaultValue?: string | number | boolean;
	type?: 'string' | 'number' | 'boolean';
	required?: boolean;
	boolean?: boolean;
	choices?: NonEmptyString[];
};

export type PositionalArg = {
	placeholder: HumanReadableIdentifier;
	description: NonEmptyString;
	defaultValue?: string | number | boolean;
	type?: 'string' | 'number' | 'boolean';
	required?: boolean;
};

export type InstalledPlugin = {
	type: 'npm' | 'binary' | 'deno';
	name: NonEmptyString;
};

export type Operation = {
	operation: Verb;
	command: Command;
	description?: NonEmptyString;
	positionals?: PositionalArg[];
	options?: Option[];
	handler?: (args: PersistentState) => (args: RequestArgs) => void;
};

export type ParsedOperation = Omit<Operation, 'handler'>;

export type Template = {
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

export type ParsedTemplate = Omit<Template, 'handler'> & {
	handler: string;
};

type PluginSchemaBase = {
	name: NonEmptyString;
	version: VersionNumber;
	schema: VersionNumber;
	alias: Alias;
	tasks?: Task[];
};

export type PluginInfo = PluginSchemaBase & {
	operations?: ParsedOperation[];
	templates?: ParsedTemplate[];
};

export type PluginSchema = PluginSchemaBase & {
	operations?: Operation[];
	templates?: Template[];
	proxy?: (args: RequestArgs) => Promise<PluginProxyResponse>;
	checkRuntimeDependencies?: (args: RequestArgs) => Promise<PluginDependenciesResponse>;
	installRuntimeDependencies?: (args: RequestArgs) => Promise<PluginDependenciesResponse>;
};

export type Task = {
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

export type RuntimeDependency = {
	name: HumanReadableIdentifier;
	path: string;
	version: string;
	kind: 'required' | 'optional';
};

export type RuntimeDependencyReport = RuntimeDependency & {
	met: boolean;
};

export type PluginDependenciesResponse = {
	report: RuntimeDependencyReport[];
};

export type PluginJsonResponse = {
	data?: unknown;

	/** @default none */
	render: 'none' | 'table' | 'string';
} | void;

export type PluginProxyResponse = void | PluginJsonResponse;

/** @default none */
export type PluginResponseEncoding = 'none' | 'json' | 'application/json';

/**
 * @min 100
 */
export type BuildNumber = number;

export type SanitizedArgs = {
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

export type PluginActionName =
	| 'proxy'
	| 'pluginInfo'
	| 'checkRuntimeDependencies'
	| 'installRuntimeDependencies'
	| 'proxyTemplate';

export type RequestArgs = Omit<SanitizedArgs, 'quickstart'> & {
	taqRun: PluginActionName;
	// TODO: JSON.parse if string
	config: LoadedConfig;
};

export type ProxyTaskArgs = RequestArgs & {
	task: NonEmptyString;
};

export type ProxyTemplateArgs = RequestArgs & {
	template: NonEmptyString;
};

// ---- Hash Types ----

/** @min 1 */
export type EconomicalProtocolHash = string;

/** @pattern ^tz\d[A-Za-z0-9]{33}$ */
export type PublicKeyHash = string;

/** @pattern ^[A-Fa-f0-9]{64}$ */
export type SHA256 = string;

// ---- Contract Objects ----

export type Contract = {
	sourceFile: NonEmptyString;
	hash: SHA256;
};

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

export type Environment = {
	networks: NonEmptyString[];
	sandboxes: NonEmptyString[];
	storage?: Record<string, NonEmptyString>;
	aliases?: Record<string, Record<string, NonEmptyString>>;
};

/** @minLength 1 Default environment must reference the name of an existing environment.*/
type EnvironmentName = NonEmptyString;

/** @default en */
type HumanLanguage = 'en' | 'fr';

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

export type ConfigAccount = {
	balance: CurrencyAmountV2;
};

// Incrementally Convert from ConfigFileV1 to ConfigFileV2
// 1. A wrapper will load/save the ConfigFileV2 and convert it to this Config runtime type (which is initially the same as ConfigFileV1)
// 2. This type will be modified incrementally as the implementation uses the new type structure
// - The new schema definitions will be used immediately in the file system
// - Current implementation works the same
// - This decouples the schema change from implementation changes and unblocks the development team
export type Config = {
	// same
	language?: HumanLanguage;
	metadata?: MetadataConfig;
	artifactsDir?: ConfigArtifactsDir;
	contractsDir?: ConfigContractsDir;
	contracts?: Record<string, Contract>;
	plugins?: InstalledPlugin[];

	// to change
	accounts?: Record<string, Tz>;
	// accounts?: Record<string, ConfigAccount>;

	// to change
	environment: Record<string, Environment | EnvironmentName>;
	// environments?: Record<string, ConfigFileEnvironmentV2>;

	// to remove
	network?: Record<string, NetworkConfig>;
	// to remove
	sandbox?: Record<string, SandboxConfig>;
};

// This is the original Config and is retained to support auto migration of files
export type ConfigFileV1 = {
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
	environment?: Record<string, Environment | EnvironmentName>;
	accounts?: Record<string, Tz>;
	contracts?: Record<string, Contract>;
	metadata?: MetadataConfig;
};

export type CurrencyAmountV2 = {
	amount: string;
	units: string;
};

/**
 * Workaround: zod won`t support VersionV2 = `v2`
 * @pattern ^v2$
 */
type VersionV2 = string;

export type ConfigFileV2 = {
	version: VersionV2;
	language?: HumanLanguage;
	metadata?: MetadataConfig;
	artifactsDir?: ConfigArtifactsDir;
	contractsDir?: ConfigContractsDir;

	/** Declared accounts */
	accounts?: Record<string, ConfigAccount>;

	contracts?: Record<string, Contract>;

	/** The default environment key */
	environmentDefault?: EnvironmentName;

	/** Environments
	 *
	 * An environment represents a unique context on a network with its own account instances and contracts.
	 *
	 * The environment implementation is provided by a plugin which enables network control, account management, and contract interaction.
	 *
	 * Example environment types:
	 *
	 * - a sandbox running locally (using flextesa and taquito plugin)
	 * - teztnets.xyz (using taquito plugin)
	 * - mainnet (using taquito plugin with a custom rpcUrl)
	 *
	 * The environment implementation also implements the account types that are supported by that environmentType:
	 *
	 * - flextesa
	 *   - in-memory signer
	 * - mainnet
	 *   - beacon wallet
	 *   - multi-sig
	 *
	 * Using the above as an example, the flextesa sandbox only needs an in-memory signer since it generates it's own accounts,
	 * but mainnet might support something like a beacon wallet or a multi-sig account.
	 */
	environments?: Record<string, ConfigEnvironmentFileV2>;

	plugins?: InstalledPlugin[];
};

/** Account overrides for this environment */
export type SandboxAccounts = Record<string, {
	type?: string;
}>;

export type ConfigEnvironmentFileV2 = {
	/** environment types provided by plugins
	 *
	 * Examples: flextesa, teztnet, mainnet
	 *
	 * annotations provides plugin specific data like rpcUrl
	 */
	type?: string;

	// Account overrides for the environment
	accounts?: SandboxAccounts;

	// Default account to use for this environment
	accountDefault?: keyof SandboxAccounts;

	/** Contract deployment data for this environment */
	contracts?: Record<string, {
		address?: string;
	}>;
	// Other fields may exist, but they are not type checked here
	// It is expected that this will be cast to a more specific type
	// by the plugin to access the additional fields
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
	accounts?: Record<string, NetworkAccountConfig>;
	faucet?: Faucet;
};

export type NetworkAccountConfig = {
	publicKey?: NonEmptyString;
	publicKeyHash?: PublicKeyHash;
	privateKey?: NonEmptyString; /** TODO: Should this be secretKey: @see {SandboxAccountConfig} */
	mnemonic?: NonEmptyString;
};

export type SandboxAccountConfig = {
	encryptedKey: NonEmptyString;
	publicKeyHash: PublicKeyHash;
	secretKey: NonEmptyString;
};

export type SandboxConfig = {
	label: NonEmptyString;
	rpcUrl: Url;
	protocol?: EconomicalProtocolHash;
	plugin?: Verb;

	// TODO: This causes a type conflict and is not supported
	// accounts?: {
	// 	default: NonEmptyString;
	// } & Record<string, SandboxAccountConfig>;
	accounts?: Record<string, SandboxAccountConfig | NonEmptyString>;

	tzkt?: TzKtConfig;
	annotations?: Record<string, unknown>;
};

export type ScaffoldConfig = {
	postInit?: string;
};

export type ParsedConfig = Omit<Config, 'sandbox'> & {
	sandbox: Record<string, SandboxConfig | NonEmptyString>;
};
