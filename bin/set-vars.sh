#!/usr/bin/env bash
BRANCH=`git branch --show-current`
COMMIT=`git rev-parse --short HEAD`
if [  -z "$TAQ_VERSION" ]; then
    TAQ_VERSION="dev-$BRANCH"
fi
TIMESTAMP=`date +%s`
if [  -z "$BUILD" ]; then
    BUILD="$COMMIT"
fi