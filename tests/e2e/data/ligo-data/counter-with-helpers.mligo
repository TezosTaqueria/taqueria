#include "math-helpers.mligo"

module Counter = struct

  let increment (p : int) (s : int) : int = MathHelpers.add s p

  let decrement (p : int) (s : int) : int = MathHelpers.subtract s p

end
