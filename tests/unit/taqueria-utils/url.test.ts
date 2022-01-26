import { assertEquals, unreachable } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import {make, Url, view} from "../../../taqueria-utils/url.ts";
import {fork} from 'https://cdn.skypack.dev/fluture';
import chai from "https://cdn.skypack.dev/chai@4.3.4?dts";

Deno.test("Positive scenario test for {make} function", () => {
    const result = make("http://path")
    const assertSuccess = (input: Url) => assertEquals(input, "http://path")
    const assertUnreachable = () => unreachable();
    fork (assertUnreachable) (assertSuccess) (result);
});


Deno.test("Negative scenario test for {make} function", () => {
    const result = make("path")
    // @ts-ignore
    const assertFailed = (err: TaqError) => assertEquals(err.kind, "E_INVALID_URL")
    const assertUnreachable = () => unreachable();
    fork (assertFailed) (assertUnreachable) (result);
});

Deno.test("Positive scenario test for {view} function", () => {
    const testUrl = "http://path" as Url;
    const assert = chai.assert;
    const result = view(testUrl);
    assertEquals(result, "http://path")
    assert.typeOf(result, "string");
});


Deno.test("Negative scenario test for {view} function", () => {
    const expect = chai.expect;
    const testUrl = "path" as Url;
    const result = view(testUrl);
    expect(result).not.to.equal("http://path");
});