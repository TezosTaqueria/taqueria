---
title: Hello Tacos
---


We have made a basic Hello ~~World~~ _Tacos_ Tezos dApp. This dApp shows off the structure of a Tezos dApp and all its components

You can find the Github repo here: [hello_tacos]: https://github.com/ecadlabs/hello-tacos

The Hello Tacos dApp consists of:

- A Taco counting Smart Contract implemented in the following languages
    - Ligo
    - SmartPy
    - Michelson
- A React web application that interacts with the on-chain smart-contract
- Intergration tests that verify the expected behaviour of the smart-contract when on-chain

Follow the steps below to convert (taq'ify) the demo app into a Taqueria project

## Clone and Initialize the Project

Get a local copy of the repos and taqify it.

1. Cloned the repos from github
2. Ran `taq init .`

## Make this an NPM project

As taqueria's plugins are distribed using NPM, the dapp also needs to be an NPM project.

I noticed the the 'test' folder is an NPM project, and so I just moved the package.json and package-lock.json file from there to the root.

1. git mv test/package* .
2. npm i
3. There was an existing .gitignore file, but it was assuming that the "test" directory would contain a node_modules folder. As the root of the project is now an NPM project instead, I'll update this:
##### Before:
```
test/node_modules
app/node_modules
```
##### After:
```
app/node_modules
/node_modules
```

## Install needed Taqueria plugins

1. `taq install ../taqueria/taqueria-plugin-ligo`
2. `taq install ../taqueria/taqueria-plugin-flextesa`
3. `taq install ../taqueria/taqueria-plugin-taquito`


## Remove unncessary scripts

In the package.json file, I'll remove the following NPM scripts which are redundant with taqueria's functionality:
```
"compile-contract": "ligo compile-contract ./contract/hello-tacos.mligo main",
"start-flextesa": "docker run --rm --name hangzhou-sandbox --detach -p 20000:20000 tqtezos/flextesa:20211119 hangzbox start"
```

## Restructure things

1. Moved the contract from the "contract" directory to "contracts": `git mv contract/hello-tacos.mligo contracts/`
2. Moved the integration tests from the "test" directory to the default "tests" directory that Taqueria generates: `git mv test/*.js tests/`
3. In the package.json file, there's a script for running tests in jest:
##### Before:
```
"test": "jest ./hello-tacos.test.js",
```
##### After:
I've modified that to use the "tests" folder:
```
"test": "jest ./tests/hello-tacos.test.js",
```

## LIGO Unit Tests

At this time, Taqueria doesn't support LIGO's unit test functionality - its something we will definitely want to add in the future.

In the mean time, to keep the structure consistent, I'll move the unit test file for the smart contract to the "tests" directory as well:

1. `git mv contract/hello-tacos-test.mligo tests/`
2. I'll need to update the script in NPM used to run those unit tests:
##### Before:
```
"ligo-test": "ligo run test ./contract/hello-tacos-test.mligo"
```
##### After:
```
"ligo-test": "ligo run test ./tests/hello-tacos-test.mligo"
```

## Play with Taqueria!

I think we've done enough and can see how Taqueria handles our project. Lets try compiling our contract: `taq compile`

##### Output:
<pre>
┌───────────────────┬──────────────────────────┐
│ Contract          │ Artifact                 │
├───────────────────┼──────────────────────────┤
│ hello-tacos.mligo │ artifacts/hello-tacos.tz │
└───────────────────┴──────────────────────────┘
</pre>

I'll start up a sandbox and see if I can originate:
1. `taq start sandbox local`
2. Specify an initial storage value for the contract in _.taq/config.json_:
###### Before
```
"environment": {
        "default": "development",
        "development": {
            "networks": [],
            "sandboxes": [
                "local"
            ],
            "storage": {}
        }
    },
```
###### After
```
"environment": {
        "default": "development",
        "development": {
            "networks": [],
            "sandboxes": [
                "local"
            ],
            "storage": {
                "hello-tacos.tz": "100n"
            }
        }
    },
```
2. `taq originate`
###### Output
<pre>
┌────────────────┬──────────────────────────────────────┬─────────────┐
│ Contract       │ Address                              │ Destination │
├────────────────┼──────────────────────────────────────┼─────────────┤
│ hello-tacos.tz │ KT1VAufHWYaxkXgBjdTtXE5fJMe2ieDWS4dp │ local       │
└────────────────┴──────────────────────────────────────┴─────────────┘
</pre>

Looking good!

## Testing

Claude, the author of this dapp, did a nice job of writing some tests. Let see if we can have those run against our sandbox.

I noticed that Claude has some account information in the _hello-tacos.test.js_ file. I'll modify this so that the accounts are pulled from Taqueria:
###### Before:
```
const contractCode = require("../contract/contract.json");

describe("JavaScript tests for Hello Tacos contract", () => {
  let Tezos;
  let signer;
  let helloTacosAddress;
  const alice = {
    sk: "edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq",
    pk: "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
  };
  const bob = {
    sk: "edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt",
    pk: "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6"
  };
  const rpcUrl = "http://localhost:20000";
  ...
```
###### After:
```
const config = require('../.taq/config.json')

describe("JavaScript tests for Hello Tacos contract", () => {
  let Tezos;
  let signer;
  let helloTacosAddress;
  const {alice} = config.sandbox.local.accounts
  const {bob} = config.sandbox.local.accounts
  const {rpcUrl} = config.sandbox.local
  const originalNrOfTacos = 100;
  ...
```

In Taqueria's .taq/config.json, sandbox acounts look like this:
```
"bob": {
    "initialBalance": "3000000000",
    "keys": {
        "alias": "bob",
        "encryptedKey": "edpkurPsQ8eUApnLUJ9ZPDvu98E8VNj4KtJa1aZr16Cr5ow5VHKnz4",
        "publicKey": "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6",
        "secretKey": "unencrypted:edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt"
    }
},
"alice": {
    "initialBalance": "2000000000",
    "keys": {
        "alias": "alice",
        "encryptedKey": "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn",
        "publicKey": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
        "secretKey": "unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq"
    }
},
...
```

As such, I'll need update a few references in the test to assure that the keys can be retrieved properly:
###### Before: (Line 18)
```
signer = new InMemorySigner(alice.sk);
```
###### After:
```
// Taquito requires that the unencrypted key not have a prefix:
signer = new InMemorySigner(alice.keys.secretKey.replace(/unencrypted:/, ''));
```

###### Before:(Line 20)
```
const op = await Tezos.contract.transfer({ to: bob.pk, amount: 1 });
```
###### After:
```
const op = await Tezos.contract.transfer({ to: bob.pk, amount: 1 });
```

Also, Taquito now allows us to provide Michelson code directly without having to compile it to Michelson-JSON. Thus, we'll provide the Michelson contract code to Taquito:
###### Before (Line 24):
```
test("Should originate the Hello Tacos contract", async () => {
    const originationOp = await Tezos.contract.originate({
      code: contractCode,
      storage: originalNrOfTacos
    });
    ...
```
###### After:
```
test("Should originate the Hello Tacos contract", async () => {
    const {readFile} = require('fs/promise')
    const {join} = require('path')
    const contractFile = join(config.artifactsDir, 'hello-tacos.tz')
    const originationOp = await Tezos.contract.originate({
      code: await readFile(contractFile, {encoding:'utf8'}),
      storage: originalNrOfTacos
    });
    ...
```

That should do it. Lets try running the tests:
`npm run test`

###### Output:
<pre>
> hello-tacos@1.0.0 test
> jest ./tests/hello-tacos.test.js

 PASS  tests/hello-tacos.test.js (12.597 s)
  JavaScript tests for Hello Tacos contract
    ✓ Should originate the Hello Tacos contract (5079 ms)
    ✓ Should buy 15 tacos (5083 ms)
    ✓ Should prevent buying tacos if unavailable (14 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        12.659 s
Ran all test suites matching /.\/tests\/hello-tacos.test.js/i
</pre>

## Cleanup

Lets clean up after ourselves:

1. The "contract" directory is no longer needed
`git rm -r contract && rm -rf contract`
2. Nor is the "test" directory
`git rm -r test && rm -rf test`

## Start the Dapp

1. `cd app`
2. `npm i`
3. TBC


--
[hello_tacos]: https://github.com/ecadlabs/hello-tacos