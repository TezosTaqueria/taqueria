import { TezosToolkit } from '@taquito/taquito';
import { importKey } from '@taquito/signer';
import { TimelockCode } from './timelock.code';
import { TimelockContractType } from './timelock.types'
import { chest_key, chest, tas } from './type-aliases';

export const utilizingContractTypes = async () => {
	const Tezos = new TezosToolkit('https://rpc.ithacanet.teztnets.xyz');
	const FAUCET_KEY = {
		"pkh": "tz1USDW6CgSTXJWvQjC1ivsPjXE8Y9wbfANM",
		"mnemonic": [
			"infant",
			"cool",
			"ill",
			"offer",
			"enemy",
			"olive",
			"shrimp",
			"night",
			"second",
			"media",
			"admit",
			"reform",
			"cement",
			"own",
			"uncle"
		],
		"email": "gnaqmiry.jcdaybrh@teztnets.xyz",
		"password": "7zSr9Pn1Gn",
		"amount": "15017827241",
		"activation_code": "dd0fd000aa62fed1b64554ea56b230e1d8ba2aad"
	}
	importKey(
		Tezos,
		FAUCET_KEY.email,
		FAUCET_KEY.password,
		FAUCET_KEY.mnemonic.join(' '),
		FAUCET_KEY.activation_code
	);

	const chest_key: chest_key = tas.chest_key('8ac392f7a5a5e1befaadc891c6c0ba85baafa9d6d897feccd4c7f6a7aefef2b1bb9ba58f8594a8f9e3cddba3ebbbec81c9fb8e82cbe48db2f09ce1e5e1ed889ef68ae4e0efecd58cb4aada89e1f699e1bca19da9b4d6d5d9b2fbf3e8d783f3c8908c808fb7cfbd9ae9f3bde4c0b5edf9aecaa292cb968b82eb8896d8e9eda28cfa9febe3cd8aa4f1bad3df9adbadc8b6a382c797c294f0ec83e0bfbb819bcfe5a1fd98cafd8cb3a9eccfccf2ea98ceef9085b5f98fe1edeb84bbb58cc3fda0f98dfb85b7b5ae9ac4e0d0eee3e0cdb9cffdc19adae88f9dc7b4b8caec82b2a2afecc1ecb4b2d2a3a7aeeecfeacd9bf2daeee28dfbc4eaa7c281b49bd884ce92abab95ab9ba59edc83c39c88c2ccb6b891d4999983b29ff5abef92a3d6c0dee3dff391cfc501c6f3bccba3dc8ba5f28ca094a8caa9d5b593d4d9efbdcbcfeb87acc6c299a3a0e696e6fcf290e0eef0d7c4b1f2c486d5aaf9dda383b0baabd59cc9a6ffc4f5f1e4eaf3cbadfdd781819d8887aa90a2b1a7c5a3e8e7aabdf2d4e59a8de6aeb9d394bb84fbade98eda8ef1eaa3a8839782f297c397c285ddf584a9c4f8c1f3e1e7fcefbda897c1eff9b9f592a2c987c3a8d8949bd8ebb792fdaa8f8fe784a8a380c1b0cdd384e5ecccd4c4b5aef6a3f2ccc6a491cac68ec3d8c99daea7dded929fb1cbb8b3c6bdc6bbb7d285d3f9cf9696cb9a919282b2f8b5c7f2abbb9ea0bc8e9ee8b5a29bade185d7998cfbfea5a184b3e9ff83efbcc2e586b0cc93b099c291f98f86df8cceb7cb9dfbb38ec19bd699bdb8888fc5fee2fbf6d9afa5c3e0c1d797bdc071')
	const chest: chest = tas.chest('e6a3d5a5bdebdb9f8a82d482d6948a88c7c1f4cfc6cb97e2999acdb4f588a1dab49ee3a2e3c7efa1c4ef95f6e4afb684e8e1b2de87a5da9fb3dfbbf5b5a9b5cf87c0efbfd5d3d8bbe6d4df9f9ca5ae83b3aaaafaf4a0949a98ddf58bb7a690c3f687fabda89793b6dbbff1bef39ae7a0ce8698edd8ab89fa8bd9928dc794a8b3a299ecc5c3f5b1acc6909be8df9ae1959daff5f595e6dbd089ac8f9bbffa8ba8a1b4e0829ca5d7e2f380d3d3adca8de7e8aef3a0dabce2c19cbf94b3f0b6e7b59ce886dcdaa3cb848d8facc3bec9d0bac0df9e88e1a7f183cdf4a2f2fca3bba1eafdc5cfb8b7ebb5e8b7b2c8e0d6e5ddcbad81eedfccdcebc6eeb285c7d7c8caf1d9a9d09ea4e1a0baa2979df0cfa5a2e8f68eb4d8b9fac399d3dbbde6b0a2948fd990af01a9e3cdcbf4f8e2eeac84ec8ade95cec7e6dad1aacf8ffcef96eec3a4ce85e5d7dbb6c789a0ecdcc490e5ccecf1fc88c6dbabd8b8d7e1faea8ecbdcc9d892f1c1f5f2809f83dc89f6cdce8ec0cb81c5be9af68dddc2c8b6dfd6efadbe91a58ea28bbba6b4adc8d89dfdd9a7badbc6e6f8b7a7a1bba4aebeb489ca91cfc5c5faa48f81fb8f9bfd9ae5bd9cbec1c397cbe8eadfeafff6ab939eadad82859fb09681f996b184d1dde1eae1fcc3d08caad1bdeff6d1b7a5f0858a9293deeaa2adb0c7dcd9c5e7abc1d18eacf7b9fcbe87cc83d0c585dc899585b0b3cce6fdabd8d8d495cfe3c5cbd7cef1f3db81d9efafeecfb497d583fceba7d3c882a4cbd6a0dda6b7d4a7dde1a8f89da4d5819ba6e2dbf9ebec8fabd79db88eda8ddda0abd094c7b3ecc8a8022c4b04439efbca5d04f25dadad66bf1b44dcf761e442f8dd000000151bd03ca4d43827976695ea4a09dcfe41b210c99a82')

	const originationResult = await Tezos.contract.originate<TimelockContractType>({
		code: TimelockCode.code,
		storage: tas.bytes("00")
	});
	const contract = await originationResult.contract()
	const initialStorage = await contract.storage();
	const op = await contract.methods.default(chest_key, chest).send()
	await op.confirmation(3)
	const newStorage = await contract.storage();

	return { initialStorage, newStorage }
}

utilizingContractTypes()
.then(({ initialStorage, newStorage }) => console.log("initialStorage:", initialStorage, ", newStorage:", newStorage))
.catch((error) => console.log(`Error: ${error}`));

// Tezos.contract
// .originate<TimelockContractType>({
// 	code: TimelockCode.code,
// 	storage: tas.bytes("00"),
// })
// .then((originationOp) => {
// 	console.log(`Waiting for confirmation of origination for ${originationOp.contractAddress}...`);
// 	return originationOp.contract();
// })
// .then((contract) => {
// 	console.log(`Origination completed.`);
// 	console.log(`Calling entrypoint.`);
// 	return contract.methods.default(chest_key, chest).send()
// })
// .then((op) => {
// 	console.log(`Waiting for ${op.hash} to be confirmed...`);
// 	return op.confirmation(3).then(() => op.hash);
// })
// .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
// .catch((error) => console.log(`Error: ${error}`));