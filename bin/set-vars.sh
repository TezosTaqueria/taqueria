#!/usr/bin/env bash
BRANCH=`git branch --show-current`
COMMIT=`git rev-parse --short HEAD`
if [  -z "$GITHUB_REF_NAME" ]; then
    TAQ_VERSION="dev-${BRANCH//\//-}"
else

    TAQ_VERSION=$(cat package.json | jq '.["version"]')
fi
TIMESTAMP=`date +%s`
BUILD="$COMMIT"
