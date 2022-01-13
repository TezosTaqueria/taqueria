import {Plugin, Task} from 'taqueria-sdk'
import type { i18n} from 'taqueria-sdk/types'
import generateTypes from './src/generate-types'

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
            ],
            aliases: ["typegen"],
            handler: "proxy"
        }),
    ],
    proxy: generateTypes
}), process.argv)