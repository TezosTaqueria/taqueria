import {Plugin, Task, Network} from '@taqueria/sdk'

Plugin.create(i18n => ({
    schema: "1.0",
    version: "0.1",
    networks: [
        Network.create({
            name: "hangzhounet",
            label: "Hangzhounet",
            attributes: {
                "faucetUrl": "https://teztnets.xyz/hangzhounet-faucet"
            },
            protocol: "PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx",
            rpcUrl: "https://rpc.hangzhounet.teztnets.xyz"
        })
    ],
    checkRuntimeDependencies: () => Promise.resolve({
        status: "success",
        report: [
        ]
    }),
    installRunTimeDependencies: () => Promise.resolve({
        status: "success",
        output: "No third-party dependencies required"
    }),
    proxy: parsedArgs => Promise.resolve({
        status: "success",
        stdout: "Proxied successfully",
        stderr: "",
        artifacts: []
    })
}), process.argv)