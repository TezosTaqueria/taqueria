import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject, getContainerName } from './utils/utils';
const exec = util.promisify(exec1);
import * as contents from './data/help-contents/typechecker-simulator-contents';

const taqueriaProjectPath = 'e2e/auto-test-tezos-client-plugin';
let dockerName: string;
describe('E2E Testing for taqueria typechecker and simulator tasks of the tezos-client plugin', () => {
	dockerName = 'local-tezos-client';

	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['tezos-client', 'flextesa']);
		await exec(
			`cp e2e/data/config-tezos-client-local-sandbox-test-environment.json ${taqueriaProjectPath}/.taq/config.json`,
		);
		await exec(`taq start sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
	});

	test('Verify that taqueria flextesa plugin can return list of accounts from a sandbox', async () => {
		const accounts = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
		expect(accounts.stdout).toContain('bob');
	});

	test('Verify that taqueria can return JSON when request for list of accounts from a sandbox is made by TVsCE', async () => {
		const accounts = await exec(`taq list accounts ${dockerName} --fromVsCode`, { cwd: `./${taqueriaProjectPath}` });
		expect(accounts.stdout).toEqual(
			JSON.stringify([
				{
					account: 'bob',
					balance: '3000 ꜩ',
					address: 'tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6',
				},
				{
					account: 'alice',
					balance: '3000 ꜩ',
					address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
				},
				{
					account: 'john',
					balance: '3000 ꜩ',
					address: 'tz1Zwoh1QCVAvJ4sVTojMp9pLYp6Ji4NoZy6',
				},
				{
					account: 'jane',
					balance: '3000 ꜩ',
					address: 'tz1aHUAC4oviwJuZF1EvVSvFz7cu9KMNYBph',
				},
				{
					account: 'joe',
					balance: '3000 ꜩ',
					address: 'tz1MVGjgD1YtAPwohsSfk8i3ZiT1yEGM2YXB',
				},
			]) + '\n',
		);
	});

	test('Verify that taqueria typechecker task can typecheck one contract under artifacts folder', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq typecheck
			const { stdout, stderr } = await exec(`taq typecheck`, { cwd: `./${taqueriaProjectPath}` });
			if (stderr) console.log(stderr);

			// 3. Verify that it's well-typed and contains no errors
			expect(stdout).toBe(contents.oneRowTable);
			expect(stderr).toBe('');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria typechecker task can typecheck one contract using typecheck [sourceFile] command', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq typecheck hello-tacos.tz
			const { stdout, stderr } = await exec(`taq typecheck hello-tacos.tz`, { cwd: `./${taqueriaProjectPath}` });
			if (stderr) console.log(stderr);

			// 3. Verify that it's well-typed and contains no errors
			expect(stdout).toBe(contents.oneRowTable);
			expect(stderr).toBe('');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria typechecker task can typecheck all contracts under artifacts folder', async () => {
		try {
			// 1. Copy two contracts from data folder to /artifacts folder under taqueria project
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-one.tz`);
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-two.tz`);

			// 2. Run taq typecheck
			const { stdout, stderr } = await exec(`taq typecheck`, { cwd: `./${taqueriaProjectPath}` });
			if (stderr) console.log(stderr);

			// 3. Verify that both are well-typed and contain no errors
			expect(stdout).toBe(contents.twoRowTable);
			expect(stderr).toBe('');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria typechecker task can typecheck multiple (but not all) contracts using typecheck [sourceFile1] [sourceFile2] command', async () => {
		try {
			// 1. Copy two contracts from data folder to /artifacts folder under taqueria project
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-one.tz`);
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-two.tz`);
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-three.tz`);

			// 2. Run taq typecheck hello-tacos-one.tz hello-tacos-two.tz
			const { stdout, stderr } = await exec(`taq typecheck hello-tacos-one.tz hello-tacos-two.tz`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			if (stderr) console.log(stderr);

			// 3. Verify that both are well-typed and contain no errors
			expect(stdout).toBe(contents.twoRowTable);
			expect(stderr).toBe('');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria typechecker task will display proper message if user tries to typecheck contract that does not exist', async () => {
		try {
			// 1. Run taq typecheck ${contractName} for contract that does not exist
			const { stdout, stderr } = await exec(`taq typecheck test.tz`, { cwd: `./${taqueriaProjectPath}` });

			// 2. Verify that output includes a table and an error message
			expect(stdout).toBe(contents.nonExistent);
			expect(stderr).toContain('Does not exist');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria typechecker task emits error and yet displays table if contract is ill-typed', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos-ill-typed.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq typecheck hello-tacos-ill-typed.tz
			const { stdout, stderr } = await exec(`taq typecheck hello-tacos-ill-typed.tz`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			if (stderr) console.log(stderr);

			// 3. Verify that output includes a table and an error message
			expect(stdout).toBe(contents.typeError);
			expect(stderr).toContain('Type nat is not compatible with type string');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria simulator task can simulate one contract using simulate [sourceFile] command', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq simulate hello-tacos.tz
		const { stdout, stderr } = await exec(`taq simulate hello-tacos.tz '2' --storage '5'`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		if (stderr) console.log(stderr);

		// 3. Verify that it's valid and contains no errors
		expect(stdout).toBe(contents.oneRowTableSimulateResult);
		expect(stderr).toBe('');
	});

	test('Verify that taqueria simulator task will display proper message if user tries to simulate contract that does not exist', async () => {
		try {
			// 1. Run taq simulate ${contractName} for contract that does not exist
			const { stdout, stderr } = await exec(`taq simulate test.tz '2' --storage '5'`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			if (stderr) console.log(stderr);

			// 2. Verify that output includes a table and an error message
			expect(stdout).toBe(contents.nonExistent);
			expect(stderr).toContain('Does not exist');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria simulator task emits logic error (runtime exception to be thrown)', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq simulate hello-tacos.tz
			const { stdout, stderr } = await exec(`taq simulate hello-tacos.tz '10' --storage '5'`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			if (stderr) console.log(stderr);

			// 3. Verify that output includes a table and an error message
			expect(stdout).toBe(contents.runtimeError);
			expect(stderr).toContain('NOT_ENOUGH_TACOS');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria simulator task emits parameter type error (supplying string instead of nat)', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq simulate hello-tacos.tz
			const { stdout, stderr } = await exec(`taq simulate hello-tacos.tz '"hi"' --storage '5'`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			if (stderr) console.log(stderr);

			// 3. Verify that output includes a table and an error message
			expect(stdout).toBe(contents.runtimeError);
			expect(stderr).toContain('unexpected string, only an int can be used here');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria simulator task emits parameter type error (supplying list instead of nat)', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq simulate hello-tacos.tz
			const { stdout, stderr } = await exec(`taq simulate hello-tacos.tz '{1;2;3}' --storage '5'`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			if (stderr) console.log(stderr);

			// 3. Verify that output includes a table and an error message
			expect(stdout).toBe(contents.runtimeError);
			expect(stderr).toContain('unexpected sequence, only an int can be used here');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria simulator task emits parameter type error (supplying map instead of nat)', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq simulate hello-tacos.tz
			const { stdout, stderr } = await exec(
				`taq simulate hello-tacos.tz '{ Elt "bar" True ; Elt "foo" False }' --storage '5'`,
				{ cwd: `./${taqueriaProjectPath}` },
			);
			if (stderr) console.log(stderr);

			// 3. Verify that output includes a table and an error message
			expect(stdout).toBe(contents.runtimeError);
			expect(stderr).toContain('unexpected sequence, only an int can be used here');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria simulator task emits parameter type error (supplying an unknown type instead of nat)', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq simulate hello-tacos.tz
		const { stdout, stderr } = await exec(`taq simulate hello-tacos.tz '2' --storage 'hello'`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		if (stderr) console.log(stderr);

		// 3. Verify that output includes a table and an error message
		expect(stdout).toBe(contents.runtimeError);
		expect(stderr).toContain('Unknown primitive hello.');
	});

	test('Verify that the Taqueria CLI will pass 0x00 (not 0, which is in int, not a byte) to the simulator', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/byteSlice.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq simulate
		const { stdout, stderr } = await exec(`taq simulate byteSlice.tz '0x12a47ef2' --storage '0x00'`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		if (stderr) console.log(stderr);

		expect(stdout).toContain('0xa47ef2');
		expect(stderr).toBe('');
	});

	test('Verify that taqueria simulator task can understand Left and Right (part of input and storage value) correctly', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/increment.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq simulate
		const { stdout, stderr } = await exec(`taq simulate increment.tz 'Left (Right 3)' --storage '5'`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		if (stderr) console.log(stderr);

		expect(stdout).toContain('8');
		expect(stderr).toBe('');
	});

	test('Verify that taqueria simulator task accepts --entrypoint flag to make calling entry points easier', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/increment.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq simulate
		const { stdout, stderr } = await exec(`taq simulate increment.tz '3' --storage '5' --entrypoint increment`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		if (stderr) console.log(stderr);

		expect(stdout).toContain('8');
		expect(stderr).toBe('');
	});

	// Remove all files from artifacts folder without removing folder itself
	afterEach(async () => {
		try {
			const files = await fsPromises.readdir(`${taqueriaProjectPath}/artifacts/`);
			for (const file of files) {
				await fsPromises.rm(`${taqueriaProjectPath}/artifacts/${file}`);
			}
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// Clean up process to stop container if it was not stopped properly during the test
	// And
	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(async () => {
		try {
			await exec(`taq stop sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
			await fsPromises.rm(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
