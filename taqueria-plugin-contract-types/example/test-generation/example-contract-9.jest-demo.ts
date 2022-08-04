
import { TezosToolkit } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
import { tas } from '../types-file/type-aliases';
import { ExampleContract9ContractType as ContractType } from '../types-file/example-contract-9.types';
import { ExampleContract9Code as ContractCode } from '../types-file/example-contract-9.code';

describe('example-contract-9', () => {
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
            
            const newContractOrigination = await Tezos.contract.originate<ContractType>({
                code: ContractCode.code,
                storage: {
                        0: tas.bigMap([{ 
                            key: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'), 
                            value: {
                            0: tas.nat('42'),
                            1: tas.map([{ 
                                key: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'), 
                                value: tas.nat('42'),
                            }]),
                        },
                        }]),
                        1: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                        2: true,
                        3: tas.nat('42'),
                        4: (
                            { 0: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456') }
                            | { 1: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456') }
                        ),
                    },
            });
            const newContractResult = await newContractOrigination.contract();
            const newContractAddress = newContractResult.address;
            contract = await Tezos.contract.at<ContractType>(newContractAddress);
            
    });


});
