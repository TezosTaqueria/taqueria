
import { TezosToolkit } from '@taquito/taquito';
import { tas } from '../types-file/type-aliases';
import { ExampleContract0ContractType as ContractType } from '../types-file/example-contract-7.types';

describe('example-contract-7', () => {
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
            contract = await Tezos.contract.at<ContractType>('DEPLOYED_CONTRACT_ADDRESS');
    });


    it('should call confirm_admin', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const confirm_adminRequest = await contract.methodsObject.confirm_admin().send();
        await confirm_adminRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call pause', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const pauseRequest = await contract.methodsObject.pause(true).send();
        await pauseRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call set_admin', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const set_adminRequest = await contract.methodsObject.set_admin(tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456')).send();
        await set_adminRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call buy', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const buyRequest = await contract.methodsObject.buy({
                sale_seller: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_for_sale_address: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_for_sale_token_id: tas.nat('42'),
                money_token_address: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                money_token_token_id: tas.nat('42'),
            }).send();
        await buyRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call mint', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const mintRequest = await contract.methodsObject.mint([{
                    token_metadata: {
                        token_id: tas.nat('42'),
                        token_info: tas.map({ 
                            'VALUE': tas.bytes(char2Bytes('DATA')),
                        }),
                    },
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                }]).send();
        await mintRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call sell', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const sellRequest = await contract.methodsObject.sell({
                sale_price: tas.nat('42'),
                token_for_sale_address: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_for_sale_token_id: tas.nat('42'),
                money_token_address: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                money_token_token_id: tas.nat('42'),
            }).send();
        await sellRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

});
