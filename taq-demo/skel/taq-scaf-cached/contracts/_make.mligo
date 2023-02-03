#include "_schema.mligo"

let make ((tacos_to_make, store) : (taco_quantity * storage)) =
    if Tezos.get_sender () <> store.admin
    then failwith "NOT_ALLOWED"
    else (([], { store with available_tacos = store.available_tacos + tacos_to_make }) : 
        (operation list * storage))