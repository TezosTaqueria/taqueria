import { generateTestProject } from "./utils/utils"
import { exec as exec1, execSync } from "child_process"
import fsPromises from "fs/promises"
import util from "util"
const exec = util.promisify(exec1)

describe("E2E Testing for taqueria scaffolding,", () => {

    const taqueriaProjectPath = './e2e/auto-test-scaffold'
    const scaffoldDirName = `taqueria-quickstart`

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath)
    })

    test('Verify that taq scaffold will create a baseline scaffold of the quickstart project', async () => {
        try {
            await exec('taq scaffold')
            const homeDirContents = await exec('ls')
            expect(homeDirContents.stdout).toContain(scaffoldDirName)

            await fsPromises.rm(`./${scaffoldDirName}`, { recursive: true })
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that taq scaffold quickstart project has the correct file structure', async () => {
        try {
            await exec('taq scaffold')
            const scaffoldDirContents = await exec(`ls ${scaffoldDirName}`)

            expect(scaffoldDirContents.stdout).toContain('Readme.md')
            expect(scaffoldDirContents.stdout).toContain('app')
            expect(scaffoldDirContents.stdout).toContain('contract')
            expect(scaffoldDirContents.stdout).toContain('package.json')

            await fsPromises.rm(`./${scaffoldDirName}`, { recursive: true })
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that taq scaffold can use the URL parameter to clone a different scaffold into the project', async () => {
        try {
            await exec('taq scaffold https://github.com/microsoft/calculator.git')
            const scaffoldDirContents = await exec(`ls ${scaffoldDirName}`)

            expect(scaffoldDirContents.stdout).toContain('README.md')
            expect(scaffoldDirContents.stdout).toContain('Tools')
            expect(scaffoldDirContents.stdout).toContain('docs')
            expect(scaffoldDirContents.stdout).toContain('nuget.config')

            await fsPromises.rm(`./${scaffoldDirName}`, { recursive: true })
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test.only('Verify that taq scaffold returns an error with a bogus URL', async () => {
        try {
            const response = await exec('taq scaffold https://github.com/microsoft/supersecretproject.git')

            expect(response.stderr).toContain("E_SCAFFOLD_URL_GIT_CLONE_FAILED")
            expect(response.stderr).toContain("Could not scaffold")

        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    // Clean up process to remove taquified project folder
    // Comment if need to debug
    afterAll(async () => {
        try {
            await fsPromises.rm(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`)
        }
    })
})