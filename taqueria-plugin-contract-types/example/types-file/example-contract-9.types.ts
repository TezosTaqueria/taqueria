
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { address, BigMap, MMap, nat } from './type-aliases';

export type Storage = {
    0: BigMap<address, {
        0: nat;
        1: MMap<address, nat>;
    }>;
    1: address;
    2: boolean;
    3: nat;
    4: (
        { 0: address }
        | { 1: address }
    );
};

type Methods = {
    
};

type MethodsObject = {
    
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'ExampleContract9Code', protocol: string, code: object[] } };
export type ExampleContract9ContractType = ContractAbstractionFromContractType<contractTypes>;
export type ExampleContract9WalletType = WalletContractAbstractionFromContractType<contractTypes>;
