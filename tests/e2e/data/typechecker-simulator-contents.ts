export const oneRowTable = `
┌────────────────┬────────┐
│ Contract       │ Result │
├────────────────┼────────┤
│ hello-tacos.tz │ Valid  │
└────────────────┴────────┘
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
┌──────────┬────────────────┐
│ Contract │ Result         │
├──────────┼────────────────┤
│ test.tz  │ Does not exist │
└──────────┴────────────────┘
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