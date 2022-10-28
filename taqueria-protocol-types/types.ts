type TODO = { notDoneYet: true };

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

// ---- Plugin Definition Types ----

/** interpreted using yargs @pattern ^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$ */
export type Command = string;

// export type SanitizedArgs = string

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

export type PluginActionName =
	| 'proxy'
	| 'pluginInfo'
	| 'checkRuntimeDependencies'
	| 'installRuntimeDependencies'
	| 'proxyTemplate';

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
	encoding: PluginResponseEncoding;
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
	encoding: PluginResponseEncoding;
};

// TODO: PluginInfo
// TODO: PluginSchema

// ---- Process Interop ----

// TODO: PluginDependenciesResponse
// TODO: PluginJsonResponse
export type PluginJsonResponse = TODO;

// TODO: PluginProxyResponse
// TODO: PluginResponseEncoding
export type PluginResponseEncoding = TODO;

// TODO: RequestArgs
export type RequestArgs = TODO;

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

// TODO: Config
// TODO: LoadedConfig
// TODO: MetadataConfig
// TODO: NetworkConfig
// TODO: SandboxAccountConfig
// TODO: SandboxConfig
// TODO: ScaffoldConfig

// TODO: Environment

// TODO: EphemeralState
// TODO: PersistentState
export type PersistentState = TODO;

// TODO: Provisioner
// TODO: ProvisionerID
// TODO: Provisions

// ---- Unsorted ----

// TODO: TaqError
// TODO: Task
// TODO: Template
// TODO: Timestamp
// TODO: Tz
// TODO: TzKtConfig
// TODO: Url
// TODO: Verb
// TODO: VersionNumber
