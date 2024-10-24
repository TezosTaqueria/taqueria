#!/bin/bash

# Set the TAG variable
TAG=${1:-latest}


# Define the directories containing the package.json files
directories=(
  "taqueria-plugin-contract-types"
  "taqueria-plugin-jest"
  "taqueria-plugin-taquito"
  "taqueria-protocol"
  "taqueria-sdk"
  "taqueria-vscode-extension"
  "taqueria-vscode-extension-web-ui"
)

# Iterate over each directory
for dir in "${directories[@]}"; do
  # Change to the directory
  cd "$dir" || { echo "Failed to change directory to $dir"; exit 1; }

  # Update dependencies
  dependencies=$(jq -r '.dependencies | keys[] | select(startswith("@taquito"))' package.json)
  for package in $dependencies; do
    pnpm add "${package}@${TAG}"
  done

  # Update devDependencies
  devDependencies=$(jq -r '.devDependencies | keys[] | select(startswith("@taquito"))' package.json)
  for package in $devDependencies; do
    pnpm add -D "${package}@${TAG}"
  done

  # Return to the parent directory
  cd - > /dev/null || { echo "Failed to return to parent directory"; exit 1; }
done

echo "Taquito packages updated to ${TAG} versions."
