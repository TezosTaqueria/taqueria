#include "_schema.mligo"

let buy ((tacos_to_buy, store) : (taco_quantity * storage)) =
    if tacos_to_buy > store.available_tacos
    then failwith "NOT_ENOUGH_TACOS"
    else [], { store with available_tacos = (store.available_tacos - tacos_to_buy) |> abs }