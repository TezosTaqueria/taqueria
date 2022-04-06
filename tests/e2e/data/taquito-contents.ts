export const originateSingleOutput = (address:string) => `
┌────────────────┬──────────────────────────────────────┬─────────────┐
│ Contract       │ Address                              │ Destination │
├────────────────┼──────────────────────────────────────┼─────────────┤
│ hello-tacos.tz │ KT1N4bZh884qhirEsmPge6y8a9mRfhEoMGaX │ hangzhounet │
└────────────────┴──────────────────────────────────────┴─────────────┘
`.replace('KT1N4bZh884qhirEsmPge6y8a9mRfhEoMGaX', address).trimStart()