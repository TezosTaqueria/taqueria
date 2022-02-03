type available_tacos = nat

type tacos_to_buy = nat

let main (tacos_to_buy, available_tacos: tacos_to_buy * available_tacos): operation list * available_tacos =
    if tacos_to_buy > available_tacos
    then (failwith "NOT_ENOUGH_TACOS": operation list * available_tacos)
    else ([]: operation list), abs(available_tacos - tacos_to_buy)