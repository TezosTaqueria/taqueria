import {State, Operation} from "@taqueria/node-sdk"

export default (state: State) => ({
    name: "helloworld",
    depends_on: ["op_name_1", "op_name_2"],
    fn: (op: Operation) => op("World")
})

// taq create op example hello