import {defaultConfig, toLoadedConfig} from '../../taqueria-config.ts'
import inject from "../../plugins.ts"
import * as SanitizedArgs from "@taqueria/protocol/SanitizedArgs"
import * as SanitizedAbsPath from "@taqueria/protocol/SanitizedAbsPath"
import * as Url from "@taqueria/protocol/Url"
import * as InstalledPlugin from "../../taqueria-protocol/InstalledPlugin.ts"
import {TaqError} from '../../taqueria-utils/taqueria-utils-types.ts'
import {toPromise} from "../../taqueria-utils/taqueria-utils.ts"
import { assertEquals, assert, assertRejects} from "https://deno.land/std@0.127.0/testing/asserts.ts";
import {i18n} from '../../i18n.ts'
import {MockWriter} from "./helpers.ts"

Deno.test('inject()', async (t) => {
    const projectDir = SanitizedAbsPath.make("/tmp/test-project")

    const sanitizedArgs = SanitizedArgs.create({
        _: ["init"],
        build: false,
        debug: false,
        disableState: false,
        env: "development",
        fromVsCode: false,
        logPluginRequests: true,
        maxConcurrency: 10,
        projectDir,
        quickstart: "Foo",
        setBuild: "foo/bar",
        setVersion: "1.0.0",
        version: false,
        help: false
    })

    const config = await toPromise (toLoadedConfig(
        "config.json",
        SanitizedAbsPath.make(`${projectDir}/.taq`),
        defaultConfig
    ))

    const deps = {
        config,
        parsedArgs: sanitizedArgs,
        env: Deno.env,
        i18n,
        stdout: new MockWriter(),
        stderr: new MockWriter()
    }
    const pluginLib = inject(deps)

    assert(typeof pluginLib === 'object')
    assert(typeof pluginLib.getState === 'function')
    assert(typeof pluginLib.sendPluginActionRequest === 'function')

    await t.step("toPluginArguments() returns an array suitable for invoking a plugin task", () => {
        const {toPluginArguments} = pluginLib.__TEST__
        const requestArgs = {foo: "bar", bar: "foo"}
    
        const result = toPluginArguments(requestArgs)
    
        assertEquals(result, [
            "--projectDir",
            "'/tmp/test-project'",
            "--maxConcurrency",
            10,
            "--debug",
            false,
            "--env",
            "'development'",
            "--logPluginRequests",
            true,
            "--setBuild",
            "'foo/bar'",
            "--setVersion",
            "'1.0.0'",
            "--fromVsCode",
            false,
            "--help",
            false,
            "--foo",
            "'bar'",
            "--bar",
            "'foo'"
        ])
    });

    await t.step("execPluginText() returns string with nothing output to stderr or stdout", async () => {
        const {execPluginText} = pluginLib.__TEST__
        const msg = "foobar"

        const output = await toPromise(execPluginText(['echo', msg]))

        assertEquals(output, `${msg}\n`)
        assertEquals(deps.stderr.toString(), "")
        assertEquals(deps.stdout.toString(), "")
    })

    await t.step("execPluginText() returns string, outputs to stderr, and doesn't output to stdout", async () => {
        const {execPluginText} = pluginLib.__TEST__
        const msg = "foobar"

        const output = await toPromise(execPluginText(['sh', '-c', `node -e  "console.error('${msg}');console.log('${msg}')"`]))

        assertEquals(output, `${msg}\n`)
        assertEquals(deps.stderr.toString(), `${msg}\n`)
        assertEquals(deps.stdout.toString(), "")
    })

    await t.step("execPluginText() returns empty string, outputs to stderr, and doesn't output stdout", async () => {
        const {execPluginText} = pluginLib.__TEST__
        const msg = "foobar"

        const output = await toPromise(execPluginText(['sh', '-c', `node -e  "console.error('${msg}');"`]))

        assertEquals(output, '')
        assertEquals(deps.stderr.toString(), `${msg}\n`)
        assertEquals(deps.stdout.toString(), "")
    })

    await t.step("execPluginText() throws an error when given an invalid command", () => {
        const {execPluginText} = pluginLib.__TEST__
        assertRejects<TaqError.E_TaqError>(() => toPromise(execPluginText(['foobar'])))
        assertEquals(deps.stderr.toString(), '')
        assertEquals(deps.stdout.toString(), '')
    })

    await t.step("execPluginPassthru() returns Process, outputs nothing to stderr, and outputs to stdout", async () => {
        const {execPluginPassthru} = pluginLib.__TEST__
        const msg = "foobar"
        
        deps.stderr.clear()
        const output = await toPromise(execPluginPassthru(['echo', msg]))

        assert(output instanceof Deno.Process)
        assertEquals(deps.stdout.toString(), `${msg}\n`)
        assertEquals(deps.stderr.toString(), '')
    })

    await t.step("execPluginPassThru() returns Process, outputs nothing to stdout, and outputs to stderr", async () => {
        const {execPluginPassthru} = pluginLib.__TEST__
        const msg = "foobar"
        
        deps.stderr.clear()
        const output = await toPromise(execPluginPassthru(['sh', '-c', `node -e  "console.error('${msg}');"`]))

        assert(output instanceof Deno.Process)
        assertEquals(deps.stdout.toString(), '')
        assertEquals(deps.stderr.toString(), `${msg}\n`)
    })

    await t.step("execPluginPassThru() throws an error when given an invalid command", () => {
        const {execPluginPassthru} = pluginLib.__TEST__
        assertRejects<TaqError.E_TaqError>(() => toPromise(execPluginPassthru(['foobar'])))
        assertEquals(deps.stderr.toString(), '')
        assertEquals(deps.stdout.toString(), '')
    })

    await t.step("execPluginJson() returns object with nothing output to stdout and stderr", async () => {
        const {execPluginJson} = pluginLib.__TEST__
        const msg = {foo: "bar"}
        
        deps.stderr.clear()
        const output = await toPromise(execPluginJson(['echo', JSON.stringify(msg)]))

        assertEquals(output, msg)
        assertEquals(deps.stdout.toString(), '')
        assertEquals(deps.stderr.toString(), '')
    })

    await t.step("execPluginJson() returns object with nothing output to stdout, but an error on stderr", async () => {
        const {execPluginJson} = pluginLib.__TEST__
        const msg = {foo: "bar"}
        
        deps.stderr.clear()
        const output = await toPromise(execPluginJson(['sh', '-c', "node -e \"console.log(JSON.stringify({foo:'bar'}));console.error('foobar')\""]))

        assertEquals(output, msg)
        assertEquals(deps.stdout.toString(), '')
        assertEquals(deps.stderr.toString(), "foobar\n")
    })

    await t.step("execPluginJson() throws an error when the command returns invalid JSON", async () => {
        const {execPluginJson} = pluginLib.__TEST__

        try {
            await toPromise(execPluginJson(['echo', "foobar"]))
        }
        catch (err) {
            assert(err instanceof TaqError.E_TaqError)
            assertEquals(err.kind, "E_EXEC")
            assertEquals((err.previous as TaqError.t).kind, "E_INVALID_JSON")
        }

        assertEquals(deps.stderr.toString(), '')
        assertEquals(deps.stdout.toString(), '')
    })
    
    // TODO: Once we have more than one type of plugin, we'll need to add
    // appropriate tests for getPluginExe
    // No issue exists for this as it only come up when we decide to implement
    // a plugin that isn't an NPM package.
    await t.step("getPluginExe() returns the correct command to invoke an NPM script", () => {
        const {getPluginExe} = pluginLib.__TEST__

        const output = getPluginExe({name: "@taqueria/plugin-ligo", type: "npm"})
        assertEquals(output, ["node", "/tmp/test-project/node_modules/@taqueria/plugin-ligo/index.js"])
    })


    // TODO: Move this test to e2e. Its not really a unit test.
    // See https://github.com/ecadlabs/taqueria/issues/507
    return
    await t.step("logPluginRequests() outputs the call to a plugin", async () => {
        const {toPluginArguments, logPluginRequest} = pluginLib.__TEST__

        const plugin : InstalledPlugin.t = {
            name: "@taqueria/plugin-ligo",
            type: "npm"
        }
        const pluginArgs = toPluginArguments({})

        const expected = [
            "*** START Call to @taqueria/plugin-ligo ***",
            "node index.js \\",
            ...pluginArgs.slice(0, -1).map(item => `${item} \\`),
            `${pluginArgs.slice(-1)}`,
            "*** END of call to @taqueria/plugin-ligo ***\n"
        ].join("\n")

        deps.stdout.clear()
        await toPromise( logPluginRequest (plugin) (["node index.js", ...pluginArgs]) )

        const actual = deps.stdout.toString()
        assertEquals(actual, expected)
    })
})