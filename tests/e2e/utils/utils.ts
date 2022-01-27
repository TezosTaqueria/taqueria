import {execSync} from "child_process";
import path from "path";
import fs from "fs";

export const generateTestProject = async (configFilePath: string) =>{
    try{
        execSync(`taq init ${configFilePath}`)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    await checkFolderExistsWithTimeout(`./${configFilePath}/`, 25000);

    // There is an error to write to hidden folder using NodeJS
    // https://github.com/libuv/libuv/pull/3380
    // The work around to use shell command for now till the PR to libuv is merged
    try{
        execSync(`cp ./e2e/data/config.json ./${configFilePath}/.taq/`)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    try{
        execSync(`cp ./e2e/data/config.json ./${configFilePath}/.taq/`)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    try{
        fs.chmodSync(`./${configFilePath}/`, 0o777)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    try{
        execSync(`cd ./${configFilePath} && npm init -y`)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    await checkFolderExistsWithTimeout(`./${configFilePath}/package.json`, 25000);

    try{
        execSync(`cd ./${configFilePath} && npm install -D ../../../taqueria-plugin-ligo`)
    } catch(error){
        throw new Error (`error: ${error}`);
    }

    await checkFolderExistsWithTimeout(`./${configFilePath}/node_modules/`, 25000);
}

// The solution was taken from this source:
// https://stackoverflow.com/questions/26165725/nodejs-check-file-exists-if-not-wait-till-it-exist
function checkFolderExistsWithTimeout(filePath:string, timeout:number) {
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