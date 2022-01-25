import {make} from "../../../taqueria-utils/sanitized-path";

describe("Test sanitized-path functionality", () => {
    test('Verify that .make returns sanitized-path', () => {
        expect(make("path").value).toBe("./path");
    });
});