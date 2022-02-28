This plugin will generate typescript types for a contract.

In the simple case, it reads the `artifacts` folder for any `*.tz` Michelson files and will generate a types file with the matching filename for each.

## Requirements

This is using a unmerged taquito PR:

- https://github.com/ecadlabs/taquito/pull/1343
    - `npm i @taquito/taquito@11.1.0-6bfb6c08--1343 --registry https://npm.preview.tezostaquito.io/`

## Examples

### Example Usage (based on an nft auction contract from open minter sdk)

```ts
export const exampleContractMethods1 = async () => {

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
```


### Example typegen task

```console
$ taqueria typegen --typescriptDir ./types
generateTypes
{
  "typescriptDir": "./types"
}
Generating Types: /home/rick/projects/crypto/taqueria/example/artifacts => /home/rick/projects/crypto/taqueria/example/types
Contracts Found:
        - /home/rick/projects/crypto/taqueria/example/artifacts/example-contract-1.tz
Processing /example-contract-1.tz...example-contract-1.tz: Types generated
```


### Example type output

```ts
type Storage = {
    pauseable_admin?: {
        admin: address;
        paused: boolean;
        pending_admin?: address;
    };
    current_id: nat;
    max_auction_time: nat;
    max_config_to_start_time: nat;
    auctions: BigMap<nat, {
        seller: address;
        current_bid: mutez;
        start_time: timestamp;
        last_bid_time: timestamp;
        round_time: int;
        extend_time: int;
        asset: Array<{
            fa2_address: address;
            fa2_batch: Array<{
                token_id: nat;
                amount: nat;
            }>;
        }>;
        min_raise_percent: nat;
        min_raise: mutez;
        end_time: timestamp;
        highest_bidder: address;
    }>;
};

type Methods = {
    confirm_admin: () => Promise<void>;
    pause: (param: boolean) => Promise<void>;
    set_admin: (param: address) => Promise<void>;
    bid: (param: nat) => Promise<void>;
    cancel: (param: nat) => Promise<void>;
    configure: (
        opening_price: mutez,
        min_raise_percent: nat,
        min_raise: mutez,
        round_time: nat,
        extend_time: nat,
        asset: Array<{
            fa2_address: address;
            fa2_batch: Array<{
                token_id: nat;
                amount: nat;
            }>;
        }>,
        start_time: timestamp,
        end_time: timestamp,
    ) => Promise<void>;
    resolve: (param: nat) => Promise<void>;
};
```


## Taquito library changes

See [example-usage.ts](example/example-usage.ts) for full example

### Before

Using taquito with the generated contract types:

The at method can be called providing a type with a utility method that can be provided:
```ts 
const contract = await Tezos.contract.at(`tz123`, contractAbstractionComposer<TestContractType>());

// methods can now use typed parameters
// methodsObject will be able to use type parameters
```

This can work the same with a wallet
```ts 
const contract = await Tezos.wallet.at(`tz123`, walletAbstractionComposer<TestContractType>());
```

Alternatively, this can be done with a cast:
```ts
const contract = await Tezos.contract.at(`tz123`) as ContractProviderFromContractType<TestContractType>;
```


The originate contract does not have any way to provide a type, so this requires a cast:
```ts
const originationResult = await Tezos.contract.originate({...});
const contract = await originationResult.contract(5) as ContractProviderFromContractType<TestContractType2>;
```


For accessing storage, there is no way to pass the type through the contract class, 
so it requires providing the type again:
```ts
const contract = await Tezos.contract.at(`tz123`) as ContractProviderFromContractType<TestContractType>;
const storage = await contract.storage<StorageFromContractType<TestContractType>>();
```


### After

Extending ContractAbstraction with additional generic types:

The at method can be called with the contract type provided:
```ts 
const contract = await Tezos.contract.at<TestContract>(`tz123`);

// methods can now use typed parameters
// methodsObject will be able to use type parameters
// storage will be able to use type parameters

```

This can work the same with a wallet
```ts 
const contract = await Tezos.wallet.at<TestWalletContract>(`tz123`);
```

The originate contract now accepts a type:
```ts
const originationResult = await Tezos.contract.originate({...});
const contract = await originationResult.contract<TestContract2>(5);
```


The contract type now also provides the default storage type:
```ts
const contract = await Tezos.contract.at<TestContract>(`tz123`);
const storage = await contract.storage();
```

