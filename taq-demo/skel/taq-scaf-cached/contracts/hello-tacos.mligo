
#include "_buy.mligo"
#include "_make.mligo"

let main ((action, store) : (parameter * storage)) = 
    match action with
    | Buy qty -> buy(qty, store)
    | Make qty -> make(qty, store)