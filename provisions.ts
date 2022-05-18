import * as SanitizedArgs from "@taqueria/protocol/SanitizedArgs"
import * as LoadedConfig from "@taqueria/protocol/LoadedConfig"
import * as EphemeralState from "@taqueria/protocol/EphermalState"
import * as PersistentState from "@taqueria/protocol/PersistentState"
import * as SanitizedAbsPath from "@taqueria/protocol/SanitizedPath"
import * as Provisions from "@taqueria/protocol/Provisions"
import * as Provisioner from "@taqueria/protocol/Provisioner"
import * as InstalledPlugin from "@taqueria/protocol/InstalledPlugin"
import * as TaqError from "@taqueria/protocol/TaqError"
import {inject} from "./taqueria-utils/taqueria-utils.ts"
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {Future, mapRej, map, chain, attemptP, chainRej, reject} from 'fluture';
import generate from "https://cdn.skypack.dev/retronid"

const {doesPathExist, writeJsonFile, joinPaths, eager, isTaqError, readJsonFile, renderTemplate, execText} = inject({
    stderr: Deno.stderr,
    stdout: Deno.stdout
})

const getProvisions = (provisionsAbsPath: SanitizedAbsPath.t) => pipe(
    readJsonFile(provisionsAbsPath),
    chain(Provisions.of)
)

const loadProvisions = (provisionsAbspath: SanitizedAbsPath.t) => pipe(
    getProvisions(provisionsAbspath),
    mapRej((previous: Error|TaqError.t) => isTaqError(previous) 
        ? previous as unknown as TaqError.t
        : TaqError.create({
            kind: "E_PROVISION",
            msg: "Could not parse provisions file",
            previous
        })
    )
)

const writeProvisions = (provisionsAbspath: SanitizedAbsPath.t) => (provisioners: Provisioner.t[] | Provisions.t) =>
    writeJsonFile(provisionsAbspath) (provisioners)
    .pipe(map(() => provisioners)) 
    

const addProvision = (provisioner: Provisioner.t, provisionsAbspath: SanitizedAbsPath.t) => pipe(
    doesPathExist(provisionsAbspath),
    chainRej(() => writeProvisions(provisionsAbspath) ([]) ),
    chain(() => loadProvisions(provisionsAbspath)),
    map(provisioners => [...provisioners, provisioner]),
    chain(writeProvisions(provisionsAbspath))
)

const getOperationParams = (state: EphemeralState.t) => (operationName: string, pluginName: string) => {
    const op = state.plugins
        .find(plugin => plugin.alias === pluginName)
        ?.operations
        ?.find(op => op.operation === operationName)
    
    if (op) {
        const options = op.options ?? []
        const args = op.positionals ?? []
        const optionNames = options.reduce(
            (retval, option) => option.shortFlag 
                ? [...retval, option.shortFlag, option.flag]
                : [...retval, option.flag],
            [] as string[]
        )
        return args.reduce(
            (retval, arg) => [...retval, arg.placeholder],
            optionNames
        )
    }
    throw `Could not collect arguments for the operation, ${operationName}`
}

const newProvision = (parsedArgs: SanitizedArgs.ProvisionArgs, state: EphemeralState.t) => {
    const operation = parsedArgs.operation
    const name = parsedArgs.name ?? generate()
    const plugin = (() => {
        if (parsedArgs.plugin) return parsedArgs.plugin
        const op = state.operations[operation] as InstalledPlugin.t
        const plugin = state.plugins.find(plugin => plugin.name == op.name)
        return plugin!.alias
    })()

    const customHandler = (_state: PersistentState.t ) => {
        return "custom"
    }

    customHandler.toJSON = function() {
        return this.toString()
    }
    return Provisioner.make({
        id: `${plugin}.${operation}.${name}`,
        operation,
        plugin,
        ...getOperationParams (state) (operation, plugin),
        handler: operation === "custom" ? customHandler : undefined
    })
}

export const addNewProvision = (parsedArgs: SanitizedArgs.ProvisionArgs, config: LoadedConfig.t, state: EphemeralState.t) => attemptP(async () => {
    try {
        const provisionAbspath = await eager (SanitizedAbsPath.make(joinPaths(config.projectDir, ".taq", "provisions.json")))
        const provision = await eager (newProvision(parsedArgs, state))
        const provisions = await eager (addProvision(provision, provisionAbspath))
        return provisions
    }
    catch (previous) {
        const err: TaqError.t = {
            kind: "E_PROVISION",
            msg: `Could not provision. Please check the operation name and try again.`,
            previous
        }
        return Promise.reject(err)
    }
})