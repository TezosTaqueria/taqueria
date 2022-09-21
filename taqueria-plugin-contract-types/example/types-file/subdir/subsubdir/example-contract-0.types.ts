
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from '../../type-utils';
import { int } from '../../type-aliases';

type Storage = int;

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

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'SubdirSubsubdirExampleContract0Code', protocol: string, code: object[] } };
export type SubdirSubsubdirExampleContract0ContractType = ContractAbstractionFromContractType<contractTypes>;
export type SubdirSubsubdirExampleContract0WalletType = WalletContractAbstractionFromContractType<contractTypes>;
