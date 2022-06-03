import { NetworkType } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import { ExampleCode } from '../types/example.code';
import { ExampleContractType, ExampleWalletType } from '../types/example.types';
import { tas } from '../types/type-aliases';
import { UpdateProgressCallback } from '../utils/hooks';

const createContractService = () => {
	// localhost:4242 - flextesa local network
	// const Tezos = new TezosToolkit(`http://localhost:20000`);

	// // Flextesa
	// const network = {
	//     // Use react dev server proxy
	//     rpcUrl:  `/`,
	//     type: NetworkType.CUSTOM,
	// };

	// Testnet
	const network = {
		type: NetworkType.HANGZHOUNET,
		rpcUrl: 'https://hangzhounet.api.tez.ie',
	};

	const Tezos = new TezosToolkit(network.rpcUrl);

	const state = {
		isConnected: false,
		userAddress: undefined as undefined | string,
		userBalance: undefined as undefined | number,
		contractAddress: undefined as undefined | string,
		contract: undefined as undefined | ExampleWalletType,
	};

	const service = {
		getUserAddress: async () => state.userAddress,
		getUserBalance: async () => state.userBalance,
		getContractAddress: async () => state.contractAddress,
		connectWallet: async (updateProgress: UpdateProgressCallback) => {
			console.log('connectWallet START');

			updateProgress('Requesting Permissions');

			const wallet = new BeaconWallet({
				name: 'Example Dapp',
			});
			await wallet.requestPermissions({
				network,
			});

			updateProgress('Obtaining User Info');

			state.userAddress = await wallet.getPKH();
			Tezos.setWalletProvider(wallet);

			state.userBalance = (await Tezos.tz.getBalance(state.userAddress)).toNumber() / 1000000;

			state.isConnected = true;

			console.log('connectWallet DONE');
		},
		loadContract: async (updateProgress: UpdateProgressCallback, contractAddress: string) => {
			if (!state.isConnected) throw new Error('Not connected');

			updateProgress('Loading Contract');

			state.contractAddress = contractAddress;
			state.contract = await Tezos.wallet.at<ExampleWalletType>(contractAddress);

			console.log('setup', { state });
		},
		originateContract: async (updateProgress: UpdateProgressCallback) => {
			if (!state.isConnected) throw new Error('Not connected');

			// Originate contract
			updateProgress('Originating Contract');

			const origination = await Tezos.wallet.originate<ExampleWalletType>({
				code: ExampleCode.code,
				storage: tas.int(42),
			}).send();

			updateProgress('Confirming Contract');
			const contractAddress = (await origination.contract()).address;
			state.contractAddress = contractAddress;
			state.contract = await Tezos.wallet.at<ExampleWalletType>(contractAddress);
		},
		getBalance: async (updateProgress: UpdateProgressCallback): Promise<number> => {
			if (!state.contract) throw new Error('Contract is not setup');

			updateProgress('Getting Balance');

			const storage = await state.contract.storage();
			console.log('getBalance storage', { storage });
			return tas.number(storage);
		},
		increment: async (updateProgress: UpdateProgressCallback, amount: number): Promise<number> => {
			if (!state.contract) throw new Error('Contract is not setup');

			updateProgress('Sending Transaction');
			const sendResult = await state.contract.methodsObject.increment(tas.int(amount)).send();

			updateProgress('Confirming Transaction');
			await sendResult.confirmation(5);

			// Read state after update
			return service.getBalance(updateProgress);
		},
		decrement: async (updateProgress: UpdateProgressCallback, amount: number): Promise<number> => {
			if (!state.contract) throw new Error('Contract is not setup');

			updateProgress('Sending Transaction');
			const sendResult = await state.contract.methodsObject.decrement(tas.int(amount)).send();

			updateProgress('Confirming Transaction');
			await sendResult.confirmation(5);

			// Read state after update
			return service.getBalance(updateProgress);
		},
	};

	return service;
};

export const ContractService = createContractService();
