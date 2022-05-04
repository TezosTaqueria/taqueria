import retry from "async-retry"
import path from "path";
import fsPromises from "fs/promises"
import { exec as exec1, execSync } from "child_process"
import util from "util"
const exec = util.promisify(exec1)

export const generateTestProject = async (projectPath: string, packageNames: string[] = [], localPackages: boolean = true) => {
    const targetDir = path.join("/tmp", projectPath)
    
    try{
        await exec(`taq init ${targetDir}`)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    await checkFolderExistsWithTimeout(targetDir);
    try{
        await fsPromises.chmod(targetDir, 0o777)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    await exec("npm init -y", { cwd: targetDir, encoding: "utf-8"})
    await exec(`mv ${targetDir} ./${projectPath}`, {encoding: "utf8"})

    await checkFolderExistsWithTimeout(path.join("./", projectPath, 'package.json'));

    await installPlugins(projectPath, packageNames, localPackages)

    // if (packageNames.length > 0) {
    //      packageNames.forEach(packageName => {
    //         try {
    //             if (localPackages) {
    //                 exec(`cd ./${projectPath} && taq install ../../../taqueria-plugin-${packageName}`, {encoding: "utf8"})
    //             } else {
    //                 exec(`taq install @taqueria/plugin-${packageName}`, {cwd: targetDir})
    //             }
    //         } catch (error) {
    //             throw new Error(`error: ${error}`);
    //         }
    //     });
    
        await checkFolderExistsWithTimeout(`./${projectPath}/node_modules/`);
}

export async function installPlugins(projectPath: string, packageNames: string[], localPackages: boolean) {
    if (packageNames.length > 0) {
        packageNames.forEach(async (packageName) => {
           try {
                if (localPackages) {
                   execSync(`cd ./${projectPath} && taq install ../../../taqueria-plugin-${packageName}`, {encoding: "utf8"})
               } else {
                   execSync(`taq install @taqueria/plugin-${packageName}`, {cwd: projectPath})
               }
           } catch (error) {
               throw new Error(`error: ${error}`);
           }
       });
    }
}

export async function getContainerName(dockerName: string): Promise<string>{
    const [_dockerContainerHeader,dockerContainerName] = (await exec(`docker ps --filter "name=${dockerName}" --no-trunc`)).stdout.split(/\r?\n/);
    return dockerContainerName;
}

// The solution was taken from this source:
// https://stackoverflow.com/questions/26165725/nodejs-check-file-exists-if-not-wait-till-it-exist
// It is pull&wait mechanism and it is async by nature, because
// there is no fs.watch sync solution
export async function checkFolderExistsWithTimeout(filePath:string) {
    // return new Promise<void>(async function (resolve, reject): Promise<void> {

    try {
        const dir = path.dirname(filePath);
        const basename = path.basename(filePath);

        await retry(
            async() => {
                const watcher = await fsPromises.stat(dir)
                return (watcher.birthtime !== undefined)
            },
            {
                retries: 10,
                maxTimeout: 1000
            }
        )

    } catch (error) {
        throw new Error (`error: ${error}`);
    }
}

// // The solution is slightly modified version of this package
// // https://github.com/sindresorhus/is-port-reachable
// // package itself could not be used due to some issues
// export async function isPortReachable(port: number, {host = "", timeout = 1000} = {}) {
//     if (typeof host !== 'string') {
//         throw new TypeError('Specify a `host`');
//     }

//     const promise = new Promise<void>(((resolve, reject) => {
//         const socket = new net.Socket();

//         const onError = () => {
//             socket.destroy();
//             reject();
//         };

//         socket.setTimeout(timeout);
//         socket.once('error', onError);
//         socket.once('timeout', onError);

//         socket.connect(port, host, () => {
//             socket.end();
//             resolve();
//         });
//     }));

//     try {
//         await promise;
//         return true;
//     } catch {
//         return false;
//     }
// }