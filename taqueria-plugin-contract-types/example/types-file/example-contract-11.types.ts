
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { address, bytes, nat } from './type-aliases';

export type Storage = {
    total_supply: nat;
};

type Methods = {
    default: (param: Array<{
            token_id: nat;
            ipfs_hash: bytes;
            owner: address;
        }>) => Promise<void>;
};

type MethodsObject = {
    default: (param: Array<{
            token_id: nat;
            ipfs_hash: bytes;
            owner: address;
        }>) => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'ExampleContract11Code', protocol: string, code: object[] } };
export type ExampleContract11ContractType = ContractAbstractionFromContractType<contractTypes>;
export type ExampleContract11WalletType = WalletContractAbstractionFromContractType<contractTypes>;
