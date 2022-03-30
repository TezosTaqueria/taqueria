import { assertEquals, assertRejects, unreachable, assert } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import {fork, mapRej, promise} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js';
import {inject} from "../../../taqueria-utils/taqueria-utils.ts";
import chai from "https://cdn.skypack.dev/chai@4.3.4?dts";
import { exists} from "https://deno.land/std@0.132.0/fs/mod.ts";
import {TaqError, SanitizedAbsPath} from "../../../taqueria-utils/taqueria-utils-types.ts";
import {MockWriter} from "../helpers.ts"
const {
    decodeJson,
    isTaqError,
    log,
    mkdir,
    renderTemplate,
    writeTextFile,
    execText,
    toPromise,
    stdout,
    stderr
} = inject({
    stdout: new MockWriter(),
    stderr: new MockWriter()
})

const testValidJson = '{"test": "testPayload"}';
const testInvalidJson = '{"test": testPayload}';

Deno.test("Positive scenario test for {decodeJson} function", () => {
    const result = decodeJson(testValidJson);
    const decodedJson = { test: "testPayload"};
    const assertSuccess = (testJsonOutput: any) => assertEquals(testJsonOutput, decodedJson)
    const assertUnreachable = () => unreachable();
    fork (assertUnreachable) (assertSuccess) (result);
});

// TODO: Michael to help with solution for return ()
// This test was built to try to test return () => {} (line 16)
// https://github.com/ecadlabs/taqueria/issues/202
Deno.test("Positive scenario test for {decodeJson} function to return () => {}", () => {
    const result = decodeJson("{}");
    const assertSuccess = (testJsonOutput: any) => assertEquals(testJsonOutput, {});
    const assertUnreachable = () => unreachable();
    fork (assertUnreachable) (assertSuccess) (result);
});

Deno.test({ name: "Negative scenario test for {decodeJson} function", fn: () => {
    assertRejects( ()=> {
            toPromise (decodeJson(testInvalidJson));
                throw new Error("The provided JSON could not be decoded.")
            },
            Error, "The provided JSON could not be decoded."
        );
    }
});

Deno.test("Positive scenario test for {log} function", () => {
    const assert = chai.assert;
    const resultLogOneArgument = log("test");
    assert.typeOf(resultLogOneArgument, "Function", "Verify that log returns a function for first call");
    const resultLogTwoArguments = log("test")("test");
    assert.equal(resultLogTwoArguments, "test", "log called twice should return second argument `test`");
});

Deno.test("Negative scenario test for {log} function", () => {
    const expect = chai.expect;
    const result = log("test");
    expect(result).not.to.be.a("string")
});

Deno.test({name: "Positive scenario test for {mkdir} function", fn: async (t: any) => {
        await t.step("run test for {mkdir} function", async () => {
            const assert = chai.assert;
            const result = await toPromise(mkdir("./unit/taqueria-utils/data/test"));
            exists(result).then((result: any) => assert.equal(result, true));
        });
        await t.step("clean up", () => {
            try {
                Deno.removeSync('./unit/taqueria-utils/data/test');
            } catch (err) {
                console.error(err);
            }
        });
    },
    
},);


Deno.test({ignore: true, name: "Positive scenario test for {writeTextFile} function",  fn: async (t: any) => {
        await t.step("run test for {writeTextFile} function", async () => {
            const assert = chai.assert;
            const result = await toPromise (writeTextFile("./unit/taqueria-utils/data/testWrite.txt")("testWrite"));
            assert.equal(result, './unit/taqueria-utils/data/testWrite.txt');
        });
        await t.step("clean up", () => {
            try {
                Deno.removeSync('./unit/taqueria-utils/data/testWrite.txt');
            } catch (err) {
                console.error(err);
            }
        });
    },
    sanitizeResources: false,
    sanitizeOps: false
})

Deno.test({ignore: true, name: "Negative scenario test for {writeTextFile} function to catch error",  fn: () => {
        assertRejects( ()=> {
            toPromise (writeTextFile("./unit/taqueria-utils/data/temp")("test"));
                throw new Error("Is a directory (os error 21), open './unit/taqueria-utils/data/temp'\n")
            },
            Error, "Is a directory (os error 21), open './unit/taqueria-utils/data/temp'\n"
        );
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({name: "Positive scenario test for {isTaqError} function",  fn: () => {
        const assert = chai.assert;
        const taqErrorTest : TaqError = {
            kind: "E_FORK",
            msg: "Test"
        };
        const result = isTaqError(taqErrorTest);
        assert.equal(result, true)
    },
    sanitizeResources: false,
    sanitizeOps: false
});


Deno.test({name: "Negative scenario test for {isTaqError} function",  fn: () => {
        const assert = chai.assert;
        const taqErrorTest = "error"
        const result = isTaqError(taqErrorTest);
        assert.equal(result, false)
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({name: "Positive scenario test for {renderTemplate} function",  fn: () => {
        const assert = chai.assert;
        const testTemplate = "<p>My favorite kind of cake is: <%= it.favoriteCake %></p>";
        const result = renderTemplate(testTemplate, { favoriteCake: "Chocolate!" });
        assert.equal(result, "<p>My favorite kind of cake is: Chocolate!</p>")
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test("execText() can execute a command without buffering", async () => {
    const stdOut = (stdout as MockWriter)
    const stdErr = (stderr as MockWriter)
    stdOut.clear()
    stdErr.clear()

    const retval = await toPromise ( execText("echo foobar", {}) )
    assertEquals(retval, 0)
    assertEquals(stdout.toString(), "foobar\n")
    assertEquals(stderr.toString(), "")
})

Deno.test("execText() handles errors correctly", async () => {
    const stdOut = (stdout as MockWriter)
    const stdErr = (stderr as MockWriter)
    stdOut.clear()
    stdErr.clear()

    const retval = await toPromise ( execText("node -e \"console.error('foobar'); process.exit(-1)\"", {}) )
    assertEquals(retval, 255)
    assertEquals(stdout.toString(), "")
    assertEquals(stderr.toString(), "foobar\n")
})

Deno.test("execText() can parse ESJ templates", async () => {
    const stdOut = (stdout as MockWriter)
    const stdErr = (stderr as MockWriter)
    stdOut.clear()
    stdErr.clear()

    const retval = await toPromise ( execText("echo <%= it.text%>", {text: "foobar"}) )
    assertEquals(retval, 0)
    assertEquals(stdout.toString(), "foobar\n")
    assertEquals(stderr.toString(), "")  
})

Deno.test("execText() can buffer stdout", async () => {
    const stdOut = (stdout as MockWriter)
    const stdErr = (stderr as MockWriter)
    stdOut.clear()
    stdErr.clear()

    const retval = await toPromise ( execText("echo <%= it.text%>", {text: "foobar"}, true) )
    assertEquals(retval, "foobar\n")
    assertEquals(stdout.toString(), "")
    assertEquals(stderr.toString(), "")
})

Deno.test("execText() can execute in a different working directory", async () => {
    const stdOut = (stdout as MockWriter)
    const stdErr = (stderr as MockWriter)
    stdOut.clear()
    stdErr.clear()

    const retval = await toPromise ( execText("pwd", {}, false, SanitizedAbsPath.create("/tmp") ) )
    assertEquals(retval, 0)
    assert(stdout.toString().includes('tmp'))
    assertEquals(stderr.toString(), "")    
})