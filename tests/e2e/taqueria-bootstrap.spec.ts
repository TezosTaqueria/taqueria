import { spawnSync } from 'child_process';
import { readdir, readFile, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { generateTestProject } from './utils/utils';

const taqueriaProjectPath = 'e2e/taq-bootstrap';

const expectedConfig = `
{
    "language": "en",
    "contractsDir": "contracts",
    "artifactsDir": "artifacts",
    "network": {},
    "sandbox": {
        "local": {
            "label": "Local Tezos Sandbox",
            "rpcUrl": "http://localhost:20000",
            "protocol": "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A"
        }
    },
    "environment": {
        "default": "development",
        "development": {
            "networks": [],
            "sandboxes": [
                "local"
            ],
            "storage": {}
        }
    },
    "accounts": {
        "bob": "3_000_000_000",
        "alice": "3_000_000_000",
        "john": "3_000_000_000",
        "jane": "3_000_000_000",
        "joe": "3_000_000_000"
    }
}
`;

const newConfig = `
{
    "language": "en",
    "contractsDir": "contracts",
    "artifactsDir": "artifacts",
    "network": {},
    "sandbox": {
        "local": {
            "label": "Local Tezos Sandbox",
            "rpcUrl": "http://localhost:20000",
            "protocol": "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A"
        }
    },
    "environment": {
        "default": "development",
        "development": {
            "networks": [],
            "sandboxes": [
                "local"
            ],
            "storage": {}
        },
		"testing": {
			"networks": [],
			"sandboxes": [
				"local"
			],
			"storage": {}
		}
    },
    "accounts": {
        "bob": "3_000_000_000",
        "alice": "3_000_000_000",
        "john": "3_000_000_000",
        "jane": "3_000_000_000",
        "joe": "3_000_000_000"
    }
}
`;

const expectedProvisionerDeclaration = `
import development_state from "./development-state.json" assert {type: "json"}

declare global {
export type development = typeof development_state

export type RawState = development

export interface State {
raw: RawState
}

export type ID = string

export interface Provision {
readonly id: ID
after: ID[]
when: (fn: (state: State) => boolean) => Provision
task: (fn: (state: State) => unknown) => Provision
}

export function provision(id: ID): Provision

export interface Tasks {
}
export const tasks: Tasks
}
`;

const expectedProvisioner = `/// <reference types="./provisioner.d.ts" />\n`;

describe('Taqueria Bootstrap Files', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, []);
	});

	afterAll(async () => {
		await rm(taqueriaProjectPath, { recursive: true });
	});

	test('Assure that bootstrap files are created after running taq', async () => {
		const filesBefore = await readdir(join(taqueriaProjectPath, '.taq'));
		expect(filesBefore).toEqual(['config.json']);

		spawnSync('taq', { cwd: taqueriaProjectPath, shell: true });

		const filesAfter = await readdir(join(taqueriaProjectPath, '.taq'));
		expect(filesAfter.sort()).toEqual([
			'config.json', // config file
			'development-state.json', // state registry / persistent state for development env
			'provisioner.d.ts', // dynamic types declarations
			'provisioner.ts', // provisioner file
			'state.json', // ephemeral state
		]);
	});

	test("Assure that config file's content matches what is expected", async () => {
		const filepath = join(taqueriaProjectPath, '.taq', 'config.json');
		const actual = await readFile(filepath, { encoding: 'utf-8' });
		expect(actual).toBe(expectedConfig.trim());
	});

	test('Assure that development-state.json (state registry) matches what is expected', async () => {
		const filepath = join(taqueriaProjectPath, '.taq', 'development-state.json');
		const actual = await readFile(filepath, { encoding: 'utf-8' });
		const expected = '{}';
		expect(actual).toBe(expected);
	});

	test('Assure that provisioner.ts matches what is expected', async () => {
		const filepath = join(taqueriaProjectPath, '.taq', 'provisioner.ts');
		const actual = await readFile(filepath, { encoding: 'utf-8' });
		expect(actual).toBe(expectedProvisioner.trimStart());
	});

	test('Assure that provisioner.d.ts matches what is expected', async () => {
		const filepath = join(taqueriaProjectPath, '.taq', 'provisioner.d.ts');
		const actual = await readFile(filepath, { encoding: 'utf-8' });
		expect(actual).toBe(expectedProvisionerDeclaration.trim());
	});

	test('Assure that testing-state.json is generated when a different environment is targeted', async () => {
		const configFile = join(taqueriaProjectPath, '.taq', 'config.json');
		await writeFile(configFile, newConfig, { encoding: 'utf8' });
		spawnSync('taq -e testing', { cwd: taqueriaProjectPath, shell: true });

		const filesAfter = await readdir(join(taqueriaProjectPath, '.taq'));
		expect(filesAfter.sort()).toEqual([
			'config.json', // config file
			'development-state.json', // state registry / persistent state for development env
			'provisioner.d.ts', // dynamic types declarations
			'provisioner.ts', // provisioner file
			'state.json', // ephemeral state
			'testing-state.json', // testing state registry
		]);

		const filepath = join(taqueriaProjectPath, '.taq', 'testing-state.json');
		const actual = await readFile(filepath, { encoding: 'utf-8' });
		const expected = '{}';
		expect(actual).toBe(expected);
	});
});
