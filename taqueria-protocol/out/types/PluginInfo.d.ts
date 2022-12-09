import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PluginInfo } from '@taqueria/protocol/types';
import { PluginInfo as PluginInfoStrict } from '@taqueria/protocol/out/types-strict';
export type { PluginInfoStrict as PluginInfo };
export declare const from: (input: unknown) => PluginInfoStrict;
export declare const create: (input: PluginInfo) => PluginInfoStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PluginInfoStrict>;
export declare const make: (input: Omit<PluginInfoStrict, '__type'>) => FutureInstance<TaqError, PluginInfoStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<import("zod").extendShape<{
        name: import("zod").ZodString;
        version: import("zod").ZodString;
        schema: import("zod").ZodString;
        alias: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>;
        tasks: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            task: import("zod").ZodString;
            command: import("zod").ZodString;
            aliases: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>, "many">>;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            example: import("zod").ZodOptional<import("zod").ZodString>;
            hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
            encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
            handler: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodString]>;
            options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
                flag: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
                boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
                choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
            }, "strip", import("zod").ZodTypeAny, {
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
            positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                placeholder: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        operations: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<Omit<{
            operation: import("zod").ZodString;
            command: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                placeholder: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
            options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
                flag: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
                boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
                choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
            }, "strip", import("zod").ZodTypeAny, {
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
            handler: import("zod").ZodOptional<import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<{
                operations: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    hash: import("zod").ZodString;
                    time: import("zod").ZodNumber;
                    output: import("zod").ZodOptional<import("zod").ZodUnknown>;
                }, "strip", import("zod").ZodTypeAny, {
                    output?: unknown;
                    hash: string;
                    time: number;
                }, {
                    output?: unknown;
                    hash: string;
                    time: number;
                }>>;
                tasks: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    task: import("zod").ZodString;
                    plugin: import("zod").ZodString;
                    time: import("zod").ZodNumber;
                    output: import("zod").ZodOptional<import("zod").ZodUnknown>;
                }, "strip", import("zod").ZodTypeAny, {
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
            }, "strip", import("zod").ZodTypeAny, {
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
            }>], import("zod").ZodUnknown>, import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<import("zod").extendShape<Omit<{
                _: import("zod").ZodArray<import("zod").ZodString, "many">;
                projectDir: import("zod").ZodString;
                maxConcurrency: import("zod").ZodNumber;
                debug: import("zod").ZodBoolean;
                disableState: import("zod").ZodBoolean;
                logPluginRequests: import("zod").ZodBoolean;
                fromVsCode: import("zod").ZodBoolean;
                version: import("zod").ZodBoolean;
                build: import("zod").ZodBoolean;
                help: import("zod").ZodBoolean;
                yes: import("zod").ZodBoolean;
                plugin: import("zod").ZodOptional<import("zod").ZodString>;
                env: import("zod").ZodString;
                quickstart: import("zod").ZodString;
                setBuild: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
                setVersion: import("zod").ZodString;
            }, "quickstart">, {
                taqRun: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
                config: import("zod").ZodObject<import("zod").extendShape<{
                    language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"en">, import("zod").ZodLiteral<"fr">]>>>;
                    plugins: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                        type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
                        name: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }>, "many">>;
                    contractsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                    artifactsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                    network: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        rpcUrl: import("zod").ZodString;
                        protocol: import("zod").ZodString;
                        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                            publicKey: import("zod").ZodString;
                            publicKeyHash: import("zod").ZodString;
                            privateKey: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }>>>;
                        faucet: import("zod").ZodOptional<import("zod").ZodObject<{
                            pkh: import("zod").ZodString;
                            mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
                            email: import("zod").ZodString;
                            password: import("zod").ZodString;
                            amount: import("zod").ZodString;
                            activation_code: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
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
                    }, "strip", import("zod").ZodTypeAny, {
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
                    sandbox: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        rpcUrl: import("zod").ZodString;
                        protocol: import("zod").ZodString;
                        attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                        plugin: import("zod").ZodOptional<import("zod").ZodString>;
                        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                            encryptedKey: import("zod").ZodString;
                            publicKeyHash: import("zod").ZodString;
                            secretKey: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }>, import("zod").ZodString]>>>;
                        tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
                            disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
                            postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                            apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                        }, "strip", import("zod").ZodTypeAny, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }>>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    environment: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                        networks: import("zod").ZodArray<import("zod").ZodString, "many">;
                        sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
                        storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                        aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
                    }, "strip", import("zod").ZodTypeAny, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>, import("zod").ZodString]>>;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                    contracts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        sourceFile: import("zod").ZodString;
                        hash: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        sourceFile: string;
                        hash: string;
                    }, {
                        sourceFile: string;
                        hash: string;
                    }>>>;
                    metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                        name: import("zod").ZodOptional<import("zod").ZodString>;
                        projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
                        authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                        license: import("zod").ZodOptional<import("zod").ZodString>;
                        homepage: import("zod").ZodOptional<import("zod").ZodString>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    projectDir: import("zod").ZodString;
                    configFile: import("zod").ZodString;
                    hash: import("zod").ZodString;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "passthrough", import("zod").ZodTypeAny, {
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
            }>], import("zod").ZodUnknown>, import("zod").ZodVoid>>>;
        }, "handler">, "strip", import("zod").ZodTypeAny, {
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
        templates: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<import("zod").extendShape<Omit<{
            template: import("zod").ZodString;
            command: import("zod").ZodString;
            description: import("zod").ZodString;
            hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
            options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
                flag: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
                boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
                choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
            }, "strip", import("zod").ZodTypeAny, {
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
            positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                placeholder: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
            handler: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<import("zod").extendShape<Omit<{
                _: import("zod").ZodArray<import("zod").ZodString, "many">;
                projectDir: import("zod").ZodString;
                maxConcurrency: import("zod").ZodNumber;
                debug: import("zod").ZodBoolean;
                disableState: import("zod").ZodBoolean;
                logPluginRequests: import("zod").ZodBoolean;
                fromVsCode: import("zod").ZodBoolean;
                version: import("zod").ZodBoolean;
                build: import("zod").ZodBoolean;
                help: import("zod").ZodBoolean;
                yes: import("zod").ZodBoolean;
                plugin: import("zod").ZodOptional<import("zod").ZodString>;
                env: import("zod").ZodString;
                quickstart: import("zod").ZodString;
                setBuild: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
                setVersion: import("zod").ZodString;
            }, "quickstart">, {
                taqRun: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
                config: import("zod").ZodObject<import("zod").extendShape<{
                    language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"en">, import("zod").ZodLiteral<"fr">]>>>;
                    plugins: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                        type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
                        name: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }>, "many">>;
                    contractsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                    artifactsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                    network: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        rpcUrl: import("zod").ZodString;
                        protocol: import("zod").ZodString;
                        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                            publicKey: import("zod").ZodString;
                            publicKeyHash: import("zod").ZodString;
                            privateKey: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }>>>;
                        faucet: import("zod").ZodOptional<import("zod").ZodObject<{
                            pkh: import("zod").ZodString;
                            mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
                            email: import("zod").ZodString;
                            password: import("zod").ZodString;
                            amount: import("zod").ZodString;
                            activation_code: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
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
                    }, "strip", import("zod").ZodTypeAny, {
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
                    sandbox: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        rpcUrl: import("zod").ZodString;
                        protocol: import("zod").ZodString;
                        attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                        plugin: import("zod").ZodOptional<import("zod").ZodString>;
                        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                            encryptedKey: import("zod").ZodString;
                            publicKeyHash: import("zod").ZodString;
                            secretKey: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }>, import("zod").ZodString]>>>;
                        tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
                            disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
                            postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                            apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                        }, "strip", import("zod").ZodTypeAny, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }>>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    environment: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                        networks: import("zod").ZodArray<import("zod").ZodString, "many">;
                        sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
                        storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                        aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
                    }, "strip", import("zod").ZodTypeAny, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>, import("zod").ZodString]>>;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                    contracts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        sourceFile: import("zod").ZodString;
                        hash: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        sourceFile: string;
                        hash: string;
                    }, {
                        sourceFile: string;
                        hash: string;
                    }>>>;
                    metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                        name: import("zod").ZodOptional<import("zod").ZodString>;
                        projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
                        authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                        license: import("zod").ZodOptional<import("zod").ZodString>;
                        homepage: import("zod").ZodOptional<import("zod").ZodString>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    projectDir: import("zod").ZodString;
                    configFile: import("zod").ZodString;
                    hash: import("zod").ZodString;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "passthrough", import("zod").ZodTypeAny, {
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
            }>], import("zod").ZodUnknown>, import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodObject<{
                data: import("zod").ZodOptional<import("zod").ZodUnknown>;
                render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
            }, "strip", import("zod").ZodTypeAny, {
                data?: unknown;
                render: "string" | "none" | "table";
            }, {
                data?: unknown;
                render?: "string" | "none" | "table" | undefined;
            }>, import("zod").ZodVoid]>, import("zod").ZodPromise<import("zod").ZodUnion<[import("zod").ZodObject<{
                data: import("zod").ZodOptional<import("zod").ZodUnknown>;
                render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
            }, "strip", import("zod").ZodTypeAny, {
                data?: unknown;
                render: "string" | "none" | "table";
            }, {
                data?: unknown;
                render?: "string" | "none" | "table" | undefined;
            }>, import("zod").ZodVoid]>>]>>, import("zod").ZodPromise<import("zod").ZodVoid>]>;
            encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
        }, "handler">, {
            handler: import("zod").ZodString;
        }>, "strip", import("zod").ZodTypeAny, {
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
    }>, "strip", import("zod").ZodTypeAny, {
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
    schema: import("zod").ZodEffects<import("zod").ZodObject<import("zod").extendShape<{
        name: import("zod").ZodString;
        version: import("zod").ZodString;
        schema: import("zod").ZodString;
        alias: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>;
        tasks: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            task: import("zod").ZodString;
            command: import("zod").ZodString;
            aliases: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>, "many">>;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            example: import("zod").ZodOptional<import("zod").ZodString>;
            hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
            encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
            handler: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodString]>;
            options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
                flag: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
                boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
                choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
            }, "strip", import("zod").ZodTypeAny, {
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
            positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                placeholder: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        operations: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<Omit<{
            operation: import("zod").ZodString;
            command: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                placeholder: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
            options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
                flag: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
                boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
                choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
            }, "strip", import("zod").ZodTypeAny, {
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
            handler: import("zod").ZodOptional<import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<{
                operations: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    hash: import("zod").ZodString;
                    time: import("zod").ZodNumber;
                    output: import("zod").ZodOptional<import("zod").ZodUnknown>;
                }, "strip", import("zod").ZodTypeAny, {
                    output?: unknown;
                    hash: string;
                    time: number;
                }, {
                    output?: unknown;
                    hash: string;
                    time: number;
                }>>;
                tasks: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    task: import("zod").ZodString;
                    plugin: import("zod").ZodString;
                    time: import("zod").ZodNumber;
                    output: import("zod").ZodOptional<import("zod").ZodUnknown>;
                }, "strip", import("zod").ZodTypeAny, {
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
            }, "strip", import("zod").ZodTypeAny, {
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
            }>], import("zod").ZodUnknown>, import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<import("zod").extendShape<Omit<{
                _: import("zod").ZodArray<import("zod").ZodString, "many">;
                projectDir: import("zod").ZodString;
                maxConcurrency: import("zod").ZodNumber;
                debug: import("zod").ZodBoolean;
                disableState: import("zod").ZodBoolean;
                logPluginRequests: import("zod").ZodBoolean;
                fromVsCode: import("zod").ZodBoolean;
                version: import("zod").ZodBoolean;
                build: import("zod").ZodBoolean;
                help: import("zod").ZodBoolean;
                yes: import("zod").ZodBoolean;
                plugin: import("zod").ZodOptional<import("zod").ZodString>;
                env: import("zod").ZodString;
                quickstart: import("zod").ZodString;
                setBuild: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
                setVersion: import("zod").ZodString;
            }, "quickstart">, {
                taqRun: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
                config: import("zod").ZodObject<import("zod").extendShape<{
                    language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"en">, import("zod").ZodLiteral<"fr">]>>>;
                    plugins: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                        type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
                        name: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }>, "many">>;
                    contractsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                    artifactsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                    network: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        rpcUrl: import("zod").ZodString;
                        protocol: import("zod").ZodString;
                        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                            publicKey: import("zod").ZodString;
                            publicKeyHash: import("zod").ZodString;
                            privateKey: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }>>>;
                        faucet: import("zod").ZodOptional<import("zod").ZodObject<{
                            pkh: import("zod").ZodString;
                            mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
                            email: import("zod").ZodString;
                            password: import("zod").ZodString;
                            amount: import("zod").ZodString;
                            activation_code: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
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
                    }, "strip", import("zod").ZodTypeAny, {
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
                    sandbox: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        rpcUrl: import("zod").ZodString;
                        protocol: import("zod").ZodString;
                        attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                        plugin: import("zod").ZodOptional<import("zod").ZodString>;
                        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                            encryptedKey: import("zod").ZodString;
                            publicKeyHash: import("zod").ZodString;
                            secretKey: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }>, import("zod").ZodString]>>>;
                        tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
                            disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
                            postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                            apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                        }, "strip", import("zod").ZodTypeAny, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }>>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    environment: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                        networks: import("zod").ZodArray<import("zod").ZodString, "many">;
                        sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
                        storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                        aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
                    }, "strip", import("zod").ZodTypeAny, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>, import("zod").ZodString]>>;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                    contracts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        sourceFile: import("zod").ZodString;
                        hash: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        sourceFile: string;
                        hash: string;
                    }, {
                        sourceFile: string;
                        hash: string;
                    }>>>;
                    metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                        name: import("zod").ZodOptional<import("zod").ZodString>;
                        projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
                        authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                        license: import("zod").ZodOptional<import("zod").ZodString>;
                        homepage: import("zod").ZodOptional<import("zod").ZodString>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    projectDir: import("zod").ZodString;
                    configFile: import("zod").ZodString;
                    hash: import("zod").ZodString;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "passthrough", import("zod").ZodTypeAny, {
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
            }>], import("zod").ZodUnknown>, import("zod").ZodVoid>>>;
        }, "handler">, "strip", import("zod").ZodTypeAny, {
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
        templates: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<import("zod").extendShape<Omit<{
            template: import("zod").ZodString;
            command: import("zod").ZodString;
            description: import("zod").ZodString;
            hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
            options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
                flag: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
                boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
                choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
            }, "strip", import("zod").ZodTypeAny, {
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
            positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                placeholder: import("zod").ZodString;
                description: import("zod").ZodString;
                defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
                required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
            handler: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<import("zod").extendShape<Omit<{
                _: import("zod").ZodArray<import("zod").ZodString, "many">;
                projectDir: import("zod").ZodString;
                maxConcurrency: import("zod").ZodNumber;
                debug: import("zod").ZodBoolean;
                disableState: import("zod").ZodBoolean;
                logPluginRequests: import("zod").ZodBoolean;
                fromVsCode: import("zod").ZodBoolean;
                version: import("zod").ZodBoolean;
                build: import("zod").ZodBoolean;
                help: import("zod").ZodBoolean;
                yes: import("zod").ZodBoolean;
                plugin: import("zod").ZodOptional<import("zod").ZodString>;
                env: import("zod").ZodString;
                quickstart: import("zod").ZodString;
                setBuild: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
                setVersion: import("zod").ZodString;
            }, "quickstart">, {
                taqRun: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
                config: import("zod").ZodObject<import("zod").extendShape<{
                    language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"en">, import("zod").ZodLiteral<"fr">]>>>;
                    plugins: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                        type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
                        name: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }, {
                        type: "npm" | "binary" | "deno";
                        name: string;
                    }>, "many">>;
                    contractsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                    artifactsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                    network: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        rpcUrl: import("zod").ZodString;
                        protocol: import("zod").ZodString;
                        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                            publicKey: import("zod").ZodString;
                            publicKeyHash: import("zod").ZodString;
                            privateKey: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }, {
                            publicKey: string;
                            publicKeyHash: string;
                            privateKey: string;
                        }>>>;
                        faucet: import("zod").ZodOptional<import("zod").ZodObject<{
                            pkh: import("zod").ZodString;
                            mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
                            email: import("zod").ZodString;
                            password: import("zod").ZodString;
                            amount: import("zod").ZodString;
                            activation_code: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
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
                    }, "strip", import("zod").ZodTypeAny, {
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
                    sandbox: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        rpcUrl: import("zod").ZodString;
                        protocol: import("zod").ZodString;
                        attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                        plugin: import("zod").ZodOptional<import("zod").ZodString>;
                        accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                            encryptedKey: import("zod").ZodString;
                            publicKeyHash: import("zod").ZodString;
                            secretKey: import("zod").ZodString;
                        }, "strip", import("zod").ZodTypeAny, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }, {
                            publicKeyHash: string;
                            encryptedKey: string;
                            secretKey: string;
                        }>, import("zod").ZodString]>>>;
                        tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
                            disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
                            postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                            apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                        }, "strip", import("zod").ZodTypeAny, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }, {
                            disableAutostartWithSandbox?: boolean | undefined;
                            postgresqlPort?: number | undefined;
                            apiPort?: number | undefined;
                        }>>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    environment: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                        networks: import("zod").ZodArray<import("zod").ZodString, "many">;
                        sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
                        storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                        aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
                    }, "strip", import("zod").ZodTypeAny, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }, {
                        storage?: Record<string, string> | undefined;
                        aliases?: Record<string, Record<string, string>> | undefined;
                        networks: string[];
                        sandboxes: string[];
                    }>, import("zod").ZodString]>>;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                    contracts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        sourceFile: import("zod").ZodString;
                        hash: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        sourceFile: string;
                        hash: string;
                    }, {
                        sourceFile: string;
                        hash: string;
                    }>>>;
                    metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                        name: import("zod").ZodOptional<import("zod").ZodString>;
                        projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
                        authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                        license: import("zod").ZodOptional<import("zod").ZodString>;
                        homepage: import("zod").ZodOptional<import("zod").ZodString>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    projectDir: import("zod").ZodString;
                    configFile: import("zod").ZodString;
                    hash: import("zod").ZodString;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "passthrough", import("zod").ZodTypeAny, {
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
            }>], import("zod").ZodUnknown>, import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodObject<{
                data: import("zod").ZodOptional<import("zod").ZodUnknown>;
                render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
            }, "strip", import("zod").ZodTypeAny, {
                data?: unknown;
                render: "string" | "none" | "table";
            }, {
                data?: unknown;
                render?: "string" | "none" | "table" | undefined;
            }>, import("zod").ZodVoid]>, import("zod").ZodPromise<import("zod").ZodUnion<[import("zod").ZodObject<{
                data: import("zod").ZodOptional<import("zod").ZodUnknown>;
                render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
            }, "strip", import("zod").ZodTypeAny, {
                data?: unknown;
                render: "string" | "none" | "table";
            }, {
                data?: unknown;
                render?: "string" | "none" | "table" | undefined;
            }>, import("zod").ZodVoid]>>]>>, import("zod").ZodPromise<import("zod").ZodVoid>]>;
            encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
        }, "handler">, {
            handler: import("zod").ZodString;
        }>, "strip", import("zod").ZodTypeAny, {
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
    }>, "strip", import("zod").ZodTypeAny, {
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
    }>, PluginInfoStrict, {
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
};
export declare const rawSchema: import("zod").ZodObject<import("zod").extendShape<{
    name: import("zod").ZodString;
    version: import("zod").ZodString;
    schema: import("zod").ZodString;
    alias: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>;
    tasks: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
        task: import("zod").ZodString;
        command: import("zod").ZodString;
        aliases: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>, "many">>;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        example: import("zod").ZodOptional<import("zod").ZodString>;
        hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
        encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
        handler: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodString]>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
            flag: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
            choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
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
        positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            placeholder: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    operations: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<Omit<{
        operation: import("zod").ZodString;
        command: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            placeholder: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
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
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
            flag: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
            choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
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
        handler: import("zod").ZodOptional<import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<{
            operations: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                hash: import("zod").ZodString;
                time: import("zod").ZodNumber;
                output: import("zod").ZodOptional<import("zod").ZodUnknown>;
            }, "strip", import("zod").ZodTypeAny, {
                output?: unknown;
                hash: string;
                time: number;
            }, {
                output?: unknown;
                hash: string;
                time: number;
            }>>;
            tasks: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                task: import("zod").ZodString;
                plugin: import("zod").ZodString;
                time: import("zod").ZodNumber;
                output: import("zod").ZodOptional<import("zod").ZodUnknown>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        }>], import("zod").ZodUnknown>, import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<import("zod").extendShape<Omit<{
            _: import("zod").ZodArray<import("zod").ZodString, "many">;
            projectDir: import("zod").ZodString;
            maxConcurrency: import("zod").ZodNumber;
            debug: import("zod").ZodBoolean;
            disableState: import("zod").ZodBoolean;
            logPluginRequests: import("zod").ZodBoolean;
            fromVsCode: import("zod").ZodBoolean;
            version: import("zod").ZodBoolean;
            build: import("zod").ZodBoolean;
            help: import("zod").ZodBoolean;
            yes: import("zod").ZodBoolean;
            plugin: import("zod").ZodOptional<import("zod").ZodString>;
            env: import("zod").ZodString;
            quickstart: import("zod").ZodString;
            setBuild: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
            setVersion: import("zod").ZodString;
        }, "quickstart">, {
            taqRun: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
            config: import("zod").ZodObject<import("zod").extendShape<{
                language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"en">, import("zod").ZodLiteral<"fr">]>>>;
                plugins: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                    type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
                    name: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }>, "many">>;
                contractsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                artifactsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                network: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    label: import("zod").ZodString;
                    rpcUrl: import("zod").ZodString;
                    protocol: import("zod").ZodString;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        publicKey: import("zod").ZodString;
                        publicKeyHash: import("zod").ZodString;
                        privateKey: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }>>>;
                    faucet: import("zod").ZodOptional<import("zod").ZodObject<{
                        pkh: import("zod").ZodString;
                        mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
                        email: import("zod").ZodString;
                        password: import("zod").ZodString;
                        amount: import("zod").ZodString;
                        activation_code: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
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
                }, "strip", import("zod").ZodTypeAny, {
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
                sandbox: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    label: import("zod").ZodString;
                    rpcUrl: import("zod").ZodString;
                    protocol: import("zod").ZodString;
                    attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                    plugin: import("zod").ZodOptional<import("zod").ZodString>;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                        encryptedKey: import("zod").ZodString;
                        publicKeyHash: import("zod").ZodString;
                        secretKey: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }>, import("zod").ZodString]>>>;
                    tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
                        disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
                        postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                        apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                    }, "strip", import("zod").ZodTypeAny, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }>>;
                }, "strip", import("zod").ZodTypeAny, {
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
                environment: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                    networks: import("zod").ZodArray<import("zod").ZodString, "many">;
                    sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
                    storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                    aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
                }, "strip", import("zod").ZodTypeAny, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>, import("zod").ZodString]>>;
                accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                contracts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    sourceFile: import("zod").ZodString;
                    hash: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    sourceFile: string;
                    hash: string;
                }, {
                    sourceFile: string;
                    hash: string;
                }>>>;
                metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                    name: import("zod").ZodOptional<import("zod").ZodString>;
                    projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
                    authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    license: import("zod").ZodOptional<import("zod").ZodString>;
                    homepage: import("zod").ZodOptional<import("zod").ZodString>;
                }, "strip", import("zod").ZodTypeAny, {
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
                projectDir: import("zod").ZodString;
                configFile: import("zod").ZodString;
                hash: import("zod").ZodString;
            }>, "strip", import("zod").ZodTypeAny, {
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
        }>, "passthrough", import("zod").ZodTypeAny, {
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
        }>], import("zod").ZodUnknown>, import("zod").ZodVoid>>>;
    }, "handler">, "strip", import("zod").ZodTypeAny, {
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
    templates: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<import("zod").extendShape<Omit<{
        template: import("zod").ZodString;
        command: import("zod").ZodString;
        description: import("zod").ZodString;
        hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
            flag: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
            choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
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
        positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            placeholder: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
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
        handler: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<import("zod").extendShape<Omit<{
            _: import("zod").ZodArray<import("zod").ZodString, "many">;
            projectDir: import("zod").ZodString;
            maxConcurrency: import("zod").ZodNumber;
            debug: import("zod").ZodBoolean;
            disableState: import("zod").ZodBoolean;
            logPluginRequests: import("zod").ZodBoolean;
            fromVsCode: import("zod").ZodBoolean;
            version: import("zod").ZodBoolean;
            build: import("zod").ZodBoolean;
            help: import("zod").ZodBoolean;
            yes: import("zod").ZodBoolean;
            plugin: import("zod").ZodOptional<import("zod").ZodString>;
            env: import("zod").ZodString;
            quickstart: import("zod").ZodString;
            setBuild: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
            setVersion: import("zod").ZodString;
        }, "quickstart">, {
            taqRun: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
            config: import("zod").ZodObject<import("zod").extendShape<{
                language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"en">, import("zod").ZodLiteral<"fr">]>>>;
                plugins: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                    type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
                    name: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }>, "many">>;
                contractsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                artifactsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                network: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    label: import("zod").ZodString;
                    rpcUrl: import("zod").ZodString;
                    protocol: import("zod").ZodString;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        publicKey: import("zod").ZodString;
                        publicKeyHash: import("zod").ZodString;
                        privateKey: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }>>>;
                    faucet: import("zod").ZodOptional<import("zod").ZodObject<{
                        pkh: import("zod").ZodString;
                        mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
                        email: import("zod").ZodString;
                        password: import("zod").ZodString;
                        amount: import("zod").ZodString;
                        activation_code: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
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
                }, "strip", import("zod").ZodTypeAny, {
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
                sandbox: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    label: import("zod").ZodString;
                    rpcUrl: import("zod").ZodString;
                    protocol: import("zod").ZodString;
                    attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                    plugin: import("zod").ZodOptional<import("zod").ZodString>;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                        encryptedKey: import("zod").ZodString;
                        publicKeyHash: import("zod").ZodString;
                        secretKey: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }>, import("zod").ZodString]>>>;
                    tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
                        disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
                        postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                        apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                    }, "strip", import("zod").ZodTypeAny, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }>>;
                }, "strip", import("zod").ZodTypeAny, {
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
                environment: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                    networks: import("zod").ZodArray<import("zod").ZodString, "many">;
                    sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
                    storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                    aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
                }, "strip", import("zod").ZodTypeAny, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>, import("zod").ZodString]>>;
                accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                contracts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    sourceFile: import("zod").ZodString;
                    hash: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    sourceFile: string;
                    hash: string;
                }, {
                    sourceFile: string;
                    hash: string;
                }>>>;
                metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                    name: import("zod").ZodOptional<import("zod").ZodString>;
                    projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
                    authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    license: import("zod").ZodOptional<import("zod").ZodString>;
                    homepage: import("zod").ZodOptional<import("zod").ZodString>;
                }, "strip", import("zod").ZodTypeAny, {
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
                projectDir: import("zod").ZodString;
                configFile: import("zod").ZodString;
                hash: import("zod").ZodString;
            }>, "strip", import("zod").ZodTypeAny, {
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
        }>, "passthrough", import("zod").ZodTypeAny, {
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
        }>], import("zod").ZodUnknown>, import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodObject<{
            data: import("zod").ZodOptional<import("zod").ZodUnknown>;
            render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
        }, "strip", import("zod").ZodTypeAny, {
            data?: unknown;
            render: "string" | "none" | "table";
        }, {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>, import("zod").ZodVoid]>, import("zod").ZodPromise<import("zod").ZodUnion<[import("zod").ZodObject<{
            data: import("zod").ZodOptional<import("zod").ZodUnknown>;
            render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
        }, "strip", import("zod").ZodTypeAny, {
            data?: unknown;
            render: "string" | "none" | "table";
        }, {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>, import("zod").ZodVoid]>>]>>, import("zod").ZodPromise<import("zod").ZodVoid>]>;
        encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
    }, "handler">, {
        handler: import("zod").ZodString;
    }>, "strip", import("zod").ZodTypeAny, {
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
}>, "strip", import("zod").ZodTypeAny, {
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
export declare const internalSchema: import("zod").ZodObject<import("zod").extendShape<{
    name: import("zod").ZodString;
    version: import("zod").ZodString;
    schema: import("zod").ZodString;
    alias: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>;
    tasks: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
        task: import("zod").ZodString;
        command: import("zod").ZodString;
        aliases: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodString]>, "many">>;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        example: import("zod").ZodOptional<import("zod").ZodString>;
        hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
        encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
        handler: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodString]>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
            flag: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
            choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
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
        positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            placeholder: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    operations: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<Omit<{
        operation: import("zod").ZodString;
        command: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            placeholder: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
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
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
            flag: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
            choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
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
        handler: import("zod").ZodOptional<import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<{
            operations: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                hash: import("zod").ZodString;
                time: import("zod").ZodNumber;
                output: import("zod").ZodOptional<import("zod").ZodUnknown>;
            }, "strip", import("zod").ZodTypeAny, {
                output?: unknown;
                hash: string;
                time: number;
            }, {
                output?: unknown;
                hash: string;
                time: number;
            }>>;
            tasks: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                task: import("zod").ZodString;
                plugin: import("zod").ZodString;
                time: import("zod").ZodNumber;
                output: import("zod").ZodOptional<import("zod").ZodUnknown>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        }>], import("zod").ZodUnknown>, import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<import("zod").extendShape<Omit<{
            _: import("zod").ZodArray<import("zod").ZodString, "many">;
            projectDir: import("zod").ZodString;
            maxConcurrency: import("zod").ZodNumber;
            debug: import("zod").ZodBoolean;
            disableState: import("zod").ZodBoolean;
            logPluginRequests: import("zod").ZodBoolean;
            fromVsCode: import("zod").ZodBoolean;
            version: import("zod").ZodBoolean;
            build: import("zod").ZodBoolean;
            help: import("zod").ZodBoolean;
            yes: import("zod").ZodBoolean;
            plugin: import("zod").ZodOptional<import("zod").ZodString>;
            env: import("zod").ZodString;
            quickstart: import("zod").ZodString;
            setBuild: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
            setVersion: import("zod").ZodString;
        }, "quickstart">, {
            taqRun: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
            config: import("zod").ZodObject<import("zod").extendShape<{
                language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"en">, import("zod").ZodLiteral<"fr">]>>>;
                plugins: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                    type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
                    name: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }>, "many">>;
                contractsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                artifactsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                network: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    label: import("zod").ZodString;
                    rpcUrl: import("zod").ZodString;
                    protocol: import("zod").ZodString;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        publicKey: import("zod").ZodString;
                        publicKeyHash: import("zod").ZodString;
                        privateKey: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }>>>;
                    faucet: import("zod").ZodOptional<import("zod").ZodObject<{
                        pkh: import("zod").ZodString;
                        mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
                        email: import("zod").ZodString;
                        password: import("zod").ZodString;
                        amount: import("zod").ZodString;
                        activation_code: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
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
                }, "strip", import("zod").ZodTypeAny, {
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
                sandbox: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    label: import("zod").ZodString;
                    rpcUrl: import("zod").ZodString;
                    protocol: import("zod").ZodString;
                    attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                    plugin: import("zod").ZodOptional<import("zod").ZodString>;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                        encryptedKey: import("zod").ZodString;
                        publicKeyHash: import("zod").ZodString;
                        secretKey: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }>, import("zod").ZodString]>>>;
                    tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
                        disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
                        postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                        apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                    }, "strip", import("zod").ZodTypeAny, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }>>;
                }, "strip", import("zod").ZodTypeAny, {
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
                environment: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                    networks: import("zod").ZodArray<import("zod").ZodString, "many">;
                    sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
                    storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                    aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
                }, "strip", import("zod").ZodTypeAny, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>, import("zod").ZodString]>>;
                accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                contracts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    sourceFile: import("zod").ZodString;
                    hash: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    sourceFile: string;
                    hash: string;
                }, {
                    sourceFile: string;
                    hash: string;
                }>>>;
                metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                    name: import("zod").ZodOptional<import("zod").ZodString>;
                    projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
                    authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    license: import("zod").ZodOptional<import("zod").ZodString>;
                    homepage: import("zod").ZodOptional<import("zod").ZodString>;
                }, "strip", import("zod").ZodTypeAny, {
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
                projectDir: import("zod").ZodString;
                configFile: import("zod").ZodString;
                hash: import("zod").ZodString;
            }>, "strip", import("zod").ZodTypeAny, {
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
        }>, "passthrough", import("zod").ZodTypeAny, {
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
        }>], import("zod").ZodUnknown>, import("zod").ZodVoid>>>;
    }, "handler">, "strip", import("zod").ZodTypeAny, {
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
    templates: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<import("zod").extendShape<Omit<{
        template: import("zod").ZodString;
        command: import("zod").ZodString;
        description: import("zod").ZodString;
        hidden: import("zod").ZodOptional<import("zod").ZodBoolean>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            shortFlag: import("zod").ZodOptional<import("zod").ZodString>;
            flag: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            boolean: import("zod").ZodOptional<import("zod").ZodBoolean>;
            choices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
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
        positionals: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            placeholder: import("zod").ZodString;
            description: import("zod").ZodString;
            defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
            type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"string">, import("zod").ZodLiteral<"number">, import("zod").ZodLiteral<"boolean">]>>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
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
        handler: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<import("zod").extendShape<Omit<{
            _: import("zod").ZodArray<import("zod").ZodString, "many">;
            projectDir: import("zod").ZodString;
            maxConcurrency: import("zod").ZodNumber;
            debug: import("zod").ZodBoolean;
            disableState: import("zod").ZodBoolean;
            logPluginRequests: import("zod").ZodBoolean;
            fromVsCode: import("zod").ZodBoolean;
            version: import("zod").ZodBoolean;
            build: import("zod").ZodBoolean;
            help: import("zod").ZodBoolean;
            yes: import("zod").ZodBoolean;
            plugin: import("zod").ZodOptional<import("zod").ZodString>;
            env: import("zod").ZodString;
            quickstart: import("zod").ZodString;
            setBuild: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
            setVersion: import("zod").ZodString;
        }, "quickstart">, {
            taqRun: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
            config: import("zod").ZodObject<import("zod").extendShape<{
                language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"en">, import("zod").ZodLiteral<"fr">]>>>;
                plugins: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                    type: import("zod").ZodUnion<[import("zod").ZodLiteral<"npm">, import("zod").ZodLiteral<"binary">, import("zod").ZodLiteral<"deno">]>;
                    name: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }, {
                    type: "npm" | "binary" | "deno";
                    name: string;
                }>, "many">>;
                contractsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                artifactsDir: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
                network: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    label: import("zod").ZodString;
                    rpcUrl: import("zod").ZodString;
                    protocol: import("zod").ZodString;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                        publicKey: import("zod").ZodString;
                        publicKeyHash: import("zod").ZodString;
                        privateKey: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }, {
                        publicKey: string;
                        publicKeyHash: string;
                        privateKey: string;
                    }>>>;
                    faucet: import("zod").ZodOptional<import("zod").ZodObject<{
                        pkh: import("zod").ZodString;
                        mnemonic: import("zod").ZodArray<import("zod").ZodString, "many">;
                        email: import("zod").ZodString;
                        password: import("zod").ZodString;
                        amount: import("zod").ZodString;
                        activation_code: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
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
                }, "strip", import("zod").ZodTypeAny, {
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
                sandbox: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    label: import("zod").ZodString;
                    rpcUrl: import("zod").ZodString;
                    protocol: import("zod").ZodString;
                    attributes: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean]>>;
                    plugin: import("zod").ZodOptional<import("zod").ZodString>;
                    accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                        encryptedKey: import("zod").ZodString;
                        publicKeyHash: import("zod").ZodString;
                        secretKey: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }, {
                        publicKeyHash: string;
                        encryptedKey: string;
                        secretKey: string;
                    }>, import("zod").ZodString]>>>;
                    tzkt: import("zod").ZodOptional<import("zod").ZodObject<{
                        disableAutostartWithSandbox: import("zod").ZodOptional<import("zod").ZodBoolean>;
                        postgresqlPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                        apiPort: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
                    }, "strip", import("zod").ZodTypeAny, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }, {
                        disableAutostartWithSandbox?: boolean | undefined;
                        postgresqlPort?: number | undefined;
                        apiPort?: number | undefined;
                    }>>;
                }, "strip", import("zod").ZodTypeAny, {
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
                environment: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
                    networks: import("zod").ZodArray<import("zod").ZodString, "many">;
                    sandboxes: import("zod").ZodArray<import("zod").ZodString, "many">;
                    storage: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                    aliases: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
                }, "strip", import("zod").ZodTypeAny, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }, {
                    storage?: Record<string, string> | undefined;
                    aliases?: Record<string, Record<string, string>> | undefined;
                    networks: string[];
                    sandboxes: string[];
                }>, import("zod").ZodString]>>;
                accounts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
                contracts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
                    sourceFile: import("zod").ZodString;
                    hash: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    sourceFile: string;
                    hash: string;
                }, {
                    sourceFile: string;
                    hash: string;
                }>>>;
                metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                    name: import("zod").ZodOptional<import("zod").ZodString>;
                    projectDescription: import("zod").ZodOptional<import("zod").ZodString>;
                    authors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    license: import("zod").ZodOptional<import("zod").ZodString>;
                    homepage: import("zod").ZodOptional<import("zod").ZodString>;
                }, "strip", import("zod").ZodTypeAny, {
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
                projectDir: import("zod").ZodString;
                configFile: import("zod").ZodString;
                hash: import("zod").ZodString;
            }>, "strip", import("zod").ZodTypeAny, {
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
        }>, "passthrough", import("zod").ZodTypeAny, {
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
        }>], import("zod").ZodUnknown>, import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodObject<{
            data: import("zod").ZodOptional<import("zod").ZodUnknown>;
            render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
        }, "strip", import("zod").ZodTypeAny, {
            data?: unknown;
            render: "string" | "none" | "table";
        }, {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>, import("zod").ZodVoid]>, import("zod").ZodPromise<import("zod").ZodUnion<[import("zod").ZodObject<{
            data: import("zod").ZodOptional<import("zod").ZodUnknown>;
            render: import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"table">, import("zod").ZodLiteral<"string">]>>;
        }, "strip", import("zod").ZodTypeAny, {
            data?: unknown;
            render: "string" | "none" | "table";
        }, {
            data?: unknown;
            render?: "string" | "none" | "table" | undefined;
        }>, import("zod").ZodVoid]>>]>>, import("zod").ZodPromise<import("zod").ZodVoid>]>;
        encoding: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodUnion<[import("zod").ZodLiteral<"none">, import("zod").ZodLiteral<"json">, import("zod").ZodLiteral<"application/json">]>>>;
    }, "handler">, {
        handler: import("zod").ZodString;
    }>, "strip", import("zod").ZodTypeAny, {
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
}>, "strip", import("zod").ZodTypeAny, {
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
export type t = PluginInfoStrict;
//# sourceMappingURL=PluginInfo.d.ts.map