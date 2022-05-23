
import { TezosToolkit } from '@taquito/taquito';
import { tas } from '../types-file/type-aliases';
import { ExampleContract0ContractType as ContractType } from '../types-file/example-contract-10.types';

describe('example-contract-10', () => {
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
            contract = await Tezos.contract.at<ContractType>('DEPLOYED_CONTRACT_ADDRESS');
    });


    it('should call update_token_metadata', async () => {
        
        const update_token_metadataRequest = await contract.methodsObject.update_token_metadata({
                0: tas.nat('42'),
                1: tas.bytes(char2Bytes('DATA')),
            }).send();
        await update_token_metadataRequest.confirmation(3);
        
    });

});
