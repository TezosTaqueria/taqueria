import {Plugin, Task, Option} from '@taqueria/node-sdk'
import type { i18n} from '@taqueria/node-sdk/types'
import {tasks} from './tasks'

Plugin.create((i18n: i18n) => ({
    name: "contract-types",
    schema: "1.0",
    version: "0.1",
    tasks: [
        Task.create({
            task: "types",
            command: "typegen [contract]",
            description: "Generate types for a contract to be used with taquito",
            options: [
                Option.create({
                    shortFlag: "o",
                    flag: "typescriptDir",
                    description: "The entry point that will be compiled"
                }),
                Option.create({
                    shortFlag: "t",
                    flag: "typeAliasMode",
                    choices: ['file', 'simple'],
                    description: "The type aliases used in the generated types"
                }),
            ],
            aliases: ["types"],
            handler: "proxy"
        }),
    ],
    proxy: tasks.generateTypes,
}), process.argv)