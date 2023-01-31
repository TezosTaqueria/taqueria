#include "hello-tacos.mligo"
// All storage values must be in this file

// Define a storage variable. By default, the first variable in this list will be used to deploy
let store42tacos: storage = {
    available_tacos = 42n;
    admin = ("tz1ge3zb6kC5iUZcXsjxiwwtU5MwP37T6m1z" : address)
}

let store420tacos: storage = {
    available_tacos = 420n;
    admin = ("tz1ge3zb6kC5iUZcXsjxiwwtU5MwP37T6m1z" : address)
}