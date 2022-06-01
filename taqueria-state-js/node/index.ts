import {join, resolve} from "path"
import {stat, readFile} from "fs/promises"
import * as Environment from "@taqueria/protocol/Environment"
import * as Config from "@taqueria/protocol/Config"
import * as PersistentState from "@taqueria/protocol/PersistentState"
import load from "../common"

const getProjectAbsPath = async (search="./"): Promise<string> => {
    const dir = resolve(search)

    // If we've reached / or c:\, then give up
    if (/^(\/|[A-Z]:\\?)$/.test(dir)) {
        throw "Could not find project directory"
    }

    const filename = join(dir, ".taq", "config.json")
    try {
        const exists = await stat(filename)

        // TODO: Will this work on Windows?
        // ... I might need to use .taq\config.json
        return filename.replace(".taq/config.json", '')
    }
    catch {
        // TODO: Will this work on Windows?
        // I might need to do ..\
        return await getProjectAbsPath(join(dir, "../"))
    }
}

const getConfig = async (projectAbspath: string) => {
    try {
        const configAbspath = join(projectAbspath, ".taq", "config.json")
        const contents = await readFile(configAbspath, "utf-8")
        const unvalided = JSON.parse(contents)
        return Config.create(unvalided)
    }
    catch {
        throw "Could not load .taq/config.json"
    }
}

const getState = async (projectAbspath: string, env?: string) => {
    try {
        const configAbspath = join(projectAbspath, ".taq", `${env}-state.json`)
        const contents = await readFile(configAbspath, "utf-8")
        const unvalided = JSON.parse(contents)
        return PersistentState.create(unvalided)
    }
    catch {
        throw "Could not load .taq/config.json"
    }
}

export default async (projectDir?: string, selectedEnv?: string) => {
    const projectAbspath = await getProjectAbsPath(projectDir)
    const config = await getConfig(projectAbspath)

    /**
     * Gets the current environment
     * @returns {Environment.t}
     */
    const getCurrentEnv = (): [string, Environment.t] => {
        if (!config.environment) {
            throw "No environment configuration exists in your .taq/config.json file"
        }

        // Get the name of the current environment
        // If one hasn't been assigned, just pick the first one defined
        const foundName = (selectedEnv || config.environment.default)
            ?? Object.keys(config.environment)
                .filter(key => key !== 'storage')
                .shift()

        if (!foundName) throw "Your environment configuration is invalid in your .taq/config.json file"

        // Treat the name as a string
        const name = String(foundName)

        return [
            name,
            Environment.from(config.environment[name])
        ]
    }

    const currentEnv = selectedEnv || getCurrentEnv()[0]

    const state = await getState(projectAbspath, currentEnv)
    
    return {
        ...load(projectAbspath, config, state, selectedEnv),
        getCurrentEnv
    }
}