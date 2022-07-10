export const ligoNoContracts = `
┌────────────┬──────────┐
│ Contract   │ Artifact │
├────────────┼──────────┤
│ None found │ N/A      │
└────────────┴──────────┘
`.trim();

export const compileNonExistent = `
┌────────────┬──────────────┐
│ Contract   │ Artifact     │
├────────────┼──────────────┤
│ test.mligo │ Not compiled │
└────────────┴──────────────┘
`.trimStart();

export const compileInvalid = `
┌────────────────────────┬──────────────┐
│ Contract               │ Artifact     │
├────────────────────────┼──────────────┤
│ invalid-contract.mligo │ Not compiled │
└────────────────────────┴──────────────┘
`.trimStart();
