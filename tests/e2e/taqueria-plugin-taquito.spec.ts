import fsPromises from "fs/promises"
import { generateTestProject } from "./utils/utils";
import { exec as exec1 } from "child_process";
import { TezosToolkit } from '@taquito/taquito';
import utils from 'util'
import { networkInfo } from './data/network-info'
const exec = utils.promisify(exec1)

describe("E2E Testing for taqueria taquito plugin",  () => {

    const tezos = new TezosToolkit(networkInfo.networkURL);
    const taqueriaProjectPath = 'e2e/auto-test-taquito-plugin';
    const contractRegex = new RegExp(/(KT1)+\w{33}?/);
    let environment: string;

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["taquito"]);
    })

    // TODO: Consider in future to use keygen service to update account balance programmatically
    // https://github.com/ecadlabs/taqueria/issues/378
    test.only('Verify that taqueria taquito plugin can deploy one contract using deploy command', async () => {
        try {
            environment = "test";
            let smartContractHash = "";

            // 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
            await exec(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

            // Sometimes running two deploy commands in a short period of time cause an issue
            // More details about the error - "counter %x already used for contract %y"
            // It is applicable only for auto-tests that run very fast
            // Uses retry mechanism to avoid test to fail

            // 2. Run taq deploy on a selected test network described in "test" environment
            // const deployCommand = 
            const deployCommand = await exec(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).then(async (resp) => {
                const deployResponse = resp.stdout.trim().split(/\r?\n/)[3]
                await new Promise(resolve => setTimeout(resolve, 25000))
                return deployResponse
            })

            // 3. Verify that contract has been originated on the network
            console.log(deployCommand)
            expect(deployCommand).toContain("hello-tacos.tz");
            expect(deployCommand).toContain(networkInfo.networkName);
            const contractHash = deployCommand.split("│")[2];

            smartContractHash = contractHash.trim();
            expect(smartContractHash).toMatch(contractRegex);

            // 4. Verify that contract has been originated to the network
            const contract = await tezos.contract.at(smartContractHash)
            expect(contract.address).toBe(smartContractHash);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    // TODO: Consider in future to use keygen service to update account balance programmatically
    // https://github.com/ecadlabs/taqueria/issues/378
    test('Verify that taqueria taquito plugin can deploy one contract using deploy {contractName} command', async () => {
        try {
            environment = "test";
            let smartContractHash = "";

            // 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
            await exec(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`)
            await exec(`cp e2e/data/increment.tz ${taqueriaProjectPath}/artifacts/`)

            // Sometimes running two deploy commands in a short period of time cause an issue
            // More details about the error - "counter %x already used for contract %y"
            // It is applicable only for auto-tests that run very fast

            // 2. Run taq deploy ${contractName} on a selected test network described in "test" environment
            // const stdoutDeploy = await exec(`taq deploy hello-tacos.tz -e ${environment}`, {cwd: `./${taqueriaProjectPath}`})
            const deployCommand = await exec(`taq deploy hello-tacos.tz -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).then(async (resp) => {
                const deployResponse = resp.stdout.trim().split(/\r?\n/)[3]
                await new Promise(resolve => setTimeout(resolve, 25000))
                return deployResponse
            })
            // 3. Get the KT address from the output
            expect(deployCommand).toContain("hello-tacos.tz");
            expect(deployCommand).toContain(networkInfo.networkName);
            const contractHash = deployCommand.split("│")[2];

            // const matches = stdoutDeploy.match(/KT[^\s]+/m)
            // expect(matches).toHaveLength(1)
            // const address = matches ? matches[0] : 'Missing'

            // // 4. Verify that the table output matches what is expected
            // expect(stdoutDeploy).toBe(contents.originateSingleOutput(address))

            smartContractHash = contractHash.trim();
            expect(smartContractHash).toMatch(contractRegex);

            // 4. Verify that contract has been originated to the network
            const contract = await tezos.contract.at(smartContractHash)
            expect(contract.address).toBe(smartContractHash);
            // // 5. Verify that contract has been originated to the network
            // await waitForExpect(async () => {
            //     const contract = await tezos.contract.at(address);
            //     expect(contract.address).toBe(address);
            // });

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Implement verification that originate will work by not deploying a
    //  contract but comparing the output of the taq deploy --help and taq originate --help and making sure they are the same
    // There is an issue associated with it - https://github.com/ecadlabs/taqueria/issues/379
    test('Verify that taqueria taquito plugin can deploy one contract using originate {contractName} command', async () => {
        try {
            environment = "test";
            let smartContractHash = "";

            // 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
            await exec(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

            // Sometimes running two deploy commands in a short period of time cause an issue
            // More details about the error - "counter %x already used for contract %y"
            // It is applicable only for auto-tests that run very fast
            // Uses retry mechanism to avoid test to fail

            // 2. Run taq deploy on a selected test network described in "test" environment
            // const deployCommand = 
            const deployCommand = await exec(`taq originate -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).then(async (resp) => {
                const deployResponse = resp.stdout.trim().split(/\r?\n/)[3]
                await new Promise(resolve => setTimeout(resolve, 25000))
                return deployResponse
            })

            // 3. Verify that contract has been originated on the network
            expect(deployCommand).toContain("hello-tacos.tz");
            expect(deployCommand).toContain(networkInfo.networkName);
            const contractHash = deployCommand.split("│")[2];

            smartContractHash = contractHash.trim();
            expect(smartContractHash).toMatch(contractRegex);

            // 4. Verify that contract has been originated to the network
            const contract = await tezos.contract.at(smartContractHash)
            expect(contract.address).toBe(smartContractHash);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    // TODO: Consider in future to use keygen service to update account balance programmatically
    // https://github.com/ecadlabs/taqueria/issues/378
    // There is an issue with contract name https://github.com/ecadlabs/taqueria/issues/403
    // There is also an issue with multiple origination operations: https://github.com/ecadlabs/taqueria/issues/512
    // There is an issue to re-enable test after the issue has been resolved - https://github.com/ecadlabs/taqueria/issues/404
    test.skip('Verify that taqueria taquito plugin can deploy multiple contracts using deploy command', async () => {
        try {
            environment = "test";
            let smartContractOneHash = "";
            let smartContractTwoHash = "";

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            await exec(`cp e2e/data/config-taquito-test-environment-multiple-contracts.json ${taqueriaProjectPath}/.taq/config.json`);
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-one.tz`);
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-two.tz`);

            // Sometimes running two deploy commands in a short period of time cause an issue
            // More details about the error - "counter %x already used for contract %y"
            // It is applicable only for auto-tests that run very fast
            // Uses retry mechanism to avoid test to fail
            const [deployCommand1, deployCommand2] = await exec(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`}).then(async (resp) => {
                const deployResponse1 = resp.stdout.trim().split(/\r?\n/)[3]
                const deployResponse2 = resp.stdout.trim().split(/\r?\n/)[5]
                await new Promise(resolve => setTimeout(resolve, 25000))
                return [deployResponse1, deployResponse2]
            })
            
            expect(deployCommand1).toContain("hello-tacos-one.tz");
            expect(deployCommand1).toContain(networkInfo.networkName);
            const contractOneHash = deployCommand1.split("│")[2];
            smartContractOneHash = contractOneHash.trim();
            expect(smartContractOneHash).toMatch(contractRegex);
            
            expect(deployCommand2).toContain("hello-tacos-two.tz");
            expect(deployCommand2).toContain(networkInfo.networkName);
            const contractTwoHash = deployCommand2.split("│")[2];
            smartContractTwoHash = contractTwoHash.trim();
            expect(contractTwoHash.trim()).toMatch(contractRegex);

            // 4. Verify that contracts have been originated to the network
            const contractOne = await tezos.contract.at(smartContractOneHash);
            expect(contractOne.address).toBe(smartContractOneHash);
            const contractTwo = await tezos.contract.at(smartContractTwoHash);
            expect(contractTwo.address).toBe(smartContractTwoHash);

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

            // 1. Run taq deploy on a network described in "test" environment
            await exec(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`})

        } catch(error) {
            // 2. Verify that proper error is displayed in the console
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
            await exec(`cp e2e/data/config-taquito-test-environment-invalid-config-networkname.json ${taqueriaProjectPath}/.taq/config.json`);
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

            // 2. Run taq deploy on a network described in "test" environment
            await exec(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`})

        } catch(error) {
            expect(error).toContain("E_INVALID_PLUGIN_RESPONSE");
            // throw new Error (`error: ${error}`);
        }

    });

    // TODO: Currently there is no output to stdout/stderr to be caught by automation
    // Issue to investigate and re-enable these tests https://github.com/ecadlabs/taqueria/issues/377
    // Issue associated https://github.com/ecadlabs/taqueria/issues/313
    test('Verify that taqueria taquito plugin will show proper error when faucet is wrong -> network url is wrong', async () => {
        try {
            // Environment test does not exist on default config.json
            environment = "test"

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            await exec(`cp e2e/data/config-taquito-test-environment-invalid-config-network-url.json ${taqueriaProjectPath}/.taq/config.json`);
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);

            // 2. Run taq deploy on a network described in "test" environment
            const stdoutDeploy = await exec(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`})

            // 3. Verify that proper error displays in the console
            expect(stdoutDeploy.stderr).toContain("E_ORIGINATE");
            expect(stdoutDeploy.stderr).toContain("An unexpected error occured when trying to originate a contract");
            expect(stdoutDeploy.stderr).toContain("HttpRequestFailed: Request to https://invalid.test/chains/main/blocks/");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Currently there is no output to stdout/stderr to be caught by automation
    // Issue to investigate and re-enable these tests https://github.com/ecadlabs/taqueria/issues/377
    // Issue associated https://github.com/ecadlabs/taqueria/issues/313
    test('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> empty', async () => {
        try {
            // Environment test does not exist on default config.json
            environment = "test"

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
            await exec(`cp e2e/data/config-taquito-test-environment-invalid-faucet-empty.json ${taqueriaProjectPath}/.taq/config.json`);

            // 2. Run taq deploy on a network described in "test" environment
            const stdoutDeploy = await exec(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`})

            // 3. Verify that proper error displays in the console
            expect(stdoutDeploy.stderr).toContain("E_ORIGINATE");
            expect(stdoutDeploy.stderr).toContain("An unexpected error occured when trying to originate a contract");
            expect(stdoutDeploy.stderr).toContain("Error: Unsupported key type");


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
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
            await exec(`cp e2e/data/config-taquito-test-environment-invalid-faucet-pkh.json ${taqueriaProjectPath}/.taq/config.json`);

            // 2. Run taq deploy on a network described in "test" environment
            const stdoutDeploy = await exec(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`})

            // 3. Verify that proper error displays in the console
            expect(stdoutDeploy.stderr).toContain("E_ORIGINATE");
            expect(stdoutDeploy.stderr).toContain("An unexpected error occured when trying to originate a contract");
            expect(stdoutDeploy.stderr).toContain("Error: Probably something about the PKH");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Currently there is no output to stdout/stderr to be caught by automation
    // Issue to investigate and re-enable these tests https://github.com/ecadlabs/taqueria/issues/377
    // Issue associated https://github.com/ecadlabs/taqueria/issues/313
    test('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> initial storage is not provided', async () => {
        try {
            // Environment test does not exist on default config.json
            environment = "test"

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
            await exec(`cp e2e/data/config-taquito-test-environment-invalid-initial-storage.json ${taqueriaProjectPath}/.taq/config.json`);

            // 2. Run taq deploy on a network described in "test" environment
            const stdoutDeploy  = await exec(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`})

            // 3. Verify that proper error displays in the console
            expect(stdoutDeploy.stderr).toContain("E_INVALID_STORAGE");
            expect(stdoutDeploy.stderr).toContain("No storage configured in your configuration file for hello-tacos.tz");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Currently there is no output to stdout/stderr to be caught by automation
    // Issue to investigate and re-enable these tests https://github.com/ecadlabs/taqueria/issues/377
    // Issue associated https://github.com/ecadlabs/taqueria/issues/313
    test('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> initial storage is not a number', async () => {
        try {
            // Environment test does not exist on default config.json
            environment = "test"

            // 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
            await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
            await exec(`cp e2e/data/config-taquito-test-environment-invalid-initial-storage-string.json ${taqueriaProjectPath}/.taq/config.json`);

            // 2. Run taq deploy on a network described in "test" environment
            const stdoutDeploy  = await exec(`taq deploy -e ${environment}`, {cwd: `./${taqueriaProjectPath}`})

            // 3. Verify that proper error displays in the console
            expect(stdoutDeploy.stderr).toContain("E_ORIGINATE");
            expect(stdoutDeploy.stderr).toContain("Could not originate hello-tacos.tz on the network 'ithacanet'");
            expect(stdoutDeploy.stderr).toContain("NatValidationError: [0] Value is not a number: abc");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // Remove all files from artifacts folder without removing folder itself
    afterEach( async () => {
        try {
            const files = await fsPromises.readdir(`${taqueriaProjectPath}/artifacts/`);
            for (const file of files) {
                await fsPromises.rm(`${taqueriaProjectPath}/artifacts/${file}`);
            }
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

    // Clean up process to remove taquified project folder
    // Comment if need to debug
    afterAll( async () => {
        try {
            await fsPromises.rm(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

});