#!/bin/bash


# list of dependencies to be check
dependencies=(
    "@taqueria/protocol"
    "@taqueria/node-sdk"
)

packages=(
    "taqueria-protocol"
    "taqueria-sdk"
    "taqueria-plugin-flextesa"
    "taqueria-plugin-contract-types"
    "taqueria-flextesa-manager"
    "taqueria-plugin-ipfs-pinata"
    "taqueria-plugin-jest"
    "taqueria-plugin-smartpy"
    "taqueria-vscode-extension"
    "taqueria-plugin-ligo"
    "taqueria-plugin-mock"
    "taqueria-plugin-archetype"
    "taqueria-state"
    "taqueria-plugin-tezos-client"
    "taqueria-plugin-taquito"
    "taqueria-utils"
)

echo "Runng \"npm version -ws $1\""
npm version -ws "$1"

echo "Runng \"npm --no-git-tag-version version $1\""
npm version --no-git-tag-version "$1"

echo "Updating dependencies..."
for package in "${packages[@]}"; do
    if [ -f "$package/package.json" ]; then
        for dependency in "${dependencies[@]}"; do
            output=$(jq --arg dependency "$dependency" --arg version "^$1" 'select(.dependencies[$dependency] != null) | .dependencies[$dependency] |= $version' "$package/package.json")
            if [ -n "$output" ]; then
                echo "$output" > "$package/package.json"
            fi
        done
    fi
done
echo "Updating dependencies...done"

echo "Ruuning \"npm update\" to ensure the package-lock.json is up to date"
npm update
