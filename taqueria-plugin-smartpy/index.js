var $2OpfP$taqueriasdk = require("taqueria-sdk");


$2OpfP$taqueriasdk.Plugin.create((i18n)=>({
        schema: "1.0",
        version: "0.1",
        tasks: [
            $2OpfP$taqueriasdk.Task.create({
                task: "compile",
                command: "compile [sourceFile]",
                aliases: [
                    "c",
                    "compile-smartpy"
                ],
                description: "Compile a smart contract written in a SmartPy syntax to Michelson code",
                options: [
                    $2OpfP$taqueriasdk.Option.create({
                        shortFlag: "e",
                        flag: "entry-point",
                        description: "The entry point that will be compiled"
                    }),
                    $2OpfP$taqueriasdk.Option.create({
                        shortFlag: "s",
                        flag: "syntax",
                        description: "The syntax used in the contract"
                    }),
                    $2OpfP$taqueriasdk.Option.create({
                        shortFlag: "i",
                        flag: "infer",
                        description: "Enable type inference"
                    })
                ],
                handler: $2OpfP$taqueriasdk.binary("ligo %entry-point% %syntax% %infer% %sourceFile% %contractsDir%")
            })
        ],
        checkRuntimeDependencies: ()=>Promise.resolve({
                status: "success",
                report: [
                    {
                        name: "SmartPy",
                        path: "SmartPy.sh",
                        version: ">=0.8.4",
                        kind: "required",
                        met: true
                    }
                ]
            })
        ,
        installRunTimeDependencies: ()=>Promise.resolve({
                status: "success",
                output: "Ligo was found in /usr/bin/ligo" // TODO this should use i18n
            })
        ,
        proxy: (parsedArgs)=>Promise.resolve({
                status: "success",
                stdout: "Proxied successfully",
                stderr: "",
                artifacts: []
            })
    })
, process.argv);


//# sourceMappingURL=index.js.map
