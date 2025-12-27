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
	TContract['methods'] extends object ? {
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
export type ContractAbstractionWithMethods<TContract extends BaseContractType> =
	& ContractAbstractionFromContractType<
		TContract
	>
	& {
		methods: ContractMethodsOf<ContractProvider, TContract>;
	};

export type WalletContractAbstractionWithMethods<TContract extends BaseContractType> =
	& WalletContractAbstractionFromContractType<TContract>
	& {
		methods: ContractMethodsOf<Wallet, TContract>;
	};

/**
 * Extract parameter names from a Taquito TokenSchema
 * Returns an array of parameter names in order, or numbered names (_0, _1, etc) if unnamed
 */
function extractParamNames(schema: unknown): string[] {
	if (!schema || typeof schema !== 'object') return [];

	const s = schema as Record<string, unknown>;
	const schemaObj = s.schema;

	// Single parameter (not an object with multiple fields)
	if (!schemaObj || typeof schemaObj !== 'object') {
		return ['param'];
	}

	// Object with named fields
	const fieldSchema = schemaObj as Record<string, unknown>;
	const keys = Object.keys(fieldSchema);

	// If keys look like numbered params, they're positional
	// Otherwise return the named keys
	return keys.length > 0 ? keys : ['param'];
}

/**
 * Creates a methods proxy that converts positional arguments to object arguments
 * for backwards compatibility with Taquito < 24.0.0
 *
 * @param methodsObject - The contract's methodsObject from Taquito v24
 * @param parameterSchema - The contract's parameterSchema for introspection
 * @returns A proxy object that mimics the old methods API
 */
function createMethodsProxy<T extends ContractProvider | Wallet>(
	methodsObject: Record<string, (args?: unknown) => ContractMethodObject<T>>,
	parameterSchema: { generateSchema: () => unknown; isMultipleEntryPoint: boolean },
): Record<string, (...args: unknown[]) => ContractMethodObject<T>> {
	const schema = parameterSchema.generateSchema() as Record<string, unknown>;

	return new Proxy({} as Record<string, (...args: unknown[]) => ContractMethodObject<T>>, {
		get(_target, prop: string) {
			if (typeof prop !== 'string' || !(prop in methodsObject)) {
				return undefined;
			}

			// Get the schema for this entrypoint
			let entrypointSchema: unknown;
			if (parameterSchema.isMultipleEntryPoint && schema.schema) {
				entrypointSchema = (schema.schema as Record<string, unknown>)[prop];
			} else {
				entrypointSchema = schema;
			}

			const paramNames = extractParamNames(entrypointSchema);

			// Return a function that converts positional args to object args
			return (...positionalArgs: unknown[]): ContractMethodObject<T> => {
				// If no args or single arg that's already an object with matching keys, pass through
				if (positionalArgs.length === 0) {
					return methodsObject[prop]();
				}

				// Single arg case - check if it's already an object format
				if (positionalArgs.length === 1) {
					const arg = positionalArgs[0];
					if (arg && typeof arg === 'object' && !Array.isArray(arg)) {
						// Might already be in object format, pass through
						return methodsObject[prop](arg);
					}
					// Single primitive value - wrap with param name
					if (paramNames.length === 1) {
						return methodsObject[prop]({ [paramNames[0]]: arg });
					}
					// Pass through as-is
					return methodsObject[prop](arg);
				}

				// Multiple args - convert to object using param names
				const argsObject: Record<string, unknown> = {};
				positionalArgs.forEach((arg, index) => {
					const paramName = paramNames[index] ?? `_${index}`;
					argsObject[paramName] = arg;
				});

				return methodsObject[prop](argsObject);
			};
		},
		has(_target, prop: string) {
			return prop in methodsObject;
		},
		ownKeys() {
			return Object.keys(methodsObject);
		},
		getOwnPropertyDescriptor(_target, prop: string) {
			if (prop in methodsObject) {
				return { enumerable: true, configurable: true };
			}
			return undefined;
		},
	});
}

/**
 * Wraps a Taquito v24+ ContractAbstraction to add backwards-compatible methods property.
 *
 * Taquito v24 removed the `methods` property (which used positional arguments) in favor
 * of `methodsObject` (which uses named object arguments). This wrapper adds back a
 * `methods` property that converts positional arguments to the object format expected
 * by `methodsObject`.
 *
 * @example
 * ```typescript
 * // Before (Taquito < 24):
 * const contract = await Tezos.contract.at(address);
 * await contract.methods.transfer("tz1...", 100).send();
 *
 * // After (Taquito >= 24) with wrapper:
 * const contract = await Tezos.contract.at(address);
 * const wrapped = tas.wrapContractWithMethods(contract);
 * await wrapped.methods.transfer("tz1...", 100).send(); // Still works!
 *
 * // Or use methodsObject directly:
 * await contract.methodsObject.transfer({ to: "tz1...", amount: 100 }).send();
 * ```
 *
 * @param contract - A Taquito v24+ ContractAbstraction
 * @returns The same contract with an added methods property for backwards compatibility
 */
export function wrapContractWithMethods<TContract extends BaseContractType>(
	contract: ContractAbstractionFromContractType<TContract>,
): ContractAbstractionWithMethods<TContract> {
	// If methods already exists (shouldn't in v24, but safety check), return as-is
	if ('methods' in contract && contract.methods) {
		return contract as ContractAbstractionWithMethods<TContract>;
	}

	const methodsProxy = createMethodsProxy(
		contract.methodsObject as Record<string, (args?: unknown) => ContractMethodObject<ContractProvider>>,
		contract.parameterSchema as { generateSchema: () => unknown; isMultipleEntryPoint: boolean },
	);

	return new Proxy(contract, {
		get(target, prop) {
			if (prop === 'methods') {
				return methodsProxy;
			}
			return (target as unknown as Record<string | symbol, unknown>)[prop];
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
			if (prop === 'methods') {
				return methodsProxy;
			}
			return (target as unknown as Record<string | symbol, unknown>)[prop];
		},
		has(target, prop) {
			if (prop === 'methods') return true;
			return prop in target;
		},
	}) as WalletContractAbstractionWithMethods<TContract>;
}
