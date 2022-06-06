
module.exports = {
    "automock": false,
    "bail": 0,
    "cache": true,
    "cacheDirectory": "/tmp/jest_rs",
    "changedFilesWithAncestor": false,
    "ci": false,
    "clearMocks": false,
    "collectCoverage": false,
    "coveragePathIgnorePatterns": [
        "/node_modules/"
    ],
    "coverageProvider": "babel",
    "coverageReporters": [
        "json",
        "text",
        "lcov",
        "clover"
    ],
    "detectLeaks": false,
    "detectOpenHandles": false,
    "errorOnDeprecated": false,
    "expand": false,
    "extensionsToTreatAsEsm": [],
    "fakeTimers": {
        "enableGlobally": false
    },
    "forceCoverageMatch": [],
    "globals": {},
    "haste": {
        "computeSha1": false,
        "enableSymlinks": false,
        "forceNodeFilesystemAPI": true,
        "throwOnModuleCollision": false
    },
    "injectGlobals": true,
    "listTests": false,
    "maxConcurrency": 5,
    "maxWorkers": "50%",
    "moduleDirectories": [
        "node_modules"
    ],
    "moduleFileExtensions": [
        "js",
        "mjs",
        "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node"
    ],
    "moduleNameMapper": {},
    "modulePathIgnorePatterns": [],
    "noStackTrace": false,
    "notify": false,
    "notifyMode": "failure-change",
    "passWithNoTests": false,
    "prettierPath": "prettier",
    "resetMocks": false,
    "resetModules": false,
    "restoreMocks": false,
    "roots": [
        "<rootDir>"
    ],
    "runTestsByPath": false,
    "runner": "jest-runner",
    "setupFiles": [],
    "setupFilesAfterEnv": [],
    "skipFilter": false,
    "slowTestThreshold": 5,
    "snapshotSerializers": [],
    "testEnvironment": "jest-environment-node",
    "testEnvironmentOptions": {},
    "testFailureExitCode": 1,
    "testLocationInResults": false,
    "testMatch": [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    "testPathIgnorePatterns": [
        "/node_modules/"
    ],
    "testRegex": [],
    "testRunner": "jest-circus/runner",
    "testSequencer": "@jest/test-sequencer",
    "transformIgnorePatterns": [
        "/node_modules/",
        "\\.pnp\\.[^\\/]+$"
    ],
    "useStderr": false,
    "watch": false,
    "watchPathIgnorePatterns": [],
    "watchman": true
}
