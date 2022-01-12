import {Plugin, Task, Option} from 'taqueria-sdk'
import compile from './compile'

Plugin.create(i18n => ({
    name: "smartpy",
    schema: "1.0",
    version: "0.1",
    tasks: [
        Task.create({
            task: "compile",
            command: "compile [sourceFile]",
            aliases: ["c", "compile-smartpy"],
            description: "Compile a smart contract written in a SmartPy syntax to Michelson code",
            options: [],
            handler: "proxy"
        }),
        Task.create({
            task: "teapot",
            command: "teapot",
            aliases: ["t", "tea"],
            description: "Have a cup of tea",
            options: [
                Option.create({
                    shortFlag: "g",
                    flag: "green",
                    description: "Make green tea instead"
                })
            ],
            handler: `echo "I'm a little teapot <%= it.green ? "full of green tea!" : "!" %>"`
        })
    ],
    checkRuntimeDependencies: () => Promise.resolve({
        status: "success",
        report: [
            {name: "SmartPy", path: "SmartPy.sh", version: ">=0.8.4", kind: "required", met: true}
        ]
    }),
    installRunTimeDependencies: () => Promise.resolve({
        status: "success",
        output: "Ligo was found in /usr/bin/ligo" // TODO this should use i18n
    }),
    proxy: compile
}), process.argv)