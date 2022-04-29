export const oneRowTable = `
┌────────────────┬────────┐
│ Contract       │ Result │
├────────────────┼────────┤
│ hello-tacos.tz │ Valid  │
└────────────────┴────────┘
`.trimStart()

export const oneRowTableSimulateResult = `
┌────────────────┬────────────────────┐
│ Contract       │ Result             │
├────────────────┼────────────────────┤
│ hello-tacos.tz │ storage            │
│                │   3                │
│                │ emitted operations │
│                │                    │
│                │ big_map diff       │
│                │                    │
│                │                    │
└────────────────┴────────────────────┘
`.trimStart()

export const twoRowTable = `
┌────────────────────┬────────┐
│ Contract           │ Result │
├────────────────────┼────────┤
│ hello-tacos-one.tz │ Valid  │
├────────────────────┼────────┤
│ hello-tacos-two.tz │ Valid  │
└────────────────────┴────────┘
`.trimStart()

export const nonExistent = `
┌──────────┬────────┐
│ Contract │ Result │
├──────────┼────────┤
│ test.tz  │ N/A    │
└──────────┴────────┘
`.trimStart()

export const typeError = `
┌──────────────────────────┬─────────┐
│ Contract                 │ Result  │
├──────────────────────────┼─────────┤
│ hello-tacos-ill-typed.tz │ Invalid │
└──────────────────────────┴─────────┘
`.trimStart()

export const runtimeError = `
┌────────────────┬─────────┐
│ Contract       │ Result  │
├────────────────┼─────────┤
│ hello-tacos.tz │ Invalid │
└────────────────┴─────────┘
`.trimStart()

export const tezosClientError =
` 
Error:
  Erroneous command line argument 6 (hello).
  Invalid primitive.
  Unknown primitive hello.


`