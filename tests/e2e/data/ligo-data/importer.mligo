#include "counter.mligo"

type my_storage = {
  counter_storage : counter_module.storage;
}

type my_action =
  | CounterAction of counter_module.action

let my_main (action : my_action) (storage : my_storage) : operation list * my_storage =
  match action with
  | CounterAction counter_action ->
    let (ops, new_counter_storage) = counter_module.main counter_action storage.counter_storage in
    (ops, { counter_storage = new_counter_storage })
