import {z} from "zod"
import * as SanitizedArgs from "@taqueria/protocol/SanitizedArgs"
import * as LoadedConfig from "@taqueria/protocol/LoadedConfig"
import * as EphemeralState from "@taqueria/protocol/EphermalState"
import * as PersistentState from "@taqueria/protocol/PersistentState"
import * as SanitizedAbsPath from "@taqueria/protocol/SanitizedPath"
import * as Provisions from "@taqueria/protocol/Provisions"
import * as Provisioner from "@taqueria/protocol/Provisioner"
import * as InstalledPlugin from "@taqueria/protocol/InstalledPlugin"
import * as TaqError from "./taqueria-utils/TaqError.ts"
import * as Future from "./taqueria-utils/Future.ts"
import {inject} from "./taqueria-utils/taqueria-utils.ts"
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {map, chain, attemptP, chainRej, reject} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js';
import generate from "https://cdn.skypack.dev/retronid"

const {doesPathExist, writeTextFile, joinPaths} = inject({
    stderr: Deno.stderr,
    stdout: Deno.stdout
})

const loadProvisions = (provisionsAbspath: SanitizedAbsPath.t) => attemptP(async () => {
    const provisions = await import(provisionsAbspath)
    return Provisions.create(provisions.default)    
}) as Future.t<TaqError.t, Provisions.t>

const writeProvisions = (provisionsAbspath: SanitizedAbsPath.t) => (provisioners: Provisioner.t[]) => {
    const output = provisioners.map(provisioner => `\tProvisioner.create(q${JSON.stringify(provisioner, null, 4)})`)

    return writeTextFile(provisionsAbspath) (`
import * as Provisioner from "@taqueria/protocol/Provisioner"
export default [
${output.join(",\n")}
]`)
} 
    

const addProvision = (provisioner: Provisioner.t, provisionsAbspath: SanitizedAbsPath.t) => pipe(
    provisionsAbspath,
    doesPathExist,
    chainRej(() => writeProvisions(provisionsAbspath) ([])),
    chain(() => loadProvisions(provisionsAbspath)),
    map(Provisions.create),
    map(provisioners => [...provisioners, provisioner] as Provisioner.t[]),
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

export const addNewProvision = (parsedArgs: SanitizedArgs.ProvisionArgs, config: LoadedConfig.t, state: EphemeralState.t): Future.t<TaqError.t, string> => {
    try {
        const provision = newProvision(parsedArgs, state)
        return addProvision(
            provision, 
            SanitizedAbsPath.make(joinPaths(config.projectDir, ".taq", "provisions.ts")),
        )
    }
    catch (previous) {
        const err: TaqError.t = {
            kind: "E_PROVISION",
            msg: `Could not provision. Please check the operation name and try again.`,
            previous
        }
        return reject(err)
    }
}