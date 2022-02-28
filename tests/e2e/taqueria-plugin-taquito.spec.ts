import {generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync} from "child_process";
import path from "path";
import waitForExpect from "wait-for-expect";
import { TezosToolkit } from '@taquito/taquito';
import axios from "axios";


describe("E2E Testing for taqueria taquito plugin",  () => {

    const tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');
    const taqueriaProjectPath = 'e2e/auto-test-taquito-plugin';
    const contractRegex = new RegExp("^\\w{36}$");
    let environment: string;

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["taquito"]);
    })

    // TODO: Consider in future to use keygen service to update account balance programmatically
    // https://github.com/ecadlabs/taqueria/issues/378
    test('Verify that taqueria taquito plugin can deploy one contract using deploy command', async () => {
        try {
            environment = "test";
            let smartContractHash = "";

            // 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
            execSync(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

            // Sometimes running two deploy commands in a short period of time cause an issue
            // More details about the error - "counter %x already used for contract %y"
            // It is applicable only for auto-tests that run very fast
            // Uses retry mechanism to avoid test to fail

            await waitForExpect(() => {

                // 2. Run taq deploy on a selected test network described in "test" environment
                const stdoutDeploy = execSync(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim().split(/\r?\n/)[3];

                // 3. Verify that contract has been originated on the network
                expect(stdoutDeploy).toContain("hello-tacos.tz");
                expect(stdoutDeploy).toContain("hangzhounet");
                const contractHash = stdoutDeploy.split("│")[2];
                smartContractHash = contractHash.trim();
                expect(contractHash.trim()).toMatch(contractRegex);
            });

            // 4. Verify that contract has been originated to the network
            console.log(tezos.rpc.getRpcUrl())
            await waitForExpect(async () => {
                const contract = await tezos.contract.at(smartContractHash);
                expect(contract.address).toBe(smartContractHash);
            });

            // 5. Debug
            const response = await axios.get("https://hangzhounet.api.tez.ie/chains/main/blocks/head/header");
            console.log(response);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Consider in future to use keygen service to update account balance programmatically
    // https://github.com/ecadlabs/taqueria/issues/378
    // TODO: Issue to fix the it https://github.com/ecadlabs/taqueria/issues/387
    // Issue to re-enable test once it's been fixed https://github.com/ecadlabs/taqueria/issues/388
    test.skip('Verify that taqueria taquito plugin can deploy one contract using deploy {contractName} command', async () => {
        try {
            environment = "test";
            let smartContractHash = "";

            // 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
            execSync(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

            // Sometimes running two deploy commands in a short period of time cause an issue
            // More details about the error - "counter %x already used for contract %y"
            // It is applicable only for auto-tests that run very fast
            // Uses retry mechanism to avoid test to fail

            await waitForExpect(() => {

                // 2. Run taq deploy ${contractName} on a selected test network described in "test" environment
                const stdoutDeploy = execSync(`taq deploy hello-tacos.tz -e ${environment} --logPluginCalls`, {cwd: `./${taqueriaProjectPath}`}).toString() // .trim().split(/\r?\n/)[3];

                console.log(stdoutDeploy)
                // 3. Verify that contract has been originated on the network
                expect(stdoutDeploy).toContain("hello-tacos.tz");
                expect(stdoutDeploy).toContain("hangzhounet");
                const contractHash = stdoutDeploy.split("│")[2];
                smartContractHash = contractHash.trim();
                expect(contractHash.trim()).toMatch(contractRegex);
            });

            // 4. Verify that contract has been originated to the network
            await waitForExpect(async () => {
                const contract = await tezos.contract.at(smartContractHash);
                expect(contract.address).toBe(smartContractHash);
            });

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Implement verification that originate will work by not deploying a
    //  contract but comparing the output of the taq deploy --help and taq originate --help and making sure they are the same
    // There is an issue associated with it - https://github.com/ecadlabs/taqueria/issues/379
    test.skip('Verify that taqueria taquito plugin can deploy one contract using originate {contractName} command', async () => {

    });

    // TODO: Consider in future to use keygen service to update account balance programmatically
    // https://github.com/ecadlabs/taqueria/issues/378
    // There is an issue with contract name https://github.com/ecadlabs/taqueria/issues/403
    // There is an issue to re-enable test after the issue has been resolved - https://github.com/ecadlabs/taqueria/issues/404
    test.skip('Verify that taqueria taquito plugin can deploy multiple contracts using deploy command', async () => {
        try {
            environment = "test";
            let smartContractOneHash = "";
            let smartContractTwoHash = "";

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            execSync(`cp e2e/data/config-taquito-test-environment-multiple-contracts.json ${taqueriaProjectPath}/.taq/config.json`);
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-one.tz`);
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-two.tz`);

            // Sometimes running two deploy commands in a short period of time cause an issue
            // More details about the error - "counter %x already used for contract %y"
            // It is applicable only for auto-tests that run very fast
            // Uses retry mechanism to avoid test to fail
            await waitForExpect(() => {
                // 2. Run taq deploy on a network described in "test" environment
                const stdoutDeploy = execSync(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim().split(/\r?\n/);

                console.log(stdoutDeploy)
                // 3. Verify that contracts have been originated on the network
                expect(stdoutDeploy[3]).toContain("hello-tacos-one.tz");
                expect(stdoutDeploy[3]).toContain("hangzhounet");
                const contractOneHash = stdoutDeploy[3].split("│")[2];
                smartContractOneHash = contractOneHash.trim();
                expect(smartContractOneHash).toMatch(contractRegex);
                expect(stdoutDeploy[5]).toContain("hello-tacos-two.tz");
                expect(stdoutDeploy[5]).toContain("hangzhounet");
                const contractTwoHash = stdoutDeploy[5].split("│")[2];
                smartContractTwoHash = contractTwoHash.trim();
                expect(contractTwoHash.trim()).toMatch(contractRegex);
            });

            // 4. Verify that contracts have been originated to the network
            await waitForExpect(async () => {
                const contractOne = await tezos.contract.at(smartContractOneHash);
                expect(contractOne.address).toBe(smartContractOneHash);
                const contractTwo = await tezos.contract.at(smartContractTwoHash);
                expect(contractTwo.address).toBe(smartContractTwoHash);
            });

            // 5. Verify that contracts originated on the network have different addresses
            expect(smartContractOneHash).not.toEqual(smartContractTwoHash);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria taquito plugin will show proper error when environment does not exists', async () => {
        try {
            // Environment test does not exist on default config.json
            environment = "tes"

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);

            // 2. Run taq deploy on a network described in "test" environment
            execSync(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

        } catch(error) {
            // 3. Verify that proper error displays in the console
            expect(error).toContain("No environment configured in your configuration file called tes");
        }

    });

    // TODO: Currently there is no output to stdout/stderr to be caught by automation
    // Issue to investigate and re-enable these tests https://github.com/ecadlabs/taqueria/issues/377
    // Issue associated https://github.com/ecadlabs/taqueria/issues/313
    test.skip('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> invalid network name in the environment', async () => {
        try {
            // Environment test does not exist on default config.json
            environment = "test"

            // 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
            execSync(`cp e2e/data/config-taquito-test-environment-invalid-config-networkname.json ${taqueriaProjectPath}/.taq/config.json`);
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

            // 2. Run taq deploy on a network described in "test" environment
            const stdoutDeploy = execSync(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 3. Verify that proper error displays in the console
            expect(stdoutDeploy).toContain("E_INVALID_PLUGIN_RESPONSE");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Currently there is no output to stdout/stderr to be caught by automation
    // Issue to investigate and re-enable these tests https://github.com/ecadlabs/taqueria/issues/377
    // Issue associated https://github.com/ecadlabs/taqueria/issues/313
    test.skip('Verify that taqueria taquito plugin will show proper error when faucet is wrong -> network url is wrong', async () => {
        try {
            // Environment test does not exist on default config.json
            environment = "test"

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
            execSync(`cp e2e/data/config-taquito-test-environment-invalid-config-network-url.json ${taqueriaProjectPath}/.taq/config.json`);

            // 2. Run taq deploy on a network described in "test" environment
            const stdoutDeploy = execSync(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 3. Verify that proper error displays in the console
            expect(stdoutDeploy).toContain("E_INVALID_PLUGIN_RESPONSE");
            expect(stdoutDeploy).toContain('\\"status\\":\\"failed\\"');

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Currently there is no output to stdout/stderr to be caught by automation
    // Issue to investigate and re-enable these tests https://github.com/ecadlabs/taqueria/issues/377
    // Issue associated https://github.com/ecadlabs/taqueria/issues/313
    test.skip('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> empty', async () => {
        try {
            // Environment test does not exist on default config.json
            environment = "test"

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
            execSync(`cp e2e/data/config-taquito-test-environment-invalid-faucet-empty.json ${taqueriaProjectPath}/.taq/config.json`);

            // 2. Run taq deploy on a network described in "test" environment
            const stdoutDeploy = execSync(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 3. Verify that proper error displays in the console
            expect(stdoutDeploy).toContain("E_INVALID_PLUGIN_RESPONSE");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Currently there is no output to stdout/stderr to be caught by automation
    // Issue to investigate and re-enable these tests https://github.com/ecadlabs/taqueria/issues/377
    // Issue associated https://github.com/ecadlabs/taqueria/issues/313
    test.skip('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> invalid pkh', async () => {
        try {
            // Environment test does not exist on default config.json
            environment = "test"

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
            execSync(`cp e2e/data/config-taquito-test-environment-invalid-faucet-pkh.json ${taqueriaProjectPath}/.taq/config.json`);

            // 2. Run taq deploy on a network described in "test" environment
            const stdoutDeploy = execSync(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 3. Verify that proper error displays in the console
            expect(stdoutDeploy).toContain("E_INVALID_PLUGIN_RESPONSE");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Currently there is no output to stdout/stderr to be caught by automation
    // Issue to investigate and re-enable these tests https://github.com/ecadlabs/taqueria/issues/377
    // Issue associated https://github.com/ecadlabs/taqueria/issues/313
    test.skip('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> initial storage is not provided', async () => {
        try {
            // Environment test does not exist on default config.json
            environment = "test"

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
            execSync(`cp e2e/data/config-taquito-test-environment-invalid-initial-storage.json ${taqueriaProjectPath}/.taq/config.json`);

            // 2. Run taq deploy on a network described in "test" environment
            const stdoutDeploy = execSync(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 3. Verify that proper error displays in the console
            expect(stdoutDeploy).toContain("E_INVALID_PLUGIN_RESPONSE");
            expect(stdoutDeploy).toContain('"No storage configured in your configuration file for hello-tacos.tz')

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // Remove all files from artifacts folder without removing folder itself
    afterEach(() => {
        try {
            const files = fs.readdirSync(`${taqueriaProjectPath}/artifacts/`);
            for (const file of files) {
                fs.unlinkSync(path.join(`${taqueriaProjectPath}/artifacts/`, file));
            }
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

    // Clean up process to remove taquified project folder
    // Comment if need to debug
    afterAll(() => {
        try {
            fs.rmdirSync(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

});