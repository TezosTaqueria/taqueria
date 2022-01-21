import { Context, ContractAbstraction, ContractMethod, ContractMethodObject, ContractProvider, StorageProvider, Wallet } from '@taquito/taquito';
import { EntrypointsResponse, RpcClientInterface, ScriptResponse } from '@taquito/rpc';

// export type Contract<TContract extends { methods: unknown, storage: unknown } = { methods: any, storage: any }> = ContractAbstraction<ContractProvider<TContract>, TContract>;
// export type WalletContract<TContract extends { methods: unknown, storage: unknown } = { methods: any, storage: any }> = ContractAbstraction<Wallet<TContract>, TContract>;

// const isContractProvider = <TContract extends { methods: unknown, storage: unknown }>(variableToCheck: any): variableToCheck is ContractProvider<TContract> =>
//   variableToCheck.contractProviderTypeSymbol !== undefined;

// type ContractMethodsOf<T extends ContractProvider<TContract> | Wallet<TContract>, TContract extends { methods: unknown, storage: unknown }> = {
//   [M in keyof TContract['methods']]:
//   TContract['methods'][M] extends (...args: infer A) => unknown
//   ? (...args: A) => ContractMethod<T, TContract>
//   : never
// };

type ContractMethodsOf<T extends ContractProvider | Wallet, TContract extends { methods: unknown, storage: unknown }> = {
[M in keyof TContract['methods']]:
TContract['methods'][M] extends (...args: infer A) => unknown
? (...args: A) => ContractMethod<T>
: never
};

// type ObjectToArgs<T> = { 
//     [K in keyof T]: T[K]
// }
// const testArgsToObject = null as unknown as ObjectToArgs<{a:123,b:456}>; 

// type ContractMethodsObjectOf<T extends ContractProvider | Wallet, TContract extends { methods: unknown, storage: unknown }> = {
//     [M in keyof TContract['methods']]:
//     TContract['methods'][M] extends (...args: infer A) => unknown
//     ? (args: ArgsToObject<A>) => ContractMethod<T>
//     : never
//   };

export type StorageFromContractType<TContract extends { methods: unknown, storage: unknown }> = TContract['storage'];

// export type ContractAbstractionFromContractType<TContract extends { methods: unknown, storage: unknown }> = 
//     ContractAbstractionWithExtendedTypes<ContractProvider, 
//         ContractMethodsOf<ContractProvider, TContract>,
//         {},
//         StorageFromContractType<TContract>
//     >;

export type ContractAbstractionFromContractType<TContract extends { methods: unknown, storage: unknown }> = ContractAbstraction<ContractProvider> & {
    // storage will not work
    // storage: () => Promise<TContract['storage']>;
    methods: ContractMethodsOf<ContractProvider, TContract>;
    // TODO: methodsObject
    // methodsObject: ContractMethodsObjectOf<ContractProvider, TContract>,
};
export const contractAbstractionComposer = <TContract extends { methods: unknown, storage: unknown }>() => (abs: ContractAbstraction<ContractProvider>, context: Context): ContractAbstractionFromContractType<TContract> => {
    return abs as unknown as ContractAbstractionFromContractType<TContract>;
}

export type WalletFromContractType<TContract extends { methods: unknown, storage: unknown }> = ContractAbstraction<Wallet> & {
    methods: ContractMethodsOf<Wallet, TContract>,
};
export const walletAbstractionComposer = <TContract extends { methods: unknown, storage: unknown }>() => (abs: ContractAbstraction<Wallet>, context: Context): WalletFromContractType<TContract> => {
    return abs as unknown as WalletFromContractType<TContract>;
}


// Taquito Modifications: 
// - Types need to be added to ContractAbstraction to allow typed methods, methodsObject, and storage

// Possible modification: ContractAbstractionWithExtendedTypes
export type ContractAbstractionWithExtendedTypes<T extends ContractProvider | Wallet, 
TMethods extends {
    [key: string]: (...args: any[]) => ContractMethod<T>;
} = {},
TMethodsObject extends {
    [key: string]: (args?: any) => ContractMethodObject<T>;
} = {}, 
TStorageDefault = {}> = Omit<ContractAbstraction<T>, 'methods' |'methodsObject'|'storage'> & {
    methods: TMethods;
    methodsObject: TMethodsObject;
    storage<T = TStorageDefault>(): Promise<T>;
}

// export class ContractAbstractionWithExtendedTypes<T extends ContractProvider | Wallet, 
// TMethods extends {
//     [key: string]: (...args: any[]) => ContractMethod<T>;
// } = {},
// TMethodsObject extends {
//     [key: string]: (args?: any) => ContractMethodObject<T>;
// } = {}, 
// TStorageDefault = {}> extends ContractAbstraction<T> {
//     public methods: TMethods = null as unknown as TMethods;
//     public methodsObject: TMethodsObject = null as unknown as TMethodsObject;
//     // public storage: <T = TStorageDefault>() => Promise<TStorageDefault> = null as unknown as () => Promise<TStorageDefault>;

//     constructor(address: string, script: ScriptResponse, provider: T, storageProvider: StorageProvider, entrypoints: EntrypointsResponse, chainId: string, rpc: RpcClientInterface){
//         super(address, script, provider, storageProvider, entrypoints, chainId, rpc);
//     }
// }
