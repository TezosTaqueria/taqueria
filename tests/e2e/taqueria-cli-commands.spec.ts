import { generateTestProject } from "./utils/utils";
import { exec as exec1, execSync } from "child_process";
import fs from "fs";
import util from "util";
const exec = util.promisify(exec1);


const taqueriaProjectPath = './e2e/auto-test-cli';
const helpContentsNoProject = `taq [command]

Commands:
  taq init [projectDir]  Initialize a new project

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration

Taqueria is currently in BETA. You've been warned. :)

Your config.json file looks invalid.
`;
const helpContentsForProject = `taq <command>

Commands:
  taq init [projectDir]       Initialize a new project
  taq install <pluginName>    Install a plugin
  taq uninstall <pluginName>  Uninstall a plugin

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

// Test template
// test('', () => {
//     try {
        
//     } catch(error) {
//         throw new Error (`error: ${error}`);
//     }
// });

describe("E2E Testing for taqueria general functionality", () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath);
    })

    test('Verify that taq --help gives the help menu for a non-initialized project', async () => {
        try {
            const help = await exec('taq --help')
            expect(help.stderr).toBe(helpContentsNoProject)
        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taq --help gives the help menu for an initialized project', async () => {
        try {
            const projectHelp = await exec(`taq --help -p ${taqueriaProjectPath}`)
            expect(projectHelp.stdout).toBe(helpContentsForProject)
        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taq reports the correct version', () => {
        const version = execSync('taq --version').toString().trim();
        if (process.env.CI === 'true') {
            try {
                const packageJsonContents = JSON.parse(fs.readFileSync('package.json').toString())
                expect(version).toEqual('v' + packageJsonContents.version)
            } catch (error) {
                throw new Error (`error: ${error}`);
            }
        } else {
            try {
                const branch = execSync('git branch --show-current').toString().trim()
                expect(version).toMatch('dev:' + branch)
            } catch (error) {
                throw new Error (`error: ${error}`);
            }
        }
        
    });

    test('Test that ', () => {
        try {
            console.log("good stuff")
        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

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