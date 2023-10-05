export const mligo_template = `
type storage = int
type return = operation list * storage

(* Three entrypoints *)
[@entry] let increment (delta : int) (store : storage) : return =
  [], store + delta
[@entry] let decrement (delta : int) (store : storage) : return =
  [], store - delta
[@entry] let reset (() : unit) (_ : storage) : return =
  [], 0
`;

export const jsligo_template = `
type storage = int;
type ret = [list<operation>, storage];

// Three entrypoints

// @entry
const increment = (delta : int, store : storage) : ret =>
  [list([]), store + delta];

// @entry
const decrement = (delta : int, store : storage) : ret =>
  [list([]), store - delta];

// @entry
const reset = (_ : unit, _ : storage) : ret =>
  [list([]), 0];
`;
