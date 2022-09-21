
import { TezosToolkit } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
import { tas } from '../types-file/type-aliases';
import { ExampleContract2ContractType as ContractType } from '../types-file/example-contract-2.types';
import { ExampleContract2Code as ContractCode } from '../types-file/example-contract-2.code';

describe('example-contract-2', () => {
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
            
            const newContractOrigination = await Tezos.contract.originate<ContractType>({
                code: ContractCode.code,
                storage: {
                        admin: {
                            admin: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                            paused: true,
                            pending_admin: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                        },
                        assets: {
                            ledger: tas.bigMap([{ 
                                key: {
                                0: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                                1: tas.nat('42'),
                            }, 
                                value: tas.nat('42'),
                            }]),
                            operators: tas.bigMap([{ 
                                key: {
                                0: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                                1: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                                2: tas.nat('42'),
                            }, 
                                value: tas.unit(),
                            }]),
                            token_metadata: tas.bigMap([{ 
                                key: tas.nat('42'), 
                                value: {
                                token_id: tas.nat('42'),
                                token_info: tas.map({ 
                                    'VALUE': tas.bytes(char2Bytes('DATA')),
                                }),
                            },
                            }]),
                            token_total_supply: tas.bigMap([{ 
                                key: tas.nat('42'), 
                                value: tas.nat('42'),
                            }]),
                        },
                        metadata: tas.bigMap({ 
                            'VALUE': tas.bytes(char2Bytes('DATA')),
                        }),
                    },
            });
            const newContractResult = await newContractOrigination.contract();
            const newContractAddress = newContractResult.address;
            contract = await Tezos.contract.at<ContractType>(newContractAddress);
            
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

    it('should call balance_of', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const balance_ofRequest = await contract.methodsObject.balance_of({
                requests: [{
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    token_id: tas.nat('42'),
                }],
                callback: tas.contract('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
            }).send();
        await balance_ofRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call transfer', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const transferRequest = await contract.methodsObject.transfer([{
                    from_: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    txs: [{
                        to_: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                        token_id: tas.nat('42'),
                        amount: tas.nat('42'),
                    }],
                }]).send();
        await transferRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call add_operator', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const add_operatorRequest = await contract.methodsObject.add_operator({
                owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                operator: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_id: tas.nat('42'),
            }).send();
        await add_operatorRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call remove_operator', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const remove_operatorRequest = await contract.methodsObject.remove_operator({
                owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                operator: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_id: tas.nat('42'),
            }).send();
        await remove_operatorRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call burn_tokens', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const burn_tokensRequest = await contract.methodsObject.burn_tokens([{
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    token_id: tas.nat('42'),
                    amount: tas.nat('42'),
                }]).send();
        await burn_tokensRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call create_token', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const create_tokenRequest = await contract.methodsObject.create_token({
                token_id: tas.nat('42'),
                token_info: tas.map({ 
                    'VALUE': tas.bytes(char2Bytes('DATA')),
                }),
            }).send();
        await create_tokenRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call mint_tokens', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const mint_tokensRequest = await contract.methodsObject.mint_tokens([{
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    token_id: tas.nat('42'),
                    amount: tas.nat('42'),
                }]).send();
        await mint_tokensRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

});
