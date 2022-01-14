var $2OpfP$taqueriasdk = require("taqueria-sdk");
var $2OpfP$child_process = require("child_process");
var $2OpfP$fastglob = require("fast-glob");
var $2OpfP$path = require("path");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}




const $9ee2660feae247c1$var$execCmd = (cmd)=>new Promise((resolve, _)=>{
        $2OpfP$child_process.exec(`sh -c "${cmd}"`, (err, stdout, stderr)=>{
            if (err) resolve({
                status: 'failed',
                stdout: stdout,
                stderr: err.message
            });
            else if (stderr) resolve({
                status: 'failed',
                stdout: stdout,
                stderr: stderr
            });
            else resolve({
                status: 'success',
                stdout: stdout,
                stderr: stderr
            });
        });
    })
;
const $9ee2660feae247c1$var$getCompileCommand = (opts)=>(sourceFile)=>`~/smartpy-cli/SmartPy.sh compile ${$2OpfP$path.join(opts.contractsDir, sourceFile)} ${opts.artifactsDir}`
;
const $9ee2660feae247c1$var$compileContract = (opts)=>(sourceFile)=>$9ee2660feae247c1$var$execCmd($9ee2660feae247c1$var$getCompileCommand(opts)(sourceFile))
;
const $9ee2660feae247c1$var$compileAll = (opts)=>{
    // TODO: Fetch list of files from SDK
    return ($parcel$interopDefault($2OpfP$fastglob))([
        '**/*.py'
    ], {
        cwd: opts.contractsDir,
        absolute: false
    }).then((entries)=>entries.map($9ee2660feae247c1$var$compileContract(opts))
    ).then((promises)=>Promise.all(promises)
    ).then((results)=>{
        const response = {
            status: 'success',
            stdout: results ? "Done.\n" : "No SmartPy contracts found.\n",
            stderr: ""
        };
        return response;
    });
};
const $9ee2660feae247c1$export$ef7acd7185315e22 = (parsedArgs)=>parsedArgs.sourceFile ? $9ee2660feae247c1$var$compileContract(parsedArgs)(parsedArgs.sourceFile) : $9ee2660feae247c1$var$compileAll(parsedArgs)
;
var $9ee2660feae247c1$export$2e2bcd8739ae039 = $9ee2660feae247c1$export$ef7acd7185315e22;


$2OpfP$taqueriasdk.Plugin.create((i18n)=>({
        name: "smartpy",
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
                options: [],
                handler: "proxy"
            }),
            $2OpfP$taqueriasdk.Task.create({
                task: "teapot",
                command: "teapot",
                aliases: [
                    "t",
                    "tea"
                ],
                description: "Have a cup of tea",
                options: [
                    $2OpfP$taqueriasdk.Option.create({
                        shortFlag: "g",
                        flag: "green",
                        description: "Make green tea instead",
                        boolean: true
                    })
                ],
                handler: `echo "I'm a little teapot <%= it.green ? "full of green tea!" : "!" %>"`
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
        proxy: $9ee2660feae247c1$export$2e2bcd8739ae039
    })
, process.argv);


//# sourceMappingURL=index.js.map
