import {generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync} from "child_process";

const taqueriaProjectPath = 'e2e/auto-test-taquito-plugin';

describe("E2E Testing for taqueria taquito plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["taquito"]);
    })

    // TODO: Ask Michael about what are these steps
    // 1. Compile contract - I want to skip to reduce number of steps
    // 2. Start sandbox ??? or select test network - (yes I can)
    // 3. Call originate - it will originate everything on artifacts folder
    // 4. Verify that contract has been originated
    // 5. Stop
    test('Verify that taqueria taquito plugin can originate one contract', async () => {
        try {
            // 1. Copy michelson contract from data folder to artifacts folder under taqueria project


            // 2. Run taq originate ${contractName}


            // 3. Verify that contract has been originated on the network


        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // Comment for debug purpose
    // afterAll(() => {
    //     try {
    //         fs.rmdirSync(taqueriaProjectPath, { recursive: true })
    //     } catch(error){
    //         throw new Error (`error: ${error}`);
    //     }
    // })

});