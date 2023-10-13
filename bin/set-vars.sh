#!/usr/bin/env bash
if [ -z "$TAQ_VERSION" ]; then
    if [  -z "$GITHUB_REF_NAME" ]; then
        BRANCH=`git branch --show-current`
        TAQ_VERSION="dev-${BRANCH//\//-}"
    else

        TAQ_VERSION=$(cat package.json | jq -r '.["version"]')
    fi
fi
TIMESTAMP=`date +%s`

if [ -z "$TAQ_BUILD" ]; then
    COMMIT=`git rev-parse --short HEAD`
    TAQ_BUILD="$COMMIT"
fi