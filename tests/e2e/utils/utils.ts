import {exec} from "child_process";
import path from "path";
const fs = require('fs');

export const generateTestProject = async (configFilePath: string) =>{
    exec(`taqueria init ${configFilePath}`, (error, stdout, stderr) => {
        if (error) {
            throw new Error (`error: ${error.message}`);
        }
    });

    await checkFolderExistsWithTimeout(`./${configFilePath}/`, 25000);

    // There is an error to write to hidden folder using NodeJS
    // https://github.com/libuv/libuv/pull/3380
    // The work around to use shell command for now till the PR to libuv is merged
    exec(`cp ./e2e/data/config.json ./${configFilePath}/.taq/`, (error, stdout, stderr) => {
        if (error) {
            throw new Error (`error: ${error.message}`);
        }
    });

    exec(`cp ./e2e/data/config.json ./${configFilePath}/.taq/`, (error, stdout, stderr) => {
        if (error) {
            throw new Error (`error: ${error.message}`);
        }
    });

    // @ts-ignore
    await fs.chmod(`./${configFilePath}/`, 0o777, (error) => {
        if (error) {
            throw new Error (`error: ${error}`);
        }
    });

    exec(`cd ./${configFilePath} && npm init -y`, (error, stdout, stderr) => {
        if (error) {
            throw new Error (`error: ${error.message}`);
        }
    });

    await checkFolderExistsWithTimeout(`./${configFilePath}/package.json`, 25000);

    exec(`cd ./${configFilePath} && npm install -D ../../../taqueria-plugin-ligo`, (error, stdout, stderr) => {
        if (error) {
            throw new Error (`error: ${error.message}`);
        }
    });

    await checkFolderExistsWithTimeout(`./${configFilePath}/node_modules/`, 25000);
}

// The solution was taken from this source:
// https://stackoverflow.com/questions/26165725/nodejs-check-file-exists-if-not-wait-till-it-exist
function checkFolderExistsWithTimeout(filePath:string, timeout:number) {
    return new Promise(function (resolve, reject) {

        const timer = setTimeout(function () {
            watcher.close();
            reject(new Error('File did not exists and was not created during the timeout.'));
        }, timeout);

        // @ts-ignore
        fs.access(filePath, fs.constants.R_OK, function (err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                // @ts-ignore
                resolve();
            }
        });

        const dir = path.dirname(filePath);
        const basename = path.basename(filePath);
        // @ts-ignore
        const watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                // @ts-ignore
                resolve();
            }
        });
    });
}