(*
  These are Unit Tests for the hello-taco Smart Contract. They use the CameLIGO Test
  library. For more information: https://ligolang.org/docs/reference/test?lang=cameligo

  To run these tests, invoke:

     $ taq test hello-tacos.test.mligo --plugin @taqueria/plugin-ligo

  ** Good to Know **

  => There is no deployment to, or interaction with, any Tezos blockchain instance
  => These tests only exercise the logic of the contract: not any integration
  => These tests are fast, but also isolated to the context of the contract

  ** Conventions **

  => `_good` denotes the happy *test* path - i.e. including when failure is expected
  => `_bad` denotes when a test has genuinely failed
  => Many variable names mirror their parameter or type name, à la Python

  Copyright (c) 2023 ECAD Labs. All rights reserved.
  This software is licensed under the terms of the included LICENSE file.

  Please see the top-level README file for more information.
*)

#include "./_schema.mligo"
#include "./hello-tacos.mligo"

let _print_header = Test.println("Testing hello-taco.mligo....")

let _arrange = Test.reset_state 3n []
let admin = Test.nth_bootstrap_account 1
let user = Test.nth_bootstrap_account 2

let available_tacos: nat = 50n

let initial_storage = {
    available_tacos = available_tacos;
    admin = admin;
}

let contract_at(address) = Test.to_contract address
let storage_at(address) = Test.get_storage address

let test_initial_contract_state =
    let addr,_,_ = Test.originate main initial_storage 0tez in
    let storage = storage_at addr in
    assert (storage.available_tacos = available_tacos && storage.admin = admin)

let test_cannot_buy_more_tacos_than_available =
    let addr,_,_ = Test.originate main initial_storage 0tez in
    let storage = storage_at addr in
    let too_many_tacos = storage.available_tacos + 1n in
    let addr,_,_ = Test.originate main initial_storage 0tez in
    match Test.transfer_to_contract (contract_at addr) (Buy too_many_tacos) 0mutez with
        | Fail (Rejected(msg,_good)) -> msg = Test.eval "NOT_ENOUGH_TACOS"
        | Success _bad -> Test.failwith("Failed to prevent purchasing too many tacos")
        | Fail unexpected -> Test.failwith("Unexpected failure: ", unexpected)

let test_can_buy_some_number_tacos =
    let addr,_,_ = Test.originate main initial_storage 0tez in
    let storage = storage_at addr in
    let tacos_to_buy = storage.available_tacos / 2n in
    match Test.transfer_to_contract (contract_at addr) (Buy tacos_to_buy) 0mutez with
        | Success _good -> true
        | Fail unexpected -> Test.failwith("Unexpected failure: ", unexpected)

let test_can_buy_all_remaining_tacos =
    let addr,_,_ = Test.originate main initial_storage 0tez in
    let storage = storage_at addr in
    let number_of_available_tacos = storage.available_tacos in
    let _ensure_nonzero_tacos_available = assert (number_of_available_tacos > 0n) in
    match Test.transfer_to_contract (contract_at addr) (Buy number_of_available_tacos) 0mutez with
        | Success _good -> true
        | Fail unexpected -> Test.failwith("Unexpected failure: ", unexpected)

let test_no_tacos_available =
    let no_tacos_available = { initial_storage with available_tacos = 0n } in
    let addr,_,_ = Test.originate main no_tacos_available 0tez in
    let storage = storage_at addr in
    let _verify_no_tacos_available = assert (storage.available_tacos = 0n) in
    match Test.transfer_to_contract (contract_at addr) (Buy 1n) 0mutez with
        | Fail (Rejected(msg,_good)) -> msg = Test.eval "NOT_ENOUGH_TACOS"
        | Success _bad -> Test.failwith("Failed to prevent a purchase of 0 tacos")
        | Fail unexpected -> Test.failwith("Unexpected failure: ", unexpected)

let test_only_admin_can_make_tacos =
    let _ = Test.set_source user in
    let addr,_,_ = Test.originate main initial_storage 0tez in // N.B. originates as user
    match Test.transfer_to_contract (contract_at addr) (Make available_tacos) 0mutez with
        | Fail (Rejected(msg,_good)) -> msg = Test.eval "NOT_ALLOWED" // TODO Improve failure message
        | Success _bad -> Test.failwith("Failed to prevent a user from making tacos")
        | Fail unexpected -> Test.failwith("Unexpected failure: ", unexpected)

let test_can_make_tacos =
    let _ = Test.set_source admin in // Strictly, unnecessary: just being explicit
    let addr,_,_ = Test.originate main initial_storage 0tez in
    let storage = storage_at addr in
    let _ = assert (storage.available_tacos = available_tacos) in
    match Test.transfer_to_contract (contract_at addr) (Make 42n) 0mutez with
        | Success _ ->
            let updated_storage = storage_at addr in // Refresh after Make()
            assert(updated_storage.available_tacos = available_tacos + 42n)
        | Fail unexpected -> Test.failwith("Unexpected failure: ", unexpected)

// TODO test re-entrancy
