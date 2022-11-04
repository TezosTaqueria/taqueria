var $adXGT$taquerianodesdk = require('@taqueria/node-sdk');

const $7fd597fee973c8bb$var$clean = async parsedArgs => {
	const env = (0, $adXGT$taquerianodesdk.getCurrentEnvironmentConfig)(parsedArgs);
	if (!env) {
		return (0, $adXGT$taquerianodesdk.sendAsyncErr)(
			`There is no environment called ${parsedArgs.env} in your config.json`,
		);
	}
	try {
		const ecadFlextesaImage = 'ghcr.io/ecadlabs/taqueria-flextesa';
		const ligoImage = 'ligolang/ligo';
		const results = await (0, $adXGT$taquerianodesdk.execCmd)(
			`docker rmi --force $(docker images --quiet --filter "reference=${ecadFlextesaImage}" --filter "reference=${ligoImage}")`,
		);
		console.error('JCC out:', results.stdout);
		console.error('JCC err:', results.stderr);
		// // Don't need the ones below actually. Just use the docker command
		// const imageListOutput = (await execCmd(`docker image list`)).stdout
		// const images = imageListOutput.split('\n')
		// const imagesSegmented = images.map(image => image.split(' '))
		// const imagesCleaned = imagesSegmented
		//     .map(image => image.filter(word => word != ''))
		//     .filter(image => image.length !== 0 && image[0] != 'REPOSITORY')
		// const imagesRefined = imagesCleaned.map(image => {
		//     return {
		//         imageName: image[0],
		//         imageId: image[1]
		//     }
		// })
		// console.error(imageListOutput)
		// console.error(imagesRefined)
	} catch {
		return (0, $adXGT$taquerianodesdk.sendAsyncErr)('No operations performed');
	}
};
var $7fd597fee973c8bb$export$2e2bcd8739ae039 = $7fd597fee973c8bb$var$clean;

const $48ae047e78ce78ac$export$b75f8c4f8f3fbd14 = parsedArgs => {
	switch (parsedArgs.task) {
		case 'clean':
			return (0, $7fd597fee973c8bb$export$2e2bcd8739ae039)(parsedArgs);
		default:
			return (0, $adXGT$taquerianodesdk.sendAsyncErr)(
				`${parsedArgs.task} is not an understood task by the Core plugin`,
			);
	}
};
var $48ae047e78ce78ac$export$2e2bcd8739ae039 = $48ae047e78ce78ac$export$b75f8c4f8f3fbd14;

(0, $adXGT$taquerianodesdk.Plugin).create(_i18n => ({
	alias: 'core',
	schema: '1.0',
	version: '0.1',
	tasks: [
		(0, $adXGT$taquerianodesdk.Task).create({
			task: 'clean',
			command: 'clean',
			description: 'Clean all the Taqueria-related docker images',
			handler: 'proxy',
			encoding: 'application/json',
		}),
	],
	proxy: (0, $48ae047e78ce78ac$export$2e2bcd8739ae039),
}), process.argv);

// # sourceMappingURL=index.js.map
