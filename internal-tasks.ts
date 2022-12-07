
import {NonEmptyString, SanitizedArgs} from "@taqueria/protocol"
import type { CLIConfig } from './taqueria-types.ts';

type InternalTask = {
    // Task as displayed in the CLI
    taskName: NonEmptyString.t

    // A method to configure the task, by adding it to yargs
    configure: (yargs: CLIConfig) => void

    // Task handler
    handler: (args: SanitizedArgs.t) => SanitizedArgs.t

    isRunning?: (args: SanitizedArgs.t) => bool
}

export function createRegistry() {
    const tasks: InternalTask[] = []

    const addInternalTask = (args: InternalTask) => {

    }

    const getInternalTasks = () => {
        return [...tasks]
    }

    const getInternalTaskNames = () => {
        return tasks.map(t => t.taskName)
    }

    
    return {
        addInternalTask,
        getInternalTasks,
        getInternalTaskNames
    }
}