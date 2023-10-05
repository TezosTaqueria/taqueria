module MathHelpers = struct

  let add (a : int) (b : int) : int = a + b

  let subtract (a : int) (b : int) : int = a - b

  let multiply (a : int) (b : int) : int = a * b

  let divide (a : int) (b : int) : int =
    if b = 0 then
      failwith "Division by zero"
    else
      a / b

end
