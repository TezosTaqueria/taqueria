import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject, sleep } from './utils/utils';
const exec = util.promisify(exec1);
import * as contents from './data/help-contents/typechecker-simulator-contents';

const taqueriaProjectPath = 'scrap/auto-test-tezos-client-plugin';
let dockerName: string;
describe('E2E Testing for taqueria typechecker and simulator tasks of the tezos-client plugin', () => {
	dockerName = 'local-tezos-client';

	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['tezos-client']);
	});

	// Disable typecheck all for now
	test.skip('Verify that taqueria typechecker task can typecheck one contract under artifacts folder', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq typecheck
			const { stdout, stderr } = await exec(`taq typecheck`, { cwd: `./${taqueriaProjectPath}` });

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

			// 3. Verify that it's well-typed and contains no errors
			expect(stdout).toBe(contents.oneRowTable);
			expect(stderr).toBe('');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// Disable typecheck all for now
	test.skip('Verify that taqueria typechecker task can typecheck all contracts under artifacts folder', async () => {
		try {
			// 1. Copy two contracts from data folder to /artifacts folder under taqueria project
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-one.tz`);
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-two.tz`);

			// 2. Run taq typecheck
			const { stdout, stderr } = await exec(`taq typecheck`, { cwd: `./${taqueriaProjectPath}` });

			// 3. Verify that both are well-typed and contain no errors
			expect(stdout).toBe(contents.twoRowTable);
			expect(stderr).toBe('');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// Disable typecheck more than one for now
	test.skip('Verify that taqueria typechecker task can typecheck multiple (but not all) contracts using typecheck [sourceFile1] [sourceFile2] command', async () => {
		try {
			// 1. Copy two contracts from data folder to /artifacts folder under taqueria project
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-one.tz`);
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-two.tz`);
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos-three.tz`);

			// 2. Run taq typecheck hello-tacos-one.tz hello-tacos-two.tz
			const { stdout, stderr } = await exec(`taq typecheck hello-tacos-one.tz hello-tacos-two.tz`, {
				cwd: `./${taqueriaProjectPath}`,
			});

			// 3. Verify that both are well-typed and contain no errors
			expect(stdout).toBe(contents.twoRowTable);
			expect(stderr).toBe('');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that a different version of the tezos client image can be used', async () => {
		const imageName = 'oxheadalpha/flextesa:20221123';

		const result = await exec(`TAQ_TEZOS_CLIENT_IMAGE=${imageName} taq get-image --plugin tezos-client`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		expect(result.stdout.trim()).toBe(imageName);

		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq typecheck
		const { stdout, stderr } = await exec(`taq typecheck hello-tacos.tz`, { cwd: `./${taqueriaProjectPath}` });

		// 3. Verify that it's well-typed and contains no errors
		expect(stdout).toBe(contents.oneRowTable);
		expect(stderr).toBe('');
	});

	test('Verify that taqueria typechecker task will display proper message if user tries to typecheck contract that does not exist', async () => {
		// 1. Run taq typecheck ${contractName} for contract that does not exist
		const { stdout, stderr } = await exec(`taq typecheck test.tz`, { cwd: `./${taqueriaProjectPath}` });

		// 2. Verify that output includes a table and an error message
		expect(stdout).toBe(contents.nonExistent);
		expect(stderr).toContain('No such file or directory');
	});

	test('Verify that taqueria typechecker task emits error and yet displays table if contract is ill-typed', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/hello-tacos-ill-typed.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq typecheck hello-tacos-ill-typed.tz
		const { stdout, stderr } = await exec(`taq typecheck hello-tacos-ill-typed.tz`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		// 3. Verify that output includes a table and an error message
		expect(stdout).toBe(contents.typeError);
		expect(stderr).toContain('Type nat is not compatible with type string');
	});

	test('Verify that taqueria simulator task can simulate one contract using simulate [sourceFile] command', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);
		await exec(`cp e2e/data/integerParameter10.tz ${taqueriaProjectPath}/artifacts`);
		await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq simulate hello-tacos.tz
		const { stdout, stderr } = await exec(
			`taq simulate hello-tacos.tz --param integerParameter10.tz --storage anyContract.storage.tz`,
			{
				cwd: `./${taqueriaProjectPath}`,
			},
		);

		// 3. Verify that it's valid and contains no errors
		expect(stdout).toBe(contents.oneRowTableSimulateResult);
		expect(stderr).toBe('');
	});

	test('Verify that taqueria simulator task will display proper message if user tries to simulate contract that does not exist', async () => {
		try {
			await exec(`cp e2e/data/integerParameter10.tz ${taqueriaProjectPath}/artifacts`);
			await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts`);

			// 1. Run taq simulate ${contractName} for contract that does not exist
			const { stdout, stderr } = await exec(
				`taq simulate test.tz --param integerParameter10.tz --storage anyContract.storage.tz`,
				{
					cwd: `./${taqueriaProjectPath}`,
				},
			);

			// 2. Verify that output includes a table and an error message
			expect(stdout).toBe(contents.nonExistent);
			expect(stderr).toContain('No such file or directory');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria simulator task emits logic error (runtime exception to be thrown)', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts`);
			await exec(`cp e2e/data/integerParameter15.tz ${taqueriaProjectPath}/artifacts`);
			await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq simulate hello-tacos.tz
			const { stdout, stderr } = await exec(
				`taq simulate hello-tacos.tz --param integerParameter15.tz --storage anyContract.storage.tz`,
				{
					cwd: `./${taqueriaProjectPath}`,
				},
			);

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
			await exec(`cp e2e/data/stringParameter.tz ${taqueriaProjectPath}/artifacts`);
			await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq simulate hello-tacos.tz
			const { stdout, stderr } = await exec(
				`taq simulate hello-tacos.tz --param stringParameter.tz --storage anyContract.storage.tz`,
				{
					cwd: `./${taqueriaProjectPath}`,
				},
			);

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
			await exec(`cp e2e/data/listParameter.tz ${taqueriaProjectPath}/artifacts`);
			await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq simulate hello-tacos.tz
			const { stdout, stderr } = await exec(
				`taq simulate hello-tacos.tz --param listParameter.tz --storage anyContract.storage.tz`,
				{
					cwd: `./${taqueriaProjectPath}`,
				},
			);

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
			await exec(`cp e2e/data/mapParameter.tz ${taqueriaProjectPath}/artifacts`);
			await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts`);

			// 2. Run taq simulate hello-tacos.tz
			const { stdout, stderr } = await exec(
				`taq simulate hello-tacos.tz --param mapParameter.tz --storage anyContract.storage.tz`,
				{ cwd: `./${taqueriaProjectPath}` },
			);

			// 3. Verify that output includes a table and an error message
			expect(stdout).toBe(contents.runtimeError);
			expect(stderr).toContain('unexpected sequence, only an int can be used here');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the Taqueria CLI will pass 0x00 (not 0, which is in int, not a byte) to the simulator', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/byteSlice.tz ${taqueriaProjectPath}/artifacts`);
		await exec(`cp e2e/data/byteSlice.default_storage.tz ${taqueriaProjectPath}/artifacts`);
		await exec(`cp e2e/data/byteSlice.parameter.param1.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq simulate
		const { stdout, stderr } = await exec(`taq simulate byteSlice.tz --param byteSlice.parameter.param1.tz`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		expect(stdout).toContain('0xa47ef2');
		expect(stderr).toBe('');
	});

	test('Verify that taqueria simulator task can understand Left and Right (part of input and storage value) correctly', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/increment.tz ${taqueriaProjectPath}/artifacts`);
		await exec(`cp e2e/data/incrementBy3.tz ${taqueriaProjectPath}/artifacts`);
		await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq simulate
		const { stdout, stderr } = await exec(
			`taq simulate increment.tz --param incrementBy3.tz --storage anyContract.storage.tz`,
			{
				cwd: `./${taqueriaProjectPath}`,
			},
		);

		expect(stdout).toContain('15');
		expect(stderr).toBe('');
	});

	test('Verify that taqueria simulator task accepts --entrypoint flag to make calling entry points easier', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/increment.tz ${taqueriaProjectPath}/artifacts`);
		await exec(`cp e2e/data/integerParameter10.tz ${taqueriaProjectPath}/artifacts`);
		await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts`);

		// 2. Run taq simulate
		const { stdout, stderr } = await exec(
			`taq simulate increment.tz --param integerParameter10.tz --storage anyContract.storage.tz --entrypoint increment`,
			{
				cwd: `./${taqueriaProjectPath}`,
			},
		);

		expect(stdout).toContain('22');
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

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(async () => {
		await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	});
});
