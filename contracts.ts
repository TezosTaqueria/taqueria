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
import { has, isEmpty, omit, toPairs } from 'rambda';
import { getConfig } from './taqueria-config.ts';
import { joinPaths, readTextFile, writeJsonFile } from './taqueria-utils/taqueria-utils.ts';

type contractRow = {
	'Name': string;
	'Last Known Hash': string;
	'Source file': string;
};

const hasContracts = (config: LoadedConfig.t) => config.contracts && !isEmpty(config.contracts);

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

export const addContract = (parsedArgs: SanitizedArgs.AddContractArgs, i18n: i18n.t) =>
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
		chain(_ => listContracts(parsedArgs, i18n)),
	);

export const removeContract = (parsedArgs: SanitizedArgs.RemoveContractArgs, i18n: i18n.t) =>
	pipe(
		getConfig(parsedArgs.projectDir, i18n),
		chain(LoadedConfig.toConfig),
		chain(config => {
			if (!isContractRegistered(parsedArgs.contractName, config)) {
				return reject(TaqError.create({
					kind: 'E_CONTRACT_NOT_REGISTERED',
					context: parsedArgs,
					msg: `${parsedArgs.contractName} is not a registered contract`,
				}));
			}

			const updatedConfig = {
				...config,
				contracts: omit([parsedArgs.contractName], config.contracts),
			};
			return writeJsonFile(joinPaths(parsedArgs.projectDir, '.taq', 'config.json'))(updatedConfig);
		}),
		chain(_ => listContracts(parsedArgs, i18n)),
	);

export const listContracts = (parsedArgs: SanitizedArgs.t, i18n: i18n.t) =>
	pipe(
		getConfig(parsedArgs.projectDir, i18n),
		map(config =>
			!hasContracts(config)
				? [{ contract: i18n.__('noContractsRegistered') }]
				: toPairs(config.contracts).reduce(
					(retval: contractRow[], [key, val]) => [
						...retval,
						{ 'Name': key, 'Source file': val.sourceFile, 'Last Known Hash': val.hash.slice(0, 8) },
					],
					[],
				)
		),
		map(rows => rows as Record<string, string>[]),
	);
