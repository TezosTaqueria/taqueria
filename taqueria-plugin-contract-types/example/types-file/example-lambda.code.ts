
export const ExampleLambdaCode: { __type: 'ExampleLambdaCode', protocol: string, code: object[] } = {
    __type: 'ExampleLambdaCode',
    protocol: 'PsDELPH1Kxsxt8f9eWbxQeRxkjfbxoqM52jvs5Y5fBxWWh4ifpo',
    code: JSON.parse(`[{"prim":"parameter","args":[{"prim":"or","args":[{"prim":"address","annots":["%makeACall"]},{"prim":"lambda","annots":["%updateFeedbackFunction"],"args":[{"prim":"address"},{"prim":"string"}]}]}]},{"prim":"storage","args":[{"prim":"pair","args":[{"prim":"lambda","annots":["%feedbackFunction"],"args":[{"prim":"address"},{"prim":"string"}]},{"prim":"address","annots":["%someAddress"]}]}]},{"prim":"code","args":[[[[{"prim":"DUP"},{"prim":"CAR"},{"prim":"DIP","args":[[{"prim":"CDR"}]]}]],{"prim":"SWAP"},[[{"prim":"DUP"},{"prim":"CAR"},{"prim":"DIP","args":[[{"prim":"CDR"}]]}]],{"prim":"DIG","args":[{"int":"2"}]},{"prim":"IF_LEFT","args":[[{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DROP"}],[{"prim":"SWAP"},{"prim":"DROP"},{"prim":"SWAP"}]]},{"prim":"SWAP"},{"prim":"PAIR"},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"PAIR"}]]}]`)
};
