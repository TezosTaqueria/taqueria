import { getArch, SandboxConfig } from '@taqueria/node-sdk';
import { Protocol } from '@taqueria/node-sdk/types';
import { Config } from '@taqueria/protocol/taqueria-protocol-types';
import { getContainerName, getNewPortIfPortInUse, getUniqueSandboxName, Opts, updateConfig } from './proxy';

const { Url } = Protocol;

const getTzKtDockerImages = (opts: Opts) => ({
	postgres: `postgres:14.5-alpine`,
	sync: `alirezahaghshenas/tzkt:sync-1.9.4`,
	api: `alirezahaghshenas/tzkt:api-1.9.4`,
});

export const getTzKtContainerNames = async (sandboxName: string, parsedArgs: Opts) => {
	const uniqueSandboxName = await getUniqueSandboxName(sandboxName, parsedArgs.projectDir);
	return {
		postgres: `taqueria-${parsedArgs.env}-pg-${uniqueSandboxName}`,
		sync: `taqueria-${parsedArgs.env}-tzkt-sync-${uniqueSandboxName}`,
		api: `taqueria-${parsedArgs.env}-tzkt-api-${uniqueSandboxName}`,
	};
};

const getTzKtContainerEnvironments = async (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts) => {
	const sandboxPort = Url.toComponents(sandbox.rpcUrl).port;
	const containerNames = await getTzKtContainerNames(sandboxName, opts);
	const sandboxContainerName = await getContainerName(sandboxName, opts);
	return {
		postgres: `--env POSTGRES_PASSWORD=${sandboxName} --env POSTGRES_USER=tzkt`,
		sync: `--env ConnectionStrings__DefaultConnection="host=${containerNames.postgres};port=${
			sandbox.tzkt?.postgresqlPort ?? 5432
		};database=sandbox_data;username=tzkt;password=${sandboxName};" --env TezosNode__Endpoint="http://${sandboxContainerName}:${sandboxPort}/"`,
		api: `--env ConnectionStrings__DefaultConnection="host=${containerNames.postgres};port=${
			sandbox.tzkt?.postgresqlPort ?? 5432
		};database=sandbox_data;username=tzkt;password=${sandboxName};"`,
	};
};

export const getTzKtStartCommands = async (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts) => {
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
		await updateConfig(opts, (config: Config.t) => {
			const sandbox = config.sandbox?.[sandboxName];
			if (typeof sandbox === 'string' || sandbox === undefined) {
				return undefined;
			}
			const oldTzKt = sandbox?.tzkt ?? {
				disableAutostartWithSandbox: false,
				apiPort: 5000,
				postgresqlPort: 5432,
			};
			const updatedConfig: Config.t = {
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
