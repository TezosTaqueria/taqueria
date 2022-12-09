import { z } from "zod";
export declare const nonEmptyStringSchema: z.ZodString;
export declare const singleCharSchema: z.ZodString;
export declare const verbSchema: z.ZodString;
export declare const aliasSchema: z.ZodUnion<[z.ZodString, z.ZodString]>;
export declare const humanReadableIdentifierSchema: z.ZodString;
export declare const sanitizedAbsPathSchema: z.ZodString;
export declare const sanitizedPathSchema: z.ZodString;
export declare const settingsSchema: z.ZodObject<{
    consent: z.ZodUnion<[z.ZodLiteral<"opt_in">, z.ZodLiteral<"opt_out">]>;
}, "strip", z.ZodTypeAny, {
    consent: "opt_in" | "opt_out";
}, {
    consent: "opt_in" | "opt_out";
}>;
export declare const timestampSchema: z.ZodNumber;
export declare const tzSchema: z.ZodString;
export declare const versionNumberSchema: z.ZodString;
export declare const urlSchema: z.ZodString;
export declare const commandSchema: z.ZodString;
export declare const optionSchema: z.ZodObject<{
    shortFlag: z.ZodOptional<z.ZodString>;
    flag: z.ZodString;
    description: z.ZodString;
    defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
    type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
    required: z.ZodOptional<z.ZodBoolean>;
    boolean: z.ZodOptional<z.ZodBoolean>;
    choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    boolean?: boolean | undefined;
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    shortFlag?: string | undefined;
    defaultValue?: string | number | boolean | undefined;
    choices?: string[] | undefined;
    description: string;
    flag: string;
}, {
    boolean?: boolean | undefined;
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    shortFlag?: string | undefined;
    defaultValue?: string | number | boolean | undefined;
    choices?: string[] | undefined;
    description: string;
    flag: string;
}>;
export declare const positionalArgSchema: z.ZodObject<{
    placeholder: z.ZodString;
    description: z.ZodString;
    defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
    type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
    required: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    defaultValue?: string | number | boolean | undefined;
    description: string;
    placeholder: string;
}, {
    required?: boolean | undefined;
    type?: "string" | "number" | "boolean" | undefined;
    defaultValue?: string | number | boolean | undefined;
    description: string;
    placeholder: string;
}>;
export declare const installedPluginSchema: z.ZodObject<{
    type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "npm" | "binary" | "deno";
    name: string;
}, {
    type: "npm" | "binary" | "deno";
    name: string;
}>;
export declare const runtimeDependencySchema: z.ZodObject<{
    name: z.ZodString;
    path: z.ZodString;
    version: z.ZodString;
    kind: z.ZodUnion<[z.ZodLiteral<"required">, z.ZodLiteral<"optional">]>;
}, "strip", z.ZodTypeAny, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
}, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
}>;
export declare const runtimeDependencyReportSchema: z.ZodObject<z.extendShape<{
    name: z.ZodString;
    path: z.ZodString;
    version: z.ZodString;
    kind: z.ZodUnion<[z.ZodLiteral<"required">, z.ZodLiteral<"optional">]>;
}, {
    met: z.ZodBoolean;
}>, "strip", z.ZodTypeAny, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
    met: boolean;
}, {
    version: string;
    path: string;
    name: string;
    kind: "required" | "optional";
    met: boolean;
}>;
export declare const pluginDependenciesResponseSchema: z.ZodObject<{
    report: z.ZodArray<z.ZodObject<z.extendShape<{
        name: z.ZodString;
        path: z.ZodString;
        version: z.ZodString;
        kind: z.ZodUnion<[z.ZodLiteral<"required">, z.ZodLiteral<"optional">]>;
    }, {
        met: z.ZodBoolean;
    }>, "strip", z.ZodTypeAny, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }, {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    report: {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }[];
}, {
    report: {
        version: string;
        path: string;
        name: string;
        kind: "required" | "optional";
        met: boolean;
    }[];
}>;
export declare const pluginJsonResponseSchema: z.ZodUnion<[z.ZodObject<{
    data: z.ZodOptional<z.ZodUnknown>;
    render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
}, "strip", z.ZodTypeAny, {
    data?: unknown;
    render: "string" | "none" | "table";
}, {
    data?: unknown;
    render?: "string" | "none" | "table" | undefined;
}>, z.ZodVoid]>;
export declare const pluginProxyResponseSchema: z.ZodUnion<[z.ZodVoid, z.ZodUnion<[z.ZodObject<{
    data: z.ZodOptional<z.ZodUnknown>;
    render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
}, "strip", z.ZodTypeAny, {
    data?: unknown;
    render: "string" | "none" | "table";
}, {
    data?: unknown;
    render?: "string" | "none" | "table" | undefined;
}>, z.ZodVoid]>]>;
export declare const pluginResponseEncodingSchema: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>;
export declare const buildNumberSchema: z.ZodNumber;
export declare const sanitizedArgsSchema: z.ZodObject<{
    _: z.ZodArray<z.ZodString, "many">;
    projectDir: z.ZodString;
    maxConcurrency: z.ZodNumber;
    debug: z.ZodBoolean;
    disableState: z.ZodBoolean;
    logPluginRequests: z.ZodBoolean;
    fromVsCode: z.ZodBoolean;
    version: z.ZodBoolean;
    build: z.ZodBoolean;
    help: z.ZodBoolean;
    yes: z.ZodBoolean;
    plugin: z.ZodOptional<z.ZodString>;
    env: z.ZodString;
    quickstart: z.ZodString;
    setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    setVersion: z.ZodString;
}, "passthrough", z.ZodTypeAny, {
    plugin?: string | undefined;
    quickstart: string;
    _: string[];
    projectDir: string;
    maxConcurrency: number;
    debug: boolean;
    disableState: boolean;
    logPluginRequests: boolean;
    fromVsCode: boolean;
    version: boolean;
    build: boolean;
    help: boolean;
    yes: boolean;
    env: string;
    setBuild: string | number;
    setVersion: string;
}, {
    plugin?: string | undefined;
    quickstart: string;
    _: string[];
    projectDir: string;
    maxConcurrency: number;
    debug: boolean;
    disableState: boolean;
    logPluginRequests: boolean;
    fromVsCode: boolean;
    version: boolean;
    build: boolean;
    help: boolean;
    yes: boolean;
    env: string;
    setBuild: string | number;
    setVersion: string;
}>;
export declare const pluginActionNameSchema: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
export declare const economicalProtocolHashSchema: z.ZodString;
export declare const publicKeyHashSchema: z.ZodString;
export declare const sha256Schema: z.ZodString;
export declare const contractSchema: z.ZodObject<{
    sourceFile: z.ZodString;
    hash: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sourceFile: string;
    hash: string;
}, {
    sourceFile: string;
    hash: string;
}>;
export declare const faucetSchema: z.ZodObject<{
    pkh: z.ZodString;
    mnemonic: z.ZodArray<z.ZodString, "many">;
    email: z.ZodString;
    password: z.ZodString;
    amount: z.ZodString;
    activation_code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    pkh: string;
    mnemonic: string[];
    email: string;
    password: string;
    amount: string;
    activation_code: string;
}, {
    pkh: string;
    mnemonic: string[];
    email: string;
    password: string;
    amount: string;
    activation_code: string;
}>;
export declare const tzKtConfigSchema: z.ZodObject<{
    disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
    postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    disableAutostartWithSandbox?: boolean | undefined;
    postgresqlPort?: number | undefined;
    apiPort?: number | undefined;
}, {
    disableAutostartWithSandbox?: boolean | undefined;
    postgresqlPort?: number | undefined;
    apiPort?: number | undefined;
}>;
export declare const environmentSchema: z.ZodObject<{
    networks: z.ZodArray<z.ZodString, "many">;
    sandboxes: z.ZodArray<z.ZodString, "many">;
    storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    storage?: Record<string, string> | undefined;
    aliases?: Record<string, Record<string, string>> | undefined;
    networks: string[];
    sandboxes: string[];
}, {
    storage?: Record<string, string> | undefined;
    aliases?: Record<string, Record<string, string>> | undefined;
    networks: string[];
    sandboxes: string[];
}>;
export declare const persistedTaskSchema: z.ZodObject<{
    task: z.ZodString;
    plugin: z.ZodString;
    time: z.ZodNumber;
    output: z.ZodOptional<z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    output?: unknown;
    plugin: string;
    task: string;
    time: number;
}, {
    output?: unknown;
    plugin: string;
    task: string;
    time: number;
}>;
export declare const persistedOperationSchema: z.ZodObject<{
    hash: z.ZodString;
    time: z.ZodNumber;
    output: z.ZodOptional<z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    output?: unknown;
    hash: string;
    time: number;
}, {
    output?: unknown;
    hash: string;
    time: number;
}>;
export declare const provisionerIDSchema: z.ZodString;
export declare const provisionerSchema: z.ZodObject<{
    id: z.ZodString;
    plugin: z.ZodString;
    operation: z.ZodUnion<[z.ZodString, z.ZodLiteral<"custom">]>;
    command: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    depends_on: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    command?: string | undefined;
    label?: string | undefined;
    depends_on?: string[] | undefined;
    plugin: string;
    operation: string;
    id: string;
}, {
    command?: string | undefined;
    label?: string | undefined;
    depends_on?: string[] | undefined;
    plugin: string;
    operation: string;
    id: string;
}>;
export declare const provisionsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    plugin: z.ZodString;
    operation: z.ZodUnion<[z.ZodString, z.ZodLiteral<"custom">]>;
    command: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    depends_on: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    command?: string | undefined;
    label?: string | undefined;
    depends_on?: string[] | undefined;
    plugin: string;
    operation: string;
    id: string;
}, {
    command?: string | undefined;
    label?: string | undefined;
    depends_on?: string[] | undefined;
    plugin: string;
    operation: string;
    id: string;
}>, "many">;
export declare const configContractsDirSchema: z.ZodDefault<z.ZodString>;
export declare const configArtifactsDirSchema: z.ZodDefault<z.ZodString>;
export declare const metadataConfigSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    projectDescription: z.ZodOptional<z.ZodString>;
    authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    license: z.ZodOptional<z.ZodString>;
    homepage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    projectDescription?: string | undefined;
    authors?: string[] | undefined;
    license?: string | undefined;
    homepage?: string | undefined;
}, {
    name?: string | undefined;
    projectDescription?: string | undefined;
    authors?: string[] | undefined;
    license?: string | undefined;
    homepage?: string | undefined;
}>;
export declare const networkAccountConfigSchema: z.ZodObject<{
    publicKey: z.ZodString;
    publicKeyHash: z.ZodString;
    privateKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    publicKey: string;
    publicKeyHash: string;
    privateKey: string;
}, {
    publicKey: string;
    publicKeyHash: string;
    privateKey: string;
}>;
export declare const sandboxAccountConfigSchema: z.ZodObject<{
    encryptedKey: z.ZodString;
    publicKeyHash: z.ZodString;
    secretKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    publicKeyHash: string;
    encryptedKey: string;
    secretKey: string;
}, {
    publicKeyHash: string;
    encryptedKey: string;
    secretKey: string;
}>;
export declare const sandboxConfigSchema: z.ZodObject<{
    label: z.ZodString;
    rpcUrl: z.ZodString;
    protocol: z.ZodString;
    attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
    plugin: z.ZodOptional<z.ZodString>;
    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        encryptedKey: z.ZodString;
        publicKeyHash: z.ZodString;
        secretKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }, {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }>, z.ZodString]>>>;
    tzkt: z.ZodOptional<z.ZodObject<{
        disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
        postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    }, {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    plugin?: string | undefined;
    accounts?: Record<string, string | {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }> | undefined;
    attributes?: string | number | boolean | undefined;
    tzkt?: {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}, {
    plugin?: string | undefined;
    accounts?: Record<string, string | {
        publicKeyHash: string;
        encryptedKey: string;
        secretKey: string;
    }> | undefined;
    attributes?: string | number | boolean | undefined;
    tzkt?: {
        disableAutostartWithSandbox?: boolean | undefined;
        postgresqlPort?: number | undefined;
        apiPort?: number | undefined;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}>;
export declare const scaffoldConfigSchema: z.ZodObject<{
    postInit: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    postInit?: string | undefined;
}, {
    postInit?: string | undefined;
}>;
export declare const taskSchema: z.ZodObject<{
    task: z.ZodString;
    command: z.ZodString;
    aliases: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">>;
    description: z.ZodOptional<z.ZodString>;
    example: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
    handler: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodString]>;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        shortFlag: z.ZodOptional<z.ZodString>;
        flag: z.ZodString;
        description: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
        required: z.ZodOptional<z.ZodBoolean>;
        boolean: z.ZodOptional<z.ZodBoolean>;
        choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }>, "many">>;
    positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
        placeholder: z.ZodString;
        description: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
        required: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    hidden?: boolean | undefined;
    encoding?: "none" | "json" | "application/json" | undefined;
    aliases?: string[] | undefined;
    example?: string | undefined;
    handler: string;
    command: string;
    task: string;
}, {
    description?: string | undefined;
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    hidden?: boolean | undefined;
    encoding?: "none" | "json" | "application/json" | undefined;
    aliases?: string[] | undefined;
    example?: string | undefined;
    handler: string;
    command: string;
    task: string;
}>;
export declare const persistentStateSchema: z.ZodObject<{
    operations: z.ZodRecord<z.ZodString, z.ZodObject<{
        hash: z.ZodString;
        time: z.ZodNumber;
        output: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        output?: unknown;
        hash: string;
        time: number;
    }, {
        output?: unknown;
        hash: string;
        time: number;
    }>>;
    tasks: z.ZodRecord<z.ZodString, z.ZodObject<{
        task: z.ZodString;
        plugin: z.ZodString;
        time: z.ZodNumber;
        output: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    operations: Record<string, {
        output?: unknown;
        hash: string;
        time: number;
    }>;
    tasks: Record<string, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }>;
}, {
    operations: Record<string, {
        output?: unknown;
        hash: string;
        time: number;
    }>;
    tasks: Record<string, {
        output?: unknown;
        plugin: string;
        task: string;
        time: number;
    }>;
}>;
export declare const networkConfigSchema: z.ZodObject<{
    label: z.ZodString;
    rpcUrl: z.ZodString;
    protocol: z.ZodString;
    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        publicKey: z.ZodString;
        publicKeyHash: z.ZodString;
        privateKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }>>>;
    faucet: z.ZodOptional<z.ZodObject<{
        pkh: z.ZodString;
        mnemonic: z.ZodArray<z.ZodString, "many">;
        email: z.ZodString;
        password: z.ZodString;
        amount: z.ZodString;
        activation_code: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    }, {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    accounts?: Record<string, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }> | undefined;
    faucet?: {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}, {
    accounts?: Record<string, {
        publicKey: string;
        publicKeyHash: string;
        privateKey: string;
    }> | undefined;
    faucet?: {
        pkh: string;
        mnemonic: string[];
        email: string;
        password: string;
        amount: string;
        activation_code: string;
    } | undefined;
    label: string;
    rpcUrl: string;
    protocol: string;
}>;
export declare const configSchema: z.ZodObject<{
    language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
    plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "npm" | "binary" | "deno";
        name: string;
    }, {
        type: "npm" | "binary" | "deno";
        name: string;
    }>, "many">>;
    contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        label: z.ZodString;
        rpcUrl: z.ZodString;
        protocol: z.ZodString;
        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            publicKey: z.ZodString;
            publicKeyHash: z.ZodString;
            privateKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }>>>;
        faucet: z.ZodOptional<z.ZodObject<{
            pkh: z.ZodString;
            mnemonic: z.ZodArray<z.ZodString, "many">;
            email: z.ZodString;
            password: z.ZodString;
            amount: z.ZodString;
            activation_code: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        }, {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>>>;
    sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        label: z.ZodString;
        rpcUrl: z.ZodString;
        protocol: z.ZodString;
        attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        plugin: z.ZodOptional<z.ZodString>;
        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            encryptedKey: z.ZodString;
            publicKeyHash: z.ZodString;
            secretKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }>, z.ZodString]>>>;
        tzkt: z.ZodOptional<z.ZodObject<{
            disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
            postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        }, {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>>>;
    environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        networks: z.ZodArray<z.ZodString, "many">;
        sandboxes: z.ZodArray<z.ZodString, "many">;
        storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>, z.ZodString]>>;
    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        sourceFile: z.ZodString;
        hash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sourceFile: string;
        hash: string;
    }, {
        sourceFile: string;
        hash: string;
    }>>>;
    metadata: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        projectDescription: z.ZodOptional<z.ZodString>;
        authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        license: z.ZodOptional<z.ZodString>;
        homepage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    sandbox?: Record<string, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }> | undefined;
    language?: "en" | "fr" | undefined;
    plugins?: {
        type: "npm" | "binary" | "deno";
        name: string;
    }[] | undefined;
    contractsDir?: string | undefined;
    artifactsDir?: string | undefined;
    network?: Record<string, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }> | undefined;
    accounts?: Record<string, string> | undefined;
    contracts?: Record<string, {
        sourceFile: string;
        hash: string;
    }> | undefined;
    metadata?: {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    } | undefined;
    environment: Record<string, string | {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>;
}, {
    sandbox?: Record<string, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }> | undefined;
    language?: "en" | "fr" | undefined;
    plugins?: {
        type: "npm" | "binary" | "deno";
        name: string;
    }[] | undefined;
    contractsDir?: string | undefined;
    artifactsDir?: string | undefined;
    network?: Record<string, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }> | undefined;
    accounts?: Record<string, string> | undefined;
    contracts?: Record<string, {
        sourceFile: string;
        hash: string;
    }> | undefined;
    metadata?: {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    } | undefined;
    environment: Record<string, string | {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>;
}>;
export declare const loadedConfigSchema: z.ZodObject<z.extendShape<{
    language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
    plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "npm" | "binary" | "deno";
        name: string;
    }, {
        type: "npm" | "binary" | "deno";
        name: string;
    }>, "many">>;
    contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        label: z.ZodString;
        rpcUrl: z.ZodString;
        protocol: z.ZodString;
        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            publicKey: z.ZodString;
            publicKeyHash: z.ZodString;
            privateKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }>>>;
        faucet: z.ZodOptional<z.ZodObject<{
            pkh: z.ZodString;
            mnemonic: z.ZodArray<z.ZodString, "many">;
            email: z.ZodString;
            password: z.ZodString;
            amount: z.ZodString;
            activation_code: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        }, {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>>>;
    sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        label: z.ZodString;
        rpcUrl: z.ZodString;
        protocol: z.ZodString;
        attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        plugin: z.ZodOptional<z.ZodString>;
        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            encryptedKey: z.ZodString;
            publicKeyHash: z.ZodString;
            secretKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }>, z.ZodString]>>>;
        tzkt: z.ZodOptional<z.ZodObject<{
            disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
            postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        }, {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>>>;
    environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        networks: z.ZodArray<z.ZodString, "many">;
        sandboxes: z.ZodArray<z.ZodString, "many">;
        storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>, z.ZodString]>>;
    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        sourceFile: z.ZodString;
        hash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sourceFile: string;
        hash: string;
    }, {
        sourceFile: string;
        hash: string;
    }>>>;
    metadata: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        projectDescription: z.ZodOptional<z.ZodString>;
        authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        license: z.ZodOptional<z.ZodString>;
        homepage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }>>;
}, {
    projectDir: z.ZodString;
    configFile: z.ZodString;
    hash: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    sandbox?: Record<string, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }> | undefined;
    language?: "en" | "fr" | undefined;
    plugins?: {
        type: "npm" | "binary" | "deno";
        name: string;
    }[] | undefined;
    contractsDir?: string | undefined;
    artifactsDir?: string | undefined;
    network?: Record<string, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }> | undefined;
    accounts?: Record<string, string> | undefined;
    contracts?: Record<string, {
        sourceFile: string;
        hash: string;
    }> | undefined;
    metadata?: {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    } | undefined;
    projectDir: string;
    environment: Record<string, string | {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>;
    hash: string;
    configFile: string;
}, {
    sandbox?: Record<string, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }> | undefined;
    language?: "en" | "fr" | undefined;
    plugins?: {
        type: "npm" | "binary" | "deno";
        name: string;
    }[] | undefined;
    contractsDir?: string | undefined;
    artifactsDir?: string | undefined;
    network?: Record<string, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }> | undefined;
    accounts?: Record<string, string> | undefined;
    contracts?: Record<string, {
        sourceFile: string;
        hash: string;
    }> | undefined;
    metadata?: {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    } | undefined;
    projectDir: string;
    environment: Record<string, string | {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>;
    hash: string;
    configFile: string;
}>;
export declare const parsedConfigSchema: z.ZodObject<z.extendShape<Omit<{
    language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
    plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "npm" | "binary" | "deno";
        name: string;
    }, {
        type: "npm" | "binary" | "deno";
        name: string;
    }>, "many">>;
    contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        label: z.ZodString;
        rpcUrl: z.ZodString;
        protocol: z.ZodString;
        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            publicKey: z.ZodString;
            publicKeyHash: z.ZodString;
            privateKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }>>>;
        faucet: z.ZodOptional<z.ZodObject<{
            pkh: z.ZodString;
            mnemonic: z.ZodArray<z.ZodString, "many">;
            email: z.ZodString;
            password: z.ZodString;
            amount: z.ZodString;
            activation_code: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        }, {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>>>;
    sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        label: z.ZodString;
        rpcUrl: z.ZodString;
        protocol: z.ZodString;
        attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        plugin: z.ZodOptional<z.ZodString>;
        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            encryptedKey: z.ZodString;
            publicKeyHash: z.ZodString;
            secretKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }>, z.ZodString]>>>;
        tzkt: z.ZodOptional<z.ZodObject<{
            disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
            postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        }, {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>>>;
    environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        networks: z.ZodArray<z.ZodString, "many">;
        sandboxes: z.ZodArray<z.ZodString, "many">;
        storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }, {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>, z.ZodString]>>;
    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        sourceFile: z.ZodString;
        hash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sourceFile: string;
        hash: string;
    }, {
        sourceFile: string;
        hash: string;
    }>>>;
    metadata: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        projectDescription: z.ZodOptional<z.ZodString>;
        authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        license: z.ZodOptional<z.ZodString>;
        homepage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }, {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    }>>;
}, "sandbox">, {
    sandbox: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        label: z.ZodString;
        rpcUrl: z.ZodString;
        protocol: z.ZodString;
        attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        plugin: z.ZodOptional<z.ZodString>;
        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            encryptedKey: z.ZodString;
            publicKeyHash: z.ZodString;
            secretKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }, {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }>, z.ZodString]>>>;
        tzkt: z.ZodOptional<z.ZodObject<{
            disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
            postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        }, {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }, {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>, z.ZodString]>>;
}>, "strip", z.ZodTypeAny, {
    language?: "en" | "fr" | undefined;
    plugins?: {
        type: "npm" | "binary" | "deno";
        name: string;
    }[] | undefined;
    contractsDir?: string | undefined;
    artifactsDir?: string | undefined;
    network?: Record<string, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }> | undefined;
    accounts?: Record<string, string> | undefined;
    contracts?: Record<string, {
        sourceFile: string;
        hash: string;
    }> | undefined;
    metadata?: {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    } | undefined;
    sandbox: Record<string, string | {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>;
    environment: Record<string, string | {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>;
}, {
    language?: "en" | "fr" | undefined;
    plugins?: {
        type: "npm" | "binary" | "deno";
        name: string;
    }[] | undefined;
    contractsDir?: string | undefined;
    artifactsDir?: string | undefined;
    network?: Record<string, {
        accounts?: Record<string, {
            publicKey: string;
            publicKeyHash: string;
            privateKey: string;
        }> | undefined;
        faucet?: {
            pkh: string;
            mnemonic: string[];
            email: string;
            password: string;
            amount: string;
            activation_code: string;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }> | undefined;
    accounts?: Record<string, string> | undefined;
    contracts?: Record<string, {
        sourceFile: string;
        hash: string;
    }> | undefined;
    metadata?: {
        name?: string | undefined;
        projectDescription?: string | undefined;
        authors?: string[] | undefined;
        license?: string | undefined;
        homepage?: string | undefined;
    } | undefined;
    sandbox: Record<string, string | {
        plugin?: string | undefined;
        accounts?: Record<string, string | {
            publicKeyHash: string;
            encryptedKey: string;
            secretKey: string;
        }> | undefined;
        attributes?: string | number | boolean | undefined;
        tzkt?: {
            disableAutostartWithSandbox?: boolean | undefined;
            postgresqlPort?: number | undefined;
            apiPort?: number | undefined;
        } | undefined;
        label: string;
        rpcUrl: string;
        protocol: string;
    }>;
    environment: Record<string, string | {
        storage?: Record<string, string> | undefined;
        aliases?: Record<string, Record<string, string>> | undefined;
        networks: string[];
        sandboxes: string[];
    }>;
}>;
export declare const requestArgsSchema: z.ZodObject<z.extendShape<Omit<{
    _: z.ZodArray<z.ZodString, "many">;
    projectDir: z.ZodString;
    maxConcurrency: z.ZodNumber;
    debug: z.ZodBoolean;
    disableState: z.ZodBoolean;
    logPluginRequests: z.ZodBoolean;
    fromVsCode: z.ZodBoolean;
    version: z.ZodBoolean;
    build: z.ZodBoolean;
    help: z.ZodBoolean;
    yes: z.ZodBoolean;
    plugin: z.ZodOptional<z.ZodString>;
    env: z.ZodString;
    quickstart: z.ZodString;
    setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    setVersion: z.ZodString;
}, "quickstart">, {
    taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
    config: z.ZodObject<z.extendShape<{
        language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
        plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "npm" | "binary" | "deno";
            name: string;
        }, {
            type: "npm" | "binary" | "deno";
            name: string;
        }>, "many">>;
        contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            label: z.ZodString;
            rpcUrl: z.ZodString;
            protocol: z.ZodString;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                publicKey: z.ZodString;
                publicKeyHash: z.ZodString;
                privateKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }>>>;
            faucet: z.ZodOptional<z.ZodObject<{
                pkh: z.ZodString;
                mnemonic: z.ZodArray<z.ZodString, "many">;
                email: z.ZodString;
                password: z.ZodString;
                amount: z.ZodString;
                activation_code: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            }, {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }>>>;
        sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            label: z.ZodString;
            rpcUrl: z.ZodString;
            protocol: z.ZodString;
            attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            plugin: z.ZodOptional<z.ZodString>;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                encryptedKey: z.ZodString;
                publicKeyHash: z.ZodString;
                secretKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }, {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }>, z.ZodString]>>>;
            tzkt: z.ZodOptional<z.ZodObject<{
                disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            }, {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }>>>;
        environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            networks: z.ZodArray<z.ZodString, "many">;
            sandboxes: z.ZodArray<z.ZodString, "many">;
            storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }, {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>, z.ZodString]>>;
        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            sourceFile: z.ZodString;
            hash: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            sourceFile: string;
            hash: string;
        }, {
            sourceFile: string;
            hash: string;
        }>>>;
        metadata: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            projectDescription: z.ZodOptional<z.ZodString>;
            authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            license: z.ZodOptional<z.ZodString>;
            homepage: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        }, {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        }>>;
    }, {
        projectDir: z.ZodString;
        configFile: z.ZodString;
        hash: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    }, {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    }>;
}>, "passthrough", z.ZodTypeAny, {
    plugin?: string | undefined;
    _: string[];
    projectDir: string;
    maxConcurrency: number;
    debug: boolean;
    disableState: boolean;
    logPluginRequests: boolean;
    fromVsCode: boolean;
    version: boolean;
    build: boolean;
    help: boolean;
    yes: boolean;
    env: string;
    setBuild: string | number;
    setVersion: string;
    taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
    config: {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    };
}, {
    plugin?: string | undefined;
    _: string[];
    projectDir: string;
    maxConcurrency: number;
    debug: boolean;
    disableState: boolean;
    logPluginRequests: boolean;
    fromVsCode: boolean;
    version: boolean;
    build: boolean;
    help: boolean;
    yes: boolean;
    env: string;
    setBuild: string | number;
    setVersion: string;
    taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
    config: {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    };
}>;
export declare const proxyTaskArgsSchema: z.ZodObject<z.extendShape<z.extendShape<Omit<{
    _: z.ZodArray<z.ZodString, "many">;
    projectDir: z.ZodString;
    maxConcurrency: z.ZodNumber;
    debug: z.ZodBoolean;
    disableState: z.ZodBoolean;
    logPluginRequests: z.ZodBoolean;
    fromVsCode: z.ZodBoolean;
    version: z.ZodBoolean;
    build: z.ZodBoolean;
    help: z.ZodBoolean;
    yes: z.ZodBoolean;
    plugin: z.ZodOptional<z.ZodString>;
    env: z.ZodString;
    quickstart: z.ZodString;
    setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    setVersion: z.ZodString;
}, "quickstart">, {
    taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
    config: z.ZodObject<z.extendShape<{
        language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
        plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "npm" | "binary" | "deno";
            name: string;
        }, {
            type: "npm" | "binary" | "deno";
            name: string;
        }>, "many">>;
        contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            label: z.ZodString;
            rpcUrl: z.ZodString;
            protocol: z.ZodString;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                publicKey: z.ZodString;
                publicKeyHash: z.ZodString;
                privateKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }>>>;
            faucet: z.ZodOptional<z.ZodObject<{
                pkh: z.ZodString;
                mnemonic: z.ZodArray<z.ZodString, "many">;
                email: z.ZodString;
                password: z.ZodString;
                amount: z.ZodString;
                activation_code: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            }, {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }>>>;
        sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            label: z.ZodString;
            rpcUrl: z.ZodString;
            protocol: z.ZodString;
            attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            plugin: z.ZodOptional<z.ZodString>;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                encryptedKey: z.ZodString;
                publicKeyHash: z.ZodString;
                secretKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }, {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }>, z.ZodString]>>>;
            tzkt: z.ZodOptional<z.ZodObject<{
                disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            }, {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }>>>;
        environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            networks: z.ZodArray<z.ZodString, "many">;
            sandboxes: z.ZodArray<z.ZodString, "many">;
            storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }, {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>, z.ZodString]>>;
        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            sourceFile: z.ZodString;
            hash: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            sourceFile: string;
            hash: string;
        }, {
            sourceFile: string;
            hash: string;
        }>>>;
        metadata: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            projectDescription: z.ZodOptional<z.ZodString>;
            authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            license: z.ZodOptional<z.ZodString>;
            homepage: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        }, {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        }>>;
    }, {
        projectDir: z.ZodString;
        configFile: z.ZodString;
        hash: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    }, {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    }>;
}>, {
    task: z.ZodString;
}>, "passthrough", z.ZodTypeAny, {
    plugin?: string | undefined;
    _: string[];
    projectDir: string;
    maxConcurrency: number;
    debug: boolean;
    disableState: boolean;
    logPluginRequests: boolean;
    fromVsCode: boolean;
    version: boolean;
    build: boolean;
    help: boolean;
    yes: boolean;
    env: string;
    setBuild: string | number;
    setVersion: string;
    task: string;
    taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
    config: {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    };
}, {
    plugin?: string | undefined;
    _: string[];
    projectDir: string;
    maxConcurrency: number;
    debug: boolean;
    disableState: boolean;
    logPluginRequests: boolean;
    fromVsCode: boolean;
    version: boolean;
    build: boolean;
    help: boolean;
    yes: boolean;
    env: string;
    setBuild: string | number;
    setVersion: string;
    task: string;
    taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
    config: {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    };
}>;
export declare const proxyTemplateArgsSchema: z.ZodObject<z.extendShape<z.extendShape<Omit<{
    _: z.ZodArray<z.ZodString, "many">;
    projectDir: z.ZodString;
    maxConcurrency: z.ZodNumber;
    debug: z.ZodBoolean;
    disableState: z.ZodBoolean;
    logPluginRequests: z.ZodBoolean;
    fromVsCode: z.ZodBoolean;
    version: z.ZodBoolean;
    build: z.ZodBoolean;
    help: z.ZodBoolean;
    yes: z.ZodBoolean;
    plugin: z.ZodOptional<z.ZodString>;
    env: z.ZodString;
    quickstart: z.ZodString;
    setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    setVersion: z.ZodString;
}, "quickstart">, {
    taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
    config: z.ZodObject<z.extendShape<{
        language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
        plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "npm" | "binary" | "deno";
            name: string;
        }, {
            type: "npm" | "binary" | "deno";
            name: string;
        }>, "many">>;
        contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            label: z.ZodString;
            rpcUrl: z.ZodString;
            protocol: z.ZodString;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                publicKey: z.ZodString;
                publicKeyHash: z.ZodString;
                privateKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }>>>;
            faucet: z.ZodOptional<z.ZodObject<{
                pkh: z.ZodString;
                mnemonic: z.ZodArray<z.ZodString, "many">;
                email: z.ZodString;
                password: z.ZodString;
                amount: z.ZodString;
                activation_code: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            }, {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }>>>;
        sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            label: z.ZodString;
            rpcUrl: z.ZodString;
            protocol: z.ZodString;
            attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            plugin: z.ZodOptional<z.ZodString>;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                encryptedKey: z.ZodString;
                publicKeyHash: z.ZodString;
                secretKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }, {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }>, z.ZodString]>>>;
            tzkt: z.ZodOptional<z.ZodObject<{
                disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            }, {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }>>>;
        environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            networks: z.ZodArray<z.ZodString, "many">;
            sandboxes: z.ZodArray<z.ZodString, "many">;
            storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }, {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>, z.ZodString]>>;
        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            sourceFile: z.ZodString;
            hash: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            sourceFile: string;
            hash: string;
        }, {
            sourceFile: string;
            hash: string;
        }>>>;
        metadata: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            projectDescription: z.ZodOptional<z.ZodString>;
            authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            license: z.ZodOptional<z.ZodString>;
            homepage: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        }, {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        }>>;
    }, {
        projectDir: z.ZodString;
        configFile: z.ZodString;
        hash: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    }, {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    }>;
}>, {
    template: z.ZodString;
}>, "passthrough", z.ZodTypeAny, {
    plugin?: string | undefined;
    _: string[];
    projectDir: string;
    maxConcurrency: number;
    debug: boolean;
    disableState: boolean;
    logPluginRequests: boolean;
    fromVsCode: boolean;
    version: boolean;
    build: boolean;
    help: boolean;
    yes: boolean;
    env: string;
    setBuild: string | number;
    setVersion: string;
    template: string;
    taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
    config: {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    };
}, {
    plugin?: string | undefined;
    _: string[];
    projectDir: string;
    maxConcurrency: number;
    debug: boolean;
    disableState: boolean;
    logPluginRequests: boolean;
    fromVsCode: boolean;
    version: boolean;
    build: boolean;
    help: boolean;
    yes: boolean;
    env: string;
    setBuild: string | number;
    setVersion: string;
    template: string;
    taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
    config: {
        sandbox?: Record<string, {
            plugin?: string | undefined;
            accounts?: Record<string, string | {
                publicKeyHash: string;
                encryptedKey: string;
                secretKey: string;
            }> | undefined;
            attributes?: string | number | boolean | undefined;
            tzkt?: {
                disableAutostartWithSandbox?: boolean | undefined;
                postgresqlPort?: number | undefined;
                apiPort?: number | undefined;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        language?: "en" | "fr" | undefined;
        plugins?: {
            type: "npm" | "binary" | "deno";
            name: string;
        }[] | undefined;
        contractsDir?: string | undefined;
        artifactsDir?: string | undefined;
        network?: Record<string, {
            accounts?: Record<string, {
                publicKey: string;
                publicKeyHash: string;
                privateKey: string;
            }> | undefined;
            faucet?: {
                pkh: string;
                mnemonic: string[];
                email: string;
                password: string;
                amount: string;
                activation_code: string;
            } | undefined;
            label: string;
            rpcUrl: string;
            protocol: string;
        }> | undefined;
        accounts?: Record<string, string> | undefined;
        contracts?: Record<string, {
            sourceFile: string;
            hash: string;
        }> | undefined;
        metadata?: {
            name?: string | undefined;
            projectDescription?: string | undefined;
            authors?: string[] | undefined;
            license?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        projectDir: string;
        environment: Record<string, string | {
            storage?: Record<string, string> | undefined;
            aliases?: Record<string, Record<string, string>> | undefined;
            networks: string[];
            sandboxes: string[];
        }>;
        hash: string;
        configFile: string;
    };
}>;
export declare const operationSchema: z.ZodObject<{
    operation: z.ZodString;
    command: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
        placeholder: z.ZodString;
        description: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
        required: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }>, "many">>;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        shortFlag: z.ZodOptional<z.ZodString>;
        flag: z.ZodString;
        description: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
        required: z.ZodOptional<z.ZodBoolean>;
        boolean: z.ZodOptional<z.ZodBoolean>;
        choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }>, "many">>;
    handler: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        operations: z.ZodRecord<z.ZodString, z.ZodObject<{
            hash: z.ZodString;
            time: z.ZodNumber;
            output: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            output?: unknown;
            hash: string;
            time: number;
        }, {
            output?: unknown;
            hash: string;
            time: number;
        }>>;
        tasks: z.ZodRecord<z.ZodString, z.ZodObject<{
            task: z.ZodString;
            plugin: z.ZodString;
            time: z.ZodNumber;
            output: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }, {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }>], z.ZodUnknown>, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
        _: z.ZodArray<z.ZodString, "many">;
        projectDir: z.ZodString;
        maxConcurrency: z.ZodNumber;
        debug: z.ZodBoolean;
        disableState: z.ZodBoolean;
        logPluginRequests: z.ZodBoolean;
        fromVsCode: z.ZodBoolean;
        version: z.ZodBoolean;
        build: z.ZodBoolean;
        help: z.ZodBoolean;
        yes: z.ZodBoolean;
        plugin: z.ZodOptional<z.ZodString>;
        env: z.ZodString;
        quickstart: z.ZodString;
        setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        setVersion: z.ZodString;
    }, "quickstart">, {
        taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
        config: z.ZodObject<z.extendShape<{
            language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
            plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "npm" | "binary" | "deno";
                name: string;
            }, {
                type: "npm" | "binary" | "deno";
                name: string;
            }>, "many">>;
            contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    publicKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    privateKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }>>>;
                faucet: z.ZodOptional<z.ZodObject<{
                    pkh: z.ZodString;
                    mnemonic: z.ZodArray<z.ZodString, "many">;
                    email: z.ZodString;
                    password: z.ZodString;
                    amount: z.ZodString;
                    activation_code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                plugin: z.ZodOptional<z.ZodString>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    encryptedKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    secretKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }>, z.ZodString]>>>;
                tzkt: z.ZodOptional<z.ZodObject<{
                    disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                    postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                networks: z.ZodArray<z.ZodString, "many">;
                sandboxes: z.ZodArray<z.ZodString, "many">;
                storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
            }, "strip", z.ZodTypeAny, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>, z.ZodString]>>;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                sourceFile: z.ZodString;
                hash: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                sourceFile: string;
                hash: string;
            }, {
                sourceFile: string;
                hash: string;
            }>>>;
            metadata: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                projectDescription: z.ZodOptional<z.ZodString>;
                authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                license: z.ZodOptional<z.ZodString>;
                homepage: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }>>;
        }, {
            projectDir: z.ZodString;
            configFile: z.ZodString;
            hash: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }>;
    }>, "passthrough", z.ZodTypeAny, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }>], z.ZodUnknown>, z.ZodVoid>>>;
}, "strip", z.ZodTypeAny, {
    handler?: ((args_0: {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }, ...args_1: unknown[]) => (args_0: {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, ...args_1: unknown[]) => void) | undefined;
    description?: string | undefined;
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    operation: string;
    command: string;
}, {
    handler?: ((args_0: {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }, ...args_1: unknown[]) => (args_0: {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, ...args_1: unknown[]) => void) | undefined;
    description?: string | undefined;
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    operation: string;
    command: string;
}>;
export declare const parsedOperationSchema: z.ZodObject<Omit<{
    operation: z.ZodString;
    command: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
        placeholder: z.ZodString;
        description: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
        required: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }>, "many">>;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        shortFlag: z.ZodOptional<z.ZodString>;
        flag: z.ZodString;
        description: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
        required: z.ZodOptional<z.ZodBoolean>;
        boolean: z.ZodOptional<z.ZodBoolean>;
        choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }>, "many">>;
    handler: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        operations: z.ZodRecord<z.ZodString, z.ZodObject<{
            hash: z.ZodString;
            time: z.ZodNumber;
            output: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            output?: unknown;
            hash: string;
            time: number;
        }, {
            output?: unknown;
            hash: string;
            time: number;
        }>>;
        tasks: z.ZodRecord<z.ZodString, z.ZodObject<{
            task: z.ZodString;
            plugin: z.ZodString;
            time: z.ZodNumber;
            output: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }, {
        operations: Record<string, {
            output?: unknown;
            hash: string;
            time: number;
        }>;
        tasks: Record<string, {
            output?: unknown;
            plugin: string;
            task: string;
            time: number;
        }>;
    }>], z.ZodUnknown>, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
        _: z.ZodArray<z.ZodString, "many">;
        projectDir: z.ZodString;
        maxConcurrency: z.ZodNumber;
        debug: z.ZodBoolean;
        disableState: z.ZodBoolean;
        logPluginRequests: z.ZodBoolean;
        fromVsCode: z.ZodBoolean;
        version: z.ZodBoolean;
        build: z.ZodBoolean;
        help: z.ZodBoolean;
        yes: z.ZodBoolean;
        plugin: z.ZodOptional<z.ZodString>;
        env: z.ZodString;
        quickstart: z.ZodString;
        setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        setVersion: z.ZodString;
    }, "quickstart">, {
        taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
        config: z.ZodObject<z.extendShape<{
            language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
            plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "npm" | "binary" | "deno";
                name: string;
            }, {
                type: "npm" | "binary" | "deno";
                name: string;
            }>, "many">>;
            contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    publicKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    privateKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }>>>;
                faucet: z.ZodOptional<z.ZodObject<{
                    pkh: z.ZodString;
                    mnemonic: z.ZodArray<z.ZodString, "many">;
                    email: z.ZodString;
                    password: z.ZodString;
                    amount: z.ZodString;
                    activation_code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                plugin: z.ZodOptional<z.ZodString>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    encryptedKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    secretKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }>, z.ZodString]>>>;
                tzkt: z.ZodOptional<z.ZodObject<{
                    disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                    postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                networks: z.ZodArray<z.ZodString, "many">;
                sandboxes: z.ZodArray<z.ZodString, "many">;
                storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
            }, "strip", z.ZodTypeAny, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>, z.ZodString]>>;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                sourceFile: z.ZodString;
                hash: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                sourceFile: string;
                hash: string;
            }, {
                sourceFile: string;
                hash: string;
            }>>>;
            metadata: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                projectDescription: z.ZodOptional<z.ZodString>;
                authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                license: z.ZodOptional<z.ZodString>;
                homepage: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }>>;
        }, {
            projectDir: z.ZodString;
            configFile: z.ZodString;
            hash: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }>;
    }>, "passthrough", z.ZodTypeAny, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }>], z.ZodUnknown>, z.ZodVoid>>>;
}, "handler">, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    operation: string;
    command: string;
}, {
    description?: string | undefined;
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    operation: string;
    command: string;
}>;
export declare const templateSchema: z.ZodObject<{
    template: z.ZodString;
    command: z.ZodString;
    description: z.ZodString;
    hidden: z.ZodOptional<z.ZodBoolean>;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        shortFlag: z.ZodOptional<z.ZodString>;
        flag: z.ZodString;
        description: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
        required: z.ZodOptional<z.ZodBoolean>;
        boolean: z.ZodOptional<z.ZodBoolean>;
        choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }>, "many">>;
    positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
        placeholder: z.ZodString;
        description: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
        required: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }>, "many">>;
    handler: z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
        _: z.ZodArray<z.ZodString, "many">;
        projectDir: z.ZodString;
        maxConcurrency: z.ZodNumber;
        debug: z.ZodBoolean;
        disableState: z.ZodBoolean;
        logPluginRequests: z.ZodBoolean;
        fromVsCode: z.ZodBoolean;
        version: z.ZodBoolean;
        build: z.ZodBoolean;
        help: z.ZodBoolean;
        yes: z.ZodBoolean;
        plugin: z.ZodOptional<z.ZodString>;
        env: z.ZodString;
        quickstart: z.ZodString;
        setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        setVersion: z.ZodString;
    }, "quickstart">, {
        taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
        config: z.ZodObject<z.extendShape<{
            language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
            plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "npm" | "binary" | "deno";
                name: string;
            }, {
                type: "npm" | "binary" | "deno";
                name: string;
            }>, "many">>;
            contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    publicKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    privateKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }>>>;
                faucet: z.ZodOptional<z.ZodObject<{
                    pkh: z.ZodString;
                    mnemonic: z.ZodArray<z.ZodString, "many">;
                    email: z.ZodString;
                    password: z.ZodString;
                    amount: z.ZodString;
                    activation_code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                plugin: z.ZodOptional<z.ZodString>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    encryptedKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    secretKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }>, z.ZodString]>>>;
                tzkt: z.ZodOptional<z.ZodObject<{
                    disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                    postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                networks: z.ZodArray<z.ZodString, "many">;
                sandboxes: z.ZodArray<z.ZodString, "many">;
                storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
            }, "strip", z.ZodTypeAny, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>, z.ZodString]>>;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                sourceFile: z.ZodString;
                hash: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                sourceFile: string;
                hash: string;
            }, {
                sourceFile: string;
                hash: string;
            }>>>;
            metadata: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                projectDescription: z.ZodOptional<z.ZodString>;
                authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                license: z.ZodOptional<z.ZodString>;
                homepage: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }>>;
        }, {
            projectDir: z.ZodString;
            configFile: z.ZodString;
            hash: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }>;
    }>, "passthrough", z.ZodTypeAny, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }>], z.ZodUnknown>, z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
        data: z.ZodOptional<z.ZodUnknown>;
        render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
    }, "strip", z.ZodTypeAny, {
        data?: unknown;
        render: "string" | "none" | "table";
    }, {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>, z.ZodVoid]>, z.ZodPromise<z.ZodUnion<[z.ZodObject<{
        data: z.ZodOptional<z.ZodUnknown>;
        render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
    }, "strip", z.ZodTypeAny, {
        data?: unknown;
        render: "string" | "none" | "table";
    }, {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>, z.ZodVoid]>>]>>, z.ZodPromise<z.ZodVoid>]>;
    encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
}, "strip", z.ZodTypeAny, {
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    hidden?: boolean | undefined;
    encoding?: "none" | "json" | "application/json" | undefined;
    handler: string | Promise<void> | ((args_0: {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, ...args_1: unknown[]) => void | {
        data?: unknown;
        render: "string" | "none" | "table";
    } | Promise<void | {
        data?: unknown;
        render: "string" | "none" | "table";
    }>);
    command: string;
    description: string;
    template: string;
}, {
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    hidden?: boolean | undefined;
    encoding?: "none" | "json" | "application/json" | undefined;
    handler: string | Promise<void> | ((args_0: {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, ...args_1: unknown[]) => void | {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    } | Promise<void | {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>);
    command: string;
    description: string;
    template: string;
}>;
export declare const parsedTemplateSchema: z.ZodObject<z.extendShape<Omit<{
    template: z.ZodString;
    command: z.ZodString;
    description: z.ZodString;
    hidden: z.ZodOptional<z.ZodBoolean>;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        shortFlag: z.ZodOptional<z.ZodString>;
        flag: z.ZodString;
        description: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
        required: z.ZodOptional<z.ZodBoolean>;
        boolean: z.ZodOptional<z.ZodBoolean>;
        choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }, {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }>, "many">>;
    positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
        placeholder: z.ZodString;
        description: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
        required: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }, {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }>, "many">>;
    handler: z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
        _: z.ZodArray<z.ZodString, "many">;
        projectDir: z.ZodString;
        maxConcurrency: z.ZodNumber;
        debug: z.ZodBoolean;
        disableState: z.ZodBoolean;
        logPluginRequests: z.ZodBoolean;
        fromVsCode: z.ZodBoolean;
        version: z.ZodBoolean;
        build: z.ZodBoolean;
        help: z.ZodBoolean;
        yes: z.ZodBoolean;
        plugin: z.ZodOptional<z.ZodString>;
        env: z.ZodString;
        quickstart: z.ZodString;
        setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        setVersion: z.ZodString;
    }, "quickstart">, {
        taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
        config: z.ZodObject<z.extendShape<{
            language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
            plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "npm" | "binary" | "deno";
                name: string;
            }, {
                type: "npm" | "binary" | "deno";
                name: string;
            }>, "many">>;
            contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    publicKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    privateKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }>>>;
                faucet: z.ZodOptional<z.ZodObject<{
                    pkh: z.ZodString;
                    mnemonic: z.ZodArray<z.ZodString, "many">;
                    email: z.ZodString;
                    password: z.ZodString;
                    amount: z.ZodString;
                    activation_code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                plugin: z.ZodOptional<z.ZodString>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    encryptedKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    secretKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }>, z.ZodString]>>>;
                tzkt: z.ZodOptional<z.ZodObject<{
                    disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                    postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                networks: z.ZodArray<z.ZodString, "many">;
                sandboxes: z.ZodArray<z.ZodString, "many">;
                storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
            }, "strip", z.ZodTypeAny, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>, z.ZodString]>>;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                sourceFile: z.ZodString;
                hash: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                sourceFile: string;
                hash: string;
            }, {
                sourceFile: string;
                hash: string;
            }>>>;
            metadata: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                projectDescription: z.ZodOptional<z.ZodString>;
                authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                license: z.ZodOptional<z.ZodString>;
                homepage: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }>>;
        }, {
            projectDir: z.ZodString;
            configFile: z.ZodString;
            hash: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }>;
    }>, "passthrough", z.ZodTypeAny, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }>], z.ZodUnknown>, z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
        data: z.ZodOptional<z.ZodUnknown>;
        render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
    }, "strip", z.ZodTypeAny, {
        data?: unknown;
        render: "string" | "none" | "table";
    }, {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>, z.ZodVoid]>, z.ZodPromise<z.ZodUnion<[z.ZodObject<{
        data: z.ZodOptional<z.ZodUnknown>;
        render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
    }, "strip", z.ZodTypeAny, {
        data?: unknown;
        render: "string" | "none" | "table";
    }, {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>, z.ZodVoid]>>]>>, z.ZodPromise<z.ZodVoid>]>;
    encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
}, "handler">, {
    handler: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    hidden?: boolean | undefined;
    encoding?: "none" | "json" | "application/json" | undefined;
    handler: string;
    command: string;
    description: string;
    template: string;
}, {
    positionals?: {
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        defaultValue?: string | number | boolean | undefined;
        description: string;
        placeholder: string;
    }[] | undefined;
    options?: {
        boolean?: boolean | undefined;
        required?: boolean | undefined;
        type?: "string" | "number" | "boolean" | undefined;
        shortFlag?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        choices?: string[] | undefined;
        description: string;
        flag: string;
    }[] | undefined;
    hidden?: boolean | undefined;
    encoding?: "none" | "json" | "application/json" | undefined;
    handler: string;
    command: string;
    description: string;
    template: string;
}>;
export declare const pluginInfoSchema: z.ZodObject<z.extendShape<{
    name: z.ZodString;
    version: z.ZodString;
    schema: z.ZodString;
    alias: z.ZodUnion<[z.ZodString, z.ZodString]>;
    tasks: z.ZodOptional<z.ZodArray<z.ZodObject<{
        task: z.ZodString;
        command: z.ZodString;
        aliases: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">>;
        description: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodString>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
        handler: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodString]>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            shortFlag: z.ZodOptional<z.ZodString>;
            flag: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
            boolean: z.ZodOptional<z.ZodBoolean>;
            choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }>, "many">>;
        positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            placeholder: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }>, "many">>;
}, {
    operations: z.ZodOptional<z.ZodArray<z.ZodObject<Omit<{
        operation: z.ZodString;
        command: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            placeholder: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }>, "many">>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            shortFlag: z.ZodOptional<z.ZodString>;
            flag: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
            boolean: z.ZodOptional<z.ZodBoolean>;
            choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }>, "many">>;
        handler: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            operations: z.ZodRecord<z.ZodString, z.ZodObject<{
                hash: z.ZodString;
                time: z.ZodNumber;
                output: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                output?: unknown;
                hash: string;
                time: number;
            }, {
                output?: unknown;
                hash: string;
                time: number;
            }>>;
            tasks: z.ZodRecord<z.ZodString, z.ZodObject<{
                task: z.ZodString;
                plugin: z.ZodString;
                time: z.ZodNumber;
                output: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            operations: Record<string, {
                output?: unknown;
                hash: string;
                time: number;
            }>;
            tasks: Record<string, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>;
        }, {
            operations: Record<string, {
                output?: unknown;
                hash: string;
                time: number;
            }>;
            tasks: Record<string, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>;
        }>], z.ZodUnknown>, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
            _: z.ZodArray<z.ZodString, "many">;
            projectDir: z.ZodString;
            maxConcurrency: z.ZodNumber;
            debug: z.ZodBoolean;
            disableState: z.ZodBoolean;
            logPluginRequests: z.ZodBoolean;
            fromVsCode: z.ZodBoolean;
            version: z.ZodBoolean;
            build: z.ZodBoolean;
            help: z.ZodBoolean;
            yes: z.ZodBoolean;
            plugin: z.ZodOptional<z.ZodString>;
            env: z.ZodString;
            quickstart: z.ZodString;
            setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            setVersion: z.ZodString;
        }, "quickstart">, {
            taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
            config: z.ZodObject<z.extendShape<{
                language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
                plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }>, "many">>;
                contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        publicKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        privateKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }>>>;
                    faucet: z.ZodOptional<z.ZodObject<{
                        pkh: z.ZodString;
                        mnemonic: z.ZodArray<z.ZodString, "many">;
                        email: z.ZodString;
                        password: z.ZodString;
                        amount: z.ZodString;
                        activation_code: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                    plugin: z.ZodOptional<z.ZodString>;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                        encryptedKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        secretKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }>, z.ZodString]>>>;
                    tzkt: z.ZodOptional<z.ZodObject<{
                        disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                        postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                        apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    }, "strip", z.ZodTypeAny, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    networks: z.ZodArray<z.ZodString, "many">;
                    sandboxes: z.ZodArray<z.ZodString, "many">;
                    storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
                }, "strip", z.ZodTypeAny, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>, z.ZodString]>>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    sourceFile: z.ZodString;
                    hash: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    sourceFile: string;
                    hash: string;
                }, {
                    sourceFile: string;
                    hash: string;
                }>>>;
                metadata: z.ZodOptional<z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    projectDescription: z.ZodOptional<z.ZodString>;
                    authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    license: z.ZodOptional<z.ZodString>;
                    homepage: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }>>;
            }, {
                projectDir: z.ZodString;
                configFile: z.ZodString;
                hash: z.ZodString;
            }>, "strip", z.ZodTypeAny, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }>;
        }>, "passthrough", z.ZodTypeAny, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }>], z.ZodUnknown>, z.ZodVoid>>>;
    }, "handler">, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }>, "many">>;
    templates: z.ZodOptional<z.ZodArray<z.ZodObject<z.extendShape<Omit<{
        template: z.ZodString;
        command: z.ZodString;
        description: z.ZodString;
        hidden: z.ZodOptional<z.ZodBoolean>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            shortFlag: z.ZodOptional<z.ZodString>;
            flag: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
            boolean: z.ZodOptional<z.ZodBoolean>;
            choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }>, "many">>;
        positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            placeholder: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }>, "many">>;
        handler: z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
            _: z.ZodArray<z.ZodString, "many">;
            projectDir: z.ZodString;
            maxConcurrency: z.ZodNumber;
            debug: z.ZodBoolean;
            disableState: z.ZodBoolean;
            logPluginRequests: z.ZodBoolean;
            fromVsCode: z.ZodBoolean;
            version: z.ZodBoolean;
            build: z.ZodBoolean;
            help: z.ZodBoolean;
            yes: z.ZodBoolean;
            plugin: z.ZodOptional<z.ZodString>;
            env: z.ZodString;
            quickstart: z.ZodString;
            setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            setVersion: z.ZodString;
        }, "quickstart">, {
            taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
            config: z.ZodObject<z.extendShape<{
                language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
                plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }>, "many">>;
                contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        publicKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        privateKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }>>>;
                    faucet: z.ZodOptional<z.ZodObject<{
                        pkh: z.ZodString;
                        mnemonic: z.ZodArray<z.ZodString, "many">;
                        email: z.ZodString;
                        password: z.ZodString;
                        amount: z.ZodString;
                        activation_code: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                    plugin: z.ZodOptional<z.ZodString>;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                        encryptedKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        secretKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }>, z.ZodString]>>>;
                    tzkt: z.ZodOptional<z.ZodObject<{
                        disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                        postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                        apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    }, "strip", z.ZodTypeAny, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    networks: z.ZodArray<z.ZodString, "many">;
                    sandboxes: z.ZodArray<z.ZodString, "many">;
                    storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
                }, "strip", z.ZodTypeAny, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>, z.ZodString]>>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    sourceFile: z.ZodString;
                    hash: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    sourceFile: string;
                    hash: string;
                }, {
                    sourceFile: string;
                    hash: string;
                }>>>;
                metadata: z.ZodOptional<z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    projectDescription: z.ZodOptional<z.ZodString>;
                    authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    license: z.ZodOptional<z.ZodString>;
                    homepage: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }>>;
            }, {
                projectDir: z.ZodString;
                configFile: z.ZodString;
                hash: z.ZodString;
            }>, "strip", z.ZodTypeAny, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }>;
        }>, "passthrough", z.ZodTypeAny, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }>], z.ZodUnknown>, z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
            data: z.ZodOptional<z.ZodUnknown>;
            render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
        }, "strip", z.ZodTypeAny, {
            data?: unknown;
            render: "string" | "none" | "table";
        }, {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>, z.ZodVoid]>, z.ZodPromise<z.ZodUnion<[z.ZodObject<{
            data: z.ZodOptional<z.ZodUnknown>;
            render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
        }, "strip", z.ZodTypeAny, {
            data?: unknown;
            render: "string" | "none" | "table";
        }, {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>, z.ZodVoid]>>]>>, z.ZodPromise<z.ZodVoid>]>;
        encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
    }, "handler">, {
        handler: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string;
        command: string;
        description: string;
        template: string;
    }, {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string;
        command: string;
        description: string;
        template: string;
    }>, "many">>;
}>, "strip", z.ZodTypeAny, {
    operations?: {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }[] | undefined;
    tasks?: {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }[] | undefined;
    templates?: {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string;
        command: string;
        description: string;
        template: string;
    }[] | undefined;
    version: string;
    name: string;
    schema: string;
    alias: string;
}, {
    operations?: {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }[] | undefined;
    tasks?: {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }[] | undefined;
    templates?: {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string;
        command: string;
        description: string;
        template: string;
    }[] | undefined;
    version: string;
    name: string;
    schema: string;
    alias: string;
}>;
export declare const pluginSchemaSchema: z.ZodObject<z.extendShape<{
    name: z.ZodString;
    version: z.ZodString;
    schema: z.ZodString;
    alias: z.ZodUnion<[z.ZodString, z.ZodString]>;
    tasks: z.ZodOptional<z.ZodArray<z.ZodObject<{
        task: z.ZodString;
        command: z.ZodString;
        aliases: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">>;
        description: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodString>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
        handler: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodString]>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            shortFlag: z.ZodOptional<z.ZodString>;
            flag: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
            boolean: z.ZodOptional<z.ZodBoolean>;
            choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }>, "many">>;
        positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            placeholder: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }>, "many">>;
}, {
    operations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        operation: z.ZodString;
        command: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            placeholder: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }>, "many">>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            shortFlag: z.ZodOptional<z.ZodString>;
            flag: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
            boolean: z.ZodOptional<z.ZodBoolean>;
            choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }>, "many">>;
        handler: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            operations: z.ZodRecord<z.ZodString, z.ZodObject<{
                hash: z.ZodString;
                time: z.ZodNumber;
                output: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                output?: unknown;
                hash: string;
                time: number;
            }, {
                output?: unknown;
                hash: string;
                time: number;
            }>>;
            tasks: z.ZodRecord<z.ZodString, z.ZodObject<{
                task: z.ZodString;
                plugin: z.ZodString;
                time: z.ZodNumber;
                output: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            operations: Record<string, {
                output?: unknown;
                hash: string;
                time: number;
            }>;
            tasks: Record<string, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>;
        }, {
            operations: Record<string, {
                output?: unknown;
                hash: string;
                time: number;
            }>;
            tasks: Record<string, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>;
        }>], z.ZodUnknown>, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
            _: z.ZodArray<z.ZodString, "many">;
            projectDir: z.ZodString;
            maxConcurrency: z.ZodNumber;
            debug: z.ZodBoolean;
            disableState: z.ZodBoolean;
            logPluginRequests: z.ZodBoolean;
            fromVsCode: z.ZodBoolean;
            version: z.ZodBoolean;
            build: z.ZodBoolean;
            help: z.ZodBoolean;
            yes: z.ZodBoolean;
            plugin: z.ZodOptional<z.ZodString>;
            env: z.ZodString;
            quickstart: z.ZodString;
            setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            setVersion: z.ZodString;
        }, "quickstart">, {
            taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
            config: z.ZodObject<z.extendShape<{
                language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
                plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }>, "many">>;
                contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        publicKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        privateKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }>>>;
                    faucet: z.ZodOptional<z.ZodObject<{
                        pkh: z.ZodString;
                        mnemonic: z.ZodArray<z.ZodString, "many">;
                        email: z.ZodString;
                        password: z.ZodString;
                        amount: z.ZodString;
                        activation_code: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                    plugin: z.ZodOptional<z.ZodString>;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                        encryptedKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        secretKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }>, z.ZodString]>>>;
                    tzkt: z.ZodOptional<z.ZodObject<{
                        disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                        postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                        apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    }, "strip", z.ZodTypeAny, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    networks: z.ZodArray<z.ZodString, "many">;
                    sandboxes: z.ZodArray<z.ZodString, "many">;
                    storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
                }, "strip", z.ZodTypeAny, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>, z.ZodString]>>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    sourceFile: z.ZodString;
                    hash: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    sourceFile: string;
                    hash: string;
                }, {
                    sourceFile: string;
                    hash: string;
                }>>>;
                metadata: z.ZodOptional<z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    projectDescription: z.ZodOptional<z.ZodString>;
                    authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    license: z.ZodOptional<z.ZodString>;
                    homepage: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }>>;
            }, {
                projectDir: z.ZodString;
                configFile: z.ZodString;
                hash: z.ZodString;
            }>, "strip", z.ZodTypeAny, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }>;
        }>, "passthrough", z.ZodTypeAny, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }>], z.ZodUnknown>, z.ZodVoid>>>;
    }, "strip", z.ZodTypeAny, {
        handler?: ((args_0: {
            operations: Record<string, {
                output?: unknown;
                hash: string;
                time: number;
            }>;
            tasks: Record<string, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>;
        }, ...args_1: unknown[]) => (args_0: {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, ...args_1: unknown[]) => void) | undefined;
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }, {
        handler?: ((args_0: {
            operations: Record<string, {
                output?: unknown;
                hash: string;
                time: number;
            }>;
            tasks: Record<string, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>;
        }, ...args_1: unknown[]) => (args_0: {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, ...args_1: unknown[]) => void) | undefined;
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }>, "many">>;
    templates: z.ZodOptional<z.ZodArray<z.ZodObject<{
        template: z.ZodString;
        command: z.ZodString;
        description: z.ZodString;
        hidden: z.ZodOptional<z.ZodBoolean>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            shortFlag: z.ZodOptional<z.ZodString>;
            flag: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
            boolean: z.ZodOptional<z.ZodBoolean>;
            choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }>, "many">>;
        positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            placeholder: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }>, "many">>;
        handler: z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
            _: z.ZodArray<z.ZodString, "many">;
            projectDir: z.ZodString;
            maxConcurrency: z.ZodNumber;
            debug: z.ZodBoolean;
            disableState: z.ZodBoolean;
            logPluginRequests: z.ZodBoolean;
            fromVsCode: z.ZodBoolean;
            version: z.ZodBoolean;
            build: z.ZodBoolean;
            help: z.ZodBoolean;
            yes: z.ZodBoolean;
            plugin: z.ZodOptional<z.ZodString>;
            env: z.ZodString;
            quickstart: z.ZodString;
            setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            setVersion: z.ZodString;
        }, "quickstart">, {
            taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
            config: z.ZodObject<z.extendShape<{
                language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
                plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }>, "many">>;
                contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        publicKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        privateKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }>>>;
                    faucet: z.ZodOptional<z.ZodObject<{
                        pkh: z.ZodString;
                        mnemonic: z.ZodArray<z.ZodString, "many">;
                        email: z.ZodString;
                        password: z.ZodString;
                        amount: z.ZodString;
                        activation_code: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                    plugin: z.ZodOptional<z.ZodString>;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                        encryptedKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        secretKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }>, z.ZodString]>>>;
                    tzkt: z.ZodOptional<z.ZodObject<{
                        disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                        postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                        apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    }, "strip", z.ZodTypeAny, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    networks: z.ZodArray<z.ZodString, "many">;
                    sandboxes: z.ZodArray<z.ZodString, "many">;
                    storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
                }, "strip", z.ZodTypeAny, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>, z.ZodString]>>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    sourceFile: z.ZodString;
                    hash: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    sourceFile: string;
                    hash: string;
                }, {
                    sourceFile: string;
                    hash: string;
                }>>>;
                metadata: z.ZodOptional<z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    projectDescription: z.ZodOptional<z.ZodString>;
                    authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    license: z.ZodOptional<z.ZodString>;
                    homepage: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }>>;
            }, {
                projectDir: z.ZodString;
                configFile: z.ZodString;
                hash: z.ZodString;
            }>, "strip", z.ZodTypeAny, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }>;
        }>, "passthrough", z.ZodTypeAny, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }>], z.ZodUnknown>, z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
            data: z.ZodOptional<z.ZodUnknown>;
            render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
        }, "strip", z.ZodTypeAny, {
            data?: unknown;
            render: "string" | "none" | "table";
        }, {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>, z.ZodVoid]>, z.ZodPromise<z.ZodUnion<[z.ZodObject<{
            data: z.ZodOptional<z.ZodUnknown>;
            render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
        }, "strip", z.ZodTypeAny, {
            data?: unknown;
            render: "string" | "none" | "table";
        }, {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>, z.ZodVoid]>>]>>, z.ZodPromise<z.ZodVoid>]>;
        encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
    }, "strip", z.ZodTypeAny, {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string | Promise<void> | ((args_0: {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, ...args_1: unknown[]) => void | {
            data?: unknown;
            render: "string" | "none" | "table";
        } | Promise<void | {
            data?: unknown;
            render: "string" | "none" | "table";
        }>);
        command: string;
        description: string;
        template: string;
    }, {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string | Promise<void> | ((args_0: {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, ...args_1: unknown[]) => void | {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        } | Promise<void | {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>);
        command: string;
        description: string;
        template: string;
    }>, "many">>;
    proxy: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
        _: z.ZodArray<z.ZodString, "many">;
        projectDir: z.ZodString;
        maxConcurrency: z.ZodNumber;
        debug: z.ZodBoolean;
        disableState: z.ZodBoolean;
        logPluginRequests: z.ZodBoolean;
        fromVsCode: z.ZodBoolean;
        version: z.ZodBoolean;
        build: z.ZodBoolean;
        help: z.ZodBoolean;
        yes: z.ZodBoolean;
        plugin: z.ZodOptional<z.ZodString>;
        env: z.ZodString;
        quickstart: z.ZodString;
        setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        setVersion: z.ZodString;
    }, "quickstart">, {
        taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
        config: z.ZodObject<z.extendShape<{
            language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
            plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "npm" | "binary" | "deno";
                name: string;
            }, {
                type: "npm" | "binary" | "deno";
                name: string;
            }>, "many">>;
            contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    publicKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    privateKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }>>>;
                faucet: z.ZodOptional<z.ZodObject<{
                    pkh: z.ZodString;
                    mnemonic: z.ZodArray<z.ZodString, "many">;
                    email: z.ZodString;
                    password: z.ZodString;
                    amount: z.ZodString;
                    activation_code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                plugin: z.ZodOptional<z.ZodString>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    encryptedKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    secretKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }>, z.ZodString]>>>;
                tzkt: z.ZodOptional<z.ZodObject<{
                    disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                    postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                networks: z.ZodArray<z.ZodString, "many">;
                sandboxes: z.ZodArray<z.ZodString, "many">;
                storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
            }, "strip", z.ZodTypeAny, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>, z.ZodString]>>;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                sourceFile: z.ZodString;
                hash: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                sourceFile: string;
                hash: string;
            }, {
                sourceFile: string;
                hash: string;
            }>>>;
            metadata: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                projectDescription: z.ZodOptional<z.ZodString>;
                authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                license: z.ZodOptional<z.ZodString>;
                homepage: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }>>;
        }, {
            projectDir: z.ZodString;
            configFile: z.ZodString;
            hash: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }>;
    }>, "passthrough", z.ZodTypeAny, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodUnion<[z.ZodVoid, z.ZodUnion<[z.ZodObject<{
        data: z.ZodOptional<z.ZodUnknown>;
        render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
    }, "strip", z.ZodTypeAny, {
        data?: unknown;
        render: "string" | "none" | "table";
    }, {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>, z.ZodVoid]>]>>>>;
    checkRuntimeDependencies: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
        _: z.ZodArray<z.ZodString, "many">;
        projectDir: z.ZodString;
        maxConcurrency: z.ZodNumber;
        debug: z.ZodBoolean;
        disableState: z.ZodBoolean;
        logPluginRequests: z.ZodBoolean;
        fromVsCode: z.ZodBoolean;
        version: z.ZodBoolean;
        build: z.ZodBoolean;
        help: z.ZodBoolean;
        yes: z.ZodBoolean;
        plugin: z.ZodOptional<z.ZodString>;
        env: z.ZodString;
        quickstart: z.ZodString;
        setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        setVersion: z.ZodString;
    }, "quickstart">, {
        taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
        config: z.ZodObject<z.extendShape<{
            language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
            plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "npm" | "binary" | "deno";
                name: string;
            }, {
                type: "npm" | "binary" | "deno";
                name: string;
            }>, "many">>;
            contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    publicKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    privateKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }>>>;
                faucet: z.ZodOptional<z.ZodObject<{
                    pkh: z.ZodString;
                    mnemonic: z.ZodArray<z.ZodString, "many">;
                    email: z.ZodString;
                    password: z.ZodString;
                    amount: z.ZodString;
                    activation_code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                plugin: z.ZodOptional<z.ZodString>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    encryptedKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    secretKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }>, z.ZodString]>>>;
                tzkt: z.ZodOptional<z.ZodObject<{
                    disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                    postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                networks: z.ZodArray<z.ZodString, "many">;
                sandboxes: z.ZodArray<z.ZodString, "many">;
                storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
            }, "strip", z.ZodTypeAny, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>, z.ZodString]>>;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                sourceFile: z.ZodString;
                hash: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                sourceFile: string;
                hash: string;
            }, {
                sourceFile: string;
                hash: string;
            }>>>;
            metadata: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                projectDescription: z.ZodOptional<z.ZodString>;
                authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                license: z.ZodOptional<z.ZodString>;
                homepage: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }>>;
        }, {
            projectDir: z.ZodString;
            configFile: z.ZodString;
            hash: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }>;
    }>, "passthrough", z.ZodTypeAny, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodObject<{
        report: z.ZodArray<z.ZodObject<z.extendShape<{
            name: z.ZodString;
            path: z.ZodString;
            version: z.ZodString;
            kind: z.ZodUnion<[z.ZodLiteral<"required">, z.ZodLiteral<"optional">]>;
        }, {
            met: z.ZodBoolean;
        }>, "strip", z.ZodTypeAny, {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }, {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }, {
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }>>>>;
    installRuntimeDependencies: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
        _: z.ZodArray<z.ZodString, "many">;
        projectDir: z.ZodString;
        maxConcurrency: z.ZodNumber;
        debug: z.ZodBoolean;
        disableState: z.ZodBoolean;
        logPluginRequests: z.ZodBoolean;
        fromVsCode: z.ZodBoolean;
        version: z.ZodBoolean;
        build: z.ZodBoolean;
        help: z.ZodBoolean;
        yes: z.ZodBoolean;
        plugin: z.ZodOptional<z.ZodString>;
        env: z.ZodString;
        quickstart: z.ZodString;
        setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        setVersion: z.ZodString;
    }, "quickstart">, {
        taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
        config: z.ZodObject<z.extendShape<{
            language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
            plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "npm" | "binary" | "deno";
                name: string;
            }, {
                type: "npm" | "binary" | "deno";
                name: string;
            }>, "many">>;
            contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    publicKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    privateKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }>>>;
                faucet: z.ZodOptional<z.ZodObject<{
                    pkh: z.ZodString;
                    mnemonic: z.ZodArray<z.ZodString, "many">;
                    email: z.ZodString;
                    password: z.ZodString;
                    amount: z.ZodString;
                    activation_code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }, {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodString;
                rpcUrl: z.ZodString;
                protocol: z.ZodString;
                attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                plugin: z.ZodOptional<z.ZodString>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    encryptedKey: z.ZodString;
                    publicKeyHash: z.ZodString;
                    secretKey: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }, {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }>, z.ZodString]>>>;
                tzkt: z.ZodOptional<z.ZodObject<{
                    disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                    postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }, {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }>>>;
            environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                networks: z.ZodArray<z.ZodString, "many">;
                sandboxes: z.ZodArray<z.ZodString, "many">;
                storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
            }, "strip", z.ZodTypeAny, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }, {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>, z.ZodString]>>;
            accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                sourceFile: z.ZodString;
                hash: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                sourceFile: string;
                hash: string;
            }, {
                sourceFile: string;
                hash: string;
            }>>>;
            metadata: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                projectDescription: z.ZodOptional<z.ZodString>;
                authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                license: z.ZodOptional<z.ZodString>;
                homepage: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }, {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            }>>;
        }, {
            projectDir: z.ZodString;
            configFile: z.ZodString;
            hash: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }, {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        }>;
    }>, "passthrough", z.ZodTypeAny, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodObject<{
        report: z.ZodArray<z.ZodObject<z.extendShape<{
            name: z.ZodString;
            path: z.ZodString;
            version: z.ZodString;
            kind: z.ZodUnion<[z.ZodLiteral<"required">, z.ZodLiteral<"optional">]>;
        }, {
            met: z.ZodBoolean;
        }>, "strip", z.ZodTypeAny, {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }, {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }, {
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }>>>>;
}>, "strip", z.ZodTypeAny, {
    proxy?: ((args_0: {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, ...args_1: unknown[]) => Promise<void | {
        data?: unknown;
        render: "string" | "none" | "table";
    }>) | undefined;
    checkRuntimeDependencies?: ((args_0: {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, ...args_1: unknown[]) => Promise<{
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }>) | undefined;
    installRuntimeDependencies?: ((args_0: {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, ...args_1: unknown[]) => Promise<{
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }>) | undefined;
    operations?: {
        handler?: ((args_0: {
            operations: Record<string, {
                output?: unknown;
                hash: string;
                time: number;
            }>;
            tasks: Record<string, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>;
        }, ...args_1: unknown[]) => (args_0: {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, ...args_1: unknown[]) => void) | undefined;
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }[] | undefined;
    tasks?: {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }[] | undefined;
    templates?: {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string | Promise<void> | ((args_0: {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, ...args_1: unknown[]) => void | {
            data?: unknown;
            render: "string" | "none" | "table";
        } | Promise<void | {
            data?: unknown;
            render: "string" | "none" | "table";
        }>);
        command: string;
        description: string;
        template: string;
    }[] | undefined;
    version: string;
    name: string;
    schema: string;
    alias: string;
}, {
    proxy?: ((args_0: {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, ...args_1: unknown[]) => Promise<void | {
        data?: unknown;
        render?: "string" | "none" | "table" | undefined;
    }>) | undefined;
    checkRuntimeDependencies?: ((args_0: {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, ...args_1: unknown[]) => Promise<{
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }>) | undefined;
    installRuntimeDependencies?: ((args_0: {
        plugin?: string | undefined;
        _: string[];
        projectDir: string;
        maxConcurrency: number;
        debug: boolean;
        disableState: boolean;
        logPluginRequests: boolean;
        fromVsCode: boolean;
        version: boolean;
        build: boolean;
        help: boolean;
        yes: boolean;
        env: string;
        setBuild: string | number;
        setVersion: string;
        taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
        config: {
            sandbox?: Record<string, {
                plugin?: string | undefined;
                accounts?: Record<string, string | {
                    publicKeyHash: string;
                    encryptedKey: string;
                    secretKey: string;
                }> | undefined;
                attributes?: string | number | boolean | undefined;
                tzkt?: {
                    disableAutostartWithSandbox?: boolean | undefined;
                    postgresqlPort?: number | undefined;
                    apiPort?: number | undefined;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            language?: "en" | "fr" | undefined;
            plugins?: {
                type: "npm" | "binary" | "deno";
                name: string;
            }[] | undefined;
            contractsDir?: string | undefined;
            artifactsDir?: string | undefined;
            network?: Record<string, {
                accounts?: Record<string, {
                    publicKey: string;
                    publicKeyHash: string;
                    privateKey: string;
                }> | undefined;
                faucet?: {
                    pkh: string;
                    mnemonic: string[];
                    email: string;
                    password: string;
                    amount: string;
                    activation_code: string;
                } | undefined;
                label: string;
                rpcUrl: string;
                protocol: string;
            }> | undefined;
            accounts?: Record<string, string> | undefined;
            contracts?: Record<string, {
                sourceFile: string;
                hash: string;
            }> | undefined;
            metadata?: {
                name?: string | undefined;
                projectDescription?: string | undefined;
                authors?: string[] | undefined;
                license?: string | undefined;
                homepage?: string | undefined;
            } | undefined;
            projectDir: string;
            environment: Record<string, string | {
                storage?: Record<string, string> | undefined;
                aliases?: Record<string, Record<string, string>> | undefined;
                networks: string[];
                sandboxes: string[];
            }>;
            hash: string;
            configFile: string;
        };
    }, ...args_1: unknown[]) => Promise<{
        report: {
            version: string;
            path: string;
            name: string;
            kind: "required" | "optional";
            met: boolean;
        }[];
    }>) | undefined;
    operations?: {
        handler?: ((args_0: {
            operations: Record<string, {
                output?: unknown;
                hash: string;
                time: number;
            }>;
            tasks: Record<string, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>;
        }, ...args_1: unknown[]) => (args_0: {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, ...args_1: unknown[]) => void) | undefined;
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }[] | undefined;
    tasks?: {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }[] | undefined;
    templates?: {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string | Promise<void> | ((args_0: {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, ...args_1: unknown[]) => void | {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        } | Promise<void | {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>);
        command: string;
        description: string;
        template: string;
    }[] | undefined;
    version: string;
    name: string;
    schema: string;
    alias: string;
}>;
export declare const ephemeralStateSchema: z.ZodObject<{
    build: z.ZodString;
    configHash: z.ZodString;
    tasks: z.ZodRecord<z.ZodString, z.ZodIntersection<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "npm" | "binary" | "deno";
        name: string;
    }, {
        type: "npm" | "binary" | "deno";
        name: string;
    }>, z.ZodObject<{
        task: z.ZodString;
        command: z.ZodString;
        aliases: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">>;
        description: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodString>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
        handler: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodString]>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            shortFlag: z.ZodOptional<z.ZodString>;
            flag: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
            boolean: z.ZodOptional<z.ZodBoolean>;
            choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }>, "many">>;
        positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            placeholder: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }>>>;
    operations: z.ZodRecord<z.ZodString, z.ZodIntersection<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "npm" | "binary" | "deno";
        name: string;
    }, {
        type: "npm" | "binary" | "deno";
        name: string;
    }>, z.ZodObject<Omit<{
        operation: z.ZodString;
        command: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            placeholder: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }>, "many">>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            shortFlag: z.ZodOptional<z.ZodString>;
            flag: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
            boolean: z.ZodOptional<z.ZodBoolean>;
            choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }>, "many">>;
        handler: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            operations: z.ZodRecord<z.ZodString, z.ZodObject<{
                hash: z.ZodString;
                time: z.ZodNumber;
                output: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                output?: unknown;
                hash: string;
                time: number;
            }, {
                output?: unknown;
                hash: string;
                time: number;
            }>>;
            tasks: z.ZodRecord<z.ZodString, z.ZodObject<{
                task: z.ZodString;
                plugin: z.ZodString;
                time: z.ZodNumber;
                output: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            operations: Record<string, {
                output?: unknown;
                hash: string;
                time: number;
            }>;
            tasks: Record<string, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>;
        }, {
            operations: Record<string, {
                output?: unknown;
                hash: string;
                time: number;
            }>;
            tasks: Record<string, {
                output?: unknown;
                plugin: string;
                task: string;
                time: number;
            }>;
        }>], z.ZodUnknown>, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
            _: z.ZodArray<z.ZodString, "many">;
            projectDir: z.ZodString;
            maxConcurrency: z.ZodNumber;
            debug: z.ZodBoolean;
            disableState: z.ZodBoolean;
            logPluginRequests: z.ZodBoolean;
            fromVsCode: z.ZodBoolean;
            version: z.ZodBoolean;
            build: z.ZodBoolean;
            help: z.ZodBoolean;
            yes: z.ZodBoolean;
            plugin: z.ZodOptional<z.ZodString>;
            env: z.ZodString;
            quickstart: z.ZodString;
            setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            setVersion: z.ZodString;
        }, "quickstart">, {
            taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
            config: z.ZodObject<z.extendShape<{
                language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
                plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }>, "many">>;
                contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        publicKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        privateKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }>>>;
                    faucet: z.ZodOptional<z.ZodObject<{
                        pkh: z.ZodString;
                        mnemonic: z.ZodArray<z.ZodString, "many">;
                        email: z.ZodString;
                        password: z.ZodString;
                        amount: z.ZodString;
                        activation_code: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                    plugin: z.ZodOptional<z.ZodString>;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                        encryptedKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        secretKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }>, z.ZodString]>>>;
                    tzkt: z.ZodOptional<z.ZodObject<{
                        disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                        postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                        apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    }, "strip", z.ZodTypeAny, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    networks: z.ZodArray<z.ZodString, "many">;
                    sandboxes: z.ZodArray<z.ZodString, "many">;
                    storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
                }, "strip", z.ZodTypeAny, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>, z.ZodString]>>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    sourceFile: z.ZodString;
                    hash: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    sourceFile: string;
                    hash: string;
                }, {
                    sourceFile: string;
                    hash: string;
                }>>>;
                metadata: z.ZodOptional<z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    projectDescription: z.ZodOptional<z.ZodString>;
                    authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    license: z.ZodOptional<z.ZodString>;
                    homepage: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }>>;
            }, {
                projectDir: z.ZodString;
                configFile: z.ZodString;
                hash: z.ZodString;
            }>, "strip", z.ZodTypeAny, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }>;
        }>, "passthrough", z.ZodTypeAny, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }>], z.ZodUnknown>, z.ZodVoid>>>;
    }, "handler">, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }, {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }>>>;
    templates: z.ZodRecord<z.ZodString, z.ZodIntersection<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "npm" | "binary" | "deno";
        name: string;
    }, {
        type: "npm" | "binary" | "deno";
        name: string;
    }>, z.ZodObject<z.extendShape<Omit<{
        template: z.ZodString;
        command: z.ZodString;
        description: z.ZodString;
        hidden: z.ZodOptional<z.ZodBoolean>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            shortFlag: z.ZodOptional<z.ZodString>;
            flag: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
            boolean: z.ZodOptional<z.ZodBoolean>;
            choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }, {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }>, "many">>;
        positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            placeholder: z.ZodString;
            description: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }, {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }>, "many">>;
        handler: z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
            _: z.ZodArray<z.ZodString, "many">;
            projectDir: z.ZodString;
            maxConcurrency: z.ZodNumber;
            debug: z.ZodBoolean;
            disableState: z.ZodBoolean;
            logPluginRequests: z.ZodBoolean;
            fromVsCode: z.ZodBoolean;
            version: z.ZodBoolean;
            build: z.ZodBoolean;
            help: z.ZodBoolean;
            yes: z.ZodBoolean;
            plugin: z.ZodOptional<z.ZodString>;
            env: z.ZodString;
            quickstart: z.ZodString;
            setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            setVersion: z.ZodString;
        }, "quickstart">, {
            taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
            config: z.ZodObject<z.extendShape<{
                language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
                plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }>, "many">>;
                contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        publicKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        privateKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }>>>;
                    faucet: z.ZodOptional<z.ZodObject<{
                        pkh: z.ZodString;
                        mnemonic: z.ZodArray<z.ZodString, "many">;
                        email: z.ZodString;
                        password: z.ZodString;
                        amount: z.ZodString;
                        activation_code: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }, {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodString;
                    rpcUrl: z.ZodString;
                    protocol: z.ZodString;
                    attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                    plugin: z.ZodOptional<z.ZodString>;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                        encryptedKey: z.ZodString;
                        publicKeyHash: z.ZodString;
                        secretKey: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }>, z.ZodString]>>>;
                    tzkt: z.ZodOptional<z.ZodObject<{
                        disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                        postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                        apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    }, "strip", z.ZodTypeAny, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }>>>;
                environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    networks: z.ZodArray<z.ZodString, "many">;
                    sandboxes: z.ZodArray<z.ZodString, "many">;
                    storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
                }, "strip", z.ZodTypeAny, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>, z.ZodString]>>;
                accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    sourceFile: z.ZodString;
                    hash: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    sourceFile: string;
                    hash: string;
                }, {
                    sourceFile: string;
                    hash: string;
                }>>>;
                metadata: z.ZodOptional<z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    projectDescription: z.ZodOptional<z.ZodString>;
                    authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    license: z.ZodOptional<z.ZodString>;
                    homepage: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }, {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                }>>;
            }, {
                projectDir: z.ZodString;
                configFile: z.ZodString;
                hash: z.ZodString;
            }>, "strip", z.ZodTypeAny, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }, {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            }>;
        }>, "passthrough", z.ZodTypeAny, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }, {
            plugin?: string | undefined;
            _: string[];
            projectDir: string;
            maxConcurrency: number;
            debug: boolean;
            disableState: boolean;
            logPluginRequests: boolean;
            fromVsCode: boolean;
            version: boolean;
            build: boolean;
            help: boolean;
            yes: boolean;
            env: string;
            setBuild: string | number;
            setVersion: string;
            taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
            config: {
                sandbox?: Record<string, {
                    plugin?: string | undefined;
                    accounts?: Record<string, string | {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }> | undefined;
                    attributes?: string | number | boolean | undefined;
                    tzkt?: {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                language?: "en" | "fr" | undefined;
                plugins?: {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }[] | undefined;
                contractsDir?: string | undefined;
                artifactsDir?: string | undefined;
                network?: Record<string, {
                    accounts?: Record<string, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }> | undefined;
                    faucet?: {
                        pkh: string;
                        mnemonic: string[];
                        email: string;
                        password: string;
                        amount: string;
                        activation_code: string;
                    } | undefined;
                    label: string;
                    rpcUrl: string;
                    protocol: string;
                }> | undefined;
                accounts?: Record<string, string> | undefined;
                contracts?: Record<string, {
                    sourceFile: string;
                    hash: string;
                }> | undefined;
                metadata?: {
                    name?: string | undefined;
                    projectDescription?: string | undefined;
                    authors?: string[] | undefined;
                    license?: string | undefined;
                    homepage?: string | undefined;
                } | undefined;
                projectDir: string;
                environment: Record<string, string | {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>;
                hash: string;
                configFile: string;
            };
        }>], z.ZodUnknown>, z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
            data: z.ZodOptional<z.ZodUnknown>;
            render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
        }, "strip", z.ZodTypeAny, {
            data?: unknown;
            render: "string" | "none" | "table";
        }, {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>, z.ZodVoid]>, z.ZodPromise<z.ZodUnion<[z.ZodObject<{
            data: z.ZodOptional<z.ZodUnknown>;
            render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
        }, "strip", z.ZodTypeAny, {
            data?: unknown;
            render: "string" | "none" | "table";
        }, {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>, z.ZodVoid]>>]>>, z.ZodPromise<z.ZodVoid>]>;
        encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
    }, "handler">, {
        handler: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string;
        command: string;
        description: string;
        template: string;
    }, {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string;
        command: string;
        description: string;
        template: string;
    }>>>;
    plugins: z.ZodArray<z.ZodObject<z.extendShape<{
        name: z.ZodString;
        version: z.ZodString;
        schema: z.ZodString;
        alias: z.ZodUnion<[z.ZodString, z.ZodString]>;
        tasks: z.ZodOptional<z.ZodArray<z.ZodObject<{
            task: z.ZodString;
            command: z.ZodString;
            aliases: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">>;
            description: z.ZodOptional<z.ZodString>;
            example: z.ZodOptional<z.ZodString>;
            hidden: z.ZodOptional<z.ZodBoolean>;
            encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
            handler: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodString]>;
            options: z.ZodOptional<z.ZodArray<z.ZodObject<{
                shortFlag: z.ZodOptional<z.ZodString>;
                flag: z.ZodString;
                description: z.ZodString;
                defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
                required: z.ZodOptional<z.ZodBoolean>;
                boolean: z.ZodOptional<z.ZodBoolean>;
                choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }, {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }>, "many">>;
            positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
                placeholder: z.ZodString;
                description: z.ZodString;
                defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
                required: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }, {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            aliases?: string[] | undefined;
            example?: string | undefined;
            handler: string;
            command: string;
            task: string;
        }, {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            aliases?: string[] | undefined;
            example?: string | undefined;
            handler: string;
            command: string;
            task: string;
        }>, "many">>;
    }, {
        operations: z.ZodOptional<z.ZodArray<z.ZodObject<Omit<{
            operation: z.ZodString;
            command: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
                placeholder: z.ZodString;
                description: z.ZodString;
                defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
                required: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }, {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }>, "many">>;
            options: z.ZodOptional<z.ZodArray<z.ZodObject<{
                shortFlag: z.ZodOptional<z.ZodString>;
                flag: z.ZodString;
                description: z.ZodString;
                defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
                required: z.ZodOptional<z.ZodBoolean>;
                boolean: z.ZodOptional<z.ZodBoolean>;
                choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }, {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }>, "many">>;
            handler: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
                operations: z.ZodRecord<z.ZodString, z.ZodObject<{
                    hash: z.ZodString;
                    time: z.ZodNumber;
                    output: z.ZodOptional<z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    output?: unknown;
                    hash: string;
                    time: number;
                }, {
                    output?: unknown;
                    hash: string;
                    time: number;
                }>>;
                tasks: z.ZodRecord<z.ZodString, z.ZodObject<{
                    task: z.ZodString;
                    plugin: z.ZodString;
                    time: z.ZodNumber;
                    output: z.ZodOptional<z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    output?: unknown;
                    plugin: string;
                    task: string;
                    time: number;
                }, {
                    output?: unknown;
                    plugin: string;
                    task: string;
                    time: number;
                }>>;
            }, "strip", z.ZodTypeAny, {
                operations: Record<string, {
                    output?: unknown;
                    hash: string;
                    time: number;
                }>;
                tasks: Record<string, {
                    output?: unknown;
                    plugin: string;
                    task: string;
                    time: number;
                }>;
            }, {
                operations: Record<string, {
                    output?: unknown;
                    hash: string;
                    time: number;
                }>;
                tasks: Record<string, {
                    output?: unknown;
                    plugin: string;
                    task: string;
                    time: number;
                }>;
            }>], z.ZodUnknown>, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
                _: z.ZodArray<z.ZodString, "many">;
                projectDir: z.ZodString;
                maxConcurrency: z.ZodNumber;
                debug: z.ZodBoolean;
                disableState: z.ZodBoolean;
                logPluginRequests: z.ZodBoolean;
                fromVsCode: z.ZodBoolean;
                version: z.ZodBoolean;
                build: z.ZodBoolean;
                help: z.ZodBoolean;
                yes: z.ZodBoolean;
                plugin: z.ZodOptional<z.ZodString>;
                env: z.ZodString;
                quickstart: z.ZodString;
                setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                setVersion: z.ZodString;
            }, "quickstart">, {
                taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
                config: z.ZodObject<z.extendShape<{
                    language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
                    plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }>, "many">>;
                    contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                    artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                    network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        label: z.ZodString;
                        rpcUrl: z.ZodString;
                        protocol: z.ZodString;
                        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                            publicKey: z.ZodString;
                            publicKeyHash: z.ZodString;
                            privateKey: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }>>>;
                        faucet: z.ZodOptional<z.ZodObject<{
                            pkh: z.ZodString;
                            mnemonic: z.ZodArray<z.ZodString, "many">;
                            email: z.ZodString;
                            password: z.ZodString;
                            amount: z.ZodString;
                            activation_code: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        }, {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        }>>;
                    }, "strip", z.ZodTypeAny, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }>>>;
                    sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        label: z.ZodString;
                        rpcUrl: z.ZodString;
                        protocol: z.ZodString;
                        attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                        plugin: z.ZodOptional<z.ZodString>;
                        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                            encryptedKey: z.ZodString;
                            publicKeyHash: z.ZodString;
                            secretKey: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }>, z.ZodString]>>>;
                        tzkt: z.ZodOptional<z.ZodObject<{
                            disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                            postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                            apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                        }, "strip", z.ZodTypeAny, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }>>;
                    }, "strip", z.ZodTypeAny, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }>>>;
                    environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                        networks: z.ZodArray<z.ZodString, "many">;
                        sandboxes: z.ZodArray<z.ZodString, "many">;
                        storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                        aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
                    }, "strip", z.ZodTypeAny, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>, z.ZodString]>>;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        sourceFile: z.ZodString;
                        hash: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        sourceFile: string;
                        hash: string;
                    }, {
                        sourceFile: string;
                        hash: string;
                    }>>>;
                    metadata: z.ZodOptional<z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        projectDescription: z.ZodOptional<z.ZodString>;
                        authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        license: z.ZodOptional<z.ZodString>;
                        homepage: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    }, {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    }>>;
                }, {
                    projectDir: z.ZodString;
                    configFile: z.ZodString;
                    hash: z.ZodString;
                }>, "strip", z.ZodTypeAny, {
                    sandbox?: Record<string, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    language?: "en" | "fr" | undefined;
                    plugins?: {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }[] | undefined;
                    contractsDir?: string | undefined;
                    artifactsDir?: string | undefined;
                    network?: Record<string, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    accounts?: Record<string, string> | undefined;
                    contracts?: Record<string, {
                        sourceFile: string;
                        hash: string;
                    }> | undefined;
                    metadata?: {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    } | undefined;
                    projectDir: string;
                    environment: Record<string, string | {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>;
                    hash: string;
                    configFile: string;
                }, {
                    sandbox?: Record<string, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    language?: "en" | "fr" | undefined;
                    plugins?: {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }[] | undefined;
                    contractsDir?: string | undefined;
                    artifactsDir?: string | undefined;
                    network?: Record<string, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    accounts?: Record<string, string> | undefined;
                    contracts?: Record<string, {
                        sourceFile: string;
                        hash: string;
                    }> | undefined;
                    metadata?: {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    } | undefined;
                    projectDir: string;
                    environment: Record<string, string | {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>;
                    hash: string;
                    configFile: string;
                }>;
            }>, "passthrough", z.ZodTypeAny, {
                plugin?: string | undefined;
                _: string[];
                projectDir: string;
                maxConcurrency: number;
                debug: boolean;
                disableState: boolean;
                logPluginRequests: boolean;
                fromVsCode: boolean;
                version: boolean;
                build: boolean;
                help: boolean;
                yes: boolean;
                env: string;
                setBuild: string | number;
                setVersion: string;
                taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
                config: {
                    sandbox?: Record<string, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    language?: "en" | "fr" | undefined;
                    plugins?: {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }[] | undefined;
                    contractsDir?: string | undefined;
                    artifactsDir?: string | undefined;
                    network?: Record<string, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    accounts?: Record<string, string> | undefined;
                    contracts?: Record<string, {
                        sourceFile: string;
                        hash: string;
                    }> | undefined;
                    metadata?: {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    } | undefined;
                    projectDir: string;
                    environment: Record<string, string | {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>;
                    hash: string;
                    configFile: string;
                };
            }, {
                plugin?: string | undefined;
                _: string[];
                projectDir: string;
                maxConcurrency: number;
                debug: boolean;
                disableState: boolean;
                logPluginRequests: boolean;
                fromVsCode: boolean;
                version: boolean;
                build: boolean;
                help: boolean;
                yes: boolean;
                env: string;
                setBuild: string | number;
                setVersion: string;
                taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
                config: {
                    sandbox?: Record<string, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    language?: "en" | "fr" | undefined;
                    plugins?: {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }[] | undefined;
                    contractsDir?: string | undefined;
                    artifactsDir?: string | undefined;
                    network?: Record<string, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    accounts?: Record<string, string> | undefined;
                    contracts?: Record<string, {
                        sourceFile: string;
                        hash: string;
                    }> | undefined;
                    metadata?: {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    } | undefined;
                    projectDir: string;
                    environment: Record<string, string | {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>;
                    hash: string;
                    configFile: string;
                };
            }>], z.ZodUnknown>, z.ZodVoid>>>;
        }, "handler">, "strip", z.ZodTypeAny, {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            operation: string;
            command: string;
        }, {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            operation: string;
            command: string;
        }>, "many">>;
        templates: z.ZodOptional<z.ZodArray<z.ZodObject<z.extendShape<Omit<{
            template: z.ZodString;
            command: z.ZodString;
            description: z.ZodString;
            hidden: z.ZodOptional<z.ZodBoolean>;
            options: z.ZodOptional<z.ZodArray<z.ZodObject<{
                shortFlag: z.ZodOptional<z.ZodString>;
                flag: z.ZodString;
                description: z.ZodString;
                defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
                required: z.ZodOptional<z.ZodBoolean>;
                boolean: z.ZodOptional<z.ZodBoolean>;
                choices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }, {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }>, "many">>;
            positionals: z.ZodOptional<z.ZodArray<z.ZodObject<{
                placeholder: z.ZodString;
                description: z.ZodString;
                defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">]>>;
                required: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }, {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }>, "many">>;
            handler: z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[z.ZodObject<z.extendShape<Omit<{
                _: z.ZodArray<z.ZodString, "many">;
                projectDir: z.ZodString;
                maxConcurrency: z.ZodNumber;
                debug: z.ZodBoolean;
                disableState: z.ZodBoolean;
                logPluginRequests: z.ZodBoolean;
                fromVsCode: z.ZodBoolean;
                version: z.ZodBoolean;
                build: z.ZodBoolean;
                help: z.ZodBoolean;
                yes: z.ZodBoolean;
                plugin: z.ZodOptional<z.ZodString>;
                env: z.ZodString;
                quickstart: z.ZodString;
                setBuild: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                setVersion: z.ZodString;
            }, "quickstart">, {
                taqRun: z.ZodUnion<[z.ZodLiteral<"proxy">, z.ZodLiteral<"pluginInfo">, z.ZodLiteral<"checkRuntimeDependencies">, z.ZodLiteral<"installRuntimeDependencies">, z.ZodLiteral<"proxyTemplate">]>;
                config: z.ZodObject<z.extendShape<{
                    language: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"en">, z.ZodLiteral<"fr">]>>>;
                    plugins: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        type: z.ZodUnion<[z.ZodLiteral<"npm">, z.ZodLiteral<"binary">, z.ZodLiteral<"deno">]>;
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }>, "many">>;
                    contractsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                    artifactsDir: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                    network: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        label: z.ZodString;
                        rpcUrl: z.ZodString;
                        protocol: z.ZodString;
                        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                            publicKey: z.ZodString;
                            publicKeyHash: z.ZodString;
                            privateKey: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }>>>;
                        faucet: z.ZodOptional<z.ZodObject<{
                            pkh: z.ZodString;
                            mnemonic: z.ZodArray<z.ZodString, "many">;
                            email: z.ZodString;
                            password: z.ZodString;
                            amount: z.ZodString;
                            activation_code: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        }, {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        }>>;
                    }, "strip", z.ZodTypeAny, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }>>>;
                    sandbox: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        label: z.ZodString;
                        rpcUrl: z.ZodString;
                        protocol: z.ZodString;
                        attributes: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
                        plugin: z.ZodOptional<z.ZodString>;
                        accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                            encryptedKey: z.ZodString;
                            publicKeyHash: z.ZodString;
                            secretKey: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }>, z.ZodString]>>>;
                        tzkt: z.ZodOptional<z.ZodObject<{
                            disableAutostartWithSandbox: z.ZodOptional<z.ZodBoolean>;
                            postgresqlPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                            apiPort: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                        }, "strip", z.ZodTypeAny, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }>>;
                    }, "strip", z.ZodTypeAny, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }>>>;
                    environment: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                        networks: z.ZodArray<z.ZodString, "many">;
                        sandboxes: z.ZodArray<z.ZodString, "many">;
                        storage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                        aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
                    }, "strip", z.ZodTypeAny, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>, z.ZodString]>>;
                    accounts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    contracts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        sourceFile: z.ZodString;
                        hash: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        sourceFile: string;
                        hash: string;
                    }, {
                        sourceFile: string;
                        hash: string;
                    }>>>;
                    metadata: z.ZodOptional<z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        projectDescription: z.ZodOptional<z.ZodString>;
                        authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        license: z.ZodOptional<z.ZodString>;
                        homepage: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    }, {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    }>>;
                }, {
                    projectDir: z.ZodString;
                    configFile: z.ZodString;
                    hash: z.ZodString;
                }>, "strip", z.ZodTypeAny, {
                    sandbox?: Record<string, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    language?: "en" | "fr" | undefined;
                    plugins?: {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }[] | undefined;
                    contractsDir?: string | undefined;
                    artifactsDir?: string | undefined;
                    network?: Record<string, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    accounts?: Record<string, string> | undefined;
                    contracts?: Record<string, {
                        sourceFile: string;
                        hash: string;
                    }> | undefined;
                    metadata?: {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    } | undefined;
                    projectDir: string;
                    environment: Record<string, string | {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>;
                    hash: string;
                    configFile: string;
                }, {
                    sandbox?: Record<string, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    language?: "en" | "fr" | undefined;
                    plugins?: {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }[] | undefined;
                    contractsDir?: string | undefined;
                    artifactsDir?: string | undefined;
                    network?: Record<string, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    accounts?: Record<string, string> | undefined;
                    contracts?: Record<string, {
                        sourceFile: string;
                        hash: string;
                    }> | undefined;
                    metadata?: {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    } | undefined;
                    projectDir: string;
                    environment: Record<string, string | {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>;
                    hash: string;
                    configFile: string;
                }>;
            }>, "passthrough", z.ZodTypeAny, {
                plugin?: string | undefined;
                _: string[];
                projectDir: string;
                maxConcurrency: number;
                debug: boolean;
                disableState: boolean;
                logPluginRequests: boolean;
                fromVsCode: boolean;
                version: boolean;
                build: boolean;
                help: boolean;
                yes: boolean;
                env: string;
                setBuild: string | number;
                setVersion: string;
                taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
                config: {
                    sandbox?: Record<string, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    language?: "en" | "fr" | undefined;
                    plugins?: {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }[] | undefined;
                    contractsDir?: string | undefined;
                    artifactsDir?: string | undefined;
                    network?: Record<string, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    accounts?: Record<string, string> | undefined;
                    contracts?: Record<string, {
                        sourceFile: string;
                        hash: string;
                    }> | undefined;
                    metadata?: {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    } | undefined;
                    projectDir: string;
                    environment: Record<string, string | {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>;
                    hash: string;
                    configFile: string;
                };
            }, {
                plugin?: string | undefined;
                _: string[];
                projectDir: string;
                maxConcurrency: number;
                debug: boolean;
                disableState: boolean;
                logPluginRequests: boolean;
                fromVsCode: boolean;
                version: boolean;
                build: boolean;
                help: boolean;
                yes: boolean;
                env: string;
                setBuild: string | number;
                setVersion: string;
                taqRun: "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate";
                config: {
                    sandbox?: Record<string, {
                        plugin?: string | undefined;
                        accounts?: Record<string, string | {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }> | undefined;
                        attributes?: string | number | boolean | undefined;
                        tzkt?: {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    language?: "en" | "fr" | undefined;
                    plugins?: {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }[] | undefined;
                    contractsDir?: string | undefined;
                    artifactsDir?: string | undefined;
                    network?: Record<string, {
                        accounts?: Record<string, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }> | undefined;
                        faucet?: {
                            pkh: string;
                            mnemonic: string[];
                            email: string;
                            password: string;
                            amount: string;
                            activation_code: string;
                        } | undefined;
                        label: string;
                        rpcUrl: string;
                        protocol: string;
                    }> | undefined;
                    accounts?: Record<string, string> | undefined;
                    contracts?: Record<string, {
                        sourceFile: string;
                        hash: string;
                    }> | undefined;
                    metadata?: {
                        name?: string | undefined;
                        projectDescription?: string | undefined;
                        authors?: string[] | undefined;
                        license?: string | undefined;
                        homepage?: string | undefined;
                    } | undefined;
                    projectDir: string;
                    environment: Record<string, string | {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>;
                    hash: string;
                    configFile: string;
                };
            }>], z.ZodUnknown>, z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
                data: z.ZodOptional<z.ZodUnknown>;
                render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
            }, "strip", z.ZodTypeAny, {
                data?: unknown;
                render: "string" | "none" | "table";
            }, {
                data?: unknown;
                render?: "string" | "none" | "table" | undefined;
            }>, z.ZodVoid]>, z.ZodPromise<z.ZodUnion<[z.ZodObject<{
                data: z.ZodOptional<z.ZodUnknown>;
                render: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"table">, z.ZodLiteral<"string">]>>;
            }, "strip", z.ZodTypeAny, {
                data?: unknown;
                render: "string" | "none" | "table";
            }, {
                data?: unknown;
                render?: "string" | "none" | "table" | undefined;
            }>, z.ZodVoid]>>]>>, z.ZodPromise<z.ZodVoid>]>;
            encoding: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"none">, z.ZodLiteral<"json">, z.ZodLiteral<"application/json">]>>>;
        }, "handler">, {
            handler: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            handler: string;
            command: string;
            description: string;
            template: string;
        }, {
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            handler: string;
            command: string;
            description: string;
            template: string;
        }>, "many">>;
    }>, "strip", z.ZodTypeAny, {
        operations?: {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            operation: string;
            command: string;
        }[] | undefined;
        tasks?: {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            aliases?: string[] | undefined;
            example?: string | undefined;
            handler: string;
            command: string;
            task: string;
        }[] | undefined;
        templates?: {
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            handler: string;
            command: string;
            description: string;
            template: string;
        }[] | undefined;
        version: string;
        name: string;
        schema: string;
        alias: string;
    }, {
        operations?: {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            operation: string;
            command: string;
        }[] | undefined;
        tasks?: {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            aliases?: string[] | undefined;
            example?: string | undefined;
            handler: string;
            command: string;
            task: string;
        }[] | undefined;
        templates?: {
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            handler: string;
            command: string;
            description: string;
            template: string;
        }[] | undefined;
        version: string;
        name: string;
        schema: string;
        alias: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    build: string;
    plugins: {
        operations?: {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            operation: string;
            command: string;
        }[] | undefined;
        tasks?: {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            aliases?: string[] | undefined;
            example?: string | undefined;
            handler: string;
            command: string;
            task: string;
        }[] | undefined;
        templates?: {
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            handler: string;
            command: string;
            description: string;
            template: string;
        }[] | undefined;
        version: string;
        name: string;
        schema: string;
        alias: string;
    }[];
    operations: Record<string, {
        type: "npm" | "binary" | "deno";
        name: string;
    } & {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }>;
    tasks: Record<string, {
        type: "npm" | "binary" | "deno";
        name: string;
    } & {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }>;
    templates: Record<string, {
        type: "npm" | "binary" | "deno";
        name: string;
    } & {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string;
        command: string;
        description: string;
        template: string;
    }>;
    configHash: string;
}, {
    build: string;
    plugins: {
        operations?: {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            operation: string;
            command: string;
        }[] | undefined;
        tasks?: {
            description?: string | undefined;
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            aliases?: string[] | undefined;
            example?: string | undefined;
            handler: string;
            command: string;
            task: string;
        }[] | undefined;
        templates?: {
            positionals?: {
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                defaultValue?: string | number | boolean | undefined;
                description: string;
                placeholder: string;
            }[] | undefined;
            options?: {
                boolean?: boolean | undefined;
                required?: boolean | undefined;
                type?: "string" | "number" | "boolean" | undefined;
                shortFlag?: string | undefined;
                defaultValue?: string | number | boolean | undefined;
                choices?: string[] | undefined;
                description: string;
                flag: string;
            }[] | undefined;
            hidden?: boolean | undefined;
            encoding?: "none" | "json" | "application/json" | undefined;
            handler: string;
            command: string;
            description: string;
            template: string;
        }[] | undefined;
        version: string;
        name: string;
        schema: string;
        alias: string;
    }[];
    operations: Record<string, {
        type: "npm" | "binary" | "deno";
        name: string;
    } & {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        operation: string;
        command: string;
    }>;
    tasks: Record<string, {
        type: "npm" | "binary" | "deno";
        name: string;
    } & {
        description?: string | undefined;
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        aliases?: string[] | undefined;
        example?: string | undefined;
        handler: string;
        command: string;
        task: string;
    }>;
    templates: Record<string, {
        type: "npm" | "binary" | "deno";
        name: string;
    } & {
        positionals?: {
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            defaultValue?: string | number | boolean | undefined;
            description: string;
            placeholder: string;
        }[] | undefined;
        options?: {
            boolean?: boolean | undefined;
            required?: boolean | undefined;
            type?: "string" | "number" | "boolean" | undefined;
            shortFlag?: string | undefined;
            defaultValue?: string | number | boolean | undefined;
            choices?: string[] | undefined;
            description: string;
            flag: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        encoding?: "none" | "json" | "application/json" | undefined;
        handler: string;
        command: string;
        description: string;
        template: string;
    }>;
    configHash: string;
}>;
//# sourceMappingURL=types-zod.d.ts.map