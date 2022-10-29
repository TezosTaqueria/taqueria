type TODO_CONVERT_TYPE = { notDoneYet: true };

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

/** @min 1651846877 */
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

export type Option = {
	shortFlag?: SingleChar;
	flag: Verb;
	description: NonEmptyString;
	defaultValue?: string | number | boolean;
	type?: string | number | boolean;
	required?: boolean;
	boolean?: boolean;
	choices?: string[];
};

export type PositionalArg = {
	placeholder: HumanReadableIdentifier;
	description: NonEmptyString;
	defaultValue?: string | number | boolean;
	type?: string | number | boolean;
	required?: boolean;
};

export type InstalledPlugin = {
	type: 'npm' | 'binary' | 'deno';
	name: string;
};

export type Operation = {
	operation: Verb;
	command: Command;
	description?: string;
	positionals?: PositionalArg[];
	options?: Option[];
	handler?: (args: PersistentState) => (args: RequestArgs) => void;
};

export type ParsedOperation = Omit<Operation, 'handler'>;

export type Template = {
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

export type ParsedTemplate = Template & {
	handler: string;
	encoding?: PluginResponseEncoding;
};

export type PluginInfo = {
	name: NonEmptyString;
	version: VersionNumber;
	schema: VersionNumber;
	alias: Alias;
	tasks?: Task[];
	operations?: ParsedOperation[];
	templates?: ParsedTemplate[];
};

export type PluginSchema = {
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

// ---- Process Interop ----

export type RuntimeDependency = {
	name: string;
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
	render?: 'none' | 'table' | 'string';
};

export type PluginProxyResponse = void | PluginJsonResponse;

export type PluginResponseEncoding = undefined | 'none' | 'json' | 'application/json';

export type SanitizedArgs = {
	configAbsPath: NonEmptyString;
	sandbox: NonEmptyString;
	configure?: boolean;
	importAccounts?: boolean;
	config: ParsedConfig;
};

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

/** @pattern ^P[A-Za-z0-9]{50}$ */
export type EconomicalPrototypeHash = string;

/** @pattern ^tz1[A-Za-z0-9]{33}$ */
export type PublicKeyHash = string;

/** @pattern ^[A-Fa-f0-9]{64}$ */
export type SHA256 = string;

// ---- Contract Objects ----

export type Contract = {
	sourceFile: string;
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

// ---- Project State ----

export type Config = TODO_CONVERT_TYPE;
export type LoadedConfig = TODO_CONVERT_TYPE;
export type MetadataConfig = TODO_CONVERT_TYPE;
export type NetworkConfig = TODO_CONVERT_TYPE;
export type SandboxAccountConfig = TODO_CONVERT_TYPE;
export type SandboxConfig = TODO_CONVERT_TYPE;
export type ScaffoldConfig = TODO_CONVERT_TYPE;

export type Environment = TODO_CONVERT_TYPE;

export type EphemeralState = TODO_CONVERT_TYPE;
export type PersistentState = TODO_CONVERT_TYPE;

export type Provisioner = TODO_CONVERT_TYPE;
export type ProvisionerID = TODO_CONVERT_TYPE;
export type Provisions = TODO_CONVERT_TYPE;

// ---- Internal ----

export type ParsedConfig = TODO_CONVERT_TYPE;
// export type ParsedConfig = Omit<Config, 'sandbox'> & {
// 	sandbox: Record<string, SandboxConfig | NonEmptyString>;
// };

// ---- Unsorted ----

export type TaqError = TODO_CONVERT_TYPE;
export type Task = TODO_CONVERT_TYPE;

export type TzKtConfig = {
	/** Do not start TzKt when sandbox starts */
	disableAutostartWithSandbox?: boolean;

	/** Port number for postgresql container
	 * @default 5432
	 */
	postgresqlPort?: number;

	/** Port number for TzKt API
	 * @default 5000
	 */
	apiPort?: number;
};
