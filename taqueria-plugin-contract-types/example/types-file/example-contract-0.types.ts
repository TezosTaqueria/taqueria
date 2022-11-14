
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { int } from './type-aliases';

export type Storage = int;

type Methods = {
    decrement: (param: int) => Promise<void>;
    increment: (param: int) => Promise<void>;
    reset: () => Promise<void>;
};

type MethodsObject = {
    decrement: (param: int) => Promise<void>;
    increment: (param: int) => Promise<void>;
    reset: () => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'ExampleContract0Code', protocol: string, code: object[] } };
export type ExampleContract0ContractType = ContractAbstractionFromContractType<contractTypes>;
export type ExampleContract0WalletType = WalletContractAbstractionFromContractType<contractTypes>;
