import {Plugin, Task, Option} from 'taqueria-sdk'
import type { i18n} from 'taqueria-sdk/types'
import {tasks} from './tasks'

Plugin.create((i18n: i18n) => ({
    name: "taquito",
    schema: "1.0",
    version: "0.1",
    tasks: [
        Task.create({
            task: "typegen",
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
                    choices: ['local', 'file', 'library', 'simple'],
                    description: "The type aliases used in the generated types"
                }),
            ],
            aliases: ["typegen"],
            handler: "proxy"
        }),
    ],
    proxy: tasks.generateTypes,
}), process.argv)