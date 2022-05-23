
import { TezosToolkit } from '@taquito/taquito';
import { tas } from '../types-file/type-aliases';
import { ExampleContract0ContractType as ContractType } from '../types-file/example-contract-11.types';

describe('example-contract-11', () => {
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
            contract = await Tezos.contract.at<ContractType>('DEPLOYED_CONTRACT_ADDRESS');
    });


    it('should call mint', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const mintRequest = await contract.methodsObject.mint([{
                    token_id: tas.nat('42'),
                    ipfs_hash: tas.bytes(char2Bytes('DATA')),
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                }]).send();
        await mintRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

});
