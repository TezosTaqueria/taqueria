const { exec } = require('node:child_process');
const util = require('node:util');
const execPromise = util.promisify(exec);

jest.setTimeout(30000);

describe('E2E Testing for taqueria action', () => {
	test('Verify that taqueria flextesa plugin can return list of accounts from the local sandbox', async () => {
		const accounts = await execPromise(`taq list accounts local`);

		expect(accounts.stdout).toContain('bob');
		expect(accounts.stdout).toContain('alice');
		expect(accounts.stdout).toContain('john');
		expect(accounts.stdout).toContain('jane');
		expect(accounts.stdout).toContain('joe');
	});

	test('Verify that taqueria can compile a previously registered contract', async () => {
		const accounts = await execPromise(`taq compile hello-tacos.mligo`, { cwd: `./` });
		expect(accounts.stdout).toContain('artifacts/hello-tacos.tz');
	});

	test('Verify that taqueria can originate a contract to the local sandbox', async () => {
		const contractName = 'hello-tacos.tz';

		const contractOriginate = await execPromise(`taq originate ${contractName}`, { cwd: `./` });
		expect(contractOriginate.stdout).toContain(contractName);
		expect(contractOriginate.stdout).toContain('local');

		const contractHash = contractOriginate.stdout.split('\n')
			.find(line => line.includes(contractName))
			?.split('│')[2]
			.trim();

		// TODO: Talk with Alex about this one
		// const sandboxContractContents = await execPromise(`curl http://localhost:20000/chains/main/blocks/head/context/contracts/${contractHash}`)
		// expect(sandboxContractContents.stdout).toContain('"storage":{"int":"42"}')
	});
});
