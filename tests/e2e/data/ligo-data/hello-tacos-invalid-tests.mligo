#include "hello-tacos.mligo"

let available_tacos = 100

let test_available_tacos =
 let (taddr, _, _) = Test.originate main initial_storage 100tez in
 assert (Test.get_storage taddr = available_tacos)

let test_buy_tacos =
 let (taddr, _, _) = Test.originate main initial_storage 100tez in
 let contr = Test.to_contract taddr in
 let _ = Test.transfer_to_contract_exn contr 1mutez in
 assert (Test.get_storage taddr = test_available_tacos  - 1)