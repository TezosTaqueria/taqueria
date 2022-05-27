import { exec as exec1 } from "child_process"
import fsPromises from "fs/promises"
import util from "util"
const exec = util.promisify(exec1)

describe("E2E Testing for taqueria scaffolding initialization,", () => {

    const scaffoldDirName = `taqueria-quickstart`

    test('Verify that taq scaffold will create a baseline scaffold of the quickstart project', async () => {
        // the URL for the default scaffold project is https://github.com/ecadlabs/taqueria-scaffold-quickstart.git
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

            expect(scaffoldDirContents.stdout).toContain('README.md')
            expect(scaffoldDirContents.stdout).toContain('app')
            expect(scaffoldDirContents.stdout).toContain('taqueria')
            expect(scaffoldDirContents.stdout).toContain('package.json')

            await fsPromises.rm(`./${scaffoldDirName}`, { recursive: true })
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    // We will not need to remove the .git directory once https://github.com/ecadlabs/taqueria/issues/390 is complete
    // That being said when it is complete it will be easy to remove since this test will fail then 
    test.skip('Verify that taq scaffold quickstart project has the correct md5 checksum', async () => {
        const tarFileName = 'taq-quickstart.tar'
        try {
            await exec('taq scaffold')
            await fsPromises.rm(`./${scaffoldDirName}/.git`, { recursive: true })
            await exec(`tar -cf ${tarFileName} ${scaffoldDirName} --mtime=2020-01-30`)
            
            const tarMD5Sum = await exec(`md5sum ${tarFileName}`)
            const md5sum = tarMD5Sum.stdout.split(' ')[0]
            expect(md5sum).toBe("e82c12f68cc2e3fc90dd842d994bdcc7")

            await fsPromises.rm(`./${scaffoldDirName}`, { recursive: true })
            await fsPromises.rm(`./${tarFileName}`)
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

            await fsPromises.rm(`./${scaffoldDirName}`, { recursive: true, force: true })
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    // TODO: https://github.com/ecadlabs/taqueria/issues/737
    test.skip('Verify that taq scaffold returns an error with a bogus URL', async () => {
        try {
            const response = await exec('taq scaffold https://github.com/microsoft/supersecretproject.git')

            expect(response.stderr).toContain("Repository not found")

        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    test('Verify that taq scaffold quickstart project can be installed in a specific directory', async () => {
        const alternateDirectory = 'alt-directory'
        
        try {
            await exec(`taq scaffold https://github.com/ecadlabs/taqueria-scaffold-quickstart.git ${alternateDirectory}`)
            const scaffoldDirContents = await exec(`ls ${alternateDirectory}`)

            expect(scaffoldDirContents.stdout).toContain('README.md')
            expect(scaffoldDirContents.stdout).toContain('app')
            expect(scaffoldDirContents.stdout).toContain('taqueria')
            expect(scaffoldDirContents.stdout).toContain('package.json')

            await fsPromises.rm(`./${alternateDirectory}`, { recursive: true , force: true})
        } catch(error) {
            throw new Error (`error: ${error}`)
        }
    })

    // TODO: https://github.com/ecadlabs/taqueria/issues/737
    test.skip('Verify that taq scaffold quickstart project cannot be injected into an existing directory', async () => {
        const alternateDirectory = 'alt-directory'
        await fsPromises.mkdir(`${alternateDirectory}`)

        const scaffoldResponse = await exec(`taq scaffold https://github.com/ecadlabs/taqueria-scaffold-quickstart.git ${alternateDirectory}`)
        expect(scaffoldResponse.stderr).toContain("Path already exists")

        await fsPromises.rm(`./${alternateDirectory}`, { recursive: true, force: true })
    })

    // If a test fails before cleaning up after itself, this
    // directory could remain.
    const cleanup = async() => {
        try {
            await fsPromises.rm('alt-directory', {recursive: true, force: true})
        }
        catch {
            // Deliberately empty
        }
    }
    beforeEach(cleanup)
})