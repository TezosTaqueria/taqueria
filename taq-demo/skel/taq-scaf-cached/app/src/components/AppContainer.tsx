import { Network } from '@airgap/beacon-sdk';
import { TezosToolkit } from '@taquito/taquito';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Interface from '../components/Interface';
import type { Storage } from '../model';

type Props = {
	Tezos: TezosToolkit;
	network: Network;
	setConnected: (value: boolean) => void;
	connected: boolean;
	contractStorage: Storage | undefined;
	setContractStorage: (value: Storage) => void;
	contractAddress: string;
};

const AppContainer = (
	{ Tezos, network, setConnected, connected, contractStorage, setContractStorage, contractAddress }: Props,
) => (
	<div className='app'>
		<Header
			Tezos={Tezos}
			network={network}
			setConnected={setConnected}
			connected={connected}
		>
		</Header>
		<div></div>
		<Interface
			contractStorage={contractStorage}
			setContractStorage={setContractStorage}
			Tezos={Tezos}
			contractAddress={contractAddress}
			connected={connected}
		>
		</Interface>
		<Footer contractAddress={contractAddress}></Footer>
	</div>
);

export default AppContainer;
