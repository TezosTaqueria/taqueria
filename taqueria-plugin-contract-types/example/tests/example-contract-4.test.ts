
import { TezosToolkit } from '@taquito/taquito';
import { tas } from '../types-file/type-aliases';
import { ExampleContract0ContractType as ContractType } from '../types-file/example-contract-4.types';

describe('example-contract-4', () => {
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
            contract = await Tezos.contract.at<ContractType>('DEPLOYED_CONTRACT_ADDRESS');
    });


    it('should call confirm_admin', async () => {
        
        const confirm_adminRequest = await contract.methodsObject.confirm_admin().send();
        await confirm_adminRequest.confirmation(3);
        
    });

    it('should call pause', async () => {
        
        const pauseRequest = await contract.methodsObject.pause(true).send();
        await pauseRequest.confirmation(3);
        
    });

    it('should call set_admin', async () => {
        
        const set_adminRequest = await contract.methodsObject.set_admin(tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456')).send();
        await set_adminRequest.confirmation(3);
        
    });

    it('should call bid', async () => {
        
        const bidRequest = await contract.methodsObject.bid({
                asset_id: tas.nat('42'),
                bid_amount: tas.nat('42'),
            }).send();
        await bidRequest.confirmation(3);
        
    });

    it('should call cancel', async () => {
        
        const cancelRequest = await contract.methodsObject.cancel(tas.nat('42')).send();
        await cancelRequest.confirmation(3);
        
    });

    it('should call configure', async () => {
        
        const configureRequest = await contract.methodsObject.configure({
                opening_price: tas.nat('42'),
                min_raise_percent: tas.nat('42'),
                min_raise: tas.nat('42'),
                round_time: tas.nat('42'),
                extend_time: tas.nat('42'),
                asset: [{
                    fa2_address: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    fa2_batch: [{
                        token_id: tas.nat('42'),
                        amount: tas.nat('42'),
                    }],
                }],
                start_time: tas.timestamp(new Date()),
                end_time: tas.timestamp(new Date()),
            }).send();
        await configureRequest.confirmation(3);
        
    });

    it('should call resolve', async () => {
        
        const resolveRequest = await contract.methodsObject.resolve(tas.nat('42')).send();
        await resolveRequest.confirmation(3);
        
    });

});
