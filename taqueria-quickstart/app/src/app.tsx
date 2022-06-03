import React, { useEffect, useState } from 'react';
import { ContractService } from './services/contract-service';
import { UpdateProgressCallback, useAsyncWorker } from './utils/hooks';

export const App = () => {
	const [isWalletReady, setIsWalletReady] = useState(false);
	const [isContractReady, setIsContractReady] = useState(false);

	const [userAddress, setUserAddress] = useState(undefined as undefined | string);
	const [userBalance, setUserBalance] = useState(undefined as undefined | number);

	const [contractAddress, setContractAddress] = useState(undefined as undefined | string);
	const [balance, setBalance] = useState(0);

	const { loading, error, progress, doWork } = useAsyncWorker();

	const connectWallet = () => {
		doWork(async (stopIfUnmounted, updateProgress) => {
			await ContractService.connectWallet(updateProgress);
			const resultUserAddress = await ContractService.getUserAddress();
			const resultUserBalance = await ContractService.getUserBalance();
			stopIfUnmounted();
			setUserAddress(resultUserAddress);
			setUserBalance(resultUserBalance);
			setIsWalletReady(true);
		});
	};

	const loadData = async (stopIfUnmounted: () => void, updateProgress: UpdateProgressCallback) => {
		const resultContractAddress = await ContractService.getContractAddress();
		stopIfUnmounted();

		setContractAddress(resultContractAddress);

		// Get balance
		const balanceResult = await ContractService.getBalance(updateProgress);
		stopIfUnmounted();
		setBalance(balanceResult);

		setIsContractReady(true);
	};

	const loadContract = () => {
		if (!contractAddress) return;

		doWork(async (stopIfUnmounted, updateProgress) => {
			await ContractService.loadContract(updateProgress, contractAddress);
			await loadData(stopIfUnmounted, updateProgress);
		});
	};

	const originateContract = () => {
		doWork(async (stopIfUnmounted, updateProgress) => {
			await ContractService.originateContract(updateProgress);
			await loadData(stopIfUnmounted, updateProgress);
		});
	};
	const increment = () => {
		doWork(async (stopIfUnmounted, updateProgress) => {
			const result = await ContractService.increment(updateProgress, 1);
			stopIfUnmounted();

			setBalance(result);
		});
	};
	const decrement = () => {
		doWork(async (stopIfUnmounted, updateProgress) => {
			const result = await ContractService.decrement(updateProgress, 1);
			stopIfUnmounted();

			setBalance(result);
		});
	};

	return (
		<div className='app'>
			{loading && (
				<div className='loading'>loading... {progress.message} {(progress.ratioComplete * 100).toFixed(0)}%</div>
			)}
			{error && <div className='error'>{error.message}</div>}

			{!isWalletReady && (
				<>
					<h3>Connect Wallet</h3>
					<button onClick={connectWallet}>Connect</button>
				</>
			)}
			{isWalletReady && (
				<>
					<h3>User</h3>
					<div>user address: {userAddress}</div>
					<div>user balance: {userBalance} ꜩ</div>
				</>
			)}

			{isWalletReady && !isContractReady && (
				<>
					<h3>Enter Existing Contract Address</h3>
					<input type={'text'} value={contractAddress || ''} onChange={x => setContractAddress(x.target.value)} />
					<button onClick={loadContract}>Load Contract</button>

					<h3>Deploy (Originate) New Contract</h3>
					<button onClick={originateContract}>Deploy Contract</button>
				</>
			)}
			{isWalletReady && isContractReady && (
				<>
					<h3>Contract Address</h3>
					<div>contract: {contractAddress}</div>

					<h3>Contract State</h3>
					<div>balance: {balance}</div>

					<h3>Contract Methods</h3>
					<button onClick={increment}>Add</button>
					<button onClick={decrement}>Subtract</button>
				</>
			)}
		</div>
	);
};
