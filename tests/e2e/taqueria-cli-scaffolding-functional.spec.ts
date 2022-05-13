import { exec as exec1 } from "child_process"
import fsPromises from "fs/promises"
import util from "util"
const exec = util.promisify(exec1)

const scaffoldDirName = `taqueria-quickstart`

describe("E2E Testing for taqueria scaffolding initialization,", () => {

    beforeAll(async () => {
        try {
            await exec('taq scaffold')
            await exec(`cd ${scaffoldDirName} && npm run setup`)
        } catch (error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that scaffold project can be set up', async () => {
        try {
            const appContents = await exec(`ls ${scaffoldDirName}/app`)
            const taqContents = await exec(`ls ${scaffoldDirName}/taqueria`)

            expect(appContents.stdout).toContain('node_modules')

            expect(taqContents.stdout).toContain('node_modules')
            expect(taqContents.stdout).toContain('contracts')
            expect(taqContents.stdout).toContain('artifacts')
            expect(taqContents.stdout).toContain('tests')
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that scaffold project can build taqueria', async () => {
        try {
            await exec(`cd ${scaffoldDirName} && npm run build:taqueria`)
            const taqContents = await exec(`ls ${scaffoldDirName}/taqueria/artifacts`)
            expect(taqContents.stdout).toContain('example.tz')
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test.skip('Verify that scaffold project can start and stop taqueria locally', async () => {
        try {
            const startResults = await exec(`cd ${scaffoldDirName} && npm run start:taqueria:local`)
            expect(startResults.stdout).toContain('Processing /example.tz...')
            expect(startResults.stdout).toContain('example.tz: Types generated')
            expect(startResults.stdout).toContain('Started local.')

            const stopResults = await exec(`cd ${scaffoldDirName}/taqueria && npm run stop:local`)
            expect(stopResults.stdout).toContain('Stopped local.')
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    afterAll(async () => {
        try {
            await fsPromises.rm(`${scaffoldDirName}`, { recursive: true })
        } catch (error) {
            throw new Error (`error: ${error}`)
        }
    })
})