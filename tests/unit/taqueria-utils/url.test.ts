import { assertEquals, unreachable } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import {make, Url} from "../../../taqueria-utils/url.ts";
import {fork} from 'https://cdn.skypack.dev/fluture';
import chai from "https://cdn.skypack.dev/chai@4.3.4?dts";

Deno.test("Positive scenario test", () => {
    const result = make("http://path")
    // @ts-ignore
    const assertSuccess = (input: Url) => assertEquals(input, "http://path")
    // @ts-ignore
    const assertUnreachable = () => unreachable();
    fork (assertUnreachable) (assertSuccess) (result);
    // Where console.error = (input) => console.log(input)
});


Deno.test("Negative scenario test", () => {
    const result = make("path")
    // @ts-ignore
    const assertFailed = (err: TaqError) => assertEquals(err.kind, "E_INVALID_URL")
    // @ts-ignore
    const assertUnreachable = () => unreachable();
    fork (assertFailed) (assertUnreachable) (result);
});