#import "hello-tacos.mligo" "HelloTacos"
module Test = Test.Next

(* This test is intentionally designed to fail to test failure reporting *)

let available_tacos = 100n

(* This test will FAIL because storage is 50n but we assert it equals 100n *)
let test_available_tacos =
 let contract = Test.Originate.contract (contract_of HelloTacos) 50n 100tez in
 Assert.assert (Test.Typed_address.get_storage contract.taddr = available_tacos)

(* This test will FAIL because we buy 1 taco from 50, getting 49, but assert it equals 48 *)
let test_buy_tacos =
 let contract = Test.Originate.contract (contract_of HelloTacos) 50n 100tez in
 let _ = Test.Contract.transfer_exn (Test.Typed_address.get_entrypoint "default" contract.taddr) 1n 0tez in
 Assert.assert (Test.Typed_address.get_storage contract.taddr = 48n)