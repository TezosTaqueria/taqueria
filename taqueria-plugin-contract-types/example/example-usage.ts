import { ContractStorageType, DefaultContractType, OpKind, OriginateParams, ParamsWithKind, TezosToolkit } from '@taquito/taquito';
import { ExampleContract1ContractType as TestContract, ExampleContract1WalletType as TestWallet } from './types-file/example-contract-1.types';
import { ExampleContract2ContractType as TestContract2, ExampleContract2WalletType as TestWallet2  } from './types-file/example-contract-2.types';
import { nat, tas } from './types-file/type-aliases';

export const exampleTypedMethods_existingContract = async () => {

    const Tezos = new TezosToolkit(`https://YOUR_PREFERRED_RPC_URL`)

    const contract = await Tezos.contract.at<TestContract>(`tz123`);

    contract.methods.bid(tas.nat(0));
    contract.methods.configure(
        /*opening_price:*/ tas.mutez(10),
        /*min_raise_percent:*/ tas.nat(10),
        /*min_raise:*/ tas.mutez(10),
        /*round_time:*/ tas.nat(10),
        /*extend_time:*/ tas.nat(10),
        /*asset:*/ [{
            fa2_address: tas.address(`tz123`),
            fa2_batch: [{
                amount: tas.nat(100),
                token_id: tas.nat(`100000000000000`),
            }],
        }],
        /*start_time:*/ tas.timestamp(new Date()),
        /*end_time:*/ tas.timestamp(`2020-01-01`),
    );

    // methodsObject
    contract.methodsObject.bid(tas.nat(0));
    contract.methodsObject.configure({
        asset: [{
            fa2_address: tas.address(`tz123`),
            fa2_batch: [{
                amount: tas.nat(100),
                token_id: tas.nat(`100000000000000`),
            }],
        }],
        start_time: tas.timestamp(new Date()),
        end_time: tas.timestamp(`2020-01-01`),
        extend_time: tas.nat(10),
        min_raise: tas.mutez(10),
        min_raise_percent: tas.nat(10),
        opening_price: tas.mutez(10),
        round_time: tas.nat(10),
    });

};

export const exampleTypedMethods_existingWallet = async () => {

    const Tezos = new TezosToolkit(`https://YOUR_PREFERRED_RPC_URL`)

    const contract = await Tezos.wallet.at<TestWallet>(`tz123`);

    // SendParams are not strictly typed yet
    // const bidSendResult = await contract.methods.bid(tas.nat(0)).send({ amount: tas.mutez(1000000) });
    const bidSendResult = await contract.methods.bid(tas.nat(0)).send({ amount: tas.number(tas.mutez(1000000)) });

    // Receipt only exists on wallet
    const bidReceiptResult = await bidSendResult.receipt();
    const bidConfirmationResult = await bidSendResult.confirmation(10);

    contract.methods.configure(
        /*opening_price:*/ tas.mutez(10),
        /*min_raise_percent:*/ tas.nat(10),
        /*min_raise:*/ tas.mutez(10),
        /*round_time:*/ tas.nat(10),
        /*extend_time:*/ tas.nat(10),
        /*asset:*/ [{
            fa2_address: tas.address(`tz123`),
            fa2_batch: [{
                amount: tas.nat(100),
                token_id: tas.nat(`100000000000000`),
            }],
        }],
        /*start_time:*/ tas.timestamp(new Date()),
        /*end_time:*/ tas.timestamp(`2020-01-01`),
    );

    // methodsObject
    contract.methodsObject.configure({
        asset: [{
            fa2_address: tas.address(`tz123`),
            fa2_batch: [{
                amount: tas.nat(100),
                token_id: tas.nat(`100000000000000`),
            }],
        }],
        start_time: tas.timestamp(new Date()),
        end_time: tas.timestamp(`2020-01-01`),
        extend_time: tas.nat(10),
        min_raise: tas.mutez(10),
        min_raise_percent: tas.nat(10),
        opening_price: tas.mutez(10),
        round_time: tas.nat(10),
    });

};

export const exampleTypedOriginateStorageAndResultContract_contract = async () => {

    const Tezos = new TezosToolkit(`https://YOUR_PREFERRED_RPC_URL`)

    // TODO: Remove this comment (leaving for debugging purposes for now)
    // const contractObj = null as unknown as TestContract2;
    // const storageResult = await contractObj.storage();
    // const storageMethod = contractObj.storage;
    // const storageReturnType = null as unknown as ReturnType<typeof contractObj['storage']>;
    // type PromiseReturnType<T extends (...args: any) => any> = T extends (...args: any) => PromiseLike<infer R> ? R : any;
    // const s0 = null as unknown as PromiseReturnType<TestContract2['storage']>;
    // const s = null as unknown as ContractStorageType<TestContract2>;
    
    const originationResult = await Tezos.contract.originate<TestContract2>({
        code: ``,
        // Require typed initial storage
        storage: {
            assets: {
                ledger: tas.bigMap([
                    { key: { 0: tas.address('tz123'), 1: tas.nat(42) }, value:tas.nat(42) }
                ]),
                operators: tas.bigMap([]),
                token_metadata: tas.bigMap([]),
                token_total_supply: tas.bigMap([]),
            },
            metadata: tas.bigMap([]),
        },
    });
    // Originated contract is also typed
    const contract = await originationResult.contract(5);
    contract.methods.set_admin(tas.address(`tz123`));

    contract.methods.create_token(
        /*token_id:*/ tas.nat(`100000000000000`),
        /*token_info:*/ tas.map([
            { key: `0`, value: tas.bytes(`abc`) },
            { key: `1`, value: tas.bytes(`def`) },
        ]),
    );
    contract.methods.create_token(
        /*token_id:*/ tas.nat(`100000000000000`),
        /*token_info:*/ tas.map({
            0: tas.bytes(`abc`),
            1: tas.bytes(`def`),
        }),
    );

    // methodsObject
    contract.methodsObject.set_admin(tas.address(`tz123`));
    contract.methodsObject.create_token({
        token_id: tas.nat(`100000000000000`),
        token_info: tas.map([
            { key: `0`, value: tas.bytes(`abc`) },
            { key: `1`, value: tas.bytes(`def`) },
        ]),
    });
    contract.methodsObject.create_token({
        token_id: tas.nat(`100000000000000`),
        token_info: tas.map({
            0: tas.bytes(`abc`),
            1: tas.bytes(`def`),
        }),
    });

};

export const exampleTypedOriginateStorageAndResultContract_wallet = async () => {

    const Tezos = new TezosToolkit(`https://YOUR_PREFERRED_RPC_URL`)

    // TODO: Remove this comment (leaving for debugging purposes for now)
    // const contractObj = null as unknown as TestContract2;
    // const storageResult = await contractObj.storage();
    // const storageMethod = contractObj.storage;
    // const storageReturnType = null as unknown as ReturnType<typeof contractObj['storage']>;
    // type PromiseReturnType<T extends (...args: any) => any> = T extends (...args: any) => PromiseLike<infer R> ? R : any;
    // const s0 = null as unknown as PromiseReturnType<TestContract2['storage']>;
    // const s = null as unknown as ContractStorageType<TestContract2>;
    
    const originationResult = await Tezos.wallet.originate<TestWallet2>({
        code: ``,
        // Require typed initial storage
        storage: {
            assets: {
                ledger: tas.bigMap([
                    { key: { 0: tas.address('tz123'), 1: tas.nat(42) }, value:tas.nat(42) }
                ]),
                operators: tas.bigMap([]),
                token_metadata: tas.bigMap([]),
                token_total_supply: tas.bigMap([]),
            },
            metadata: tas.bigMap([]),
        },
    }).send();
    // Originated contract is also typed
    const contract = await originationResult.contract();
    contract.methods.set_admin(tas.address(`tz123`));

    contract.methods.create_token(
        /*token_id:*/ tas.nat(`100000000000000`),
        /*token_info:*/ tas.map([
            { key: `0`, value: tas.bytes(`abc`) },
            { key: `1`, value: tas.bytes(`def`) },
        ]),
    );
    contract.methods.create_token(
        /*token_id:*/ tas.nat(`100000000000000`),
        /*token_info:*/ tas.map({
            0: tas.bytes(`abc`),
            1: tas.bytes(`def`),
        }),
    );

    // methodsObject
    contract.methodsObject.set_admin(tas.address(`tz123`));
    contract.methodsObject.create_token({
        token_id: tas.nat(`100000000000000`),
        token_info: tas.map([
            { key: `0`, value: tas.bytes(`abc`) },
            { key: `1`, value: tas.bytes(`def`) },
        ]),
    });
    contract.methodsObject.create_token({
        token_id: tas.nat(`100000000000000`),
        token_info: tas.map({
            0: tas.bytes(`abc`),
            1: tas.bytes(`def`),
        }),
    });

};


export const exampleTypedStorage_contract = async () => {

    const Tezos = new TezosToolkit(`https://YOUR_PREFERRED_RPC_URL`)

    const contract = await Tezos.contract.at<TestContract>(`tz123`);

    const getAuctionInfo = async (id: nat) => {
        const storage = await contract.storage();

        const auctions = storage.auctions;
        const auction = await auctions.get(id);
        if (!auction) {
            throw new Error(`Auction is missing`);
        }
        return auction;
    };

    const auctionId = tas.nat(42);

    // Get current bid
    const { current_bid } = await getAuctionInfo(auctionId);

    // Make next bid
    await (await contract.methods.bid(auctionId).send({
        mutez: true,

        // Not strictly typed yet
        // amount: tas.add(current_bid, tas.mutez(1000)),
        amount: tas.number(tas.add(current_bid, tas.mutez(1000))),
    })).confirmation(100);

    // Get current owner
    const { highest_bidder } = await getAuctionInfo(auctionId);
    const userAddress = await Tezos.wallet.pkh();

    if (highest_bidder === userAddress) {
        console.log(`You are the highest bidder!`);
    }

};


export const exampleTypedStorage_wallet = async () => {

    const Tezos = new TezosToolkit(`https://YOUR_PREFERRED_RPC_URL`)

    const contract = await Tezos.wallet.at<TestWallet>(`tz123`);

    const getAuctionInfo = async (id: nat) => {
        const storage = await contract.storage();

        const auctions = storage.auctions;
        const auction = await auctions.get(id);
        if (!auction) {
            throw new Error(`Auction is missing`);
        }
        return auction;
    };

    const auctionId = tas.nat(42);

    // Get current bid
    const { current_bid } = await getAuctionInfo(auctionId);

    // Make next bid
    await (await contract.methods.bid(auctionId).send({
        mutez: true,

        // Not strictly typed yet
        // amount: tas.add(current_bid, tas.mutez(1000)),
        amount: tas.number(tas.add(current_bid, tas.mutez(1000))),
    })).confirmation(100);

    // Get current owner
    const { highest_bidder } = await getAuctionInfo(auctionId);
    const userAddress = await Tezos.wallet.pkh();

    if (highest_bidder === userAddress) {
        console.log(`You are the highest bidder!`);
    }

};


export const exampleBatchOrigination_Contract = async () => {

    const Tezos = new TezosToolkit(`https://YOUR_PREFERRED_RPC_URL`)

    const batchOperation = Tezos.contract.batch()
        // Untyped
        .withOrigination(
        { 
            code: ``,
            // storage: any <-- NOT TYPED
            storage: {
                assets: {
                    not_valid: 42, // <-- no type error
                    ledger: tas.bigMap([
                        { key: { 0: tas.address('tz123'), 1: tas.nat(42) }, value:tas.nat(42) },
                    ]),
                    operators: tas.bigMap([]),
                    token_metadata: tas.bigMap([]),
                    token_total_supply: tas.bigMap([]),
                },
                metadata: tas.bigMap([]),
            },
        })
        // Typed
        .withOrigination<TestContract2>(
        {
            code: ``,
            // storage <-- TYPED
            storage: {
                assets: {
                    // not_valid: 42, // <-- type error (uncomment to see)
                    ledger: tas.bigMap([
                        { key: { 0: tas.address('tz123'), 1: tas.nat(42) }, value:tas.nat(42) },
                    ]),
                    operators: tas.bigMap([]),
                    token_metadata: tas.bigMap([]),
                    token_total_supply: tas.bigMap([]),
                },
                metadata: tas.bigMap([]),
            },
        })
    ;

    await batchOperation.send();
};


export const exampleBatchOrigination_Wallet = async () => {

    const Tezos = new TezosToolkit(`https://YOUR_PREFERRED_RPC_URL`)

    const batchOperation = Tezos.wallet.batch()
        // Untyped
        .withOrigination(
        { 
            code: ``,
            // storage: any <-- NOT TYPED
            storage: {
                assets: {
                    not_valid: 42, // <-- no type error
                    ledger: tas.bigMap([
                        { key: { 0: tas.address('tz123'), 1: tas.nat(42) }, value:tas.nat(42) },
                    ]),
                    operators: tas.bigMap([]),
                    token_metadata: tas.bigMap([]),
                    token_total_supply: tas.bigMap([]),
                },
                metadata: tas.bigMap([]),
            },
        })
        // Typed
        .withOrigination<TestWallet2>(
        {
            code: ``,
            // storage <-- TYPED
            storage: {
                assets: {
                    // not_valid: 42, // <-- type error (uncomment to see)
                    ledger: tas.bigMap([
                        { key: { 0: tas.address('tz123'), 1: tas.nat(42) }, value:tas.nat(42) },
                    ]),
                    operators: tas.bigMap([]),
                    token_metadata: tas.bigMap([]),
                    token_total_supply: tas.bigMap([]),
                },
                metadata: tas.bigMap([]),
            },
        })
    ;

    await batchOperation.send();
};