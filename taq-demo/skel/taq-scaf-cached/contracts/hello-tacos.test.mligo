#include "./_schema.mligo"

let test =
    let _ = Test.reset_state 3n [] in
    let admin_address = Test.nth_bootstrap_account 1 in
    let user_address = Test.nth_bootstrap_account 2 in
    let _ = Test.set_source admin_address in
    let initial_storage = 
    {
        available_tacos = 50n ;
        admin           = admin_address ;
    } in
    let contract_addr, _, _ = Test.originate_from_file "./hello-tacos.mligo" "main" [] (Test.eval initial_storage) 0tez in
    let contract_typed_addr: (parameter, storage) typed_address = Test.cast_address contract_addr in
    let storage: storage = Test.get_storage_of_address contract_addr |> Test.decompile in
    let _ = assert (storage.available_tacos = 50n) in
    let _ = assert (storage.admin = admin_address) in

    // BUY ENTRYPOINT
    // failing with a larger quantity
    let too_many_tacos = storage.available_tacos + 1n in
    let _ = 
        (match Test.transfer_to_contract (Test.to_contract contract_typed_addr) (Buy too_many_tacos) 0mutez with
        | Success _ -> false
        | Fail err ->
            (match err with
            | Rejected (msg, _) -> msg = Test.eval "NOT_ENOUGH_TACOS"
            | _ -> false))
        |> assert 
    in

    // passing with a smaller quantity
    let tacos_to_buy = storage.available_tacos / 2n in
    let _ = 
        (match Test.transfer_to_contract (Test.to_contract contract_typed_addr) (Buy tacos_to_buy) 0mutez with
        | Success _ -> true
        | Fail _ -> false)
        |> assert 
    in
    let storage: storage = Test.get_storage_of_address contract_addr |> Test.decompile in
    let _ = assert (storage.available_tacos = tacos_to_buy) in

    // passing with the same quantity
    let _ = 
        (match Test.transfer_to_contract (Test.to_contract contract_typed_addr) (Buy tacos_to_buy) 0mutez with
        | Success _ -> true
        | Fail _ -> false)
        |> assert 
    in
    let storage: storage = Test.get_storage_of_address contract_addr |> Test.decompile in
    let _ = assert (storage.available_tacos = 0n) in

    // testing with a zero value in storage
    let _ = 
        (match Test.transfer_to_contract (Test.to_contract contract_typed_addr) (Buy 5n) 0mutez with
        | Success _ -> false
        | Fail err ->
            (match err with
            | Rejected (msg, _) -> msg = Test.eval "NOT_ENOUGH_TACOS"
            | _ -> false))
        |> assert 
    in

    // MAKE ENTRYPOINT
    // sender must be the admin
    let _ = Test.set_source user_address in
    let _ = 
        (match Test.transfer_to_contract (Test.to_contract contract_typed_addr) (Make 50n) 0mutez with
        | Success _ -> false
        | Fail err ->
            (match err with
            | Rejected (msg, _) -> msg = Test.eval "NOT_ALLOWED"
            | _ -> false))
        |> assert 
    in

    let _ = Test.set_source admin_address in
    let _ = 
        (match Test.transfer_to_contract (Test.to_contract contract_typed_addr) (Make 50n) 0mutez with
        | Success _ -> true
        | Fail _ -> false)
        |> assert 
    in
    let storage: storage = Test.get_storage_of_address contract_addr |> Test.decompile in
    let _ = assert (storage.available_tacos = 50n) in

    ()