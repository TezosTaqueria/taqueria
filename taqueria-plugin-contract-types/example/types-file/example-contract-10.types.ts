
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { bytes, nat } from './type-aliases';

export type Storage = {
    total_supply: nat;
};

type Methods = {
    default: (
        _0: nat,
        _1: bytes,
    ) => Promise<void>;
};

type MethodsObject = {
    default: (params: {
        0: nat,
        1: bytes,
    }) => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'ExampleContract10Code', protocol: string, code: object[] } };
export type ExampleContract10ContractType = ContractAbstractionFromContractType<contractTypes>;
export type ExampleContract10WalletType = WalletContractAbstractionFromContractType<contractTypes>;
