type taco_quantity = nat
type admin = address

type storage = {
    available_tacos: taco_quantity;
    admin: admin
}

type parameter =
| Buy of taco_quantity
| Make of taco_quantity