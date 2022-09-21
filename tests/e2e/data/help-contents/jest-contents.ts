export const helpContentsJestPlugin = `taq <command>

Commands:
  taq init [projectDir]           Initialize a new project
  taq opt-in                      Opt-in to sharing anonymous usage analytics
  taq opt-out                     Opt-out of sharing anonymous usage analytics
  taq install <pluginName>        Install a plugin
  taq uninstall <pluginName>      Uninstall a plugin
  taq add-contract <sourceFile>   Add a contract to the contract registry
  taq rm-contract <contractName>  Remove a contract from the contract registry
  taq list-contracts              List registered contracts
  taq test [partition]            Setup a directory as a partition to run Jest t
                                  ests                           [aliases: jest]
  taq create <template>           Create files from pre-existing templates

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsJestPluginSpecific = `taq test [partition]

Setup a directory as a partition to run Jest tests

Positionals:
  partition  Name of the partition for these tests   [string] [default: "tests"]

Options:
      --version      Show version number                               [boolean]
      --build        Display build information about the current version
                                                                       [boolean]
  -p, --projectDir   Path to your project directory              [default: "./"]
  -e, --env          Specify an environment configuration
  -y, --yes          Select "yes" to any prompt       [boolean] [default: false]
      --help         Show help                                         [boolean]
  -i, --init         Initializes the partition for Jest                [boolean]
  -t, --testPattern  Run test files that match the provided pattern
`;

export const helpContentsContractTestTemplate = `taq create <template> <michelsonArtifact>

Create files from pre-existing templates

Positionals:
  template           Name of the template to use
                                  [string] [required] [choices: "contract-test"]
  michelsonArtifact  Name of the michelson contract (artifact) to generate tests
                      for                                    [string] [required]

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
      --partition   Partition to place generated test suite
                                                     [string] [default: "tests"]
`;

export const incrementSpecContents = `
import { TezosToolkit } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
import { tas } from './types/type-aliases';
import { InMemorySigner, importKey } from '@taquito/signer';
import { IncrementContractType as ContractType } from './types/increment.types';
import { IncrementCode as ContractCode } from './types/increment.code';

jest.setTimeout(20000)

describe('increment', () => {
	const config = require('../.taq/config.json')
    const Tezos = new TezosToolkit(config.sandbox.local.rpcUrl);
	const key = config.sandbox.local.accounts.bob.secretKey.replace('unencrypted:', '')
	Tezos.setProvider({
		signer: new InMemorySigner(key),
	  });
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
        
            const newContractOrigination = await Tezos.contract.originate<ContractType>({
                code: ContractCode.code,
                storage: tas.int('42'),
            });
            const newContractResult = await newContractOrigination.contract();
            const newContractAddress = newContractResult.address;
            contract = await Tezos.contract.at<ContractType>(newContractAddress);
            
    });


    it('should call decrement', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const decrementRequest = await contract.methodsObject.decrement(tas.int('42')).send();
        await decrementRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter.toString()).toBe('');
    });

    it('should call increment', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const incrementRequest = await contract.methodsObject.increment(tas.int('42')).send();
        await incrementRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter.toString()).toBe('');
    });

    it('should call reset', async () => {
        
        const getStorageValue = async () => {
            const storage = await contract.storage();
            const value = storage;
            return value;
        };

        const storageValueBefore = await getStorageValue();
        
        const resetRequest = await contract.methodsObject.reset().send();
        await resetRequest.confirmation(3);
        
        const storageValueAfter = await getStorageValue();

        expect(storageValueAfter.toString()).toBe('');
    });
});
`;
