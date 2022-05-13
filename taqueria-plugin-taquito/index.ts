import {Plugin, Task} from '@taqueria/node-sdk'
import type { i18n} from '@taqueria/node-sdk/types'
import originate from './originate'

Plugin.create((i18n: i18n) => ({
    alias: "taquito",
    schema: "1.0",
    version: "0.1",
    tasks: [
        Task.create({
            task: "deploy",
            command: "deploy [contract]",
            description: "Deploy a smart contract to a particular environment",
            options: [
            ],
            aliases: ["originate"],
            handler: "proxy",
            encoding: "application/json"
        }),
    ],
    proxy: originate
}), process.argv)
