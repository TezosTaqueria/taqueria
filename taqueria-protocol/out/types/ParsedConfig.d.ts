import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { ParsedConfig } from '@taqueria/protocol/types';
import { ParsedConfig as ParsedConfigStrict } from '@taqueria/protocol/out/types-strict';
export type { ParsedConfigStrict as ParsedConfig };
export declare const from: (input: unknown) => ParsedConfigStrict;
export declare const create: (input: ParsedConfig) => ParsedConfigStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, ParsedConfigStrict>;
export declare const make: (input: Omit<ParsedConfigStrict, '__type'>) => FutureInstance<TaqError, ParsedConfigStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodObject<import("zod").extendShape<Omit<{
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
    }, "sandbox">, {
        sandbox: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
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
        }>, import("zod").ZodString]>>;
    }>, "strip", import("zod").ZodTypeAny, {
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
    schema: import("zod").ZodEffects<import("zod").ZodObject<import("zod").extendShape<Omit<{
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
    }, "sandbox">, {
        sandbox: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
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
        }>, import("zod").ZodString]>>;
    }>, "strip", import("zod").ZodTypeAny, {
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
    }>, ParsedConfigStrict, {
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
};
export declare const rawSchema: import("zod").ZodObject<import("zod").extendShape<Omit<{
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
}, "sandbox">, {
    sandbox: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
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
    }>, import("zod").ZodString]>>;
}>, "strip", import("zod").ZodTypeAny, {
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
export declare const internalSchema: import("zod").ZodObject<import("zod").extendShape<Omit<{
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
}, "sandbox">, {
    sandbox: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<[import("zod").ZodObject<{
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
    }>, import("zod").ZodString]>>;
}>, "strip", import("zod").ZodTypeAny, {
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
export type t = ParsedConfigStrict;
//# sourceMappingURL=ParsedConfig.d.ts.map