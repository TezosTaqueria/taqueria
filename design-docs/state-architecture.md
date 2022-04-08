# Taqueria State Architecture

Authors:    Michael Weichert <<michael.weichert@ecadlabs.com>>

Date:       Apr 7, 2022

Revision:   1

---

This document is to provide a comprehensive overview of what the State Architecture is in Taqueria, and how it is used to power much of Taqueria's core functionality.

## Initial Assumptions

In the context of the design for the Taqueria State Architecture, the following assumptions have been made:

### .taq/state.json has been renamed to ".taq/cache.json".

When speaking of state, we should differentiate from the current _state.json_ file in the _.taq_ directory that is used to cache the list of available tasks provided by plugins installed in the Taqueria project.

From hereon, _.taq/state.json_ will be referred to as _.taq/cache.json_ or the "ephemeral state". Any subsequent uses of _.taq/state.json_ will refer to the "persistent state".

## What is the State Archecture

The Taqueria CLI has a state architecture that is segmented into two parts, ephemeral state and persistent state.

### Ephemeral State

This segment of the state architecture represents data that is cached for performance reasons, and its existence shouldn't be relied upon. It can change or be deleted at any time.

The ephemeral state will be temporarily persisted to _.taq/cache.json_ (formally _.taq/state.json_).

Currently, the ephermal state is represented as a JSON object, with a _hash_ field that stores the md5sum of the _config.json_ file when the state was initially constructed. A second field called _tasks_ is used to store and represent a task-to-plugin mapping. This mapping can be used to reduce the amount of communication conducted at the plugin protocol layer.

When the Taqueria CLI is used to execute a task, internally the CLI determines whether a _.taq/cache.json_ exists, and if so, extracts the value of the hash field, and compares that to the md5sum of the current _.taq/config.json_ file. If the hashes differ, then the state is invalid and regenerated.

### Persistent State

This segment of the state architecture is designed to persist throughout the lifetime of the project.

The persistent state is persisted to _.taq/state.json_. State files are specific to an environment, and therefore
it is possible to have more than one. The default environment uses _.taq/state.json_, but other environments use _[environment-name]-state.json_.

It is populated via the execution of operations. An operation is an on-chain or off-chain process that when executed, produces outputs. These outputs compose the project state, hence why they are used to populate the persistent state.

> NOTE: Operations are considered low-level building blocks. The expectation is that an end-developer needs to be aware of what they are, what they do, and how they're used - but it should be rare that the CLI is used to manually create an operation.

# Plugins

## Templates

Plugins currently expose a list of tasks which can be consumed by the Taqueria CLI and re-exposed via the CLI or VS Code Plugin.

However, plugins can also expose a list of templates, used to construct new entities.

For example, here is how the ligo plugin might expose a template for creating a new contract:

```ts
PLugin.create({
    tasks: [
        ...
    ],
    templates: [
        Template.create({
            name: "contract",
            command: "contract <filename>",
            description: "Constructs a new Ligo contract"
            options: [
                Option.create({
                    flag: "syntax",
                })
            ],
            handler: (parsedArgs) => {
                // Generates a new contract
                // in the contracts/ directory
                // using the syntax specified
                ...
            }
        })
    ] 
})
```

The above API for exposing a template is very similiar to that for a task.

To use this template, the end-developer would call a built-in task of the CLI called _create_:

`taq create contract increment --syntax mligo`

The above command would generate a file called _increment.mligo_ in the _contracts_ directory of the Taqueria project, and would contain the source code as defined in the _contract_ template provided by the ligo plugin.

As with tasks, if a _contract_ template were provided by multiple plugins, the `--plugin` argument could be used to be explicit about what plugin should be used.

## Operations

A plugin can also expose a list of operations as defined earlier. Here's an example of how the LIGO plugin could provide a compile operation:

```ts
Plugin.create({
    tasks: [
        // Compile task defined here
        ...
    ],
    templates: [
        // Templates defined here
        ...
    ],
    operations: [
        Operation.create({
            name: "compile",
            command: "compile <filename>",
            handler: (parsedArgs) => `
                export default () => ({
                    name: "${parsedArgs.filename}",
                    description: "Compiles ${parsedArgs.filename} to Michelson",
                    task: {
                        name: "compile",
                        sourceFile: "${parsedArgs.filename}"
                    }
                })
            `
        })
    ]
})
```

The above defines an operation that when executed, would compile a contract using the _compile_ task provided by the current plugin. An operation can represent a the execution of a task, or some arbitary process defined in TypeScript.

To create this operation, the end-developer would execute:

`taq create op compile increment.mligo`

This would generate a _ligo.compile.increment.mligo.ts_ file in the _operations_ directory of the Taqueria project with the following contents:

```ts
export default () => ({
    id: "[HASH]",
    name: "ligo.compile.increment.mligo",
    description: "Compiles increment.mligo to Michelson",
    task: {
        name: "compile",
        sourceFile: "increment.mligo",
    }
})
```

To apply the operation, the end-developer would call a built-in CLI task called _apply_:

`taq apply ligo.compile.increment.mligo`

This would create an artifacts/increment.tz file, and too, add the following to .taq/state.json:

```json
operations: {
    ...
    "ligo.compile.increment.mligo": [{
        "contract": "increment.mligo", "artifact": "increment.tz"
    }]
}
```

An operation doesn't have to rely on a task, or be provided by a plugin. Any valid JavaScript / TypeScript code that is executable by the Deno runtime is supported.

> NOTE: we might decide that its best to use the Node runtime instead

To help faciliate advanced use cases, the `taq create op custom helloworld` command will generate boilerplate for an operation that can be manually populated with arbitrary code desired by the end-developer:

```ts
export default () => ({
    id: "[HASH]",
    name: "custom.helloworld",
    description: "Custom Operation",
    operation: () => Promise.resolve({
        result: "helloworld"
    })
})
```

Assuming this operation were executed as-is, then the following would be added to .taq/state.json:

```json
operations: {
    ...
    "custom.helloworld": {
        "result": "helloworld"
    }
}
```

### Operation conditions

Operations can run conditionally depending how they're configured.

For instance, to apply the _ligo.compile.increment.mligo_ operation above only when the _increment.mligo_ file has changed, then we could adjust our operation:

```ts
export default (state) => ({
    id: "[HASH]",
    name: "ligo.compile.increment.mligo",
    description: "Compiles increment.mligo to Michelson",
    task: {
        name: "compile",
        sourceFile: "increment.mligo",
    },
    when: () => {
      state.contracts["increment.mligo"]?.modifiedTime > state.lastRunTime
    }
})
```

In this example, the data structure of the .taq/state.json file is provided to the default exported function.

### Operation Dependencies

There will be many cases when you need to run a list of operations in-series rather than in-parallel, which is the default execution strategy.

To do that, an operation can be configured to depend on another operation:

```ts
import compile_op from './ligo.compile.increment.mligo.ts'

export default (state) => ({
    id: "[HASH]",
    name: "custom.helloworld",
    description: "After compiling increment.mligo",
    operation: () => Promise.resolve({
        result: "helloworld"

    }),
    depends_on: [compile_op()]
})
```

The above example will ensure that the compile operation occurs before the custom operation.

Operations can reference data and output from their dependencies as well. For instance, here's an example of an operation that adds "Generated with Taqueria" as a comment to the top of an Michelson artifact after compilation:

```ts
import compile_op from './ligo.compile.increment.mligo.ts'

export default (state, api) => {
    const compile = state[compile_op.name]
    const {artifact} = compile.outputs[0]

    return {
       id: "[HASH]",
        name: `custom.add_comment_to_${artifact}`,
        description: `After compiling ${artifact}`,
        operation: async () => {
            const filename = api.getArtifactAbspath(artifact)

            const contents = Deno.readFile(filename)

            const header = "# Generated by Taqueria"

            return Deno.writeFile(
                filename,
                `${header}\n${contents}`
            )
        },
        depends_on: [compile_op()]
    }
}
```

## Running Operations

It's expected that your project's state will be populated via multiple operations and having to apply each, one-by-one, would get cumbersome. As such, an end-developer can execute `taq apply` without explicitly stating which operation to apply.

The invocation of `taq apply` starts a process of a few different steps:

1. Check if a _.taq/state.lock_ file exists, which indicates that another process is running and applying operations. If the file exists, then we display an error message indicating that another process needs to complete before we can start another.

2. We parse all operations in the _operations_ directory and create a directed acyclic graph, which is then processed using a batch-alternative to the Kahn's topological sorting algorithm. This returns a list of lists, indicating what operations can be executed in parallel and what must be executed serially. In TypeScript, the data structure would be: `(Operation[])[]`

The outer list is processed sequentially, and the inner lists are processed in parallel.

3. The _.taq/state.json_ is read if it exists, otherwise one is created with an empty object as its contents: `{}`.

4. The initial state is passed to the first list of operations which will return the updated state representation. This is then passed as input to the remaining operation lists in sequence, each returning the next state update, till all operations have been executed.

5. The final state is written to the _.taq/state.json_ file.

6. The _.taq/state.lock_ file is removed.

## Visualizing Operations

Its useful to visualize the relationships between the operations before applying them. To do so, an end-developer can run a built-in task called _plan_:

`taq plan`

This will output a dependency graph diagram to better understand the relationships between the operations that will be applied when running `taq apply`. By default, the output of this graph will be in the Mermaid markup language but an `--output` flag can be specified with one of the following values:
- _mermaid_ (default:) use [Mermaid](https://mermaid-js.github.io/mermaid/#/) markup language
- _json_: output a JSON representation of the graph

I suspect that we'll add multiple outputs over time.

Our Taqueria VS Code extension can make use of this to show a dependency graph as well.

# Abstraction

The following contructs are described and provided to create an abstraction around operations, and reduce the need to create them manually using the CLI.

## Hooks

It would be rather inconvenient for an end-developer if they were required to manually create every operation needed to deploy their project.

To address this, plugin authors can attach a hook that gets executed when a task is invoked.

> REMINDER: A task can be invoked by the end-developer interacting with the CLI or VS Code extension, or it could be triggered by some kind of automation such as a cron job, CI/CD process, etc.

For instance, the LIGO plugin author might want to generate an operation for compiling the contract when a new contract is created from one their templates:

```ts
Plugin.create({
    tasks: [
        // the "compile" task defined here
    ],
    templates: [
        // the "contract" template defined here
    ],
    operations: [
        // the "compile" operation defined here
    ],
    hooks: [
        Hook.create({
            task: "create",
            template: "contract",
            plugin: "ligo",
            priority: 50,
            kind: "posthook",
            handler: "taq create op compile <%= it.filename %> compile_<%= it.filename %>.ts"
        })
    ]
})
```

The above defines a hook to the "create" task when the "template" parameter is set to "contract". The hook is defined as a posthook, meaning that it will get triggered _after_ the following is executed:

`taq create contract increment.mligo`

When the above task is executed, the handler defined will be executed which will have its EJS template variables substituted with the names of the positional arguments the _contract_ template accepts. Like tasks and templates, a handler can also be function for more advanced use-cases.

Below is an example of the handler that would get executed in this example:

`taq create op compile increment.mligo compile_increment.mligo.ts`

A plugin can define hooks which act on tasks provided from other plugins. For instance, the taquito plugin could register a hook for creating an originate operation when a ligo contract template is used:

```ts
Plugin.create({
    tasks: [
        // the "originate" task defined here
    ],
    operations: [
        // the "originate" operation defined here
    ],
    hooks: [
        Hook.create({
            name: "taquito.create-originate-op-for-ligo-contract",
            task: "create",
            template: "contract",
            plugin: "ligo",
            priority: 50,
            kind: "posthook",
            handler: "taq create op originate <%= it.filename.replace(/(mligo|jsligo|ligo)$/, '.tz') %> originate_<%= it.filename %>.ts"
        })
    ]
})
```

With hooks, executing one command could trigger many downstream hooks to run and generate many operations so that the end-developer doesn't have to. E.g.

Running `taq create contract increment.mligo` could result in the following:
1) A helloworld-like contract being created as contracts/increment.mligo
2) An operation for compiling contracts/increment.mligo
3) An operation for running the test suite
4) An operation for originating increment.tz
5) An operation for generating the metadata
6) An operation for uploading the metadata to IPFS
7) An operation for calling an entrypoint on increment.tz

Because the operations are just TypeScript code, the end-developer can tweak them, remove them, replace them, etc.


> NOTE: Hooks allow for a lot of different manifestations of workflow automation.
> Some examples:
> - Start a sandbox automatically when originating
> - Top-up the account balance after originating or calling an entrypoint
> - Run formal verification software before deploying
> - Post a message on Slack if a test fails

## Hook Configuration

The configuration of a hook can be customized in the _.taq/config.json_ file, either by having its properties overwritten, or disabled:

```
hooks: {
    "taquito.create-originate-op-for-ligo-contract": {
        "enabled": false
    }
}
```

## Desired Outcome

Using tasks, templates, operations, and hooks as underyling building blocks, the developer experience should resemble the following:
- A developer will utlilize templates provided by plugins to create entities with the necessary boilerplate that will greatly minimize the amount of code they have to write, as well as minimize the need to think about project structure.
- Related to the previous point, some of the most common CLI tasks will be `taq create contract` and `taq plan`
- Many operations will be generated when `taq create` is used.
- Developers remain in full control with the ability to CRUD operations using fully typed TypeScript code with a simple API.

## Other considerations

Below are some other ideas for discussion to help with abstractions and advanced use-cases.

### Multi-file contracts via operations

We could use operations as a means of supporting smart contracts that are composed of multiple files.

We already have a task to compile single contracts:

`taq compile [sourceFile]`

However, we'd need to adjust this so that sourceFile is required, not optional. This way `taq compile` cannot be used to compile all files in the _contracts/_ directory which assumes that each individual file is a separate smart contract despite that not always being the case.

Instead, the ligo and smartpy plugins could expose an operation that could be created and used to compile multiple contracts:

```ts
Plugin.create({
    tasks: [
        // Compile task defined here
        ...
    ],
    templates: [
        ...
    ],
    operations: [
        Operation.create({
            name: "compile-all",
            command: "compile <files..>",
            handler: (parsedArgs) => `
                export default (state, api) => ({
                    name: "compile_all",
                    description: "Compiles all contracts to Michelson",
                    operation: () => {
                        const files = ${JSON.stringify(parsedArgs.files)}
                        const tasks = files.map(file => api.runTask({
                            task: "compile",
                            plugin: "ligo",
                            sourceFile: file
                        }))
                        return Promise.all(tasks)
                    }
                })
            `
        })
    ]
})
```

The developer would then just need to run the following to generate an operation which would compile all ligo contracts:

`taq create op compile-all contract1.mligo contract2.jsligo contract3.ligo`

Below is the contents of the _operations/compile_all.ts_ operation that would get emitted from the command above:

```
export default (state, api) => ({
        name: "compile_all",
        description: "Compiles all contracts to Michelson",
        operation: () => {
            const files = ["contract1.mligo", "contract2.mligo", "contract3.ligo"]
            const tasks = files.map(file => api.runTask({
                task: "compile",
                plugin: "ligo",
                sourceFile: file
            }))
            return Promise.all(tasks)
        }
    })
```

> NOTE: If a developer always uses `taq create contract`, then there's no need for the above as operations will be created to compile and originate the contract.

### End-developer defined tasks

A developer should have the ability to define custom tasks of their own that complement their own workflow.

To faciliate this, an end-developer can modify their _.taq/config.json_ file and define custom tasks:

```json
{
    ...,
    "tasks": {
        "compile-increment": {
            "handler": "taq compile --plugin ligo increment.mligo"
        },
        "compile-tacoshop": {
            "handler": "taq compile --plugin smartpy tacoshop.py"
        },
        "compile": {
            "handler": "taq run compile-increment && taq run compile-tacoshop"
        }
    }
}
```

Adding the above JSON to your configuration would expose three new commands:

To compile the increment contract:
`taq run compile-increment`

To compile the tacoshop contract:
`taq run compile-tacoshop`

To compile both:
`taq run compile`

This mechanism would allow you to:
- alias longer existing commands
- create an approach for handling multi-file contracts
- integrate third-party tools for which no plugin exists yet