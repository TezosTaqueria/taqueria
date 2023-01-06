import { getArch, SandboxConfig } from '@taqueria/node-sdk';
import { Config as RawConfig } from '@taqueria/protocol/types';
import { getContainerName, getNewPortIfPortInUse, getUniqueSandboxName, updateConfig } from './proxy';
import { ValidOpts } from './types';

const getTzKtDockerImages = (opts: ValidOpts) => ({
	postgres: `postgres:14.5-alpine`,
	sync: `ghcr.io/ecadlabs/tzkt-sync:v1.11.0-taqueria`,
	api: `ghcr.io/ecadlabs/tzkt-api:v1.11.0-taqueria`,
});

export const getTzKtContainerNames = async (sandboxName: string, parsedArgs: ValidOpts) => {
	const uniqueSandboxName = await getUniqueSandboxName(sandboxName, parsedArgs.projectDir);
	return {
		postgres: `taq-postgres-${uniqueSandboxName}`,
		sync: `taq-tzkt-sync-${uniqueSandboxName}`,
		api: `taq-tzkt-api-${uniqueSandboxName}`,
	};
};

const getTzKtContainerEnvironments = async (sandboxName: string, sandbox: SandboxConfig, opts: ValidOpts) => {
	const containerNames = await getTzKtContainerNames(sandboxName, opts);
	const sandboxContainerName = await getContainerName(opts);
	const connectionStringEnv =
		`ConnectionStrings__DefaultConnection="host=${containerNames.postgres};port=5432;database=sandbox_data;username=tzkt;password=${sandboxName};"`;
	return {
		postgres: `--env POSTGRES_PASSWORD=${sandboxName} --env POSTGRES_USER=tzkt`,
		sync: `--env ${connectionStringEnv} --env TezosNode__Endpoint="http://${sandboxContainerName}:20000/"`,
		api:
			`--env ${connectionStringEnv} --env Kestrel__Endpoints__Http__Url="http://*:5000" --env MaxAttemptsForMigrations=120`,
	};
};

export const getTzKtStartCommands = async (sandboxName: string, sandbox: SandboxConfig, opts: ValidOpts) => {
	const pgPort = sandbox.tzkt?.postgresqlPort ?? 5432;
	const newPGPort = await getNewPortIfPortInUse(pgPort);

	const apiPort = sandbox.tzkt?.apiPort ?? 5000;
	const newAPIPort = await getNewPortIfPortInUse(apiPort);

	if (newPGPort !== pgPort || newAPIPort !== apiPort) {
		if (newPGPort !== pgPort) {
			console.log(
				`${pgPort} is already in use, ${newPGPort} will be used for postgresql in ${sandboxName} instead and .taq/config.json will be updated to reflect this.`,
			);
		}
		if (newAPIPort !== apiPort) {
			console.log(
				`${apiPort} is already in use, ${newAPIPort} will be used for TzKt API in ${sandboxName} instead and .taq/config.json will be updated to reflect this.`,
			);
		}
		await updateConfig(opts, (config: RawConfig) => {
			const sandbox = config.sandbox?.[sandboxName];
			if (typeof sandbox === 'string' || sandbox === undefined) {
				return undefined;
			}
			const oldTzKt = sandbox?.tzkt ?? {
				disableAutostartWithSandbox: false,
				apiPort: 5000,
				postgresqlPort: 5432,
			};
			const updatedConfig: RawConfig = {
				...config,
				sandbox: {
					...config.sandbox,
					[sandboxName]: {
						...sandbox,
						tzkt: {
							...oldTzKt,
							postgresqlPort: newPGPort,
							apiPort: newAPIPort,
						},
					},
				},
			};
			return updatedConfig;
		});
	}

	const containerNames = await getTzKtContainerNames(sandboxName, opts);
	const arch = await getArch();
	const images = getTzKtDockerImages(opts);
	const environmentVariables = await getTzKtContainerEnvironments(sandboxName, sandbox, opts);

	return {
		postgres:
			`docker run --network sandbox_${sandboxName}_net --name ${containerNames.postgres} --rm --detach --platform ${arch} -p ${newPGPort}:5432 ${environmentVariables.postgres} ${images.postgres}`,
		sync:
			`docker run --network sandbox_${sandboxName}_net --name ${containerNames.sync} --rm --detach --platform ${arch} ${environmentVariables.sync} ${images.sync}`,
		api:
			`docker run --network sandbox_${sandboxName}_net --name ${containerNames.api} --rm --detach --platform ${arch} -p ${newAPIPort}:5000 ${environmentVariables.api} ${images.api}`,
	};
};
