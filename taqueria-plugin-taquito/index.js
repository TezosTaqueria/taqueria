var $2OpfP$taqueriasdk = require("taqueria-sdk");
var $2OpfP$taquitotaquito = require("@taquito/taquito");



$2OpfP$taqueriasdk.Plugin.create((i18n)=>({
        schema: "1.0",
        version: "0.1",
        tasks: [
            $2OpfP$taqueriasdk.Task.create({
                task: "deploy",
                command: "deploy <env> [contract]",
                description: "Deploy a smart contract to a particular environment",
                options: [],
                aliases: [
                    "originate"
                ],
                handler: "proxy"
            }), 
        ],
        proxy (i18n, parsedArgs = {
        }) {
            return $540d8189592d6ab1$importAsync$42884a64a65bcbb.then(({ TezosToolkit: TezosToolkit  })=>{
                if (parsedArgs._ === "originate" || parsedArgs._ === "deploy") return Promise.resolve({
                    status: 'success',
                    stdout: 'Proxied successfully',
                    stderr: '',
                    artifacts: []
                });
                return Promise.reject({
                    errCode: "E_TASK_NOT_SUPPORTED",
                    errMsg: `${parsedArgs._} is not supported`
                });
            });
        }
    })
, process.argv);


//# sourceMappingURL=index.js.map
