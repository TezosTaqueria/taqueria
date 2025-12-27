// This is required for copying the type utils to a local file
// Updated for Taquito v24.0.0+ which removed ContractMethod and the methods property
export const typeUtilsFileContent = `
import { ContractAbstraction, ContractMethodObject, ContractProvider, Wallet } from '@taquito/taquito';

// Support both old (methods) and new (methodsObject) contract type definitions
type BaseContractType = { methodsObject: unknown; storage: unknown; methods?: unknown };

type ContractMethodsObjectsOf<T extends ContractProvider | Wallet, TContract extends BaseContractType> = {
    [M in keyof TContract['methodsObject']]: TContract['methodsObject'][M] extends (...args: infer A) => unknown
        ? (...args: A) => ContractMethodObject<T>
        : never;
};
type ContractStorageOf<TContract extends BaseContractType> = TContract['storage'];

// Type for the methods proxy - converts positional args to methodsObject call
type ContractMethodsOf<T extends ContractProvider | Wallet, TContract extends BaseContractType> =
    TContract['methods'] extends object
        ? {
                [M in keyof TContract['methods']]: TContract['methods'][M] extends (...args: infer A) => unknown
                    ? (...args: A) => ContractMethodObject<T>
                    : never;
            }
        : ContractMethodsObjectsOf<T, TContract>;

export type ContractAbstractionFromContractType<TContract extends BaseContractType> = ContractAbstraction<
    ContractProvider,
    ContractMethodsObjectsOf<ContractProvider, TContract>,
    {},
    {},
    ContractStorageOf<TContract>
>;

export type WalletContractAbstractionFromContractType<TContract extends BaseContractType> = ContractAbstraction<
    Wallet,
    ContractMethodsObjectsOf<Wallet, TContract>,
    {},
    {},
    ContractStorageOf<TContract>
>;

// Extended contract type that includes the backwards-compatible methods property
export type ContractAbstractionWithMethods<TContract extends BaseContractType> = ContractAbstractionFromContractType<
    TContract
> & {
    methods: ContractMethodsOf<ContractProvider, TContract>;
};

export type WalletContractAbstractionWithMethods<TContract extends BaseContractType> =
    WalletContractAbstractionFromContractType<TContract> & {
        methods: ContractMethodsOf<Wallet, TContract>;
    };

/**
 * Extract parameter names from a Taquito TokenSchema
 */
function extractParamNames(schema: unknown): string[] {
    if (!schema || typeof schema !== 'object') return [];
    const s = schema as Record<string, unknown>;
    const schemaObj = s.schema;
    if (!schemaObj || typeof schemaObj !== 'object') return ['param'];
    const fieldSchema = schemaObj as Record<string, unknown>;
    const keys = Object.keys(fieldSchema);
    return keys.length > 0 ? keys : ['param'];
}

/**
 * Creates a methods proxy that converts positional arguments to object arguments
 */
function createMethodsProxy<T>(
    methodsObject: Record<string, (args?: unknown) => ContractMethodObject<T>>,
    parameterSchema: { generateSchema: () => unknown; isMultipleEntryPoint: boolean },
): Record<string, (...args: unknown[]) => ContractMethodObject<T>> {
    const schema = parameterSchema.generateSchema() as Record<string, unknown>;

    return new Proxy({} as Record<string, (...args: unknown[]) => ContractMethodObject<T>>, {
        get(_target, prop: string) {
            if (typeof prop !== 'string' || !(prop in methodsObject)) return undefined;

            let entrypointSchema: unknown;
            if (parameterSchema.isMultipleEntryPoint && schema.schema) {
                entrypointSchema = (schema.schema as Record<string, unknown>)[prop];
            } else {
                entrypointSchema = schema;
            }

            const paramNames = extractParamNames(entrypointSchema);

            return (...positionalArgs: unknown[]): ContractMethodObject<T> => {
                if (positionalArgs.length === 0) return methodsObject[prop]();
                if (positionalArgs.length === 1) {
                    const arg = positionalArgs[0];
                    if (arg && typeof arg === 'object' && !Array.isArray(arg)) return methodsObject[prop](arg);
                    if (paramNames.length === 1) return methodsObject[prop]({ [paramNames[0]]: arg });
                    return methodsObject[prop](arg);
                }
                const argsObject: Record<string, unknown> = {};
                positionalArgs.forEach((arg, index) => {
                    argsObject[paramNames[index] ?? \`_\${index}\`] = arg;
                });
                return methodsObject[prop](argsObject);
            };
        },
        has(_target, prop: string) { return prop in methodsObject; },
        ownKeys() { return Object.keys(methodsObject); },
        getOwnPropertyDescriptor(_target, prop: string) {
            if (prop in methodsObject) return { enumerable: true, configurable: true };
            return undefined;
        },
    });
}

/**
 * Wraps a Taquito v24+ ContractAbstraction to add backwards-compatible methods property.
 *
 * @example
 * const contract = await Tezos.contract.at(address);
 * const wrapped = wrapContractWithMethods(contract);
 * await wrapped.methods.transfer("tz1...", 100).send(); // Works with positional args
 */
export function wrapContractWithMethods<TContract extends BaseContractType>(
    contract: ContractAbstractionFromContractType<TContract>,
): ContractAbstractionWithMethods<TContract> {
    if ('methods' in contract && contract.methods) {
        return contract as ContractAbstractionWithMethods<TContract>;
    }

    const methodsProxy = createMethodsProxy(
        contract.methodsObject as Record<string, (args?: unknown) => ContractMethodObject<ContractProvider>>,
        contract.parameterSchema as { generateSchema: () => unknown; isMultipleEntryPoint: boolean },
    );

    return new Proxy(contract, {
        get(target, prop) {
            if (prop === 'methods') return methodsProxy;
            return (target as Record<string | symbol, unknown>)[prop];
        },
        has(target, prop) {
            if (prop === 'methods') return true;
            return prop in target;
        },
    }) as ContractAbstractionWithMethods<TContract>;
}

/**
 * Wallet version of wrapContractWithMethods
 */
export function wrapWalletContractWithMethods<TContract extends BaseContractType>(
    contract: WalletContractAbstractionFromContractType<TContract>,
): WalletContractAbstractionWithMethods<TContract> {
    if ('methods' in contract && contract.methods) {
        return contract as WalletContractAbstractionWithMethods<TContract>;
    }

    const methodsProxy = createMethodsProxy(
        contract.methodsObject as Record<string, (args?: unknown) => ContractMethodObject<Wallet>>,
        contract.parameterSchema as { generateSchema: () => unknown; isMultipleEntryPoint: boolean },
    );

    return new Proxy(contract, {
        get(target, prop) {
            if (prop === 'methods') return methodsProxy;
            return (target as Record<string | symbol, unknown>)[prop];
        },
        has(target, prop) {
            if (prop === 'methods') return true;
            return prop in target;
        },
    }) as WalletContractAbstractionWithMethods<TContract>;
}
`;
