
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { address } from './type-aliases';

type Storage = {
    feedbackFunction: (arg: address) => string;
    someAddress: address;
};

type Methods = {
    makeACall: (param: address) => Promise<void>;
    updateFeedbackFunction: (param: (arg: address) => string) => Promise<void>;
};

type MethodsObject = {
    makeACall: (param: address) => Promise<void>;
    updateFeedbackFunction: (param: (arg: address) => string) => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'ExampleLambdaCode', protocol: string, code: object[] } };
export type ExampleLambdaContractType = ContractAbstractionFromContractType<contractTypes>;
export type ExampleLambdaWalletType = WalletContractAbstractionFromContractType<contractTypes>;
