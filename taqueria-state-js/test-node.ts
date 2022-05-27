import loadProject from "./node/index"

loadProject("../validation-test")
    .then(async ({getOriginations}) => {
        const contracts = await getOriginations()
        console.log (JSON.stringify(contracts, undefined, 4))
    })
    .catch(console.error)
