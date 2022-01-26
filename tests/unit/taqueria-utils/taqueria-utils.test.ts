import { assertEquals, unreachable } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import {fork} from 'https://cdn.skypack.dev/fluture';
import {
    decodeJson,
    isTaqError,
    isUrl,
    log,
    mkdir,
    readFile,
    writeTextFile
} from "../../../taqueria-utils/taqueria-utils.ts";
import chai from "https://cdn.skypack.dev/chai@4.3.4?dts";
import { exists} from "https://deno.land/std/fs/mod.ts";
import {TaqError} from "../../../taqueria-utils/taqueria-utils-types.ts";

const testValidJson = '{"test": "testPayload"}';
const testInvalidJson = '{"test": testPayload}';

Deno.test("Positive scenario test for {decodeJson} function", () => {
    const result = decodeJson(testValidJson);
    const decodedJson = { test: "testPayload"};
    const assertSuccess = (testJsonOutput: any) => assertEquals(testJsonOutput, decodedJson)
    const assertUnreachable = () => unreachable();
    fork (assertUnreachable) (assertSuccess) (result);
});

// This test was built to try to test return () => {} (line 16)
// But it does not work, need to ask Michael about is there any way to test it
Deno.test("Positive scenario test for {decodeJson} function with empty {}", () => {
    const result = decodeJson("{}");
    // @ts-ignore
    const assertSuccess = (testJsonOutput: any) => assertEquals(testJsonOutput, {});
    const assertUnreachable = () => unreachable();
    fork (assertUnreachable) (assertSuccess) (result);
});

Deno.test("Negative scenario test for {decodeJson} function", () => {
    const result = decodeJson(testInvalidJson);
    // @ts-ignore
    const assertFailed = (err: TaqError) => assertEquals(err.kind, "E_INVALID_JSON")
    const assertUnreachable = () => unreachable();
    fork (assertFailed) (assertUnreachable) (result);
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

// @ts-ignore
Deno.test({name: "Positive scenario test for {mkdir} function", fn: async (t) => {
        // @ts-ignore
        await t.step("run test for {mkdir} function", async () => {
            const assert = chai.assert;
            const result = mkdir("./unit/taqueria-utils/data/test");
            // @ts-ignore
            const assertSuccess = (result) => exists(result).then((result) => assert.equal(result, true));
            const assertUnreachable = () => unreachable();
            fork(assertUnreachable)(assertSuccess)(result);
        });
        // @ts-ignore
        await t.step("clean up", async () => {
            try {
                Deno.removeSync('./unit/taqueria-utils/data/test');
            } catch (err) {
                console.error(err);
            }
        });
    },
    sanitizeResources: false,
    sanitizeOps: false
},);

Deno.test({name: "Positive scenario test for {readFile} function",  fn: async () => {
        const result = readFile("./unit/taqueria-utils/data/testRead.txt");
        // @ts-ignore
        const assertSuccess = (result) => assert.equal(result, 'testRead');
        const assertUnreachable = () => unreachable();
        fork(assertUnreachable)(assertSuccess)(result);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({name: "Positive scenario test for {writeTextFile} function",  fn: async (t) => {
        await t.step("run test for {mkdir} function", async () => {
            const result = await writeTextFile("./unit/taqueria-utils/data/testWrite.txt", "testWrite");
            // @ts-ignore
            const assertSuccess = (result) => assert.equal(result, 'testWrite');
            const assertUnreachable = () => unreachable();
            fork(assertUnreachable)(assertSuccess)(result);
        });
        // @ts-ignore
        await t.step("clean up", async () => {
            try {
                Deno.removeSync('./unit/taqueria-utils/data/testWrite.txt');
            } catch (err) {
                console.error(err);
            }
        });
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({name: "Positive scenario test for {isTaqError} function",  fn: async () => {
        const assert = chai.assert;
        const taqErrorTest : TaqError = {
            kind: "E_INVALID_PATH",
            msg: "Test"
        };
        const result = isTaqError(taqErrorTest);
        assert.equal(result, true)
    },
    sanitizeResources: false,
    sanitizeOps: false
});


Deno.test({name: "Negative scenario test for {isTaqError} function",  fn: async () => {
        const assert = chai.assert;
        const taqErrorTest = "error"
        const result = isTaqError(taqErrorTest);
        assert.equal(result, false)
    },
    sanitizeResources: false,
    sanitizeOps: false
});

// It does not work properly, need to ask Michael how to resolve fork()
// Because currently it returns noop function if to use same way as for reject, resolve
Deno.test({name: "Positive scenario test for {isUrl} function",  fn: async () => {
        const assert = chai.assert;
        const urlTest = "http://path";
        const result = isUrl(urlTest);
        // @ts-ignore
        // const assertResult = (result) => assert.equal(result, 'http://path');
        // const assertUnreachable = () => unreachable();
        // fork(assertUnreachable)(assertResult)(result);

    },
    sanitizeResources: false,
    sanitizeOps: false
});