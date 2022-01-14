var $2OpfP$taqueriasdk = require("taqueria-sdk");
var $2OpfP$fastglob = require("fast-glob");
var $2OpfP$path = require("path");
var $2OpfP$taquitotaquito = require("@taquito/taquito");
var $2OpfP$taquitosigner = require("@taquito/signer");
var $2OpfP$fspromises = require("fs/promises");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}






const $35bab199ffdafb78$var$getContractAbspath = (contractFilename, parsedArgs)=>$2OpfP$path.join(parsedArgs.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`)
;
const $35bab199ffdafb78$var$originateContract = (parsedArgs)=>async (contractFilename)=>{
        const contractAbspath = $35bab199ffdafb78$var$getContractAbspath(contractFilename, parsedArgs);
        // TODO: Should getting the default environment be provided by the SDK or the framework?
        const currentEnv = parsedArgs.env ? parsedArgs.env : parsedArgs.config.environment ? parsedArgs.config.environment.default : 'development';
        const env = parsedArgs.config.environment && parsedArgs.config.environment[currentEnv] ? parsedArgs.config.environment[currentEnv] : undefined;
        // Has storage been provided for this contract?
        if (env && env.storage) try {
            const tezos = new $2OpfP$taquitotaquito.TezosToolkit(env.rpcUrl);
            const contractData = await $2OpfP$fspromises.readFile(contractAbspath, "utf-8");
            await $2OpfP$taquitosigner.importKey(tezos, env.faucet.email, env.faucet.password, env.faucet.mnemonic.join(' '), env.faucet.activation_code);
            return tezos.contract.originate({
                code: contractData,
                storage: env.storage[contractFilename]
            }).then((operation)=>`${contractFilename}: ${operation.contractAddress}`
            );
        } catch (err) {
            return Promise.reject({
                status: 'failed',
                stdout: "",
                stderr: err
            });
        }
        return Promise.reject({
            status: 'failed',
            stderr: `No storage configured in your configuration file for ${contractFilename}`,
            stdout: ""
        });
    }
;
const $35bab199ffdafb78$var$originateAll = (parsedArgs)=>($parcel$interopDefault($2OpfP$fastglob))("**/*.tz", {
        cwd: parsedArgs.artifactsDir
    }).then((files)=>Promise.all(files.map($35bab199ffdafb78$var$originateContract(parsedArgs)))
    )
;
const $35bab199ffdafb78$export$acf571c34911f824 = (parsedArgs)=>{
    const p = parsedArgs.contract ? $35bab199ffdafb78$var$originateContract(parsedArgs)(parsedArgs.contract) : $35bab199ffdafb78$var$originateAll(parsedArgs);
    return p.then((data)=>({
            status: 'success',
            stdout: Array.isArray(data) ? data.join("\n") : data,
            stderr: ""
        })
    );
};
var $35bab199ffdafb78$export$2e2bcd8739ae039 = $35bab199ffdafb78$export$acf571c34911f824;


$2OpfP$taqueriasdk.Plugin.create((i18n)=>({
        name: "taquito",
        schema: "1.0",
        version: "0.1",
        tasks: [
            $2OpfP$taqueriasdk.Task.create({
                task: "deploy",
                command: "deploy [contract]",
                description: "Deploy a smart contract to a particular environment",
                options: [],
                aliases: [
                    "originate"
                ],
                handler: "proxy"
            }), 
        ],
        proxy: $35bab199ffdafb78$export$2e2bcd8739ae039
    })
, process.argv);


//# sourceMappingURL=index.js.map
