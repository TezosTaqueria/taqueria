import { Network } from '@airgap/beacon-sdk';
import type { TezosToolkit } from '@taquito/taquito';
import Wallet from './Wallet';

const Header = ({
	Tezos,
	network,
	setConnected,
	connected,
}: {
	Tezos: TezosToolkit | undefined;
	network: Network;
	setConnected: (p: boolean) => void;
	connected: boolean;
}) => {
	return (
		<header>
			<div className='header__logo'>
				<img src='images/logo.png' alt='logo' />
			</div>
			<div className='header__title'>
				<h1>Taco Shop</h1>
			</div>
			<div className='header__connection-status'>
				<Wallet
					Tezos={Tezos}
					network={network}
					setConnected={setConnected}
					connected={connected}
				/>
			</div>
		</header>
	);
};

export default Header;
