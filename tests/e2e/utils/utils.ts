import {execSync} from "child_process";
import path from "path";
import fs from "fs";

export const generateTestProject = async (projectPath: string, packageNames: string[], localPackages = true) =>{
    try{
        execSync(`taq init ${projectPath}`)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    await checkFolderExistsWithTimeout(`./${projectPath}/`, 25000);

    try{
        fs.chmodSync(`./${projectPath}/`, 0o777)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    try{
        execSync(`cd ./${projectPath} && npm init -y`)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    await checkFolderExistsWithTimeout(`./${projectPath}/package.json`, 25000);

    packageNames.forEach(packageName => {
        try {
            if (localPackages) {
                execSync(`cd ./${projectPath} && taq install ../../../taqueria-plugin-${packageName}`)
            } else {
                execSync(`cd ./${projectPath} && taq install @taqueria/plugin-${packageName}`)
            }
        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    });

    await checkFolderExistsWithTimeout(`./${projectPath}/node_modules/`, 25000);
}

// The solution was taken from this source:
// https://stackoverflow.com/questions/26165725/nodejs-check-file-exists-if-not-wait-till-it-exist
// It is pull&wait mechanism and it is async by nature, because
// there is no fs.watch sync solution
export function checkFolderExistsWithTimeout(filePath:string, timeout:number) {
    return new Promise(function (resolve, reject) {

        const dir = path.dirname(filePath);
        const basename = path.basename(filePath);

        const watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                // @ts-ignore
                resolve();
            }
        });

        const timer = setTimeout(function () {
            watcher.close();
            reject(new Error('File did not exists and was not created during the timeout.'));
        }, timeout);

        fs.access(filePath, fs.constants.R_OK, function (err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                // @ts-ignore
                resolve();
            }
        });
    });
}