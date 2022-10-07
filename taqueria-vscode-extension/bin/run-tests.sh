# Remove activationEvents array from the package.json
mv package.json package_original.json
cat package_original.json | jq 'del(.activationEvents[])' > package.json

# Run tests
npm run pretest
mkdir -p ~/TVsCE_e2e/vscode-taq-test-project
node ./out/test/runTest.js

# Revert back activationEvents array to the package.json
mv package_original.json package.json
rm -r ~/TVsCE_e2e/vscode-taq-test-project