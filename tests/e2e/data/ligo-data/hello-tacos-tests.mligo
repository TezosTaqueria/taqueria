#import "hello-tacos.mligo" "HelloTacos"
module Test = Test.Next

let available_tacos = 100n

let test_available_tacos =
 let contract = Test.Originate.contract (contract_of HelloTacos) available_tacos 100tez in
 Assert.assert (Test.Typed_address.get_storage contract.taddr = available_tacos)

let test_buy_tacos =
 let res = HelloTacos.main(1n) (available_tacos) in (* The nature of the contract we don't have entrypoints
 // The only way to test it is to call function itself *)
 Assert.assert (res.1 = 99n)