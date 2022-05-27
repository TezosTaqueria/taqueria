import {pipe} from 'rambda'
import * as Config from "@taqueria/protocol/Config"
import * as PersistentState from "@taqueria/protocol/PersistentState"

export interface Origination {
    contract: string
    address: string
    destination: string
    time: number
}

type PersistedOriginationTaskOutput = Omit<Origination, "time">

export default (projectAbspath: string, config: Config.t, state: PersistentState.t, selectedEnv?: string) => {
    /**
     * Gets the configuration for the project
     * @returns {Config.t}
     */
    const getConfig = () => config


    /**
     * Gets the absolute path to the project
     * @returns {string}
     */
    const getProjectAbsPath = () => projectAbspath

    
    /**
     * Gets the persistent state of the project
     * @returns {PersistentState.t}
     */
    const getState = () => state


    /**
     * Gets every origination performed for this project, sorted newest to oldest, and
     * optionally filtered for a particular contract
     * @returns {Origination[]}
     */
    const getOriginations = (contractName?: string) => Object.keys(state.tasks)
        .reduce(
            (retval, id) => /taquito/.test(id)
                ? [...retval, state.tasks[id]]
                : retval,
            [] as PersistentState.PersistedTask[]
        )
        .sort((a, b) => {
            if (a > b) return 1
            else if (a == b) return 0
            return -1
        })
        .reduce(
            (retval, task) => {
                const details = task.output as PersistedOriginationTaskOutput[]
                return [
                    ...retval,
                    ...details.map(output => ({...output, time: task.time}))
                ]
            },
            [] as Origination[]
        )
        .filter(origination => contractName ? origination.contract === contractName : true)

    return {
        getConfig,
        getState,
        getProjectAbsPath,
        getOriginations
    }
}