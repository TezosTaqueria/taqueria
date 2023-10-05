module Increment = struct
  [@entry] let increment (p : int) (s : int) : operation list * int = [], s + p
  [@entry] let decrement (p : int) (s : int) : operation list * int = [], s - p
end

module HelloWorld = struct
  [@entry] let getName (_: unit) (s: string) : operation list * string = [], s
  [@entry] let setName (name: string) (_: string) : operation list * string = [], name
end