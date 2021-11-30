import {Plugin, Task, Option, binary} from 'taqueria-sdk'

Plugin.create(i18n => ({
    schema: "1.0",
    version: "0.1",
    tasks: [
        Task.create({
            task: "compile",
            command: "compile [sourceFile]",
            aliases: ["c", "compile-smartpy"],
            description: "Compile a smart contract written in a SmartPy syntax to Michelson code",
            options: [],
            handler: binary("SmartPy.sh %entry-point% %syntax% %infer% %sourceFile% %contractsDir%")
        }),
        Task.create({
            task: "teapot",
            command: "teapot",
            aliases: ["t", "tea"],
            description: "Have a cup of tea",
            options: [
                Option.create({
                    shortflag: "g",
                    flag: "green",
                    description: "Make green tea instead"
                })
            ],
            handler: "proxy"
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
    proxy: parsedArgs => Promise.resolve({
        status: "success",
        stdout: "Proxied successfully",
        stderr: "",
        artifacts: []
    })
}), process.argv)