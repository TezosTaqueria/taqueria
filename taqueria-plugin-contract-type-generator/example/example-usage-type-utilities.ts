import { Context, ContractAbstraction, ContractMethod, ContractMethodObject, ContractProvider, StorageProvider, Wallet } from '@taquito/taquito';
import { EntrypointsResponse, RpcClientInterface, ScriptResponse } from '@taquito/rpc';

type BaseContractType = { methods: unknown, methodsObject: unknown, storage: unknown };

type ContractMethodsOf<T extends ContractProvider | Wallet, TContract extends BaseContractType> = {
[M in keyof TContract['methods']]:
TContract['methods'][M] extends (...args: infer A) => unknown
? (...args: A) => ContractMethod<T>
: never
};
type ContractMethodsObjectsOf<T extends ContractProvider | Wallet, TContract extends BaseContractType> = {
[M in keyof TContract['methodsObject']]:
TContract['methodsObject'][M] extends (...args: infer A) => unknown
? (...args: A) => ContractMethodObject<T>
: never
};
type ContractStorageOf<TContract extends BaseContractType> = TContract['storage'];

export type ContractAbstractionFromContractType<TContract extends BaseContractType> = 
    ContractAbstraction<ContractProvider, 
        ContractMethodsOf<ContractProvider, TContract>,
        ContractMethodsObjectsOf<ContractProvider, TContract>,
        {},
        {},
        ContractStorageOf<TContract>
    >;
export const contractAbstractionComposer = <TContract extends BaseContractType>() => (abs: ContractAbstraction<ContractProvider>, context: Context): ContractAbstractionFromContractType<TContract> => {
    return abs as unknown as ContractAbstractionFromContractType<TContract>;
}

export type WalletContractAbstractionFromContractType<TContract extends BaseContractType> = 
    ContractAbstraction<Wallet, 
        ContractMethodsOf<Wallet, TContract>,
        ContractMethodsObjectsOf<Wallet, TContract>,
        {},
        {},
        ContractStorageOf<TContract>
    >;
export const walletAbstractionComposer = <TContract extends BaseContractType>() => (abs: ContractAbstraction<Wallet>, context: Context): WalletContractAbstractionFromContractType<TContract> => {
    return abs as unknown as WalletContractAbstractionFromContractType<TContract>;
}


// Taquito Modifications: 
// - Types need to be added to ContractAbstraction to allow typed methods, methodsObject, and storage

// Possible modification: ContractAbstractionWithExtendedTypes
// export type ContractAbstractionWithExtendedTypes<T extends ContractProvider | Wallet, 
// TMethods extends {
//     [key: string]: (...args: any[]) => ContractMethod<T>;
// } = {},
// TMethodsObject extends {
//     [key: string]: (args?: any) => ContractMethodObject<T>;
// } = {}, 
// TStorageDefault = {}> = Omit<ContractAbstraction<T>, 'methods' |'methodsObject'|'storage'> & {
//     methods: TMethods;
//     methodsObject: TMethodsObject;
//     storage<T = TStorageDefault>(): Promise<T>;
// }

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
