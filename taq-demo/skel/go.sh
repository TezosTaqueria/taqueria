#/usr/bin/env zsh

install_local_plugins() {
    taq install ../taqueria/node_modules/@taqueria/plugin-core
    taq install ../taqueria/node_modules/@taqueria/plugin-flextesa
    taq install ../taqueria/node_modules/@taqueria/plugin-contract-types
    taq install ../taqueria/node_modules/@taqueria/plugin-ligo
    taq install ../taqueria/node_modules/@taqueria/plugin-jest
    taq install ../taqueria/node_modules/@taqueria/plugin-contract-types
    taq install ../taqueria/node_modules/@taqueria/plugin-taquito
    # taq install @taquito/taquito
    npm install @taquito/taquito
}
