export const mligo_template = `
type storage = int

type parameter =
  Increment of int
| Decrement of int
| Reset

type return = operation list * storage

// Two entrypoints

let add (store, delta : storage * int) : storage = store + delta
let sub (store, delta : storage * int) : storage = store - delta

(* Main access point that dispatches to the entrypoints according to
   the smart contract parameter. *)
   
let main (action, store : parameter * storage) : return =
 ([] : operation list),    // No operations
 (match action with
   Increment (n) -> add (store, n)
 | Decrement (n) -> sub (store, n)
 | Reset         -> 0)
`;

export const pascaligo_template = `
type storage is int

type parameter is
  Increment of int
| Decrement of int
| Reset

type return is list (operation) * storage

// Two entrypoints

function add (const store : storage; const delta : int) : storage is 
  store + delta

function sub (const store : storage; const delta : int) : storage is 
  store - delta

(* Main access point that dispatches to the entrypoints according to
   the smart contract parameter. *)
   
function main (const action : parameter; const store : storage) : return is
 ((nil : list (operation)),    // No operations
  case action of [
    Increment (n) -> add (store, n)
  | Decrement (n) -> sub (store, n)
  | Reset         -> 0
  ])
`;

export const religo_template = `
type storage = int;

type parameter =
  Increment (int)
| Decrement (int)
| Reset;

type return = (list (operation), storage);

// Two entrypoints

let add = ((store, delta) : (storage, int)) : storage => store + delta;
let sub = ((store, delta) : (storage, int)) : storage => store - delta;

/* Main access point that dispatches to the entrypoints according to
   the smart contract parameter. */
   
let main = ((action, store) : (parameter, storage)) : return => {
 (([] : list (operation)),    // No operations
 (switch (action) {
  | Increment (n) => add ((store, n))
  | Decrement (n) => sub ((store, n))
  | Reset         => 0}))
};
`;

export const jsligo_template = `
type storage = int;

type parameter =
  ["Increment", int]
| ["Decrement", int]
| ["Reset"];

type ret = [list<operation>, storage];

// Two entrypoints

const add = ([store, delta] : [storage, int]) : storage => store + delta;
const sub = ([store, delta] : [storage, int]) : storage => store - delta;

/* Main access point that dispatches to the entrypoints according to
   the smart contract parameter. */

const main = ([action, store] : [parameter, storage]) : ret => {
 return [list([]) as list<operation>,    // No operations
 match (action, {
  Increment:(n: int) => add ([store, n]),
  Decrement:(n: int) => sub ([store, n]),
  Reset    :()  => 0})]
};
`;
