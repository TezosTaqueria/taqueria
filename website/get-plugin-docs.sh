#!/bin/bash

# list of plugins directories to copy

plugins=(
    "taqueria-flextesa-manager"
    "taqueria-plugin-contract-types"
    "taqueria-plugin-flextesa"
    "taqueria-plugin-ligo"
    "taqueria-plugin-smartpy"
    "taqueria-plugin-taquito"
    "taqueria-protocol"
)

# if plugin directory contains a README.md, copy it to the taqueria-plugin-docs directory
for plugin in "${plugins[@]}"
do
    if [ -f ../$plugin/README.md ]; then
        cp ../$plugin/README.md ./docs/plugins/_$plugin.mdx
    fi
done