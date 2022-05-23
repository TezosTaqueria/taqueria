
import { TezosToolkit } from '@taquito/taquito';
import { tas } from '../types-file/type-aliases';
import { ExampleContract0ContractType as ContractType } from '../types-file/example-contract-2.types';

describe('example-contract-2', () => {
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

    it('should call balance_of', async () => {
        
        const balance_ofRequest = await contract.methodsObject.balance_of({
                requests: [{
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    token_id: tas.nat('42'),
                }],
                callback: tas.contract('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
            }).send();
        await balance_ofRequest.confirmation(3);
        
    });

    it('should call transfer', async () => {
        
        const transferRequest = await contract.methodsObject.transfer([{
                    from_: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    txs: [{
                        to_: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                        token_id: tas.nat('42'),
                        amount: tas.nat('42'),
                    }],
                }]).send();
        await transferRequest.confirmation(3);
        
    });

    it('should call add_operator', async () => {
        
        const add_operatorRequest = await contract.methodsObject.add_operator({
                owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                operator: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_id: tas.nat('42'),
            }).send();
        await add_operatorRequest.confirmation(3);
        
    });

    it('should call remove_operator', async () => {
        
        const remove_operatorRequest = await contract.methodsObject.remove_operator({
                owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                operator: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_id: tas.nat('42'),
            }).send();
        await remove_operatorRequest.confirmation(3);
        
    });

    it('should call burn_tokens', async () => {
        
        const burn_tokensRequest = await contract.methodsObject.burn_tokens([{
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    token_id: tas.nat('42'),
                    amount: tas.nat('42'),
                }]).send();
        await burn_tokensRequest.confirmation(3);
        
    });

    it('should call create_token', async () => {
        
        const create_tokenRequest = await contract.methodsObject.create_token({
                token_id: tas.nat('42'),
                token_info: tas.map({ 
                    'VALUE': tas.bytes(char2Bytes('DATA')),
                }),
            }).send();
        await create_tokenRequest.confirmation(3);
        
    });

    it('should call mint_tokens', async () => {
        
        const mint_tokensRequest = await contract.methodsObject.mint_tokens([{
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    token_id: tas.nat('42'),
                    amount: tas.nat('42'),
                }]).send();
        await mint_tokensRequest.confirmation(3);
        
    });

});
