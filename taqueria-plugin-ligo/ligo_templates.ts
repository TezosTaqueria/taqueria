export const mligo_template = `
module Counter = struct
  type storage = int

  type ret = operation list * storage

  (* Three entrypoints *)

  [@entry]
  let increment (delta : int) (store : storage) : ret = [], store + delta

  [@entry]
  let decrement (delta : int) (store : storage) : ret = [], store - delta

  [@entry]
  let reset (() : unit) (_ : storage) : ret = [], 0

end
`;

export const jsligo_template = `
export namespace Counter {
    export type storage = int;
    type ret = [list<operation>, storage];
    // Three entrypoints
  
    @entry
    const increment = (delta: int, store: storage): ret =>
      [list([]), store + delta];
    @entry
    const decrement = (delta: int, store: storage): ret =>
      [list([]), store - delta];
    @entry
    const reset = (_p: unit, _s: storage): ret => [list([]), 0]
  };
`;
