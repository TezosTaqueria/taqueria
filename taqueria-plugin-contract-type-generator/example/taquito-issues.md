See example-usage.ts for use cases

# Current Behavior

Using taquito with the generated contract types:

The at method can be called providing a type with a utility method that can be provided:
```ts 
const contract = await Tezos.contract.at(`tz123`, contractAbstractionComposer<TestContractType>());

// methods can now use typed parameters
// methodsObject will be able to use type parameters (WIP)
```

This can work the same with a wallet
```ts 
const contract = await Tezos.wallet.at(`tz123`, walletAbstractionComposer<TestContractType>());

// methods can now use typed parameters
// methodsObject will be able to use type parameters (WIP)
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


# Improvements

Option 1: Add additional optional types to ContractAbstraction to allow for typed methods, methodsObject, and storage
