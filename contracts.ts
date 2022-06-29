import * as Config from '@taqueria/protocol/Config';
import * as Contract from '@taqueria/protocol/Contract';
import * as i18n from '@taqueria/protocol/i18n';
import * as LoadedConfig from '@taqueria/protocol/LoadedConfig';
import * as SanitiziedAbsPath from '@taqueria/protocol/SanitizedAbsPath';
import * as SanitizedArgs from '@taqueria/protocol/SanitizedArgs';
import * as SHA256 from '@taqueria/protocol/SHA256';
import * as TaqError from '@taqueria/protocol/TaqError';
import { attemptP, chain, map, reject, resolve } from 'fluture';
import { pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import { getConfig } from './taqueria-config.ts';
import { joinPaths, readTextFile, writeJsonFile } from './taqueria-utils/taqueria-utils.ts';

const isContractRegistered = (contractName: string, config: LoadedConfig.t | Config.t) =>
	config.contracts && config.contracts[contractName] ? true : false;

const newContract = (sourceFile: string, projectDir: SanitiziedAbsPath.t, contractsDir: string) =>
	pipe(
		readTextFile(joinPaths(projectDir, contractsDir, sourceFile)),
		chain(contents => attemptP<TaqError.t, SHA256.t>(() => SHA256.toSHA256(contents))),
		chain(hash =>
			Contract.of({
				sourceFile,
				hash,
			})
		),
	);

export const addContract = (parsedArgs: SanitizedArgs.ManageContractsArgs, i18n: i18n.t) =>
	pipe(
		getConfig(parsedArgs.projectDir, i18n),
		chain(LoadedConfig.toConfig),
		chain(config =>
			isContractRegistered(parsedArgs.contractName, config)
				? reject(TaqError.create({
					kind: 'E_CONTRACT_REGISTERED',
					context: parsedArgs,
					msg: `${parsedArgs.contractName} has already been registered`,
				}))
				: pipe(
					newContract(parsedArgs.sourceFile, parsedArgs.projectDir, config.contractsDir),
					map(contract => {
						const contracts = config.contracts || {};
						return {
							...config,
							contracts: {
								...contracts,
								...Object.fromEntries([[parsedArgs.contractName, contract]]),
							},
						};
					}),
					chain(writeJsonFile(joinPaths(parsedArgs.projectDir, '.taq', 'config.json'))),
				)
		),
	);
