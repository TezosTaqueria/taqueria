var $GKvAC$yargs = require("yargs");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "binary", () => $77ea8f3d1e6715b1$export$33902b7329277358);
$parcel$export(module.exports, "Plugin", () => $77ea8f3d1e6715b1$export$901cf72dabf2112a);
$parcel$export(module.exports, "Task", () => $77ea8f3d1e6715b1$export$2dea7024bcdd7731);
$parcel$export(module.exports, "Option", () => $77ea8f3d1e6715b1$export$36d18380658d5d20);
$parcel$export(module.exports, "default", () => $77ea8f3d1e6715b1$export$2e2bcd8739ae039);
class $d52dd1021ae9de45$var$StringLike {
    constructor(value5){
        this.value = value5;
    }
}
class $d52dd1021ae9de45$export$a1a41063e2e03c45 extends $d52dd1021ae9de45$var$StringLike {
    static create(value1) {
        const result = value1.match(/^[A-Za-z-]+/);
        // TODO - should we do more validation whether its a verb?
        return result ? new $d52dd1021ae9de45$export$a1a41063e2e03c45(result[0]) : undefined;
    }
}
class $d52dd1021ae9de45$export$5ab32afc381247a3 extends $d52dd1021ae9de45$var$StringLike {
    static create(value2) {
        const result = value2.match(/^[A-Za-z-]+/);
        // TODO - should we do more validation whether its a verb?
        return result ? new $d52dd1021ae9de45$export$5ab32afc381247a3(result[0]) : undefined;
    }
}
class $d52dd1021ae9de45$export$fbb5ee3261059309 extends $d52dd1021ae9de45$var$StringLike {
    static create(value3) {
        const result = value3.match(/^([A-Za-z-]+) (\[[A-Za-z-]+\] ?){1,}/);
        if (result) {
            const noun = $d52dd1021ae9de45$export$5ab32afc381247a3.create(result[0]);
            if (noun) // TODO need to extract pattern matches for verbs
            return new $d52dd1021ae9de45$export$fbb5ee3261059309(noun.value);
        }
        return undefined;
    }
}
class $d52dd1021ae9de45$export$7b5b46f726f7351 extends $d52dd1021ae9de45$var$StringLike {
    static create(value4) {
        return value4 && value4.toString().match(/^[A-Za-z]/) ? new $d52dd1021ae9de45$export$7b5b46f726f7351(value4[0]) : undefined;
    }
}
const $d52dd1021ae9de45$export$8e386e6aafc1bf20 = (value)=>{
    return $d52dd1021ae9de45$export$5ab32afc381247a3.create(value) || $d52dd1021ae9de45$export$7b5b46f726f7351.create(value);
};
class $d52dd1021ae9de45$export$36d18380658d5d20 {
    constructor(shortFlag, flag, description){
        this.shortFlag = shortFlag;
        this.flag = flag;
        this.description = description;
    }
    static create(option1) {
        const shortFlag = $d52dd1021ae9de45$export$7b5b46f726f7351.create(option1.shortFlag);
        const flag = $d52dd1021ae9de45$export$a1a41063e2e03c45.create(option1.flag);
        if (shortFlag && flag) return new $d52dd1021ae9de45$export$36d18380658d5d20(shortFlag, flag, option1.description);
        return undefined;
    }
}
class $d52dd1021ae9de45$export$dbada097a9bd1de9 {
    constructor(path){
        this.value = path;
    }
    static create(path1) {
        return new $d52dd1021ae9de45$export$dbada097a9bd1de9(path1);
    }
}
class $d52dd1021ae9de45$export$2dea7024bcdd7731 {
    constructor(name, command, description1, handler, options = [], aliases = []){
        this.name = name;
        this.command = command;
        this.description = description1;
        this.handler = handler;
        this.options = options;
        this.aliases = aliases;
    }
    static create(task) {
        const name = $d52dd1021ae9de45$export$a1a41063e2e03c45.create(task.task);
        const command = $d52dd1021ae9de45$export$5ab32afc381247a3.create(task.command) || $d52dd1021ae9de45$export$fbb5ee3261059309.create(task.command);
        const aliases = task.aliases ? task.aliases.map($d52dd1021ae9de45$export$8e386e6aafc1bf20).filter((alias)=>alias != undefined
        ) : [];
        const options = !task.options ? [] : task.options.reduce((retval, option)=>option ? [
                ...retval,
                option
            ] : retval
        , []);
        return name && command && aliases && options ? new $d52dd1021ae9de45$export$2dea7024bcdd7731(name, command, task.description, task.handler, options, aliases) : undefined;
    }
}



const $77ea8f3d1e6715b1$var$parseArgs = (unparsedArgs)=>{
    if (unparsedArgs && Array.isArray(unparsedArgs) && unparsedArgs.length >= 2) {
        const argv = ($parcel$interopDefault($GKvAC$yargs))(unparsedArgs.slice(2)).argv;
        if (argv.i18n && argv.taqRun) return Promise.resolve(argv);
    }
    return Promise.reject({
        errCode: "E_NO_ARGS",
        errMsg: "Invalid usage. If you were testing your plugin, did you remember to specify --taqRun?",
        context: undefined
    });
};
const $77ea8f3d1e6715b1$var$viewOption = ({ shortFlag: shortFlag , flag: flag , description: description  })=>({
        shortFlag: shortFlag.value,
        flag: flag.value,
        description: description
    })
;
const $77ea8f3d1e6715b1$var$viewTask = ({ name: name , command: command , aliases: aliases , description: description , options: options , handler: handler  })=>({
        name: name.value,
        command: command.value,
        aliases: !aliases ? [] : aliases.reduce((retval, alias)=>alias ? [
                ...retval,
                alias.value
            ] : retval
        , []),
        description: description,
        options: !options ? [] : options.reduce((retval, option)=>option ? [
                ...retval,
                $77ea8f3d1e6715b1$var$viewOption(option)
            ] : retval
        , []),
        handler: handler
    })
;
const $77ea8f3d1e6715b1$var$parseSchema = (i18n, definer)=>{
    try {
        const { schema: schema , version: version , tasks: tasks , scaffolds: scaffolds , hooks: hooks , ...functions } = definer(i18n);
        return {
            schema: schema,
            version: version,
            tasks: tasks.reduce((retval, task)=>task ? [
                    ...retval,
                    $77ea8f3d1e6715b1$var$viewTask(task)
                ] : retval
            , []),
            hooks: [],
            scaffolds: [],
            ...functions
        };
    } catch (_) {
        return undefined;
    }
};
const $77ea8f3d1e6715b1$var$sendResponse = (response)=>console.log(JSON.stringify(response))
;
const $77ea8f3d1e6715b1$var$sendError = (err)=>console.error(JSON.stringify(err))
;
const $77ea8f3d1e6715b1$var$getResponse = (definer)=>(parsedArgs)=>{
        const { i18n: i18n , taqRun: taqRun , ...args } = parsedArgs;
        const schema = $77ea8f3d1e6715b1$var$parseSchema(i18n, definer);
        switch(taqRun){
            case "pluginInfo":
                return schema ? Promise.resolve({
                    ...schema,
                    status: "success"
                }) : Promise.reject({
                    err: "E_INVALID_SCHEMA",
                    msg: "The schema of the plugin is invalid."
                });
            case "proxy":
                return schema && schema.proxy ? schema.proxy(i18n, args) : Promise.resolve({
                    status: "notSupported",
                    stdout: "",
                    stderr: i18n.proxyNotSupported,
                    artifacts: []
                });
            case "checkRuntimeDependencies":
                return schema && schema.checkRuntimeDependencies ? schema.checkRuntimeDependencies(i18n, args) : Promise.resolve({
                    status: "notSupported",
                    report: []
                });
            case "installRuntimeDependencies":
                return schema && schema.installRuntimeDependencies ? schema.installRuntimeDependencies(i18n, args) : Promise.resolve({
                    status: "notSupported",
                    report: []
                });
            default:
                return Promise.resolve({
                    status: "notSupported",
                    msg: i18n.actionNotSupported
                });
        }
    }
;
const $77ea8f3d1e6715b1$export$33902b7329277358 = $d52dd1021ae9de45$export$dbada097a9bd1de9.create;
const $77ea8f3d1e6715b1$export$901cf72dabf2112a = {
    create: (definer, unparsedArgs)=>$77ea8f3d1e6715b1$var$parseArgs(unparsedArgs).then($77ea8f3d1e6715b1$var$getResponse(definer)).then($77ea8f3d1e6715b1$var$sendResponse).catch($77ea8f3d1e6715b1$var$sendError)
};
const $77ea8f3d1e6715b1$export$2dea7024bcdd7731 = {
    create: (input)=>$d52dd1021ae9de45$export$2dea7024bcdd7731.create(input)
};
const $77ea8f3d1e6715b1$export$36d18380658d5d20 = {
    create: (input)=>$d52dd1021ae9de45$export$36d18380658d5d20.create(input)
};
var $77ea8f3d1e6715b1$export$2e2bcd8739ae039 = {
    Plugin: $77ea8f3d1e6715b1$export$901cf72dabf2112a,
    Task: $77ea8f3d1e6715b1$export$2dea7024bcdd7731,
    Option: $77ea8f3d1e6715b1$export$36d18380658d5d20
};


//# sourceMappingURL=index.js.map
