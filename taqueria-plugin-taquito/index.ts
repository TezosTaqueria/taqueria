import {Plugin, Task} from '@taqueria/node-sdk'
import originate from './originate'

Plugin.create(_i18n => ({
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
