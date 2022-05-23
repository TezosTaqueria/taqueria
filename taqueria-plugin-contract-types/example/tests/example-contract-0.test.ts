
import { TezosToolkit } from '@taquito/taquito';
import { tas } from '../types-file/type-aliases';
import { ExampleContract0ContractType as ContractType } from '../types-file/example-contract-0.types';

describe('example-contract-0', () => {
        const Tezos = new TezosToolkit('RPC_URL');
        let contract: ContractType = undefined as unknown as ContractType;
        beforeAll(async () => {
                contract = await Tezos.contract.at<ContractType>('DEPLOYED_CONTRACT_ADDRESS');
        });


        it('should call decrement', async () => {

                const decrementRequest = await contract.methodsObject.decrement(tas.int('42')).send();
                await decrementRequest.confirmation(3);

                const storageValue = await contract.storage();

                expect(storageValue).toBe('0');
        });

        it('should call increment', async () => {

                const incrementRequest = await contract.methodsObject.increment(tas.int('42')).send();
                await incrementRequest.confirmation(3);

        });

        it('should call reset', async () => {

                const resetRequest = await contract.methodsObject.reset().send();
                await resetRequest.confirmation(3);

        });

});
