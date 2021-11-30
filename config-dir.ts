import type {Future, TaqError, NonValidatedPath, ExistingPath} from './taqueria-utils/types.ts'
import {mkdir as mkDir, joinPaths} from './taqueria-utils/taqueria-utils.ts'
import type {SanitizedPath} from './taqueria-utils/sanitized-path.ts'
import Path from './taqueria-utils/sanitized-path.ts'
import {resolve} from 'https://cdn.skypack.dev/fluture';

type Path = NonValidatedPath | ExistingPath

export const make = (projectDir: SanitizedPath, configDir: SanitizedPath, mkdir=false) :  Future<TaqError, Path> => {
    const path = joinPaths(Path.view(projectDir), Path.view(configDir))
    return mkdir
        ? mkDir(path) as Future<TaqError, Path>
        : resolve(path) as Future<TaqError, Path>
}

export default {
    make
}