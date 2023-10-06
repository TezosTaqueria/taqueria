#import "hello-tacos.mligo" "HelloTacos"

let available_tacos = 100n

let test_available_tacos =
 let contract = Test.originate (contract_of HelloTacos) available_tacos 100tez in
 assert (Test.get_storage contract.addr = available_tacos)

let test_buy_tacos =
 let res = HelloTacos.main(1n) (available_tacos) in (* The nature of the contract we don't have entrypoints
 // The only way to test it is to call function itself *)
 assert (res.1 = 99n)