
import { address, BigMap, MMap, nat } from '@taquito/contract-type-generator';

type Storage = {
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

export type ExampleContract9ContractType = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'ExampleContract9Code', protocol: string, code: object[] } };
