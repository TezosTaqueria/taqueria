import {__TEST__} from '../../cli.ts'
import type {SanitizedInitArgs} from '../../taqueria-types.ts'
import type {InstalledPlugin} from "../../taqueria-protocol/taqueria-protocol-types.ts"
import {SanitizedAbsPath, SanitizedPath, SanitizedUrl} from '../../taqueria-utils/taqueria-utils-types.ts'
import { assertEquals } from "https://deno.land/std@0.127.0/testing/asserts.ts";

const {toPluginArguments, logPluginCall} = __TEST__

const log = (captured: string[]) => (input: string) => {
    captured.push(input)
    return input
}

const sanitizedArgs : SanitizedInitArgs = {
    _: ["init"],
    build: false,
    debug: false,
    configDir: SanitizedPath.create(".taq") as SanitizedPath,
    disableState: false,
    env: "development",
    fromVsCode: false,
    logPluginCalls: false,
    maxConcurrency: 10,
    projectDir: SanitizedAbsPath.create("/tmp/test-project") as SanitizedAbsPath,
    quickstart: "Foo",
    scaffoldProjectDir: SanitizedAbsPath.create("/tmp/scaffold-project") as SanitizedAbsPath,
    scaffoldUrl: SanitizedUrl.create("http://foo.bar") as SanitizedUrl,
    setBuild: "foo/bar",
    setVersion: "1.0.0",
    version: false
}

Deno.test("Positive test for {toPluginArguments}", () => {
    const requestArgs = {foo: "bar", bar: "foo"}

    const result = toPluginArguments(sanitizedArgs, requestArgs)

    assertEquals(result, [
        "--command",
        "init",
        "--build",
        false,
        "--debug",
        false,
        "--configDir",
        "'./.taq'",
        "--disableState",
        false,
        "--env",
        "'development'",
        "--fromVsCode",
        false,
        "--logPluginCalls",
        false,
        "--maxConcurrency",
        10,
        "--projectDir",
        "'/tmp/test-project'",
        "--scaffoldProjectDir",
        "'/tmp/scaffold-project'",
        "--scaffoldUrl",
        "'http://foo.bar'",
        "--setBuild",
        "'foo/bar'",
        "--setVersion",
        "'1.0.0'",
        "--version",
        false,
        "--foo",
        "'bar'",
        "--bar",
        "'foo'"
    ])
});

Deno.test("Positive test for logPluginCalls", () => {
    const actual: string[] = []

    const plugin : InstalledPlugin = {
        name: "@taqueria/plugin-ligo",
        type: "npm"
    }

    const pluginArgs = toPluginArguments(sanitizedArgs, {})
    
    logPluginCall(["node index.js", ...pluginArgs], plugin, log(actual))

    assertEquals(actual, [
        "*** START Call to @taqueria/plugin-ligo ***",
        "node index.js \\",
        ...pluginArgs.slice(0, -1).map(item => `${item} \\`),
        false,
        "*** END of call to @taqueria/plugin-ligo ***"
    ])
})