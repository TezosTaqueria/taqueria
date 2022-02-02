const {Plugin, Task, Option} = require('@taqueria/node-sdk')

Plugin.create(i18n => ({
    schema: "1.0",
    version: "0.1",
    alias: "mock",
    tasks: [
        Task.create({
            task: "ping",
            command: "ping",
            aliases: ["p", "ping-test"],
            description: "Return predefined result for CLI integration testing",
            options: [
                Option.create({
                    shortFlag: "e",
                    flag: "error",
                    description: "Mock plugin is used for integration testing"
                })
            ],
            handler: "proxy"
        })
    ],
    proxy: parsedArgs => Promise.resolve({
        status: "success",
        stdout:  "pong",
        stderr: "",
        artifacts: []
    })
}), process.argv)