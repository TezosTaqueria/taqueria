import type { TezosToolkit } from '@taquito/taquito';
import { useState } from 'react';
import type { Storage } from '../model';

const Interface = ({
	contractStorage,
	setContractStorage,
	Tezos,
	contractAddress,
	connected,
}: {
	contractStorage: Storage | undefined;
	setContractStorage: (p: Storage) => void;
	Tezos: TezosToolkit;
	contractAddress: string;
	connected: boolean;
}) => {
	const [tacosToOrder, setTacosToOrder] = useState(0);
	const [insufficientTacos, setInsufficientTacos] = useState(false);
	const [orderingTacos, setOrderingTacos] = useState(false);
	const [orderingTacosError, setOrderingTacosError] = useState(false);

	const orderTacos = async () => {
		if (
			contractStorage
			&& tacosToOrder > 0
			&& tacosToOrder < contractStorage.available_tacos.toNumber()
			&& !insufficientTacos
		) {
			try {
				setOrderingTacos(true);
				const contract = await Tezos.wallet.at(contractAddress);
				const op = await contract.methods.buy(tacosToOrder).send();
				await op.confirmation();
				setContractStorage({
					...contractStorage,
					available_tacos: contractStorage.available_tacos.minus(tacosToOrder),
				});
				setTacosToOrder(0);
			} catch (error) {
				console.error(error);
				setInsufficientTacos(false);
				setOrderingTacosError(true);
			} finally {
				setOrderingTacos(false);
			}
		}
	};

	return (
		<div className='interface'>
			{contractStorage
				? (
					<>
						<div className='amount-of-tacos'>
							<div>There are</div>
							<div className='amount-of-tacos__storage'>{contractStorage.available_tacos.toNumber()}</div>
							<div>tacos in the Taqueria</div>
						</div>
						<br />
						<br />
						<br />
						<br />
						<div>
							<input
								type='number'
								value={tacosToOrder.toString()}
								onChange={ev => {
									const val = Math.floor(+ev.target.value);
									setTacosToOrder(val);
									if (val <= contractStorage.available_tacos.toNumber()) {
										setInsufficientTacos(false);
									} else {
										setInsufficientTacos(true);
									}
								}}
							/>
						</div>
						<br />
						<br />
						{insufficientTacos
							? (
								<div style={{ color: 'red' }}>
									Error: not enough tacos! Try again
								</div>
							)
							: orderingTacosError
							? (
								<div style={{ color: 'red' }}>
									An error occured while ordering your tacos
								</div>
							)
							: <br />}
						<br />
						<br />
						<button
							className='order'
							onClick={orderTacos}
							disabled={!tacosToOrder || insufficientTacos || !connected}
						>
							{tacosToOrder && !insufficientTacos
								? `${orderingTacos ? 'Ordering' : 'Order'} ${tacosToOrder} taco${tacosToOrder > 1 ? 's' : ''}`
								: 'No tacos'}
						</button>
						<br />
						{orderingTacos && (
							<div className='ordering-tacos'>
								<img src='images/taco.png' alt='taco-loading' />
								<img src='images/taco.png' alt='taco-loading' />
							</div>
						)}
					</>
				)
				: <div>Loading...</div>}
		</div>
	);
};

export default Interface;
