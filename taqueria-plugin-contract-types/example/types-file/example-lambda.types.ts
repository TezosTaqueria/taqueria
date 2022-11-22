
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { Instruction, int } from './type-aliases';

export type Storage = {
    currentValue: int;
    modifyValue: Instruction[];
};

type Methods = {
    callModifyValue: () => Promise<void>;
    updateModifyValueFunction: (param: Instruction[]) => Promise<void>;
};

type MethodsObject = {
    callModifyValue: () => Promise<void>;
    updateModifyValueFunction: (param: Instruction[]) => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'ExampleLambdaCode', protocol: string, code: object[] } };
export type ExampleLambdaContractType = ContractAbstractionFromContractType<contractTypes>;
export type ExampleLambdaWalletType = WalletContractAbstractionFromContractType<contractTypes>;
