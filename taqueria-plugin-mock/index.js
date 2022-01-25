const {Plugin, Task, Option} = require('@taqueria/node-sdk')
Plugin.create(i18n => ({
    schema: "1.0",
    version: "0.1",
    tasks: [
        Task.create({
            task: "ping",
            command: "ping",
            aliases: ["p", "ping-test"],
            description: "Return predefined result for CLI integration testing",
            options: [
                Option.create({
                    shortFlag: "e",
                    flag: "return error ",
                    description: "The "
                }),
            ],
            handler: "pong"
        })
    ],
}), process.argv)