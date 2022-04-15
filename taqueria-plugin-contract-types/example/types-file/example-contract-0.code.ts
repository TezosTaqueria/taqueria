export const ExampleContract0Code: { __type: 'ExampleContract0Code'; protocol: string; code: object[] } = {
    __type: 'ExampleContract0Code',
    protocol: 'PsDELPH1Kxsxt8f9eWbxQeRxkjfbxoqM52jvs5Y5fBxWWh4ifpo',
    code: JSON.parse(
        `[{"prim":"parameter","args":[{"prim":"or","args":[{"prim":"or","args":[{"prim":"int","annots":["%decrement"]},{"prim":"int","annots":["%increment"]}]},{"prim":"unit","annots":["%reset"]}]}]},{"prim":"storage","args":[{"prim":"int"}]},{"prim":"code","args":[[[[{"prim":"DUP"},{"prim":"CAR"},{"prim":"DIP","args":[[{"prim":"CDR"}]]}]],{"prim":"IF_LEFT","args":[[{"prim":"IF_LEFT","args":[[{"prim":"SWAP"},{"prim":"SUB"}],[{"prim":"ADD"}]]}],[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"PUSH","args":[{"prim":"int"},{"int":"0"}]}]]},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"PAIR"}]]}]`,
    ),
}
