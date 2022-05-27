import {Plugin, Task, Option} from '@taqueria/node-sdk'
import compile from './compile'

Plugin.create(i18n => ({
    schema: "1.0",
    version: "0.1",
    alias: "ligo",
    tasks: [
        Task.create({
            task: "compile",
            command: "compile [sourceFile]",
            aliases: ["c", "compile-ligo"],
            description: "Compile a smart contract written in a Ligo syntax to Michelson code",
            options: [
                Option.create({
                    shortFlag: "e",
                    flag: "entrypoint",
                    description: "The entry point that will be compiled"
                }),
                Option.create({
                    shortFlag: "s",
                    flag: "syntax",
                    description: "The syntax used in the contract"
                }),
                Option.create({
                    shortFlag: "i",
                    flag: "infer",
                    description: "Enable type inference"
                })
            ],
            handler: 'proxy',
            encoding: 'json'
        })
    ],
    checkRuntimeDependencies: () => Promise.resolve({
        status: "success",
        report: [
            {name: "LIGO", path: "ligo", version: ">=0.27.0", kind: "required", met: true}
        ]
    }),
    installRunTimeDependencies: () => Promise.resolve({
        status: "success",
        output: "LIGO was found in /usr/bin/ligo" // TODO this should use i18n
    }),
    proxy: compile
}), process.argv)