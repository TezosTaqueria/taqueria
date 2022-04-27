import {execSync} from "child_process";
import path from "path";
import fs from "fs";
import net from "node:net";

export const generateTestProject = async (projectPath: string, packageNames: string[] = [], localPackages: boolean = true) => {
    const targetDir = path.join("/tmp", projectPath)
    
    try{
        execSync(`taq init ${targetDir}`)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    await checkFolderExistsWithTimeout(targetDir, 25000);
    try{
        fs.chmodSync(targetDir, 0o777)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    const _npmOutput = execSync("npm init -y", { cwd: targetDir, encoding: "utf-8"})
    const _mvOutput = execSync(`mv ${targetDir} ./${projectPath}`, {encoding: "utf8"})

    await checkFolderExistsWithTimeout(path.join("./", projectPath, 'package.json'), 25000);

    if (packageNames.length > 0) {
        packageNames.forEach(packageName => {
            try {
                if (localPackages) {
                    const _installOut = execSync(`cd ./${projectPath} && taq install ../../../taqueria-plugin-${packageName}`, {encoding: "utf8"})
                } else {
                    execSync(`taq install @taqueria/plugin-${packageName}`, {cwd: targetDir})
                }
            } catch (error) {
                throw new Error(`error: ${error}`);
            }
        });
    
        await checkFolderExistsWithTimeout(`./${projectPath}/node_modules/`, 25000);
    }
}

export function getContainerName(dockerName: string): string{
    const [_dockerContainerHeader,dockerContainerName] = execSync(`docker ps --filter "name=${dockerName}" --no-trunc`).toString().trim().split(/\r?\n/);
    return dockerContainerName;
}

// The solution was taken from this source:
// https://stackoverflow.com/questions/26165725/nodejs-check-file-exists-if-not-wait-till-it-exist
// It is pull&wait mechanism and it is async by nature, because
// there is no fs.watch sync solution
export function checkFolderExistsWithTimeout(filePath:string, timeout:number) {
    return new Promise<void>(function (resolve, reject): void {
        const dir = path.dirname(filePath);
        const basename = path.basename(filePath);

        const watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });

        const timer = setTimeout(function () {
            watcher.close();
            reject(new Error(`File did not exists and was not created during the timeout: ${filePath}.`));
        }, timeout);

        fs.access(filePath, fs.constants.R_OK, function (err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });
    });
}

// The solution is slightly modified version of this package
// https://github.com/sindresorhus/is-port-reachable
// package itself could not be used due to some issues
export async function isPortReachable(port: number, {host = "", timeout = 1000} = {}) {
    if (typeof host !== 'string') {
        throw new TypeError('Specify a `host`');
    }

    const promise = new Promise<void>(((resolve, reject) => {
        const socket = new net.Socket();

        const onError = () => {
            socket.destroy();
            reject();
        };

        socket.setTimeout(timeout);
        socket.once('error', onError);
        socket.once('timeout', onError);

        socket.connect(port, host, () => {
            socket.end();
            resolve();
        });
    }));

    try {
        await promise;
        return true;
    } catch {
        return false;
    }
}