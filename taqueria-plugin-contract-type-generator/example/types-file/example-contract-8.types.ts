
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { address, BigMap, mutez, nat, unit } from './type-aliases';

type Storage = {
    entries: BigMap<nat, (
        { waiting01: unit }
        | { waiting02: unit }
        | { p1: address }
        | { p2: address }
        | {
            finished: {
                bob: address;
                result: (
                    { result1: unit }
                    | { result2: unit }
                    | { ok: unit }
                );
            }
        }
        | { cancelled?: address }
    )>;
    alice: address;
    caleb: address;
    dodge: address;
    count: nat;
    free: boolean;
};

type Methods = {
    make: (
        id: nat,
        p1: address,
        fee: mutez,
        otherFee?: mutez,
    ) => Promise<void>;
    join: (param: nat) => Promise<void>;
    register2: (
        id: nat,
        p2: address,
    ) => Promise<void>;
    accept: (
        id: nat,
        result: (
            { result1: unit }
            | { result2: unit }
            | { ok: unit }
        ),
    ) => Promise<void>;
    cancel: (param: nat) => Promise<void>;
    setAuth: (param: address) => Promise<void>;
    confirmAuth: () => Promise<void>;
    setCollector: (param: address) => Promise<void>;
    free: () => Promise<void>;
};

type MethodsObject = {
    make: (params: {
        id: nat,
        p1: address,
        fee: mutez,
        otherFee?: mutez,
    }) => Promise<void>;
    join: (param: nat) => Promise<void>;
    register2: (params: {
        id: nat,
        p2: address,
    }) => Promise<void>;
    accept: (params: {
        id: nat,
        result: (
            { result1: unit }
            | { result2: unit }
            | { ok: unit }
        ),
    }) => Promise<void>;
    cancel: (param: nat) => Promise<void>;
    setAuth: (param: address) => Promise<void>;
    confirmAuth: () => Promise<void>;
    setCollector: (param: address) => Promise<void>;
    free: () => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'ExampleContract8Code', protocol: string, code: object[] } };
export type ExampleContract8ContractType = ContractAbstractionFromContractType<contractTypes>;
export type ExampleContract8WalletType = WalletContractAbstractionFromContractType<contractTypes>;
