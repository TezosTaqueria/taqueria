import {getArch, readJsonFile, writeJsonFile} from "@taqueria/node-sdk";
import * as fs from "fs";


const jsonObject = {
    "testkey": "testvalue"
}

describe("Integration tests using taqueria-mock-plugin", () => {

    test('Verify that writeJsonFile can write json data to a file', async () => {
        const filePath = ".\/unit\/taqueria-sdk\/data\/writeJsonFileTest.json";
        const result = await writeJsonFile(filePath)(jsonObject);
        expect(result).toEqual("./unit/taqueria-sdk/data/writeJsonFileTest.json")
        fs.unlinkSync(filePath);
    });

    test('Verify that readJsonFile can write json data to a file', async () => {
        const filePath = ".\/unit\/taqueria-sdk\/data\/readJsonFileTest.json";
        const result = await readJsonFile(filePath)
        expect(result).toEqual(jsonObject)
    });

    test('Verify that getArch returns the proper version', async () => {
        const platforms = ["linux/amd64", "linux/arm64/v8", ]
        const result = await getArch()
        expect(platforms).toContain(result);
    });

});