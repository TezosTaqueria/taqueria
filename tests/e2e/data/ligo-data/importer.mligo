#import "counter-main.mligo" "Counter"


let main (action : Counter.parameter) (storage : Counter.storage) : operation list * Counter.storage =
  match action with
  | Increment n -> ([], Counter.add(storage, n))
  | Decrement n -> ([], Counter.sub(storage, n))
  | Reset -> ([], 0)
