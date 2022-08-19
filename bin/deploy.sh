#!/bin/bash
echo "Runng \"npm version -ws $1\""
npm version -ws "$1"

echo "Runng \"npm --no-git-tag-version version $1\""
npm version --no-git-tag-version "$1"

# list of dependencies to be check
dependencies=(
    "@taqueria/protocol"
    "@taqueria/node-sdk"
)

echo "Updating dependencies..."
for folder in $(find -maxdepth 1 -name "taqueria-*" -type d); do
    if [ -f "$folder/package.json" ]; then
        for dependency in "${dependencies[@]}"; do
            output=$(jq --arg dependency "$dependency" --arg version "^$1" 'select(.dependencies[$dependency] != null) | .dependencies[$dependency] |= $version' "$folder/package.json")
            if [ -n "$output" ]; then
                echo "$output" > "$folder/package.json"
            fi
        done
    fi
done
echo "Updating dependencies...done"

echo "Ruuning \"npm update\" to ensure the package-lock.json is up to date"
npm update
