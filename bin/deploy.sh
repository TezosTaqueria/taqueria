#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# list of dependencies to be check
dependencies=(
    "@taqueria/protocol"
    "@taqueria/node-sdk"
)

packages=(
    "taqueria-*"
)

echo "Running \"npm version -ws $1\""
npm version -ws "$1"

echo "Running \"npm --no-git-tag-version version $1\""
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
