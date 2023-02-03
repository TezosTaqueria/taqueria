import { Network, NetworkType } from '@airgap/beacon-sdk';
import { Config, ConfigFileSetV2, getConfigV2, isTaqError, TaqError, V2 } from '@taqueria/toolkit';
import { TezosToolkit } from '@taquito/taquito';
import React, { useEffect, useState } from 'react';
import './App.css';
import AppContainer from './components/AppContainer';
import type { Storage } from './model';
import './styles/Footer.css';
import './styles/Header.css';
import './styles/Interface.css';
import './styles/Wallet.css';

const CONTRACT_NAME = 'hello-tacos';

type AppProps = {
	env: Record<string, string | undefined>;
};

type Environment = ReturnType<typeof V2.getCurrentEnv>;

type Deps = {
	settings: ConfigFileSetV2;
	Tezos: TezosToolkit;
	network: Network;
};

function getContractAddress(contractName: string, deps: Deps) {
	if (deps.settings) {
		const env = V2.getCurrentEnv(deps.settings);
		return V2.getContractAddress(contractName, env);
	}
	return undefined;
}

function getRpcUrl(deps: Deps) {
	if (deps.settings) {
		const env = V2.getCurrentEnv(deps.settings);
		return env['rpcUrl'] as string | undefined;
	}
	return undefined;
}

function getNetworkInfo(settings: ConfigFileSetV2): Network {
	const env = V2.getCurrentEnv(settings);
	if (!settings.config.environmentDefault) {
		throw new TaqError('No default environment set. Please set `environmentDefault` in your .taq/config.json file.');
	}
	if (!env['rpcUrl']) {
		throw new TaqError(`No RPC Url set for the environment called ${settings.config.environmentDefault}`);
	}
	const rpcUrl = env['rpcUrl'] as string;
	if (env.type === 'flextesa') {
		return {
			type: NetworkType.CUSTOM,
			name: settings.config.environmentDefault,
			rpcUrl,
		};
	} else if (env.type === 'simple') {
		return {
			type: rpcUrl.includes('ghost') ? NetworkType.GHOSTNET : NetworkType.MAINNET,
			name: settings.config.environmentDefault,
			rpcUrl,
		};
	}
	throw new TaqError('This app only supports environments of type "flextesa" or "simple".');
}

function App(props: AppProps) {
	const [deps, setDeps] = useState<Deps | undefined>(undefined);
	const contractAddress = deps ? getContractAddress(CONTRACT_NAME, deps) : undefined;
	const [contractStorage, setContractStorage] = useState<Storage | undefined>(
		undefined,
	);
	const [connected, setConnected] = useState(false);

	// Get the current environment and create a Tezos client based
	// on its settings
	useEffect(() => {
		(async () => {
			if (!deps) {
				try {
					const settings = await getConfigV2(props.env, 'REACT_APP_');
					const network = getNetworkInfo(settings);
					const Tezos = new TezosToolkit(network.rpcUrl!);
					setDeps({
						network,
						settings,
						Tezos,
					});
				} catch (err) {
					alert(isTaqError(err) ? err.message : err);
				}
			}
		})();
	}, [deps, setDeps, props]);

	// Get the current amount of tacos from the contract storage
	useEffect(() => {
		(async () => {
			if (deps && contractAddress) {
				// fetches the contract storage
				const contract = await deps.Tezos.wallet.at(contractAddress);
				const storage: Storage | undefined = await contract?.storage();
				if (storage) {
					setContractStorage(storage);
				} else {
					setContractStorage(undefined);
				}
			}
		})();
	}, [deps, contractAddress, setContractStorage]);

	return deps
		? (
			<AppContainer
				Tezos={deps.Tezos}
				connected={connected}
				setConnected={setConnected}
				contractAddress={contractAddress ?? 'No contract found'}
				contractStorage={contractStorage}
				setContractStorage={setContractStorage}
				network={deps.network}
			/>
		)
		: <div></div>;
}

export default App;
