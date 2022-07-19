
import { TezosToolkit } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
import { tas } from '../types-file/type-aliases';
import { ExampleContract10ContractType as ContractType } from '../types-file/example-contract-10.types';
import { ExampleContract10Code as ContractCode } from '../types-file/example-contract-10.code';

describe('example-contract-10', () => {
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
            
            const newContractOrigination = await Tezos.contract.originate<ContractType>({
                code: ContractCode.code,
                storage: {
                        total_supply: tas.nat('42'),
                    },
            });
            const newContractResult = await newContractOrigination.contract();
            const newContractAddress = newContractResult.address;
            contract = await Tezos.contract.at<ContractType>(newContractAddress);
            
    });


    it('should call update_token_metadata', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const update_token_metadataRequest = await contract.methodsObject.update_token_metadata({
                0: tas.nat('42'),
                1: tas.bytes(char2Bytes('DATA')),
            }).send();
        await update_token_metadataRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

});
