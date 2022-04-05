import * as contents from "./data/help-contents"
import { generateTestProject } from "./utils/utils"
import { exec as exec1, execSync } from "child_process"
import fsPromises from "fs/promises"
import type { ExecException } from "child_process"
import fs from "fs"
import util from "util"
const exec = util.promisify(exec1)

const taqueriaProjectPath = './e2e/auto-test-cli'

describe("E2E Testing for taqueria CLI,", () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath)
    })

    test('Verify that taq --help gives the help menu for a non-initialized project', async () => {        
        try {
            await exec('taq --help').catch(
                (err: ExecException & {stdout: string, stderr: string}) => {
                    expect(err.code).toEqual(1)
                    expect(err.stderr).toBe(contents.helpContentsNoProject)
                }
            )
            
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that taq --help gives the help menu for an initialized project', async () => {
        try {
            await exec(`taq --help -p ${taqueriaProjectPath}`).catch(
                (err: ExecException & {stdout: string, stderr: string}) => {
                    expect(err.code).toEqual(1)
                    expect(err.stderr).toBe(contents.helpContentsForProject)
                }
            )
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that taq reports a version', () => {
        const version = execSync('taq --version')
        try {
            expect(version.toString("utf8").trim()).toMatch(/^((v\d+\.\d+\.\d+)|(dev-[\w-]+)|(\d+)-[\w-]+)$/)
        } catch (error) {
            throw new Error (`error: ${error}`)
        }
    })

    test("Verify that build reports build information about the version", () => {
        const build = execSync('taq --build')
        try {
            expect(build.toString('utf8').trim()).toMatch(/^\w+$/)
        } catch (error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that the config directory can be set when initializing a project', async () => {
        const projectName = 'test-1'
        const configDirName = 'configDirProject'

        try {
            await exec(`taq init ${projectName} --configDir ${configDirName}`)

            const projectContents = await exec(`ls ${projectName}`)
            const configDirContents = await exec(`ls ${projectName}/${configDirName}`)

            expect(projectContents.stdout).toContain(configDirName)
            expect(configDirContents.stdout).toContain('config.json')

            await fsPromises.rm(`./${projectName}`, { recursive: true })
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that the ligo plugin exposes the associated commands in the help menu', async () => {
        try {
            await exec(`taq install ../../../taqueria-plugin-ligo -p ${taqueriaProjectPath}`)

            // TODO: This can removed after this is resolved:
            // https://github.com/ecadlabs/taqueria/issues/528
            try {
                await exec(`taq -p ${taqueriaProjectPath}`)
            }
            catch (_) {}

            const ligoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`)
            expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigo)

            await exec(`taq uninstall @taqueria/plugin-ligo -p ${taqueriaProjectPath}`)
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that the smartpy plugin exposes the associated commands in the help menu', async () => {
        try {
            await exec(`taq install ../../../taqueria-plugin-smartpy -p ${taqueriaProjectPath}`)

            // TODO: This can removed after this is resolved:
            // https://github.com/ecadlabs/taqueria/issues/528
            try {
                await exec(`taq -p ${taqueriaProjectPath}`)
            }
            catch (_) {}

            const smartpyHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`)
            expect(smartpyHelpContents.stdout).toBe(contents.helpContentsSmartpy)

            await exec(`taq uninstall @taqueria/plugin-smartpy -p ${taqueriaProjectPath}`)
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that the taquito plugin exposes the associated commands in the help menu', async () => {
        try {
            await exec(`taq install ../../../taqueria-plugin-taquito -p ${taqueriaProjectPath}`)
            
            // TODO: This can removed after this is resolved:
            // https://github.com/ecadlabs/taqueria/issues/528
            try {
                await exec(`taq -p ${taqueriaProjectPath}`)
            }
            catch (_) {}

            const taquitoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`)
            expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquito)

            await exec(`taq uninstall @taqueria/plugin-taquito -p ${taqueriaProjectPath}`)
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that the flextesa plugin exposes the associated commands in the help menu', async () => {
        try {
            await exec(`taq install ../../../taqueria-plugin-flextesa -p ${taqueriaProjectPath}`)

            // TODO: This can removed after this is resolved:
            // https://github.com/ecadlabs/taqueria/issues/528
            try {
                await exec(`taq -p ${taqueriaProjectPath}`)
            }
            catch (_) {}

            const flextesaHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`)
            expect(flextesaHelpContents.stdout).toBe(contents.helpContentsFlextesa)

            await exec(`taq uninstall @taqueria/plugin-flextesa -p ${taqueriaProjectPath}`)
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that ligo and smartpy expose the plugin choice option for compile in the help menu', async () => {
        try {
            await exec(`taq install ../../../taqueria-plugin-ligo -p ${taqueriaProjectPath}`)
            await exec(`taq install ../../../taqueria-plugin-smartpy -p ${taqueriaProjectPath}`)
            
            // TODO: This can removed after this is resolved:
            // https://github.com/ecadlabs/taqueria/issues/528
            try {
                await exec(`taq -p ${taqueriaProjectPath}`)
            }
            catch (_) {}

            const ligoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`)
            expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigoSmartpy)

            await exec(`taq uninstall @taqueria/plugin-ligo -p ${taqueriaProjectPath}`)
            await exec(`taq uninstall @taqueria/plugin-smartpy -p ${taqueriaProjectPath}`)
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that trying a command that is not available returns an error', async () => {
        try {
            await exec(`taq compile -p ${taqueriaProjectPath}`).catch(
                (err: ExecException & {stdout: string, stderr: string}) => {
                    expect(err.code).toEqual(5)
                    expect(err.stderr).toContain("Taqueria isn't aware of this task. Perhaps you need to install a plugin first?")
                }
            )
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that trying to install a package that does not exist returns an error', async () => {
        try {
            await exec(`taq install acoupleofecadhamburgers -p ${taqueriaProjectPath}`).catch(
                (err: ExecException & {stdout: string, stderr: string}) => {
                    const pattern = /Could not read.*acoupleofecadhamburgers\/package\.json$/m
                    expect(err.code).toEqual(9)
                    expect(err.stderr).toMatch(pattern)
                }
            )
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    // Clean up process to remove taquified project folder
    // Comment if need to debug
    afterAll(() => {
        try {
            fs.rmSync(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`)
        }
    })
})