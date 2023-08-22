import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 40000,
  verbose: true,
  testMatch: [
		'**/e2e/?(*.)+(spec|test).[tj]s?(x)',
	],
  rootDir: ".",
  moduleFileExtensions: ["js", "mjs", "ts", "tsx", "mts"],
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
      },
    ],
  },
}

export default jestConfig;