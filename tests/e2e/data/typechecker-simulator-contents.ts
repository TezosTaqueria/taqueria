export const oneRowTable = `
┌────────────────┬──────────┐
│ Contract       │ Artifact │
├────────────────┼──────────┤
│ hello-tacos.tz │ Valid    │
└────────────────┴──────────┘
`.trimStart()

export const twoRowTable = `
┌────────────────────┬──────────┐
│ Contract           │ Artifact │
├────────────────────┼──────────┤
│ hello-tacos-one.tz │ Valid    │
├────────────────────┼──────────┤
│ hello-tacos-two.tz │ Valid    │
└────────────────────┴──────────┘
`.trimStart()

export const nonExistent = `
┌──────────┬────────────────┐
│ Contract │ Artifact       │
├──────────┼────────────────┤
│ test.tz  │ Does not exist │
└──────────┴────────────────┘
`.trimStart()

export const typeError = `
┌──────────────────────────┬──────────┐
│ Contract                 │ Artifact │
├──────────────────────────┼──────────┤
│ hello-tacos-ill-typed.tz │ Invalid  │
└──────────────────────────┴──────────┘
`.trimStart()

export const runtimeError = `
┌────────────────┬──────────┐
│ Contract       │ Artifact │
├────────────────┼──────────┤
│ hello-tacos.tz │ Invalid  │
└────────────────┴──────────┘
`.trimStart()