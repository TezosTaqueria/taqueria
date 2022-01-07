import {Plugin, Task, Option} from 'taqueria-sdk'
import type { i18n } from 'taqueria-sdk/types'

Plugin.create((i18n: i18n) => ({
    schema: "1.0",
    version: "0.1",
    tasks: [
        Task.create({
            task: "deploy",
            command: "deploy <env> [contract]",
            description: "Deploy a smart contract to a particular environment",
            options: [],
            aliases: ["originate"],
            handler: "proxy"
        }),
    ],
    proxy (i18n: i18n, parsedArgs={}) {
        return import("@taquito/taquito")
            .then(({TezosToolkit}) => {
                if (parsedArgs._ === "originate" || parsedArgs._ === "deploy") {
                    return Promise.resolve({
                        status: 'success',
                        stdout: 'Proxied successfully',
                        stderr: '',
                        artifacts: []
                    })
                }
                return Promise.reject({
                    errCode: "E_TASK_NOT_SUPPORTED",
                    errMsg: `${parsedArgs._} is not supported`,
                })
            })
    }
}), process.argv)