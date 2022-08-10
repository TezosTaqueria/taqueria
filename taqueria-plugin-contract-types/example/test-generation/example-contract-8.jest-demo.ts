
import { TezosToolkit } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
import { tas } from '../types-file/type-aliases';
import { ExampleContract8ContractType as ContractType } from '../types-file/example-contract-8.types';
import { ExampleContract8Code as ContractCode } from '../types-file/example-contract-8.code';

describe('example-contract-8', () => {
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
            
            const newContractOrigination = await Tezos.contract.originate<ContractType>({
                code: ContractCode.code,
                storage: {
                        entries: tas.bigMap([{ 
                            key: tas.nat('42'), 
                            value: (
                            { waiting01: tas.unit() }
                            | { waiting02: tas.unit() }
                            | { p1: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456') }
                            | { p2: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456') }
                            | {
                                finished: {
                                    bob: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                                    result: (
                                        { result1: tas.unit() }
                                        | { result2: tas.unit() }
                                        | { ok: tas.unit() }
                                    ),
                                }
                            }
                            | { cancelled: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456') }
                        ),
                        }]),
                        alice: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                        caleb: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                        dodge: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                        count: tas.nat('42'),
                        free: true,
                    },
            });
            const newContractResult = await newContractOrigination.contract();
            const newContractAddress = newContractResult.address;
            contract = await Tezos.contract.at<ContractType>(newContractAddress);
            
    });


    it('should call make', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const makeRequest = await contract.methodsObject.make({
                id: tas.nat('42'),
                p1: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                fee: tas.mutez('42'),
                otherFee: tas.mutez('42'),
            }).send();
        await makeRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call join', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const joinRequest = await contract.methodsObject.join(tas.nat('42')).send();
        await joinRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call register2', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const register2Request = await contract.methodsObject.register2({
                id: tas.nat('42'),
                p2: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
            }).send();
        await register2Request.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call accept', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const acceptRequest = await contract.methodsObject.accept({
                id: tas.nat('42'),
                result: (
                    { result1: tas.unit() }
                    | { result2: tas.unit() }
                    | { ok: tas.unit() }
                ),
            }).send();
        await acceptRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call cancel', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const cancelRequest = await contract.methodsObject.cancel(tas.nat('42')).send();
        await cancelRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call setAuth', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const setAuthRequest = await contract.methodsObject.setAuth(tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456')).send();
        await setAuthRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call confirmAuth', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const confirmAuthRequest = await contract.methodsObject.confirmAuth().send();
        await confirmAuthRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call setCollector', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const setCollectorRequest = await contract.methodsObject.setCollector(tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456')).send();
        await setCollectorRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

    it('should call free', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const freeRequest = await contract.methodsObject.free().send();
        await freeRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter).toBe('');
    });

});
