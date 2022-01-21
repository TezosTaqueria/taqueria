# Requirements

This is using a unmerged taquito PR:

- https://github.com/ecadlabs/taquito/pull/1343
    - `npm i @taquito/taquito@11.1.0-6bfb6c08--1343 --registry https://npm.preview.tezostaquito.io/`


# Taquito library changes

See [example-usage.ts](example/example-usage.ts) for full example

## Before

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


## After

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

