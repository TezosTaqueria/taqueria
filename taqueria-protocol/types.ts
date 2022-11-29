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
	consent: 'opt_in' | 'opt_out';
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

/** @pattern ^tz1[A-Za-z0-9]{33}$ */
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

export type Environment = {
	networks: NonEmptyString[];
	sandboxes: NonEmptyString[];
	storage?: Record<string, NonEmptyString>;
	aliases?: Record<string, Record<string, NonEmptyString>>;
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

export type Config = {
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

export type CurrencyAmmountV2 = {
	ammount: string;
	units: string;
};

export type ConfigFileV2 = {
	version: `v2`;
	language?: HumanLanguage;
	metadata?: MetadataConfig;
	artifactsDir?: ConfigArtifactsDir;
	contractsDir?: ConfigContractsDir;

	// network?: Record<string, NetworkConfig>;
	// sandbox?: Record<string, SandboxConfig>;

	// environment?: Record<string, Environment | EnvironmentName>;
	// accounts?: Record<string, Tz>;

	/** Declared accounts */
	accounts?: Record<string, {
		balance: CurrencyAmmountV2;
	}>;

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
	environments?: Record<string, {
		/** environment types provided by plugins
		 *
		 * Examples: flextesa, teztnet, mainnet
		 *
		 * annotations provides plugin specific data like rpcUrl
		 */
		environmentType?: string;
		configData?: Record<string, unknown>;

		/** Account overrides for this environment */
		accounts?: Record<string, {
			key: string;
			accountType?: string;
			configData?: Record<string, unknown>;
		}>;
	}>;

	contracts?: Record<string, Contract>;
	plugins?: InstalledPlugin[];
};

/** Account instance data
 *
 * Specific to project/dev/enviroment (not stored in repo)
 *
 * This is for account state that is generated.
 *
 * accounts.[environment].json
 */
export type AccountsFileV2 = {
	accounts?: Record<string, {
		key: string;
		state?: Record<string, unknown>;
	}>;
};

// export type AccountTypePluginV2 = {
// 	// create: (configData?: Record<string, unknown>) => void;
// 	// transfer: (destination: string, amount: CurrencyAmmountV2) => void;
// 	// sign: (transaction: string) => void;
// };

/** An environment type combines network, account, and contract management */
export type EnvironmentTypePluginV2 = {
	/** Ensure environment is ready for use */
	start: (environmentName: string) => void;

	/** Dispose local resources used by environment */
	stop: (environmentName: string) => void;

	/** Instantiate and fund declared accounts for this environment */
	setupAccounts: (environmentName: string) => void;

	// /** Tranfer funds between declared accounts */
	// transferFunds: (sourceAccountName: string, destinationAccountName: string, amount: CurrencyAmmountV2) => void;

	/** Deploy contract with a declared account */
	deployContract: (
		environmentName: string,
		executingAccountName: string,
		contractName: string,
		storage: unknown,
	) => void;

	/** Call contract entrypoint with a declared account */
	callContract: (
		environmentName: string,
		executingAccountName: string,
		contractName: string,
		entrypointName: string,
		param: unknown,
	) => void;
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
	protocol: EconomicalProtocolHash;
	accounts?: Record<string, Record<string, unknown>>;
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

export type ScaffoldConfig = {
	postInit?: string;
};

export type ParsedConfig = Omit<Config, 'sandbox'> & {
	sandbox: Record<string, SandboxConfig | NonEmptyString>;
};
